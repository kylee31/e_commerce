import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const preventGoBack = () => {
      //pushState(state, unused(원래는 title), url)
      history.pushState(null, "", location.href);
    };
    preventGoBack();
    window.addEventListener("popstate", preventGoBack);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {
        //TODO: 상품 카테고리, 상세 상품 보여주기
        "홈 화면"
      }
    </div>
  );
};

export default Home;
