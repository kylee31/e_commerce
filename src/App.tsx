import "./styles/App.css";
import PageRouter from "./routes/PageRouter";
import { UserProvider } from "./services/context/UserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <PageRouter />
        <ReactQueryDevtools />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
