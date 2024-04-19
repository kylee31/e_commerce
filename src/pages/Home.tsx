import Layout from "@/layouts/Layout";
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
      // cleanup 함수 내에서 이벤트 리스너 제거
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <Layout>
      <div className="w-full h-full flex justify-center items-center">
        {
          //TODO: 상품 카테고리, 상세 상품 보여주기
          "홈 화면"
        }
      </div>
    </Layout>
  );
};

export default Home;
