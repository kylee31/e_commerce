import { expect, test } from "vitest";

test("should allow user to login with valid credentials", async () => {
  const response = await fetch("https://e-commerce-f517b.web.app/login", {
    method: "POST",
    body: JSON.stringify({
      email: "seller@email.com",
      password: "vksaowk2024^^!",
    }),
  });
  expect(response.status).toBe(200);
});
