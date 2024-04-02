import { useEffect } from "react";
import "./App.css";
import { useTypeDispatch } from "./hooks/useReduxHooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { fetchUserInfo } from "./store/reducers/userSlice";
import HubRoutes from "./routes/Routes.tsx";

function App() {
  const dispatch = useTypeDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(fetchUserInfo(user?.uid || null));
    });
    return unsubscribe;
  }, []);
  return (
    <div>
      <HubRoutes />
    </div>
  );
}

export default App;
