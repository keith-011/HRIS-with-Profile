import { SvgIconComponent } from "@mui/icons-material";
import { twMerge } from "tailwind-merge";

interface Props {
  text: string;
  Icon?: SvgIconComponent;
  className?: string;
  handleClick: () => void;
}

const DefaultButton: React.FC<Props> = ({
  text,
  className,
  Icon,
  handleClick: onClick,
}) => {
  return (
    <>
      <button
        type="button"
        className={twMerge(
          "flex w-full justify-center gap-1 rounded bg-forest-800 px-3 py-2 font-medium text-accent-50 transition-colors hover:bg-forest-900",
          className,
        )}
        onClick={onClick}
      >
        {Icon && <Icon />}
        <span>{text}</span>
      </button>
    </>
  );
};

export default DefaultButton;
