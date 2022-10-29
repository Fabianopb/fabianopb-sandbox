import axios from 'axios';
import { Router } from 'express';

const agent = axios.create({ baseURL: 'https://web.np.playstation.com/api/graphql/v1//op' });
agent.defaults.headers.get['x-psn-store-locale-override'] = 'en-FI';

const psStoreRouter = Router();

psStoreRouter.get('/ps-store/:gameId', async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const requestParams = {
      operationName: 'queryRetrieveTelemetryDataPDPProduct',
      variables: { conceptId: null, productId: gameId },
      extensions: {
        persistedQuery: { version: 1, sha256Hash: process.env.PLAYSTATION_HASH },
      },
    };
    const resource = await agent.get('', { params: requestParams });
    return res.status(200).json(resource.data);
  } catch (error) {
    next(error);
  }
});

export default psStoreRouter;
