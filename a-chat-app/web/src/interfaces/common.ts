export type IUser = {
  _id: string;
  token: string;
  mail: string;
  username: string;
  password: string;
  friends?: string[];
};
