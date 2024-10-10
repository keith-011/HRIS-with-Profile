import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import axios from "axios";

import {
  SelectIdDescription,
  FormPlantillaList,
  DivisionTable,
  DepartmentTable,
} from "../../../../../utils/Globals";

import FormCategory from "../../FormCategory";
import DefaultDropdown from "../../../../../Shared/components/ui/dropdown/DefaultDropdown";
import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
import { NewSchemaAddEmployeeType } from "../../../../schema/HRISAddEmployee";
import SelectDepartmentHead from "../../../../../Shared/components/ui/dropdown/SelectDepartmentHead";
import SelectDivisionHead from "../../../../../Shared/components/ui/dropdown/SelectDivisionHead";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
}

const EmploymentDetails: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
}) => {
  const {
    register,
    getValues,
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

  const [plantillaData, setPlantillaData] = useState<FormPlantillaList[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentTable[]>([]);
  const [divisionData, setDivisionData] = useState<DivisionTable[]>([]);
  const [categoryData, setCategoryData] = useState<SelectIdDescription[]>([]);
  const [statusData, setStatusData] = useState<SelectIdDescription[]>([]);

  const [payGrade, setPayGrade] = useState<string>("");
  const [respectiveDivisions, setRespectiveDivisions] = useState<
    DivisionTable[]
  >([]);
  const [showCheckDepartment, setCheckDepartment] = useState<boolean>(false);
  const [showCheckDivision, setCheckDivision] = useState<boolean>(false);

  const inputFields = [
    errors.plantilla?.message,
    errors.department?.message,
    errors.category?.message,
    errors.status?.message,
    errors.civil_eligibility?.message,
  ];

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const [
          fetchPlantilla,
          fetchDepartments,
          fetchCategory,
          fetchStatus,
          fetchDivisionData,
        ] = await Promise.all([
          axios.get("/v1/forms/select/plantilla", {
            signal: controller.signal,
          }),
          axios.get("/v1/forms/select/department_table", {
            signal: controller.signal,
          }),
          axios.get("/v1/forms/select/category", {
            signal: controller.signal,
          }),
          axios.get("/v1/forms/select/divisions", {
            signal: controller.signal,
          }),
          axios.get("/v1/forms/select/division_table", {
            signal: controller.signal,
          }),
        ]);
        setPlantillaData(fetchPlantilla.data.rows);
        setDepartmentData(fetchDepartments.data.rows);
        setCategoryData(fetchCategory.data.rows);
        setStatusData(fetchStatus.data.rows);
        setDivisionData(fetchDivisionData.data.rows);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(error.message);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

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

    const divisionsOfDepartment = divisionData.filter(
      (obj) => obj.department_id === watchDepartment,
    );

    if (divisionsOfDepartment) {
      setRespectiveDivisions(divisionsOfDepartment);
      setValue("division", "none");
    }

    if (watchDepartment === "none") {
      setCheckDepartment(false);
    }

    if (departmentObject) {
      if (departmentObject.department_head === null) {
        setCheckDepartment(true);
      } else {
        setCheckDepartment(false);
      }
    }
  }, [watchDepartment]);

  useEffect(() => {
    setValue("isDivisionHead", false);

    const divisionObject = divisionData.find((obj) => obj.id === watchDivision);

    if (watchDivision === "none") {
      setCheckDivision(false);
    }

    if (divisionObject) {
      if (divisionObject.division_head === null) {
        setCheckDivision(true);
      } else {
        setCheckDivision(false);
      }
    }
  }, [watchDivision]);

  useEffect(() => {
    if (watchDepartmentHead) {
      setValue("isDivisionHead", false);
      setCheckDivision(false);
    } else {
      if (watchDivision !== "none") {
        setCheckDivision(true);
      }
    }
  }, [watchDepartmentHead]);

  useEffect(() => {
    if (watchDivisionHead) {
      setValue("isDepartmentHead", false);
      setCheckDepartment(false);
    } else {
      if (watchDepartment !== "none") {
        setCheckDepartment(true);
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
          <DefaultDropdown
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
          <SelectDepartmentHead
            data={departmentData}
            register={register("department")}
          />
          {showCheckDepartment && (
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
          <SelectDivisionHead
            data={respectiveDivisions}
            register={register("division")}
          />
          {showCheckDivision && (
            <label className="flex items-center justify-center gap-2 self-start">
              <input type="checkbox" {...register("isDivisionHead")} />
              Assign as Head
            </label>
          )}
        </FormInput>
        <FormInput labelText="Category" errorMessage={errors.category?.message}>
          <DefaultDropdown
            data={categoryData}
            register={register("category")}
          />
        </FormInput>
        <FormInput labelText="Status" errorMessage={errors.status?.message}>
          <DefaultDropdown data={statusData} register={register("status")} />
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
