import Button from "@/components/common/Button";

const AddProduct = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-2/3 flex">
        <div className="w-1/2 h-full p-3 border-2">이미지 입력</div>
        <div className="w-1/2 h-full p-3 border-2">정보 입력</div>
      </div>
      <div className="w-full h-1/3 flex justify-center items-center border-2">
        설명
      </div>
      <Button text="등록" type="button" />
    </div>
  );
};

export default AddProduct;
