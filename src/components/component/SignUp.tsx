import { useState, ChangeEvent } from "react";
import Button from "./Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const Info: { [key: string]: string } = {
  name: "",
  email: "",
  password: "",
};

const INPUT_LIST: { label: string; type: string; value: string }[] = [
  { label: "이름", type: "text", value: "name" },
  { label: "이메일", type: "email", value: "email" },
  { label: "비밀번호", type: "password", value: "password" },
];

const SignUp = () => {
  const [inputValues, setInputValues] = useState(Info);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    e.preventDefault();
    //TODO: 이메일, 패스워드 양식 확인하기
    const newValue = e.target.value;
    const updatedValues = { ...inputValues, [value]: newValue };
    setInputValues(updatedValues);
    //console.log(updatedValues);
  };

  const handleSignUp = () => {
    const [newUserEmail, newUserPassword] = [
      inputValues["email"],
      inputValues["password"],
    ];
    createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword);
  };

  return (
    <div className="w-full">
      <div>
        <input type="checkbox" id="seller" />
        <span>판매자로 회원가입 하시겠습니까?</span>
      </div>
      <div className="h-full flex flex-col justify-center items-start">
        {INPUT_LIST.map((ele, idx) => {
          return (
            <div
              key={`signup_${idx}`}
              className="w-full flex flex-col items-start"
            >
              <span>{ele.label}</span>
              <input
                type={ele.type}
                id={`signup_${ele.label}`}
                placeholder={ele.value}
                value={inputValues[ele.value]}
                className="w-full border-gray-500 border rounded-sm"
                onChange={(e) => {
                  handleInputChange(e, ele.value);
                }}
              />
            </div>
          );
        })}
      </div>
      <Button text="회원가입" onClick={handleSignUp} />
    </div>
  );
};

export default SignUp;
