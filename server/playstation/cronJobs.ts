import { ObjectId } from 'mongodb';
import cron from 'node-cron';
import { WishlistItem } from '../../types/playstation';
import { User } from '../../types/root';

import { database } from '../database';
import { USERS } from '../root/collections';
import { PLAYSTATION_WISHLIST } from './collections';

export const init = () => {
  cron.schedule(
    // '5 2 * * *',
    '49 21 * * *',
    async () => {
      const now = new Date();
      console.log(`Updating all wishlist items at ${now.toLocaleString()}`);

      const wishlistCol = database.collection<WishlistItem>(PLAYSTATION_WISHLIST);
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

      console.log(wishlistItemsPerUser);
    },
    {
      scheduled: true,
      timezone: 'Europe/Helsinki',
    }
  );
};
