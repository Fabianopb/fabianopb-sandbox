import { colors } from '@mui/material';
import styled from 'styled-components';

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

const TableTitle = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: ${colors.deepPurple[600]};
`;

const ItemImage = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 4px;
  object-fit: cover;
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
  return (
    <Root>
      <TopBar>🤍 PlayStation Wishlist</TopBar>
      <Content>
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
