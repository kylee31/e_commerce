import { Mock, expect, test, vi } from "vitest";
import { signInUser } from "@/services/loginService";
import * as firebaseAuth from "firebase/auth";
import { auth } from "@/firebase";

//mock function 설정
vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  getAuth: vi.fn(),
}));

//성공 시나리오
test("should allow user to login with valid credentials", async () => {
  const mockEmail = "seller@email.com";
  const mockPassword = "vksaowk2024^^!";

  //type지정
  const signInWithEmailAndPasswordMock =
    firebaseAuth.signInWithEmailAndPassword as Mock;

  //mockResolvedValueOnce, 모킹된 함수가 특정 호출에서 반환할 값을 설정하는 메소드(특정 호출에서 Promise가 resolve될 값 설정)
  signInWithEmailAndPasswordMock.mockResolvedValueOnce({
    user: { email: mockEmail },
  });

  await signInUser({ email: mockEmail, password: mockPassword });

  //toHaveBeenCalledWith, 모킹된 함수가 호출될 때 사용된 인수를 확인하는 메소드(함수가 예상된 인수로 호출되었는지 검증)
  expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
    auth,
    mockEmail,
    mockPassword
  );
});

//실패 시나리오
test("should handle login failure", async () => {
  const mockEmail = "seller@email.com";
  const mockPassword = "vksaowk2024^^!";

  const signInWithEmailAndPasswordMock =
    firebaseAuth.signInWithEmailAndPassword as Mock;
  signInWithEmailAndPasswordMock.mockRejectedValueOnce(
    new Error("Invalid credentials")
  );

  await expect(
    signInUser({ email: mockEmail, password: mockPassword })
  ).rejects.toThrow("Invalid credentials");

  expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
    auth,
    mockEmail,
    mockPassword
  );
});
