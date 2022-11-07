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
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { addPs4Game, getPs4Games } from '../apis/playstation';
import { isSessionValid } from '../common/session';

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

const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

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

  const tableRows = useMemo(() => {
    if (!data) {
      return undefined;
    }
    const validItems = data.filter((item) => item.data.productRetrieve !== null);
    return validItems.map((item) => {
      const cta = item.data.productRetrieve?.webctas.find((webcta) => webcta.type === 'ADD_TO_CART');
      return {
        id: item._id,
        name: item.data.productRetrieve?.name || '',
        originalPrice: cta?.price.basePrice || '',
        discountPrice: cta?.price.discountedPrice || '',
        discount: cta?.price.discountText || '',
        validUntil: cta?.price.endTime
          ? DateTime.fromMillis(Number(cta.price.endTime)).toLocaleString(DateTime.DATETIME_SHORT)
          : '-',
      };
    });
  }, [data]);

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Original price</TableCell>
              <TableCell>Discount price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Valid until</TableCell>
            </TableRow>
          </TableHead>
          {tableRows && (
            <TableBody>
              {tableRows.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.originalPrice}</TableCell>
                  <TableCell>{item.discountPrice}</TableCell>
                  <TableCell>{item.discount}</TableCell>
                  <TableCell>{item.validUntil}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {isLoading && <LinearProgress />}
      </Content>
    </Root>
  );
};

export default PlaystationView;
