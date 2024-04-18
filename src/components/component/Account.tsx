import { useState, ChangeEvent } from "react";
import Button from "./Button";

const Info: { [key: string]: string } = {
  email: "",
  password: "",
};

const INPUT_LIST: { label: string; type: string; value: string }[] = [
  { label: "이메일", type: "email", value: "email" },
  { label: "비밀번호", type: "password", value: "password" },
];

const Account = () => {
  const [inputValues, setInputValues] = useState(Info);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    e.preventDefault();
    const newValue = e.target.value;
    const updatedValues = { ...inputValues, [value]: newValue };
    setInputValues(updatedValues);
    //console.log(inputValues);
  };

  return (
    <div className="w-full">
      <div className="h-full flex flex-col justify-center items-start">
        {INPUT_LIST.map((ele, idx) => {
          return (
            <div
              key={`account_${idx}`}
              className="w-full flex flex-col items-start"
            >
              <span>{ele.label}</span>
              <input
                type={ele.type}
                id={`account_${ele.value}`}
                placeholder={ele.value}
                onChange={(e) => handleInputChange(e, ele.value)}
                className="w-full border-gray-500 border rounded-sm"
              />
            </div>
          );
        })}
      </div>
      <Button text="로그인" onClick={() => {}} />
      <hr />
      {/*TODO: 소셜 로그인 구현하기*/}
    </div>
  );
};
export default Account;
