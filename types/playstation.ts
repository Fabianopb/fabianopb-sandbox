export type GameData = {
  productRetrieve: {
    // __typename: string;
    // concept: {
    //   __typename: string;
    //   id: string;
    // };
    id: string;
    // isInWishlist: boolean;
    // isWishlistable: boolean;
    name: string;
    // skus: {
    //   __typename: string;
    //   id: string;
    //   name: string;
    // }[];
    webctas: {
      // __typename: string;
      // action: {
      //   __typename: string;
      //   param: {
      //     __typename: string;
      //     name: string;
      //     value: string;
      //   }[];
      //   type: string;
      // };
      // hasLinkedConsole: boolean;
      // meta: {
      //   __typename: string;
      //   exclusive: boolean;
      //   ineligibilityReasons: {
      //     __typename: string;
      //     names: string[];
      //     type: string;
      //   }[];
      //   playabilityDate: null;
      //   upSellService: string;
      // };
      type: string;
      price: {
        // __typename: string;
        // applicability: string;
        basePrice: string;
        basePriceValue: number;
        // campaignId: string;
        currencyCode: string;
        discountText?: string;
        discountedPrice?: string;
        discountedValue?: number;
        endTime?: string;
        // isExclusive: boolean;
        // isFree: boolean;
        // isTiedToSubscription: boolean;
        // qualifications: {
        //   __typename: string;
        //   type: string;
        //   value: string;
        // }[];
        // rewardId: string;
        // serviceBranding: string[];
        // upsellText: string;
      };
    }[];
  } | null;
};

export type WishlistItem = {
  _id: string;
  gameId: string;
  userId: string;
  name: string;
  data: GameData;
  updatedAt: number;
  imageSrc?: string;
};
