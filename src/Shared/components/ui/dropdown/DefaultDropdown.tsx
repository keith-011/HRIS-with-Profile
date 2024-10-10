import { UseFormRegisterReturn } from "react-hook-form";
import { SelectIdDescription } from "../../../../utils/Globals";

interface Props {
  register: UseFormRegisterReturn;
  data: SelectIdDescription[];
}
const DefaultDropdown: React.FC<Props> = ({ register, data }) => {
  return (
    <>
      {/* TO DO */}
      <select
        {...register}
        className="text-ellipsis rounded border border-accent-200 bg-accent-50 px-3 py-4 outline-accent-200 focus:outline-accent-400"
      >
        <option value={"none"}>None</option>
        {data.length > 0 &&
          data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.description}
            </option>
          ))}
      </select>
    </>
  );
};

export default DefaultDropdown;
