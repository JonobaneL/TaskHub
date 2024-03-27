import "./App.css";
import Header from "./components/Header";
import TestPage from "./pages/TestPage";
import HubRoutes from "./routes/Routes";

function App() {
  return (
    <div>
      <Header />
      <HubRoutes />
    </div>
  );
}

export default App;
