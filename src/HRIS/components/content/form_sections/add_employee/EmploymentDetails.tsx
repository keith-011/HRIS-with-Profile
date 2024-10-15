import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import {
  SelectIdDescription,
  FormPlantillaList,
  DivisionTable,
  DepartmentTable,
} from "../../../../../utils/Globals";

import FormCategory from "../../FormCategory";
import CustomSelect from "../../../../../Shared/components/ui/dropdown/CustomSelect";
import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
import { NewSchemaAddEmployeeType } from "../../../../schema/HRISAddEmployee";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
  plantillaData: FormPlantillaList[];
  departmentData: DepartmentTable[];
  divisionData: DivisionTable[];
  categoryData: SelectIdDescription[];
  statusData: SelectIdDescription[];
}

const EmploymentDetails: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
  plantillaData,
  departmentData,
  divisionData,
  categoryData,
  statusData,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<NewSchemaAddEmployeeType>();

  const watchPlantilla = watch("plantilla");
  const watchDepartment = watch("department");
  const watchDivision = watch("division");
  const watchDepartmentHead = watch("isDepartmentHead");
  const watchDivisionHead = watch("isDivisionHead");

  const [isFieldError, setFieldError] = useState<boolean>(false);

  const [payGrade, setPayGrade] = useState<string>("");
  const [respectiveDivisions, setRespectiveDivisions] = useState<
    DivisionTable[]
  >([]);
  const [isDepartmentHeadVisible, setDepartmentHeadVisiblility] =
    useState<boolean>(true);
  const [isDivisionHeadVisible, setDivisionHeadVisiblility] =
    useState<boolean>(true);

  const [currentDepartmentHasHead, setCurrentDepartmentHead] =
    useState<boolean>(false);

  const [currentDivisionHasHead, setCurrentDivisionHead] =
    useState<boolean>(false);

  const inputFields = [
    errors.plantilla?.message,
    errors.department?.message,
    errors.isDepartmentHead?.message,
    errors.division?.message,
    errors.isDivisionHead?.message,
    errors.category?.message,
    errors.status?.message,
    errors.civil_eligibility?.message,
  ];

  useEffect(() => {
    setFieldError(inputFields.some((item) => item !== undefined));
  }, [inputFields]);

  useEffect(() => {
    if (watchPlantilla !== "none") {
      let toFind = plantillaData.find((item) => item.id === watchPlantilla);
      toFind && setPayGrade(toFind.salary_grade.toString());
    } else {
      setPayGrade("");
    }
  }, [watchPlantilla]);

  useEffect(() => {
    setValue("isDepartmentHead", false);

    const departmentObject = departmentData.find(
      (obj) => obj.id === watchDepartment,
    );

    setCurrentDepartmentHead(departmentObject?.department_head ? true : false);

    const divisionsOfDepartment = divisionData.filter(
      (obj) => obj.department_id === watchDepartment,
    );

    if (divisionsOfDepartment) {
      setRespectiveDivisions(divisionsOfDepartment);
      setValue("division", "none");
    }

    if (watchDepartment === "none") {
      setDepartmentHeadVisiblility(false);
    }

    if (departmentObject && departmentObject.department_head === null) {
      setDepartmentHeadVisiblility(true);
    } else {
      setDepartmentHeadVisiblility(false);
    }
  }, [watchDepartment]);

  useEffect(() => {
    setValue("isDivisionHead", false);

    const divisionObject = divisionData.find((obj) => obj.id === watchDivision);

    setCurrentDivisionHead(divisionObject?.division_head ? true : false);

    if (watchDivision === "none") {
      setDivisionHeadVisiblility(false);
    } else {
      setValue("isDepartmentHead", false);
    }

    if (divisionObject && divisionObject.division_head === null) {
      setDivisionHeadVisiblility(true);
    } else {
      setDivisionHeadVisiblility(false);
    }
  }, [watchDivision]);

  useEffect(() => {
    if (watchDepartmentHead) {
      setValue("isDivisionHead", false);
      setValue("division", "none");
      setDivisionHeadVisiblility(false);
    } else {
      if (watchDivision !== "none" && !currentDivisionHasHead) {
        setDivisionHeadVisiblility(true);
      }
    }
  }, [watchDepartmentHead]);

  useEffect(() => {
    if (watchDivisionHead) {
      setValue("isDepartmentHead", false);
      setDepartmentHeadVisiblility(false);
    } else {
      if (watchDepartment !== "none" && !currentDepartmentHasHead) {
        setDepartmentHeadVisiblility(true);
      }
    }
  }, [watchDivisionHead]);

  return (
    <>
      <FormCategory
        id={4}
        text="Employment Details"
        activeCategory={activeCategory}
        isFieldError={isFieldError}
        handleCategoryClick={handleCategoryClick}
      >
        {/* Employment Details */}
        <FormInput
          labelText="Designation (Plantilla)"
          errorMessage={errors.plantilla?.message}
        >
          <CustomSelect
            typeOfData="IdAndDescription"
            data={plantillaData}
            register={register("plantilla")}
          />
        </FormInput>
        <FormInput
          labelText="Pay Grade"
          // errorMessage={errors.pay_grade?.message}
        >
          <input
            type="number"
            maxLength={10}
            placeholder="Pay Grade"
            value={payGrade}
            disabled
            className="modal-input disabled:bg-accent-100"
            // {...register("pay_grade")}
          />
        </FormInput>
        <FormInput
          labelText="Department (PCC)"
          errorMessage={errors.department?.message}
        >
          <CustomSelect
            register={register("department")}
            typeOfData="DepartmentsCategorized"
            data={departmentData}
          />
          {isDepartmentHeadVisible && (
            <label className="flex items-center justify-center gap-2 self-start">
              <input type="checkbox" {...register("isDepartmentHead")} />
              Assign as Head
            </label>
          )}
        </FormInput>
        <FormInput
          labelText="Division (PCC)"
          errorMessage={errors.division?.message}
        >
          <CustomSelect
            register={register("division")}
            typeOfData="DivisionsCategorized"
            data={respectiveDivisions}
          />
          {isDivisionHeadVisible && (
            <label className="flex items-center justify-center gap-2 self-start">
              <input type="checkbox" {...register("isDivisionHead")} />
              Assign as Head
            </label>
          )}
        </FormInput>
        <FormInput labelText="Category" errorMessage={errors.category?.message}>
          <CustomSelect
            typeOfData="IdAndDescription"
            data={categoryData}
            register={register("category")}
          />
        </FormInput>
        <FormInput labelText="Status" errorMessage={errors.status?.message}>
          <CustomSelect
            typeOfData="IdAndDescription"
            data={statusData}
            register={register("status")}
          />
        </FormInput>
        <FormInput
          labelText="Civil Eligility"
          errorMessage={errors.civil_eligibility?.message}
        >
          <input
            type="text"
            maxLength={75}
            placeholder="Civil Eligibility"
            className="modal-input"
            {...register("civil_eligibility")}
          />
        </FormInput>
      </FormCategory>
    </>
  );
};

export default EmploymentDetails;
