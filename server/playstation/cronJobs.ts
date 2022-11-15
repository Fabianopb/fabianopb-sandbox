import { ObjectId } from 'mongodb';
import cron from 'node-cron';
import { WishlistItem } from '../../types/playstation';
import { User } from '../../types/root';

import { database } from '../database';
import { USERS } from '../root/collections';
import { PLAYSTATION_WISHLIST } from './collections';
import { agent, getPsStoreRequestParams } from './utils';

export const init = () => {
  cron.schedule(
    // '5 2 * * *',
    '02 22 * * *',
    async () => {
      const now = new Date();
      console.log(`Updating all wishlist items at ${now.toLocaleString()}`);

      const wishlistCol = database.collection<Omit<WishlistItem, '_id'>>(PLAYSTATION_WISHLIST);
      const wishlistCursor = wishlistCol.find({
        'data.productRetrieve.webctas': {
          $elemMatch: {
            type: 'ADD_TO_CART',
            $or: [
              {
                'price.endTime': null,
              },
              {
                'price.endTime': { $lt: now.valueOf().toString() },
              },
            ],
          },
        },
      });
      const wishlistItems = await wishlistCursor.toArray();

      const usersCol = database.collection<User>(USERS);
      const usersCursor = usersCol.find({ roles: 'playstation_user' });
      const users = await usersCursor.toArray();

      const wishlistItemsPerUser = users.map((user) => ({
        user,
        items: wishlistItems.filter((item) => new ObjectId(item.userId).equals(user._id)),
      }));

      for (const { user, items } of wishlistItemsPerUser) {
        console.log(`Updating ${items.length} items for user ${user._id}...`);
        for (const item of items) {
          if (user.psStoreHash) {
            const requestParams = getPsStoreRequestParams(item.gameId, user.psStoreHash);
            const resource = await agent.get('', { params: requestParams });
            const replaceDocument = {
              ...item,
              data: resource.data.data,
              updatedAt: new Date().valueOf(),
            };
            const result = await wishlistCol.replaceOne({ _id: new ObjectId(replaceDocument._id) }, replaceDocument);
            if (result.matchedCount === 0) {
              console.log(`Error: Wishlist item '${replaceDocument._id}' not found!`);
            } else {
              console.log(`Update successful for '${replaceDocument._id}'!`);
            }
          } else {
            console.log(`Error while updating user '${user._id}' wishlist! No PS Store Hash found!`);
          }
        }
      }
    },
    {
      scheduled: true,
      timezone: 'Europe/Helsinki',
    }
  );
};
