const changePathname = (pathname: string) => {
  const path = pathname.split("/");
  const idx = path.length - 1;
  const decodingPathName = decodeURI(path[idx]);

  if (path[2] === "edit-product") {
    return "edit-product";
  }
  if (path[2] === "update-product") {
    return "update-product";
  }

  const locName = decodingPathName == "" ? "home" : decodingPathName;
  document.title = `${locName} | Logo`;
};

export default changePathname;
