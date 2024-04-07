import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const PageWrapper = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="px-9 py-6 flex-1 ">
        <Outlet />
      </main>
      <footer className="px-9 py-6 border-t shadow-footer">
        All rights reserved
      </footer>
    </div>
  );
};

export default PageWrapper;
