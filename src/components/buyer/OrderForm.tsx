import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import CartTable from "@/components/cart/CartTable";
import { OrderFormInputData } from "@/services/data/OrderData";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

const INPUT_LIST = OrderFormInputData;

const OrderForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onPaymentSubmit = async () => {
    setIsModalOpen(true);
    //정보 따로 저장? state로 저장해서 상품 결제 시 함께 저장?
    //zustand에 따로 전역적으로 저장하고 modal 컴포넌트에서 사용?
  };

  return (
    <>
      <div className="flex">
        <div className="w-2/3 pr-7">
          <form id="orderForm" onSubmit={handleSubmit(onPaymentSubmit)}>
            <div>
              <div className="text-lg font-extrabold flex flex-col items-start mb-2">
                1. 주문자 정보
              </div>
              <div className="w-full">
                {INPUT_LIST.slice(0, 2).map((ele, idx) => (
                  <div key={`orderFormInputData_${idx}`}>
                    <Label className="flex justify-start items-center">
                      {ele.label}
                    </Label>
                    <Input
                      type={ele.type}
                      placeholder={ele.placeholder}
                      className="w-full border-gray-500 border rounded-sm"
                      {...register(ele.value, ele.register)}
                    />
                    {errors[ele.value] && (
                      <div className="text-red-400 text-xs mt-1">
                        {errors[ele.value]?.message?.toString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <div className="text-lg font-extrabold flex flex-col items-start mb-2">
                2. 배송지 정보
              </div>
              <div className="w-full">
                {INPUT_LIST.slice(2).map((ele, idx) => (
                  <div key={`orderFormInputData_${idx}`}>
                    <Label className="flex justify-start items-center">
                      {ele.label}
                    </Label>
                    <Input
                      type={ele.type}
                      placeholder={ele.placeholder}
                      className="w-full border-gray-500 border rounded-sm"
                      {...register(ele.value, ele.register)}
                    />
                    {errors[ele.value] && (
                      <div className="text-red-400 text-xs mt-1">
                        {errors[ele.value]?.message?.toString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/3 flex flex-col items-start">
          <div className="w-full text-lg font-extrabold flex justify-start">
            3. 상품 리스트
          </div>
          <CartTable
            isEditPossible={false}
            className="border-gray-500 border mt-5"
          />
        </div>
      </div>
      <Button type="submit" className="w-full mt-6" form="orderForm">
        결제하기
      </Button>
    </>
  );
};

export default OrderForm;
