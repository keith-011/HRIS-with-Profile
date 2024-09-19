import { NavLink, useNavigate } from "react-router-dom";

import PCCImage from "/PCC.jpg";
import PCCLogo from "/PCCLogo.png";

import LoginTextbox from "../../Shared/components/ui/textbox/LoginTextbox";
import DefaultButton from "../../Shared/components/ui/button/DefaultButton";

const Login = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("dashboard");
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#EBF4F5] to-[#B5C6E0] p-6">
        <div className="flex max-w-[686px] overflow-hidden rounded-lg bg-accent-50">
          <div className="w-1/2 max-lg:hidden">
            <img
              src={PCCImage}
              alt="pcc"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center p-6 lg:w-1/2">
            <img src={PCCLogo} alt="pcc_logo" className="w-[100px] pb-2" />

            <h2 className="pb-6 text-2xl font-medium">PCC - HRIS Module</h2>

            <LoginTextbox type="text" className="mb-7" />
            <LoginTextbox type="password" className="mb-4" />

            <NavLink
              to="forgot"
              className="mb-6 self-start text-sm hover:underline"
            >
              Forgot Password?
            </NavLink>

            <DefaultButton text="Sign In" handleClick={onLogin} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
