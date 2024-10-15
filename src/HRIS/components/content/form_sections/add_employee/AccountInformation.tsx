import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import FormCategory from "../../FormCategory";
import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
import { NewSchemaAddEmployeeType } from "../../../../schema/HRISAddEmployee";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
}

const AccountInformation: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
}) => {
  const [isFieldError, setFieldError] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
  } = useFormContext<NewSchemaAddEmployeeType>();

  const inputFields = [
    errors.employee_number?.message,
    errors.password?.message,
    errors.confirm_password?.message,
    errors.email?.message,
  ];

  useEffect(() => {
    setFieldError(inputFields.some((item) => item !== undefined));
  }, [inputFields]);

  return (
    <>
      <FormCategory
        id={1}
        text="Account Information"
        isFieldError={isFieldError}
        activeCategory={activeCategory}
        handleCategoryClick={handleCategoryClick}
      >
        <FormInput
          labelText="Employee Number"
          errorMessage={errors.employee_number?.message}
        >
          <input
            type="text"
            maxLength={50}
            placeholder="Employee Number"
            className="modal-input"
            {...register("employee_number")}
          />
        </FormInput>

        <FormInput labelText="Email" errorMessage={errors.email?.message}>
          <input
            type="text"
            maxLength={50}
            placeholder="Employee Number"
            className="modal-input"
            {...register("email")}
          />
        </FormInput>

        <FormInput
          labelText="Account Password"
          errorMessage={errors.password?.message}
        >
          <input
            type="password"
            maxLength={50}
            placeholder="Password"
            className="modal-input"
            {...register("password")}
          />
        </FormInput>
        <FormInput
          labelText="Confirm Password"
          errorMessage={errors.confirm_password?.message}
        >
          <input
            type="password"
            maxLength={50}
            placeholder="Confirm password"
            className="modal-input"
            {...register("confirm_password")}
          />
        </FormInput>
      </FormCategory>
    </>
  );
};

export default AccountInformation;

// import React, { useEffect, useState } from "react";
// import FormCategory from "../../FormCategory";
// import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
// import { useFormContext } from "react-hook-form";
// import { AddEmployeeForm } from "../../../../../utils/Globals";

// interface Props {
//   activeCategory: number | null;
//   handleCategoryClick: (id: number) => void;
// }

// const AccountInformation: React.FC<Props> = ({
//   activeCategory,
//   handleCategoryClick,
// }) => {
//   const [isFieldError, setFieldError] = useState<boolean>(false);

//   const {
//     register,
//     formState: { errors },
//     watch,
//   } = useFormContext<AddEmployeeForm>();

//   const password = watch("password");

//   const inputFields = [
//     errors.employee_number?.message,
//     errors.password?.message,
//     errors.confirm_password?.message,
//   ];

//   useEffect(() => {
//     setFieldError(inputFields.some((item) => item !== undefined));
//   }, [inputFields]);

//   return (
//     <>
//       <FormCategory
//         id={1}
//         text="Account Information"
//         isFieldError={isFieldError}
//         activeCategory={activeCategory}
//         handleCategoryClick={handleCategoryClick}
//       >
//         <FormInput
//           labelText="Employee Number"
//           errorMessage={errors.employee_number?.message}
//         >
//           <input
//             type="text"
//             maxLength={50}
//             placeholder="Employee Number"
//             className="modal-input"
//             {...register("employee_number", {
//               required: "Employee number required.",
//               minLength: {
//                 value: 5,
//                 message: "Employee number must be at least 5 characters.",
//               },
//               maxLength: {
//                 value: 50,
//                 message: "Employee number must be 50 characters or less.",
//               },
//             })}
//           />
//         </FormInput>
//         <FormInput
//           labelText="Account Password"
//           errorMessage={errors.password?.message}
//         >
//           <input
//             type="password"
//             maxLength={50}
//             placeholder="Password"
//             className="modal-input"
//             {...register("password", {
//               required: "Password required.",
//               minLength: {
//                 value: 8,
//                 message: "Password must be at least 8 characters.",
//               },
//               maxLength: {
//                 value: 50,
//                 message: "Password must be 50 characters or less.",
//               },
//             })}
//           />
//         </FormInput>
//         <FormInput
//           labelText="Confirm Password"
//           errorMessage={errors.confirm_password?.message}
//         >
//           <input
//             type="password"
//             maxLength={50}
//             placeholder="Confirm password"
//             className="modal-input"
//             {...register("confirm_password", {
//               required: "Password required.",
//               validate: (value) =>
//                 value === password || "Password do not match",
//             })}
//           />
//         </FormInput>
//       </FormCategory>
//     </>
//   );
// };

// export default AccountInformation;
