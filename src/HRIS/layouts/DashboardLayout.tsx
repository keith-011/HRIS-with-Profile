import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/content/Header";
import Sidebar from "../components/content/Sidebar";

const DashboardLayout: React.FC = () => {
  const [isMobile, isMobileScreen] = useState<boolean>(true);
  const [navbarStatus, setNavbarStatus] = useState<boolean>(false);

  const updateNavbarStatus = () => {
    setNavbarStatus(!navbarStatus);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleScreenChange = () => {
      if (!mediaQuery.matches) {
        isMobileScreen(true);
        setNavbarStatus(false);
      } else {
        isMobileScreen(false);
        setNavbarStatus(true);
      }
    };

    handleScreenChange();

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return (
    <>
      <div className="flex h-screen flex-col bg-accent-100">
        <Header updateNavbarStatus={updateNavbarStatus} />
        <div className="relative flex h-full overflow-hidden">
          <Sidebar
            isMobileScreen={isMobile}
            isNavbarOpen={navbarStatus}
            updateNavbarStatus={updateNavbarStatus}
          />
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
