export type ProductInputList={
    label: string;
    type: string;
    value: "price" | "category" | "name";
  }

  export type productInputs = {
    name: string;
    price:number;
    category:string;
    count:number;
    description:string;
    imgs:object;
    uid:string;
  };