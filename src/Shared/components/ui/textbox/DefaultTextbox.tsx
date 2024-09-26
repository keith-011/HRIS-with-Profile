import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  maxLength: number;
  register: UseFormRegisterReturn;
  placeholder: string;
}

const DefaultTextbox: React.FC<Props> = ({
  maxLength,
  register,
  placeholder,
}) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        maxLength={maxLength}
        {...register}
        className="rounded bg-accent-50 px-3 py-4 outline outline-1 outline-accent-200 focus:outline-accent-400"
      />
    </>
  );
};

export default DefaultTextbox;
