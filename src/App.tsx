import "./styles/App.css";
import PageRouter from "./routes/PageRouter";
import { UserProvider } from "./services/UserProvider";

function App() {
  return (
    <UserProvider>
      <PageRouter />
    </UserProvider>
  );
}

export default App;
