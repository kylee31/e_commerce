export type ProductInputList={
    label: string;
    type: string;
    value: "productPrice" | "productCategory" | "productName";
  }

  export type productInputs = {
    id?:string;
    sellerId?:string;
    productName: string;
    productPrice:number;
    productQunatity:number;
    productDescription:string;
    productCategory:string;
    productImages:string[];
    createdAt?:object;
    updatedAt:object;
  };

