import { useState } from "react";

import SidebarButton from "../../../Shared/components/ui/button/SidebarButton";
import SidebarSeparator from "../../../Shared/components/ui/SidebarSeparator";
import SidebarDropdown from "../../../Shared/components/ui/button/SidebarDropdown";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

interface Props {
  isMobileScreen: boolean;
  isNavbarOpen: boolean;
  updateNavbarStatus: () => void;
}

const Sidebar: React.FC<Props> = ({
  isMobileScreen,
  isNavbarOpen,
  updateNavbarStatus,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const updateActiveDropdown = (id: number | null) => {
    setActiveDropdown(id);
  };

  return (
    <>
      <nav
        className={`relative transition-sidebar duration-300 max-lg:absolute max-lg:bottom-0 max-lg:top-0 max-lg:z-40 ${!isMobileScreen && !isNavbarOpen ? "w-[3.25rem]" : "w-sidebar"} ${isMobileScreen && !isNavbarOpen && "max-lg:-translate-x-full"}`}
      >
        <div
          className={`group/separator transition-width h-full w-full overflow-y-auto overflow-x-hidden bg-accent-900 duration-300 ${!isMobileScreen && !isNavbarOpen && "hover:w-sidebar"}`}
        >
          <ul className="flex flex-col items-start pt-4">
            <SidebarSeparator
              text="MAIN"
              isMobileScreen={isMobileScreen}
              isNavbarOpen={isNavbarOpen}
            />
            <SidebarButton
              link="dashboard"
              Icon={DashboardOutlinedIcon}
              text="Dashboard"
            />

            <SidebarSeparator
              text="EMPLOYEES"
              isMobileScreen={isMobileScreen}
              isNavbarOpen={isNavbarOpen}
            />
            <SidebarButton
              link="employees"
              Icon={BadgeOutlinedIcon}
              text="All Employees"
            />
            <SidebarButton
              link="departments"
              Icon={MapsHomeWorkOutlinedIcon}
              text="Departments"
            />

            <SidebarSeparator
              text="FILES"
              isMobileScreen={isMobileScreen}
              isNavbarOpen={isNavbarOpen}
            />
            <SidebarDropdown
              Icon={FolderCopyOutlinedIcon}
              text="201 Files"
              id={1}
              updateActiveDropdown={updateActiveDropdown}
              activeId={activeDropdown}
              isMobileScreen={isMobileScreen}
              isNavbarOpen={isNavbarOpen}
              height="h-[32.25rem]"
              linkList={[
                { link: "employees", text: "Resume/CV" },
                { link: "departments", text: "Personal Data Sheet" },
                { link: "employees", text: "Transcript of Records" },
                { link: "departments", text: "Diploma" },
                { link: "employees", text: "Permit To Teach" },
                {
                  link: "departments",
                  text: "Certificates (Seminar/Training)",
                },
                {
                  link: "employees",
                  text: "Membership of Professional Organization",
                },
                {
                  link: "departments",
                  text: "Certificate of Community and Certificate of Research		",
                },
                {
                  link: "employees",
                  text: "Professional Licenses/CSC Eligibility",
                },
                { link: "departments", text: "Employment Contract" },
                {
                  link: "employees",
                  text: "PSA Birth Certificate/Marriage Contract",
                },
                { link: "departments", text: "Medical Requirements" },
              ]}
            />
            <SidebarDropdown
              Icon={DescriptionOutlinedIcon}
              text="Forms"
              id={2}
              updateActiveDropdown={updateActiveDropdown}
              activeId={activeDropdown}
              isMobileScreen={isMobileScreen}
              isNavbarOpen={isNavbarOpen}
              height="h-[4.75rem]"
              linkList={[
                { link: "employees", text: "Official Business Form" },
                { link: "departments", text: "Offset Form" },
              ]}
            />
          </ul>
        </div>
      </nav>

      {/* Mobile Black Screen */}
      {isMobileScreen && isNavbarOpen && (
        <div
          className="absolute z-30 h-full w-full bg-black opacity-50 lg:hidden"
          onClick={() => {
            updateNavbarStatus();
          }}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
