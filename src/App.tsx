import "./styles/App.css";
import PageRouter from "./routes/PageRouter";
import { UserProvider } from "./services/UserProvider";
import { SellerProductProvider } from "./services/SellerProductProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SellerProductProvider>
        <UserProvider>
          <PageRouter />
          <ReactQueryDevtools />
        </UserProvider>
      </SellerProductProvider>
    </QueryClientProvider>
  );
}

export default App;
