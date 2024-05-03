import { AccountInputListType, SignUpInputListType } from "@/types/SignType";

export const AccountInputData: AccountInputListType[] = [
  {
    label: "이메일",
    type: "email",
    value: "email",
    register: {
      required: { value: true, message: "이메일을 입력해주세요." },
      pattern: {
        value: /^\S+@\S+$/i,
        message: "이메일 형식이 올바르지 않습니다.",
      },
    },
  },
  {
    label: "비밀번호",
    type: "password",
    value: "password",
    register: {
      required: { value: true, message: "패스워드를 입력해주세요." },
      minLength: {
        value: 10,
        message: "패스워드를 10자 이상 입력해주세요.",
      },
    },
  },
];

export const SignUpInputData: SignUpInputListType[] = [
  {
    label: "이름",
    type: "text",
    value: "name",
    register: {
      required: { value: true, message: "이름을 입력해주세요." },
      minLength: {
        value: 2,
        message: "이름을 정확히 입력해주세요.",
      },
    },
  },
  {
    label: "아이디(닉네임)",
    type: "text",
    value: "nickname",
    register: {
      required: { value: true, message: "닉네임을 입력해주세요." },
      minLength: {
        value: 2,
        message: "닉네임을 2글자 이상 입력해주세요.",
      },
    },
  },
  {
    label: "이메일",
    type: "email",
    value: "email",
    register: {
      required: { value: true, message: "이메일을 입력해주세요." },
      pattern: {
        value: /^\S+@\S+$/i,
        message: "이메일 형식이 올바르지 않습니다.",
      },
    },
  },
  {
    label: "비밀번호",
    type: "password",
    value: "password",
    register: {
      required: { value: true, message: "패스워드를 입력해주세요." },
      minLength: {
        value: 10,
        message: "패스워드를 10자 이상 입력해주세요.",
      },
      pattern: {
        //적어도 하나의 특수 문자를 포함하는지, 영문 대소문자, 숫자, 특수 문자 중에서 선택하는지
        value: /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^*]+$/i,
        message: "특수문자(!,@,#,$,%,^,*)를 1개 이상 포함해주세요",
      },
    },
  },
];
