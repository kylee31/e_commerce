import { OrderFormType } from "@/types/CartType";

export const OrderFormInputData:OrderFormType[]=[
    {
        type:"text",
        label:"이름",
        value:"buyerName",
        placeholder:"이경연",
        register:{
            required:{value:true,message:"이름을 입력해주세요"}
        }
    },{
        type:"text",
        label:"연락처",
        value:"buyerPhoneNumber",
        placeholder:"010-1234-5678",
        register:{ 
            required:{value:true,message:"연락처를 입력해주세요"},
            pattern: {
                value: /^\d{3}-\d{4}-\d{4}$/i,
                message: "연락처 형식을 지켜주세요",
            },
        }
    },{
        type:"text",
        label:"이메일",
        value:"buyerEmail",
        placeholder:"email@example.com",
        register:{ 
            required:{value:true,message:"이메일을 입력해주세요"},
            pattern: {
                value: /^\S+@\S+$/i,
                message: "이메일 형식을 지켜주세요",
            },
        }
    },{
        type:"text",
        label:"수령인",
        value:"receiverName",
        placeholder:"이경연",
        register:{
            required:{value:true,message:"수령인 이름을 입력해주세요"}
        }
    },{
        type:"text",
        label:"연락처",
        value:"receiverPhoneNumber",
        placeholder:"010-1234-5678",
        register:{
            required:{value:true,message:"수령인 연락처를 입력해주세요"},
            pattern: {
                value: /^\d{3}-\d{4}-\d{4}$/i,
                message: "연락처 형식을 지켜주세요",
            },
        }
    },{
        type:"text",
        label:"배송지",
        value:"address",
        placeholder:"경기도 고양시 일산서구 ooo oooo",
        register:{
            required:{value:true,message:"배송지를 입력해주세요"}
        }
    }
]