import { User } from "firebase/auth";

export type UserInfoType = {
  isSeller: boolean;
  nickname: string;
  name: string;
  uid?: string;
};

export type TokenType = User & {
  accessToken: string;
};
