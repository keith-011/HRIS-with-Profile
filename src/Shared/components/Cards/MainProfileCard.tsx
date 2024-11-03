import React from "react";
import DefaultButton from "../ui/button/DefaultButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { SvgIconComponent } from "@mui/icons-material";
import ProfileNavigationButton from "./ProfileNavigationButton";

interface MainProfileProps {
  employeeImagePath: string;
  employmentStatus: string;
  leftContent: Array<{field1?: string;value1: string;largeText?: boolean;semibold?: boolean;}>;
  rightContent: Array<{ field2?: string; value2: string }>;
}

const profileDefaultSize = "text-xs";
const profileLargeSize = "text-2xl";
const profileDefaultTextColorStyle = "text-accent-600";
const profileSemiboldStyle = "text-accent-700 font-semibold";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-forest-200";
    case "Resigned":
      return "bg-red-600";
    case "For Approval":
      return "bg-yellow-500";
    case "Terminated":
      return "bg-gray-500";
    case "Retired":
      return "bg-blue-500";
    default:
      return "bg-gray-600";
  }
};

const MainProfile: React.FC<MainProfileProps> = ({
  employeeImagePath,
  leftContent,
  rightContent,
  employmentStatus,
}) => {
  return (
  <div className="rounded-sm bg-accent-50 shadow">
    <div className="flex flex-col p-6 md:flex-row">
      {/* Left Side Content */}
      <div className="flex flex-col md:w-1/2 md:flex-row">
        <div className="mb-4 flex-shrink-0 md:mr-4">
          <img
            src={employeeImagePath || "/src/assets/images/Avatar.png"}
            alt="Profile"
            className="mx-auto h-32 w-32 rounded-full"
          />
        </div>
        <div className="ml-4 flex flex-col text-center md:text-left">
          {leftContent.map((detail, index) => (
            <React.Fragment key={index}>
              <div>
                <span
                  className={`${detail.largeText ? profileLargeSize : profileDefaultSize} ${detail.semibold ? profileSemiboldStyle : profileDefaultTextColorStyle}`}
                >
                  {detail.field1}
                </span>
                <span
                  className={`${detail.largeText ? profileLargeSize : profileDefaultSize} ${detail.semibold ? profileSemiboldStyle : profileDefaultTextColorStyle}`}
                >
                  {detail.value1}
                </span>
              </div>
            </React.Fragment>
          ))}

          {/* Employee Status*/}
          <div className="mt-1 flex flex-col items-center gap-2 md:flex-row md:items-start">
            <span
              className={`${profileDefaultSize} ${profileDefaultTextColorStyle}`}
            >
              Employment Status
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`ml-2 h-2 w-2 rounded-full ${getStatusColor(employmentStatus)}`}
              ></span>
              <span className={`${profileDefaultSize} font-medium`}>
                {employmentStatus}
              </span>
              <button className="flex">
                <SettingsIcon style={{ fontSize: "12px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Separator*/}
      <div className="ml-6 mr-6 hidden border border-dashed border-accent-150 md:block"></div>
      <div className="mb-6 mt-6 block border-t border-dashed border-accent-150 md:hidden"></div>

      {/* Right Side Content */}
      <div className="flex flex-col md:w-1/2">
        <div className="grid grid-cols-2 gap-3">
          {rightContent.map((detail, index) => (
            <React.Fragment key={index}>
              <span className={`${profileDefaultSize} ${profileSemiboldStyle}`}>
                {detail.field2}
              </span>
              <span
                className={`${profileDefaultSize} ${profileDefaultTextColorStyle}`}
              >
                {detail.value2}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
    {/* Buttons */}
    <div className="flex p-2 pl-6 gap-6">
      <ProfileNavigationButton text="Profile"/>
      <ProfileNavigationButton text="Documents"/>
      <ProfileNavigationButton text="Employment History"/>
    </div>
  </div>
  );
};

export default MainProfile;
