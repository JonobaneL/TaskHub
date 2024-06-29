import { useEffect } from "react";
import "./App.css";
import { useTypeDispatch } from "./hooks/useReduxHooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import HubRoutes from "./routes/Routes.tsx";
import { fetchUserInfo } from "./store/thunks/userThunks.ts";

function App() {
  const dispatch = useTypeDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user?.uid);
      dispatch(fetchUserInfo(user?.uid));
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
