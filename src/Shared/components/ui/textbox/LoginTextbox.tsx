import { twMerge } from "tailwind-merge";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

interface Props {
  type: "text" | "password";
  className?: string;
}

const LoginTextbox: React.FC<Props> = ({ type, className }) => {
  return (
    <>
      <div
        className={twMerge(
          "flex w-full rounded outline outline-1 outline-accent-200 focus-within:outline-accent-400",
          className,
        )}
      >
        <div className="flex items-center justify-center bg-accent-200 p-2">
          {type === "text" && <EmailIcon className="text-accent-900" />}
          {type === "password" && <LockIcon className="text-accent-900" />}
        </div>

        {type === "text" && (
          <input
            type="text"
            placeholder="Employee Number"
            maxLength={50}
            className="w-full bg-inherit px-3 text-sm focus:outline-none"
          />
        )}

        {type === "password" && (
          <input
            type="password"
            placeholder="Password"
            maxLength={50}
            className="w-full bg-inherit px-3 text-xl focus:outline-none"
          />
        )}
      </div>
    </>
  );
};

export default LoginTextbox;
