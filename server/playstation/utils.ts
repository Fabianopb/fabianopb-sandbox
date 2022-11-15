import axios from 'axios';

export const agent = axios.create({ baseURL: 'https://web.np.playstation.com/api/graphql/v1//op' });
agent.defaults.headers.get['x-psn-store-locale-override'] = 'en-FI';

export const getPsStoreRequestParams = (gameId: string, sha256Hash: string) => ({
  operationName: 'productRetrieveForCtasWithPrice',
  variables: { conceptId: null, productId: gameId },
  extensions: {
    persistedQuery: { version: 1, sha256Hash },
  },
});
