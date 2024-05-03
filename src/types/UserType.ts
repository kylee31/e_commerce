import { User } from "firebase/auth";

export type UserInfo = {
    isSeller: boolean;
    nickname:string;
    name:string
    uid?:string
};

export type Token = User & {
    accessToken: string;
  };
  