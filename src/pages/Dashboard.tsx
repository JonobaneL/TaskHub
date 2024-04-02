import Header from "@/components/Header";
import { auth } from "@/firebase";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { fetchUserInfo } from "@/store/reducers/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  // const dispatch = useTypeDispatch();
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     console.log(auth);
  //     dispatch(fetchUserInfo(user?.uid || null));
  //   });
  //   return unsubscribe;
  // }, []);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Dashboard;
