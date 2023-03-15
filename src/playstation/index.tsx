import {
  Button,
  colors,
  LinearProgress,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  AlertTitle,
  IconButton,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { addPs4Game, editPsGame, getPs4Games } from '../apis/playstation';
import { isSessionValid } from '../common/session';
import { AttachMoney, Done, OpenInNew, Verified } from '@mui/icons-material';

type FormValues = {
  gameId: string;
  name: string;
  imageSrc?: string;
};

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 24px;
  background-color: ${colors.deepPurple[800]};
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  margin: 24px auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled(TextField).attrs({ fullWidth: true, variant: 'outlined', size: 'small' })`
  :not(:first-child) {
    margin-left: 16px;
  }
`;

const StyledTable = styled(Table)`
  margin-bottom: 32px;
`;

const TableTitle = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: ${colors.deepPurple[600]};
`;

const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const TableContent = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`;

const InlineData = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAlert = styled(Alert)`
  margin-top: 32px;
`;

const ItemImage = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 4px;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86px;
  height: 86px;
  border-radius: 4px;
  border: 1px solid ${colors.deepPurple[200]};
  background-color: ${colors.deepPurple[100]};
  color: ${colors.deepPurple[300]};
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
`;

const NoData = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 16px;
`;

const PS3Game = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const PS3GameName = styled.div`
  margin-left: 24px;
`;

/** TODO:
 * split form, table and alert into different components
 * button to clear invalid products
 * actions to remove, archive as acquired
 * filtering: all, discounted, acquired
 */

const PS3list = [
  {
    name: 'Resistance: Fall of Man',
    imageSrc:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/FI/en/99/EP9000-NPEA00430_00-RESISTANCE1PSN01/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=672&h=672',
  },
  {
    name: 'Resistance 2',
    imageSrc:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/FI/en/99/EP9000-BCES00226_00-DISCONLYPARENT00/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=672&h=672',
  },
  {
    name: 'Resistance 3',
    imageSrc:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/FI/en/99/EP9000-BCES01118_00-DISCONLYPARENT00/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=672&h=672',
  },
  {
    name: 'inFAMOUS',
    imageSrc:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/FI/en/99/EP9000-NPEA00252_00-GINFAMOUSX000001/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=672&h=672',
  },
  {
    name: 'inFAMOUS 2',
    imageSrc:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/FI/en/99/EP9000-NPEA00318_00-GINFAMOUS2000001/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=672&h=672',
  },
  {
    name: 'Alpha Protocol',
    imageSrc:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/FI/en/99/EP0177-BLES00704_00-DISCONLYPARENT00/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=672&h=672',
  },
  {
    name: 'Binary Domain',
    imageSrc:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/FI/en/99/EP0177-NPEB00915_00-BINARYDOMAINPSN1/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=672&h=672',
  },
  {
    name: 'Tales of Symphonia Chronicles',
    imageSrc:
      'https://www.vpd.fi/media/amasty/webp/catalog/product/cache/a0b3a019c90d2db0a2e9ebd40c353a34/p/s/ps3_tales_of_symphonia_chronicles_pegi12_jpg.webp',
  },
];

const PlaystationView = () => {
  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<FormValues>({ defaultValues: { gameId: '', name: '', imageSrc: '' } });

  const { data, isLoading, refetch: refetchList } = useQuery(['playstation', 'wishlist'], () => getPs4Games());

  const { mutate, isLoading: isSaving } = useMutation((values: FormValues) => addPs4Game(values), {
    onSuccess: () => {
      resetForm();
      refetchList();
    },
    onError: (error?: any) => {
      const message = error?.response?.data?.message || error?.message;
      toast(message || 'Unkown error!', { type: 'error' });
    },
  });

  const { mutate: markAsOwned } = useMutation(
    async (itemId: string) => {
      const item = data?.find((entry) => entry._id === itemId);
      if (!item) {
        throw new Error('Item not found!');
      }
      const { _id, ...rest } = item;
      const payload = { ...rest, isOwned: true };
      await editPsGame(itemId, payload);
    },
    {
      onSuccess: () => {
        refetchList();
      },
      onError: (error?: any) => {
        const message = error?.response?.data?.message || error?.message;
        toast(message || 'Unkown error!', { type: 'error' });
      },
    }
  );

  const { mutate: markAsPlayed } = useMutation(
    async (itemId: string) => {
      const item = data?.find((entry) => entry._id === itemId);
      if (!item) {
        throw new Error('Item not found!');
      }
      const { _id, ...rest } = item;
      const payload = { ...rest, isPlayed: true };
      await editPsGame(itemId, payload);
    },
    {
      onSuccess: () => {
        refetchList();
      },
      onError: (error?: any) => {
        const message = error?.response?.data?.message || error?.message;
        toast(message || 'Unkown error!', { type: 'error' });
      },
    }
  );

  const tableRows = useMemo(() => {
    if (!data) {
      return undefined;
    }
    const validItems = data
      .filter((item) => item.data.productRetrieve !== null)
      .filter((item) => !item.isOwned)
      .filter((item) => !item.isPlayed);
    const rowItems = validItems.map((item) => {
      const cta = item.data.productRetrieve?.webctas.find((webcta) => webcta.type === 'ADD_TO_CART');
      return {
        id: item._id,
        gameId: item.gameId,
        imageSrc: item.imageSrc,
        name: item.data.productRetrieve?.name || '-',
        originalPrice: cta?.price.basePrice || '-',
        discountPrice: cta?.price.discountedPrice || '-',
        discount: cta?.price.discountText || '-',
        validUntil: cta?.price.endTime
          ? DateTime.fromMillis(Number(cta.price.endTime)).toLocaleString(DateTime.DATETIME_SHORT)
          : '-',
      };
    });
    return rowItems.sort((a, b) => {
      const aDiscount = parseInt(a.discount);
      const bDiscount = parseInt(b.discount);
      if (isNaN(aDiscount)) {
        return 1;
      }
      if (isNaN(bDiscount)) {
        return -1;
      }
      return aDiscount - bDiscount;
    });
  }, [data]);

  const invalidRows = useMemo(() => data?.filter((item) => item.data.productRetrieve === null), [data]);

  const ownedRows = useMemo(
    () =>
      data
        ?.filter((item) => item.isOwned || item.isPlayed)
        .map((item) => ({
          id: item._id,
          gameId: item.gameId,
          imageSrc: item.imageSrc,
          name: item.data.productRetrieve?.name || '-',
          isPlayed: item.isPlayed,
        })),
    [data]
  );

  return (
    <Root>
      <TopBar>🤍 PlayStation Wishlist</TopBar>
      <Content>
        {isSessionValid() && (
          <Form>
            <FormRow>
              <StyledInput label="Game ID" disabled={isSaving} {...register('gameId')} />
              <StyledInput label="Name" disabled={isSaving} {...register('name')} />
            </FormRow>
            <FormRow>
              <StyledInput label="Image Link" disabled={isSaving} {...register('imageSrc')} />
            </FormRow>
            <Actions>
              <Button
                style={{ marginLeft: 16 }}
                variant="outlined"
                color="secondary"
                disabled={isSaving}
                onClick={() => resetForm()}
              >
                Clear
              </Button>
              <Button
                style={{ marginLeft: 16 }}
                variant="contained"
                color="primary"
                disabled={isSaving}
                onClick={handleSubmit((values) => mutate(values))}
              >
                Save
              </Button>
            </Actions>
          </Form>
        )}
        <TableContent>
          <TableTitle>Wishlist</TableTitle>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Original price</TableCell>
                <TableCell>Discount price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Valid until</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            {tableRows && (
              <TableBody>
                {tableRows.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.imageSrc ? <ItemImage src={item.imageSrc} /> : <ImagePlaceholder>N/A</ImagePlaceholder>}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.originalPrice}</TableCell>
                    <TableCell>{item.discountPrice}</TableCell>
                    <TableCell>
                      <InlineData>
                        {!isNaN(parseInt(item.discount)) && <Verified style={{ marginRight: 8 }} color="success" />}
                        {item.discount}
                      </InlineData>
                    </TableCell>
                    <TableCell>{item.validUntil}</TableCell>
                    <TableCell>
                      <IconRow>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() =>
                            window.open(
                              `https://store.playstation.com/fi-fi/product/${item.gameId}`,
                              '_blank',
                              'noopener noreferrer'
                            )
                          }
                        >
                          <OpenInNew />
                        </IconButton>
                        <IconButton color="warning" size="small" onClick={() => markAsOwned(item.id)}>
                          <AttachMoney />
                        </IconButton>
                      </IconRow>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </StyledTable>

          <TableTitle>Library</TableTitle>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            {ownedRows && (
              <TableBody>
                {ownedRows.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.imageSrc ? <ItemImage src={item.imageSrc} /> : <ImagePlaceholder>N/A</ImagePlaceholder>}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.isPlayed ? (
                        '-'
                      ) : (
                        <IconButton color="success" size="small" onClick={() => markAsPlayed(item.id)}>
                          <Done />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </StyledTable>

          {data && data.length === 0 && <NoData>No data to show</NoData>}
          {invalidRows && invalidRows.length > 0 && (
            <StyledAlert severity="warning">
              <AlertTitle>Failed to retrieve the following items:</AlertTitle>
              <ul>
                {invalidRows.map((item) => (
                  <li key={item._id}>{`${item.gameId}: ${item.name}`}</li>
                ))}
              </ul>
            </StyledAlert>
          )}
          {isLoading && <LinearProgress />}
        </TableContent>

        <TableTitle>PS3 Wishlist</TableTitle>
        {PS3list.map((item) => (
          <PS3Game key={item.name}>
            <ItemImage src={item.imageSrc} />
            <PS3GameName>{item.name}</PS3GameName>
          </PS3Game>
        ))}
      </Content>
    </Root>
  );
};

export default PlaystationView;
