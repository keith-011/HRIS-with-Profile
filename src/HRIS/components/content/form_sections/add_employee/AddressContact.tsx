import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { AddEmployeeType } from "../../../../schema/HRISSchema";

import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
import FormCategory from "../../FormCategory";
import { NewSchemaAddEmployeeType } from "../../../../schema/HRISAddEmployee";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
}

const AddressContact: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewSchemaAddEmployeeType>();

  const [isFieldError, setFieldError] = useState<boolean>(false);

  const inputFields = [
    errors.primaryContact?.message,
    errors.secondaryContact?.message,
    errors.fullAddress?.message,
  ];

  useEffect(() => {
    setFieldError(inputFields.some((item) => item !== undefined));
  }, [inputFields]);

  return (
    <>
      <FormCategory
        id={3}
        text="Address & Contact Information"
        activeCategory={activeCategory}
        isFieldError={isFieldError}
        handleCategoryClick={handleCategoryClick}
      >
        <FormInput
          labelText="Primary Contact Number"
          errorMessage={errors.primaryContact?.message}
        >
          <input
            type="tel"
            maxLength={25}
            placeholder="Contact Number"
            className="modal-input"
            {...register("primaryContact")}
          />
        </FormInput>

        <FormInput
          labelText="Secondary Contact Number"
          errorMessage={errors.secondaryContact?.message}
        >
          <input
            type="tel"
            maxLength={25}
            placeholder="Contact Number"
            className="modal-input"
            {...register("secondaryContact")}
          />
        </FormInput>

        <FormInput
          labelText="Complete Address"
          errorMessage={errors.fullAddress?.message}
        >
          <textarea
            maxLength={175}
            placeholder="Address"
            className="modal-input h-32"
            {...register("fullAddress")}
          />
        </FormInput>
      </FormCategory>
    </>
  );
};

export default AddressContact;
