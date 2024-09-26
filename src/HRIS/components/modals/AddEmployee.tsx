import { useForm } from "react-hook-form";
import { modalFormId } from "../../../utils/Globals";
import { useRef } from "react";

type FormCategories =
  | "personal"
  | "contact"
  | "employment"
  | "education"
  | "government"
  | "documents";

const AddEmployee = () => {
  const asd = [
    "Personal Information",
    "Address & Contact Information",
    "Employment Details",
    "Educational Attainment",
    "Government Numbers",
    "Documents",
  ];

  const activeButton = useRef<FormCategories>("personal");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const onFormSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <form id={modalFormId} onSubmit={onFormSubmit}>
        {/* <div className="scrollable grab flex flex-wrap items-center gap-8 border border-b-accent-400 pt-6">
          {asd.map((item, index) => (
            <button key={index} type="button">
              {item}
            </button>
          ))}
        </div> */}
      </form>
    </>
  );
};

export default AddEmployee;
