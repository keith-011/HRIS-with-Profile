import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { AddEmployeeType } from "../../../../schema/HRISSchema";

import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
import FormCategory from "../../FormCategory";
import { NewSchemaAddEmployeeType } from "../../../../schema/HRISAddEmployee";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
}

const PersonalInformation: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
}) => {
  const currentYear = new Date().getFullYear() - 17;

  const {
    register,
    formState: { errors },
  } = useFormContext<NewSchemaAddEmployeeType>();

  const [isFieldError, setFieldError] = useState<boolean>(false);
  const [minBirthday, setMinBirthday] = useState<string>("");

  const inputFields = [
    errors.firstName?.message,
    errors.middleName?.message,
    errors.lastName?.message,
    errors.suffix?.message,
    errors.birthday?.message,
  ];

  useEffect(() => {
    const year = new Date();
    const minYear = new Date(year.getFullYear() - 80, 0, 2);
    const formattedMinDate = minYear.toISOString().split("T")[0];
    setMinBirthday(formattedMinDate);
  }, []);

  useEffect(() => {
    setFieldError(inputFields.some((item) => item !== undefined));
  }, [inputFields]);

  return (
    <>
      <FormCategory
        id={2}
        text="Personal Information"
        activeCategory={activeCategory}
        isFieldError={isFieldError}
        handleCategoryClick={handleCategoryClick}
      >
        <FormInput
          labelText="First Name"
          errorMessage={errors.firstName?.message}
        >
          <input
            type="text"
            maxLength={50}
            placeholder="First Name"
            className="modal-input"
            {...register("firstName")}
          />
        </FormInput>
        <FormInput
          labelText="Middle Name (Optional)"
          errorMessage={errors.middleName?.message}
        >
          <input
            type="text"
            maxLength={50}
            placeholder="Middle Name"
            className="modal-input"
            {...register("middleName")}
          />
        </FormInput>
        <FormInput
          labelText="Last Name"
          errorMessage={errors.lastName?.message}
        >
          <input
            type="text"
            maxLength={50}
            placeholder="Last Name"
            className="modal-input"
            {...register("lastName")}
          />
        </FormInput>
        <FormInput
          labelText="Suffix (Optional)"
          errorMessage={errors.suffix?.message}
        >
          <input
            type="text"
            maxLength={10}
            placeholder="Suffix"
            className="modal-input"
            {...register("suffix")}
          />
        </FormInput>
        <FormInput labelText="Birthday" errorMessage={errors.birthday?.message}>
          <input
            type="date"
            min={minBirthday}
            max={`${currentYear}-12-31`}
            className="modal-input"
            {...register("birthday")}
          />
        </FormInput>
      </FormCategory>
    </>
  );
};

export default PersonalInformation;

// import React, { useEffect, useState } from "react";
// import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
// import FormCategory from "../../FormCategory";
// import { useFormContext } from "react-hook-form";
// import { AddEmployeeForm } from "../../../../../utils/Globals";

// interface Props {
//   activeCategory: number | null;
//   handleCategoryClick: (id: number) => void;
// }

// const PersonalInformation: React.FC<Props> = ({
//   activeCategory,
//   handleCategoryClick,
// }) => {
//   const currentYear = new Date().getFullYear() - 17;

//   const {
//     register,
//     formState: { errors },
//   } = useFormContext<AddEmployeeForm>();

//   const [isFieldError, setFieldError] = useState<boolean>(false);
//   const [minBirthday, setMinBirthday] = useState<string>("");

//   const inputFields = [
//     errors.firstName?.message,
//     errors.middleName?.message,
//     errors.lastName?.message,
//     errors.extension?.message,
//     errors.birthday?.message,
//   ];

//   useEffect(() => {
//     const year = new Date();
//     const minYear = new Date(year.getFullYear() - 80, 0, 2);
//     const formattedMinDate = minYear.toISOString().split("T")[0];
//     setMinBirthday(formattedMinDate);
//   }, []);

//   useEffect(() => {
//     setFieldError(inputFields.some((item) => item !== undefined));
//   }, [inputFields]);

//   return (
//     <>
//       <FormCategory
//         id={2}
//         text="Personal Information"
//         activeCategory={activeCategory}
//         isFieldError={isFieldError}
//         handleCategoryClick={handleCategoryClick}
//       >
//         <FormInput
//           labelText="First Name"
//           errorMessage={errors.firstName?.message}
//         >
//           <input
//             type="text"
//             maxLength={50}
//             placeholder="First Name"
//             className="modal-input"
//             {...register("firstName", {
//               required: "First name is required.",
//               maxLength: {
//                 value: 50,
//                 message: "First name must be 50 characters or less.",
//               },
//             })}
//           />
//         </FormInput>
//         <FormInput
//           labelText="Middle Name (Optional)"
//           errorMessage={errors.middleName?.message}
//         >
//           <input
//             type="text"
//             maxLength={50}
//             placeholder="Middle Name"
//             className="modal-input"
//             {...register("middleName", {
//               maxLength: {
//                 value: 50,
//                 message: "Middle name must be 50 characters or less.",
//               },
//             })}
//           />
//         </FormInput>
//         <FormInput
//           labelText="Last Name"
//           errorMessage={errors.lastName?.message}
//         >
//           <input
//             type="text"
//             maxLength={50}
//             placeholder="Last Name"
//             className="modal-input"
//             {...register("lastName", {
//               required: "Last name is required.",
//               maxLength: {
//                 value: 50,
//                 message: "Last name must be 50 characters or less.",
//               },
//             })}
//           />
//         </FormInput>
//         <FormInput
//           labelText="Name Extension (Optional)"
//           errorMessage={errors.extension?.message}
//         >
//           <input
//             type="text"
//             maxLength={10}
//             placeholder="Name Extension"
//             className="modal-input"
//             {...register("extension", {
//               maxLength: {
//                 value: 10,
//                 message: "Extension name must be 10 characters or less.",
//               },
//               validate: (value) =>
//                 value === "" ||
//                 /^[A-Za-z]+$/.test(value) ||
//                 "Only letters are allowed.",
//             })}
//           />
//         </FormInput>
//         <FormInput labelText="Birthday" errorMessage={errors.birthday?.message}>
//           <input
//             type="date"
//             min={minBirthday}
//             max={`${currentYear}-12-31`}
//             className="modal-input"
//             {...register("birthday", {
//               required: "Birthday is required",
//             })}
//           />
//         </FormInput>
//       </FormCategory>
//     </>
//   );
// };

// export default PersonalInformation;
