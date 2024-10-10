import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  EducationLevels,
  EmployeeNumbers,
  modalFormId,
} from "../../../utils/Globals";

import PersonalInformation from "../content/form_sections/add_employee/PersonalInformation";
import AddressContact from "../content/form_sections/add_employee/AddressContact";
import EmploymentDetails from "../content/form_sections/add_employee/EmploymentDetails";
import EducationalAttainment from "../content/form_sections/add_employee/EducationalAttainment";
import GovernmentNumbers from "../content/form_sections/add_employee/GovernmentNumbers";
import Documents from "../content/form_sections/add_employee/Documents";
import AccountInformation from "../content/form_sections/add_employee/AccountInformation";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewSchemaAddEmployee,
  NewSchemaAddEmployeeType,
} from "../../schema/HRISAddEmployee";
import axios from "axios";
import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(1);
  const [educationLevelStatus, setEducationLevelStatus] =
    useState<EducationLevels>({
      bachelor: true,
      doctorate: false,
      masteral: false,
    });

  const [employeeNumberList, setEmployeeNumberList] = useState<
    EmployeeNumbers[]
  >([]);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const schema = NewSchemaAddEmployee(employeeNumberList, educationLevelStatus);

  const formMethods = useForm<NewSchemaAddEmployeeType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      // Employment Details
      department: "none",
      isDepartmentHead: false,
      division: "none",
      isDivisionHead: false,
    },
  });
  // Events
  const onFormSubmit = formMethods.handleSubmit(async (data) => {
    // const formData = new FormData();
    // // Account Information
    // formData.append("employee_number", data.employee_number);
    // formData.append("password", data.password);
    // formData.append("confirm_password", data.confirm_password);

    // // Personal Information
    // formData.append("firstName", data.firstName);
    // formData.append("middleName", data.middleName ?? "");
    // formData.append("lastName", data.lastName);
    // formData.append("suffix", data.suffix ?? "");
    // formData.append("birthday", data.birthday);

    // // Address & Contact
    // formData.append("primaryContact", data.primaryContact);
    // formData.append("secondaryContact", data.secondaryContact ?? "");
    // formData.append("fullAddress", data.fullAddress);

    // // Employment Details
    // formData.append("plantilla", data.plantilla ?? "");
    // formData.append("department", data.department ?? "");
    // formData.append("isDepartmentHead", data.isDepartmentHead);
    // formData.append("division", data.division ?? "");
    // formData.append("isDivisionHead", data.isDivisionHead ?? "");
    // formData.append("category", data.category);
    // formData.append("status", data.status);
    // formData.append("civil_eligibility", data.civil_eligibility ?? "");

    console.log("Overall data", data);
    const insertNewEmployee = await axios.post(
      "/v1/forms/insert/employee",
      data,
    );
    toast.success(insertNewEmployee.data.message);
  });

  const handleCategoryClick = (id: number) => {
    activeCategory === id ? setActiveCategory(null) : setActiveCategory(id);
  };

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const [fetchEmployeeNumbers] = await Promise.all([
          axios.get("/v1/existence/employee_numbers", {
            signal: controller.signal,
          }),
        ]);
        setEmployeeNumberList(fetchEmployeeNumbers.data.rows);
      } catch (error) {
        setError(ToastHandleAxiosCatch(error));
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {isLoading && <p className="ml-6 mt-8">Loading...</p>}

      {!isLoading && isError && (
        <p className="ml-6 mt-8">Error connecting to the server.</p>
      )}

      {!isLoading && !isError && (
        <>
          <form
            id={modalFormId}
            onSubmit={onFormSubmit}
            autoComplete="off"
            className="flex flex-col gap-8 px-6 py-8"
          >
            <FormProvider {...formMethods}>
              <AccountInformation
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />
              <PersonalInformation
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />
              <AddressContact
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />
              <EmploymentDetails
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />
              {/* 
              <EducationalAttainment
                activeCategory={activeCategory}
                educationLevelStatus={educationLevelStatus}
                setEducationLevelStatus={setEducationLevelStatus}
                handleCategoryClick={handleCategoryClick}
              />
             

          <GovernmentNumbers
            activeCategory={activeCategory}
            handleCategoryClick={handleCategoryClick}
          />

          <Documents
            activeCategory={activeCategory}
            handleCategoryClick={handleCategoryClick}
            educationLevelStatus={educationLevelStatus}
          /> */}
            </FormProvider>
          </form>
        </>
      )}
    </>
  );
};

export default AddEmployee;

// import { useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import {
//   AddEmployeeForm,
//   EducationLevels,
//   modalFormId,
// } from "../../../utils/Globals";

