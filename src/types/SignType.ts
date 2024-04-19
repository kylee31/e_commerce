export type AccountInputs = {
    email: string;
    password: string;
    register: object;
  };

  
export type SignUpInputs = AccountInputs&{
    isSeller: boolean;
    nickname:string;
    name: string;
  };

export type AccountInputList={
    label: string;
    type: string;
    value: "email" | "password";
    register: object;
  }

export type SignUpInputList={
    label: string;
    type: string;
    value: "name" | "nickname"|"email" | "password";
    register: object;
  }

