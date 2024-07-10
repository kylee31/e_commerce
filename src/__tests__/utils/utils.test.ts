import calcTotalPrice from "@/util/calcTotalPrice";
import changePathname from "@/util/changePathname";
import convertKRW from "@/util/convertKRW";
import sumTotalCartProductCount from "@/util/sumTotalCartProductCount";
import { expect, test } from "vitest";

//testing util function

test("convert number to KRW", () => {
  expect(convertKRW(1000)).toBe("1,000");
});

test("calculate total price", () => {
  expect(
    calcTotalPrice([{ productPrice: 2000 }, { productPrice: 2000 }], [2, 3])
  ).toBe(10000);
});

test("change path name", () => {
  expect(changePathname("https://e-commerce-f517b.web.app/seller/홈리빙")).toBe(
    "홈리빙 | Logo"
  );
  expect(
    changePathname("https://e-commerce-f517b.web.app/seller/update-product")
  ).toBe("update-product | Logo");
  expect(
    changePathname("https://e-commerce-f517b.web.app/seller/edit-product")
  ).toBe("edit-product | Logo");
});

test("sum total cart product count", () => {
  expect(sumTotalCartProductCount([2, 3])).toBe(5);
});
