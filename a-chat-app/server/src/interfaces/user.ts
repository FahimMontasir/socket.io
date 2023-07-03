export enum USER_ROLE {
  BUYER = 'buyer',
  SELLER = 'seller',
}

export type DecodedUser = {
  userId: string;
  mail: string;
};
