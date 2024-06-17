export const getErrorMessage = (error: any) => {
  if (error.code) {
    switch (error.code) {
      case "auth/invalid-credential":
        return "유효하지 않은 아이디/비밀번호";
    }
  }
  return "unexpected error";
};
