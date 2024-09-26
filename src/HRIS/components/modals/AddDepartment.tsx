import { useForm } from "react-hook-form";
import FormInput from "../../../Shared/components/ui/layout/FormInput";
import DefaultTextbox from "../../../Shared/components/ui/textbox/DefaultTextbox";
import { modalFormId } from "../../../utils/Globals";
import DefaultDropdown from "../../../Shared/components/ui/dropdown/DefaultDropdown";

const AddDepartment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { department: null, department_head: "None" } });

  const onFormSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <form
        id={modalFormId}
        className="flex flex-col gap-6 px-6 py-8"
        onSubmit={onFormSubmit}
      >
        <FormInput labelText="Department">
          <DefaultTextbox
            placeholder="Enter department name"
            maxLength={50}
            register={register("department", {
              required: "Department name is required!",
            })}
          />
          <span className="text-red-400">
            {errors.department && errors.department.message}
          </span>
        </FormInput>

        <FormInput labelText="Department Head">
          <DefaultDropdown register={register("department_head")} />
        </FormInput>
      </form>
    </>
  );
};

export default AddDepartment;
