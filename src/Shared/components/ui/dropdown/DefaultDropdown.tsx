import { UseFormRegisterReturn } from "react-hook-form";

import Avatar1 from "/src/assets/images/Avatar.png";

interface Props {
  register: UseFormRegisterReturn;
}
const DefaultDropdown: React.FC<Props> = ({ register }) => {
  return (
    <>
      {/* TO DO */}
      <select
        {...register}
        className="rounded bg-accent-50 px-3 py-4 outline outline-1 outline-accent-200 focus:outline-accent-400"
      >
        <option value={"None"}>None</option>
        <option value={"samp"}>Isaac Delon</option>
        <option value={"samp2"}>Emilie Candor</option>
      </select>
    </>
  );
};

export default DefaultDropdown;
