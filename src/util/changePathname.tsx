import { ProductCategory } from "@/services/data/ProductData";

const changePathname = (pathname: string) => {
  const path = pathname.split("/");
  const idx = path.length - 1;
  const decodingPathName = decodeURI(path[idx]);
  let locName = decodingPathName == "" ? "home" : decodingPathName;

  if (path[2] === "edit-product") {
    locName = "edit-product";
  }
  if (path[2] === "update-product") {
    locName = "update-product";
  }
  if (ProductCategory.includes(decodeURI(path[2]))) {
    locName = decodeURI(path[2]);
  }

  document.title = `${locName} | Logo`;
};

export default changePathname;
