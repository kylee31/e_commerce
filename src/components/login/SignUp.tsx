import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignUpInputListType, SignUpInputsType } from "@/types/SignType";
import { SignUpInputData } from "@/services/data/SignData";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { signUpUser } from "@/services/loginService";

const INPUT_LIST = SignUpInputData;

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpInputsType>();
  const [checkedBox, setCheckedBox] = useState(false);
  const navigate = useNavigate();

  const handleCheckedBox = () => {
    checkedBox ? setCheckedBox(false) : setCheckedBox(true);
  };

  const onSubmit: SubmitHandler<SignUpInputsType> = async (data) => {
    try {
      await signUpUser(data, checkedBox);
      navigate("/");
    } catch (error) {
      alert("error");
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <form className="mb-16" onSubmit={handleSubmit(onSubmit)}>
        {INPUT_LIST.map((ele: SignUpInputListType, idx) => (
          <div
            key={`signup_${idx}`}
            className="w-full flex flex-col items-start mb-3"
          >
            <Label className="mb-2">{ele.label}</Label>
            <Input
              type={ele.type}
              placeholder={ele.value}
              autoComplete="off"
              className="w-full border-gray-500 border rounded-sm"
              {...register(ele.value, ele.register)}
            />
            {errors[ele.value] && (
              <div className="text-red-400 text-xs  mt-1">
                {errors[ele.value]?.message}
              </div>
            )}
          </div>
        ))}
        <div className="items-top justify-center flex">
          <Checkbox
            className="mr-1"
            id="isSeller"
            checked={checkedBox}
            onCheckedChange={handleCheckedBox}
          />
          <Label htmlFor="isSeller">판매자로 회원가입 하시겠습니까?</Label>
        </div>
        <div className="mt-5">
          <Button className="w-full" type="submit">
            회원가입하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
