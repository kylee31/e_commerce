import Layout from "@/layouts/Layout";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    //컴포넌트가 처음 마운트될 때 뒤로가기 이벤트를 감지하고 이를 방지하는 함수를 등록
    const preventGoBack = () => {
      //pushState(state, unused(원래는 title), url)
      history.pushState(null, "", location.href);
    };
    preventGoBack();
    window.addEventListener("popstate", preventGoBack);
  }, []);

  return (
    <Layout>
      <div className="w-full h-full flex justify-center items-center">
        {"홈 화면"}
      </div>
    </Layout>
  );
};

export default Home;