// import PersonalInformation from "../content/form_sections/add_employee/PersonalInformation";
// import AddressContact from "../content/form_sections/add_employee/AddressContact";
// import EmploymentDetails from "../content/form_sections/add_employee/EmploymentDetails";
// import EducationalAttainment from "../content/form_sections/add_employee/EducationalAttainment";
// import GovernmentNumbers from "../content/form_sections/add_employee/GovernmentNumbers";
// import Documents from "../content/form_sections/add_employee/Documents";
// import AccountInformation from "../content/form_sections/add_employee/AccountInformation";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const AddEmployee = () => {
//   const [sample, setSample] = useState<boolean>(false);
//   const [activeCategory, setActiveCategory] = useState<number | null>(1);
//   const [educationLevelStatus, setEducationLevelStatus] =
//     useState<EducationLevels>({
//       bachelor: true,
//       doctorate: false,
//       masteral: false,
//     });

//   const schema = z.object({});

//   const formMethods = useForm<AddEmployeeForm>({
//     defaultValues: {
//       // Account Information
//       employee_number: "",
//       password: "",
//       confirm_password: "",

//       // Personal Information
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       extension: "",
//       birthday: "",

//       // Contact and Address
//       primaryContact: "",
//       secondaryContact: "",
//       fullAddress: "",

//       // Employment Details
//       plantilla: "none",
//       // pay_grade: "",
//       department: "none",
//       category: "none",
//       status: "none",
//       civil_eligibility: "",

//       // Educational Attainment
//       bachelor_school: "",
//       bachelor_title: "",
//       bachelor_start: "",
//       bachelor_end: "",
//       masteral_school: "",
//       masteral_title: "",
//       masteral_start: "",
//       masteral_end: "",
//       doctorate_school: "",
//       doctorate_title: "",
//       doctorate_start: "",
//       doctorate_end: "",

//       // Government Numbers
//       sss: "",
//       bir_tin: "",
//       gsis: "",
//       pagibig: "",
//       philhealth: "",

//       // Documents
//       birth_certificate: undefined,
//       resume: undefined,
//       pds: undefined,
//       diploma_bachelor: undefined,
//       diploma_master: undefined,
//       diploma_doctorate: undefined,
//       tor_bachelor: undefined,
//       tor_master: undefined,
//       tor_doctorate: undefined,
//       ptt: undefined,
//       certificates: undefined,
//       mpo: undefined,
//       cccr: undefined,
//       csc_eligibility: undefined,
//       employment_contract: undefined,
//       marriage_contract: undefined,
//       medical_analysis: undefined,
//     },
//   });

//   // Events
//   const onFormSubmit = formMethods.handleSubmit((data) => {
//     // const formData = new FormData();

//     // formData.append("birth_certificate", data.birth_certificate);

//     // formMethods..forEach(element => {

//     // });

//     // formData.append("firstName", data.firstName);
//     // formData.append("middleName", data.middleName);
//     // formData.append("lastName", data.lastName);
//     // formData.append("extension", data.extension);
//     // formData.append("birthday", data.birthday);

//     // formData.append("firstName", data.primaryContact);
//     // formData.append("firstName", data.secondaryContact);
//     // formData.append("firstName", data.fullAddress);

//     // formData.append("firstName", data.plantilla);
//     // formData.append("firstName", data.department);
//     // formData.append("firstName", data.category);
//     // formData.append("firstName", data.status);
//     // formData.append("firstName", data.pay_grade);

//     if (!educationLevelStatus.masteral) {
//       data.masteral_school = "";
//       data.masteral_title = "";
//       data.masteral_start = "";
//       data.masteral_end = "";
//     }
//     if (!educationLevelStatus.doctorate) {
//       data.doctorate_school = "";
//       data.doctorate_title = "";
//       data.doctorate_start = "";
//       data.doctorate_end = "";
//     }

//     console.log(data);
//   });

//   const handleCategoryClick = (id: number) => {
//     activeCategory === id ? setActiveCategory(null) : setActiveCategory(id);
//   };

//   return (
//     <>
//       <form
//         id={modalFormId}
//         onSubmit={onFormSubmit}
//         className="flex flex-col gap-8 px-6 py-8"
//       >
//         <FormProvider {...formMethods}>
//           <AccountInformation
//             activeCategory={activeCategory}
//             handleCategoryClick={handleCategoryClick}
//           />
//           <PersonalInformation
//             activeCategory={activeCategory}
//             handleCategoryClick={handleCategoryClick}
//           />
//           <AddressContact
//             activeCategory={activeCategory}
//             handleCategoryClick={handleCategoryClick}
//           />
//           <EmploymentDetails
//             activeCategory={activeCategory}
//             handleCategoryClick={handleCategoryClick}
//           />
//           <EducationalAttainment
//             activeCategory={activeCategory}
//             educationLevelStatus={educationLevelStatus}
//             setEducationLevelStatus={setEducationLevelStatus}
//             handleCategoryClick={handleCategoryClick}
//           />
//           <GovernmentNumbers
//             activeCategory={activeCategory}
//             handleCategoryClick={handleCategoryClick}
//           />
//           <Documents
//             activeCategory={activeCategory}
//             handleCategoryClick={handleCategoryClick}
//           />
//         </FormProvider>
//       </form>
//     </>
//   );
// };

// export default AddEmployee;
