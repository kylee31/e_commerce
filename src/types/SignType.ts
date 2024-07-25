export type AccountInputsType = {
  email: string;
  password: string;
  register?: object;
};

export type SignUpInputsType = AccountInputsType & {
  isSeller: boolean;
  nickname: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type AccountInputListType = {
  label: string;
  type: string;
  value: "email" | "password";
  register: object;
};

export type SignUpInputListType = {
  label: string;
  type: string;
  value: "name" | "nickname" | "email" | "password";
  register: object;
};

//Discriminated Unions
//type guard
