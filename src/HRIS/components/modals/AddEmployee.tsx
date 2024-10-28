import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  AddEmployeeFetchData,
  civilStatusData,
  genderData,
  modalFormId,
} from "../../../utils/Globals";

import PersonalInformation from "../content/form_sections/add_employee/PersonalInformation";
import AddressContact from "../content/form_sections/add_employee/AddressContact";
import EmploymentDetails from "../content/form_sections/add_employee/EmploymentDetails";
import EducationalBackground from "../content/form_sections/add_employee/EducationalBackground";
import GovernmentNumbers from "../content/form_sections/add_employee/GovernmentNumbers";
import Documents from "../content/form_sections/add_employee/Documents";
import AccountInformation from "../content/form_sections/add_employee/AccountInformation";

import {
  NewSchemaAddEmployee,
  NewSchemaAddEmployeeType,
} from "../../schema/HRISAddEmployee";

import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
import { useModalContext } from "../../context/HRISContext";

const AddEmployee: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(1);

  const [fetchData, setFetchData] = useState<AddEmployeeFetchData>({
    existence: {
      email: [],
      employeeNumberPCC: [],
      employeeNumberCH: [],
      sss: [],
      birTin: [],
      gsis: [],
      pagIbig: [],
      philHealth: [],
      primaryContact: [],
    },

    selectData: {
      plantilla: [],
      department: [],
      category: [],
      status: [],
    },
  });

  // Base loading states
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const schema = NewSchemaAddEmployee(
    fetchData.existence.employeeNumberPCC,
    fetchData.existence.employeeNumberCH,
    fetchData.existence.email,
    fetchData.existence.sss,
    fetchData.existence.birTin,
    fetchData.existence.gsis,
    fetchData.existence.pagIbig,
    fetchData.existence.philHealth,
    fetchData.existence.primaryContact,
  );

  const { refreshParentPage, closeModal } = useModalContext();

  const formMethods = useForm<NewSchemaAddEmployeeType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      // Account Information
      employeeNumberCityHall: "",
      employeeNumberPCC: "",
      autoGenerate: true,
      email: "",
      password: "",
      confirm_password: "",

      // Personal Information
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      // gender: "",
      birthday: "",
      civilStatus: "",
      nationality: "",

      // Address & Contact
      primaryContact: "",
      secondaryContact: "",
      presentAddress: "",
      permanentAddress: "",

      // Employment Details
      plantilla: "",
      status: "",
      department: "",
      isDepartmentHead: false,
      designation: "",
      category: "",
      withAdminFunction: false,
      civilServiceEligibility: "",

      // Educational Background
      educationalBackground: [
        {
          educationLevel: "Secondary",

          programType: "",
          courseTitle: "",

          schoolName: "",
          yearStart: "",
          yearGraduated: "",
          isStudying: false,
        },
      ],

      // Government Numbers
      sss: "",
      birTin: "",
      gsis: "",
      pagibig: "",
      philhealth: "",
    },
  });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const fetchData = await axios.get("/v1/effect/add_employee");
        setFetchData(fetchData.data);
      } catch (error) {
        setError(ToastHandleAxiosCatch(error));
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [refresh]);

  // Events
  const onFormSubmit = formMethods.handleSubmit(async (data) => {
    try {
      const insertNewEmployee = await axios.post(
        "/v1/forms/insert/employee",
        data,
      );
      toast.success(insertNewEmployee.data.message);
      refreshParentPage();
      closeModal();
      formMethods.reset();
      setRefresh(!refresh);
    } catch (error) {
      console.log(data);
      ToastHandleAxiosCatch(error);
    }
  });

  const handleCategoryClick = (id: number) => {
    activeCategory === id ? setActiveCategory(null) : setActiveCategory(id);
  };

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
                genderData={genderData}
                civilStatusData={civilStatusData}
              />
              <AddressContact
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />
              <EmploymentDetails
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
                plantillaData={fetchData.selectData.plantilla}
                departmentData={fetchData.selectData.department}
                categoryData={fetchData.selectData.category}
                statusData={fetchData.selectData.status}
              />
              <EducationalBackground
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />

              <GovernmentNumbers
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />

              {/*<Documents
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

// import React, { useEffect, useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";

// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   BIR_TIN,
//   DepartmentTable,
//   Email,
//   EmployeeNumbers,
//   FormPlantillaList,
//   GSIS,
//   modalFormId,
//   Pagibig,
//   PhilHealth,
//   PrimaryContacts,
//   SelectIdDescription,
//   SSS,
// } from "../../../utils/Globals";

// import PersonalInformation from "../content/form_sections/add_employee/PersonalInformation";
// import AddressContact from "../content/form_sections/add_employee/AddressContact";
// import EmploymentDetails from "../content/form_sections/add_employee/EmploymentDetails";
// import EducationalBackground from "../content/form_sections/add_employee/EducationalBackground";
// import GovernmentNumbers from "../content/form_sections/add_employee/GovernmentNumbers";
// import Documents from "../content/form_sections/add_employee/Documents";
// import AccountInformation from "../content/form_sections/add_employee/AccountInformation";

// import {
//   NewSchemaAddEmployee,
//   NewSchemaAddEmployeeType,
// } from "../../schema/HRISAddEmployee";

// import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
// import { useModalContext } from "../../context/HRISContext";

// const AddEmployee: React.FC = () => {
//   const [activeCategory, setActiveCategory] = useState<number | null>(1);

//   //Existence Check
//   const [emailList, setEmailList] = useState<Email[]>([]);
//   const [employeeNumberList, setEmployeeNumberList] = useState<
//     EmployeeNumbers[]
//   >([]);
//   const [sssList, setSSSList] = useState<SSS[]>([]);
//   const [tinList, setTinList] = useState<BIR_TIN[]>([]);
//   const [gsisList, setGsisList] = useState<GSIS[]>([]);
//   const [pagibigList, setPagibigList] = useState<Pagibig[]>([]);
//   const [philHealthList, setPhilHealthList] = useState<PhilHealth[]>([]);
//   const [primaryContactList, setPrimaryContactList] = useState<
//     PrimaryContacts[]
//   >([]);

//   // API Data
//   const [plantillaData, setPlantillaData] = useState<FormPlantillaList[]>([]);
//   const [departmentData, setDepartmentData] = useState<DepartmentTable[]>([]);
//   const [categoryData, setCategoryData] = useState<SelectIdDescription[]>([]);
//   const [statusData, setStatusData] = useState<SelectIdDescription[]>([]);
//   const [genderData, setGenderData] = useState<SelectIdDescription[]>([]);
//   const [civilStatusData, setCivilStatusData] = useState<SelectIdDescription[]>(
//     [],
//   );

//   // Base loading states
//   const [isLoading, setLoading] = useState<boolean>(true);
//   const [isError, setError] = useState<boolean>(false);
//   const [refresh, setRefresh] = useState<boolean>(false);

//   const schema = NewSchemaAddEmployee(
//     employeeNumberList,
//     emailList,
//     sssList,
//     tinList,
//     gsisList,
//     pagibigList,
//     philHealthList,
//     primaryContactList,
//   );

//   const { refreshParentPage, closeModal } = useModalContext();

//   const formMethods = useForm<NewSchemaAddEmployeeType>({
//     resolver: zodResolver(schema),
//     mode: "onChange",
//     defaultValues: {
//       // Account Information
//       employee_number_ch: "",
//       employee_number_pcc: "",
//       autoGenerate: true,
//       email: "",
//       password: "",
//       confirm_password: "",

//       // Personal Information
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       suffix: "",
//       // gender: "",
//       birthday: "",
//       civilStatus: "",
//       nationality: "",

//       // Address & Contact
//       primaryContact: "",
//       secondaryContact: "",
//       presentAddress: "",
//       permanentAddress: "",

//       // Employment Details
//       plantilla: "none",
//       status: "none",
//       department: "none",
//       isDepartmentHead: false,
//       designation: "",
//       category: "none",
//       withAdminFunction: false,
//       civilEligibility: "",

//       // Educational Background
//       // educationalBackground: [
//       //   {
//       //     educationLevel: "Secondary",

//       //     degree: "",
//       //     degreeTitle: "",

//       //     schoolName: "",
//       //     yearStart: "",
//       //     yearGraduated: "",
//       //     isStudying: false,
//       //   },
//       // ],

//       // Government Numbers
//       sss: "",
//       bir_tin: "",
//       gsis: "",
//       pagibig: "",
//       philhealth: "",
//     },
//   });

//   useEffect(() => {
//     const controller = new AbortController();
//     (async () => {
//       try {
//         const [
//           fetchEmailList,
//           fetchEmployeeNumbers,
//           fetchPlantilla,
//           fetchDepartments,
//           fetchCategory,
//           fetchStatus,
//           fetchSSSData,
//           fetchTinData,
//           fetchGsisData,
//           fetchPagibigData,
//           fetchPhilHealthData,
//           fetchPrimaryContactData,
//           fetchGenderData,
//           fetchCivilStatusData,
//         ] = await Promise.all([
//           axios.get("/v1/existence/emails", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/existence/employee_numbers", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/forms/select/plantilla", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/forms/select/department_table", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/forms/select/category", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/forms/select/status", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/existence/sss", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/existence/bir_tin", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/existence/gsis", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/existence/pagibig", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/existence/philhealth", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/existence/primary_contact", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/forms/select/gender", {
//             signal: controller.signal,
//           }),
//           axios.get("/v1/forms/select/civil_status", {
//             signal: controller.signal,
//           }),
//           ,
//         ]);

//         setEmailList(fetchEmailList.data.rows);
//         setEmployeeNumberList(fetchEmployeeNumbers.data.rows);
//         setPrimaryContactList(fetchPrimaryContactData.data.rows);

//         setGenderData(fetchGenderData.data.rows);
//         setCivilStatusData(fetchCivilStatusData.data.rows);

//         setPlantillaData(fetchPlantilla.data.rows);
//         setDepartmentData(fetchDepartments.data.rows);
//         setCategoryData(fetchCategory.data.rows);
//         setStatusData(fetchStatus.data.rows);

//         setSSSList(fetchSSSData.data.rows);
//         setTinList(fetchTinData.data.rows);
//         setGsisList(fetchGsisData.data.rows);
//         setPagibigList(fetchPagibigData.data.rows);
//         setPhilHealthList(fetchPhilHealthData.data.rows);
//       } catch (error) {
//         setError(ToastHandleAxiosCatch(error));
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => {
//       controller.abort();
//     };
//   }, [refresh]);

//   // Events
//   const onFormSubmit = formMethods.handleSubmit(async (data) => {
//     try {
//       const insertNewEmployee = await axios.post(
//         "/v1/forms/insert/employee",
//         data,
//       );
//       toast.success(insertNewEmployee.data.message);
//       refreshParentPage();
//       closeModal();
//       formMethods.reset();
//       setRefresh(!refresh);
//     } catch (error) {
//       ToastHandleAxiosCatch(error);
//     }
//   });

//   const handleCategoryClick = (id: number) => {
//     activeCategory === id ? setActiveCategory(null) : setActiveCategory(id);
//   };

//   return (
//     <>
//       {isLoading && <p className="ml-6 mt-8">Loading...</p>}

//       {!isLoading && isError && (
//         <p className="ml-6 mt-8">Error connecting to the server.</p>
//       )}

//       {!isLoading && !isError && (
//         <>
//           <form
//             id={modalFormId}
//             onSubmit={onFormSubmit}
//             autoComplete="off"
//             className="flex flex-col gap-8 px-6 py-8"
//           >
//             <FormProvider {...formMethods}>
//               <AccountInformation
//                 activeCategory={activeCategory}
//                 handleCategoryClick={handleCategoryClick}
//               />
//               <PersonalInformation
//                 activeCategory={activeCategory}
//                 handleCategoryClick={handleCategoryClick}
//                 civilStatusData={civilStatusData}
//                 genderData={genderData}
//               />
//               <AddressContact
//                 activeCategory={activeCategory}
//                 handleCategoryClick={handleCategoryClick}
//               />
//               <EmploymentDetails
//                 activeCategory={activeCategory}
//                 handleCategoryClick={handleCategoryClick}
//                 plantillaData={plantillaData}
//                 departmentData={departmentData}
//                 categoryData={categoryData}
//                 statusData={statusData}
//               />

//               <EducationalBackground
//                 activeCategory={activeCategory}
//                 handleCategoryClick={handleCategoryClick}
//               />

//               <GovernmentNumbers
//                 activeCategory={activeCategory}
//                 handleCategoryClick={handleCategoryClick}
//               />

//               {/*<Documents
//             activeCategory={activeCategory}
//             handleCategoryClick={handleCategoryClick}
//             educationLevelStatus={educationLevelStatus}
//           /> */}
//             </FormProvider>
//           </form>
//         </>
//       )}
//     </>
//   );
// };

// export default AddEmployee;
