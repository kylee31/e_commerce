import { useState, ChangeEvent } from "react";

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
    const newValue = e.target.value;
    const updatedValues = { ...inputValues, [value]: newValue };
    setInputValues(updatedValues);
    //console.log(updatedValues);
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
      <button type="button" className="bg-black text-white rounded-md">
        회원가입
      </button>
    </div>
  );
};

export default SignUp;
