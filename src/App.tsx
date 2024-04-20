import "./styles/App.css";
import PageRouter from "./routes/PageRouter";
import { UserProvider } from "./services/UserProvider";
import { SellerProductProvider } from "./services/SellerProductProvider";

function App() {
  return (
    <SellerProductProvider>
      <UserProvider>
        <PageRouter />
      </UserProvider>
    </SellerProductProvider>
  );
}

export default App;
