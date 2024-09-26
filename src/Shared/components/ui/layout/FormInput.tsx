import { ReactNode } from "react";

interface Props {
  labelText: string;
  children: ReactNode;
}

const FormInput: React.FC<Props> = ({ labelText, children }) => {
  return (
    <div className="flex max-[576px]:flex-col max-[576px]:gap-1 min-[576px]:justify-between">
      <label className="w-1/3 text-accent-600">{labelText}</label>
      <div className="flex grow flex-col gap-1">{children}</div>
    </div>
  );
};

export default FormInput;
