import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  BIR_TIN,
  DepartmentTable,
  DivisionTable,
  EducationLevels,
  Email,
  EmployeeNumbers,
  FormPlantillaList,
  GSIS,
  modalFormId,
  Pagibig,
  PhilHealth,
  PrimaryContacts,
  SelectIdDescription,
  SSS,
} from "../../../utils/Globals";

import PersonalInformation from "../content/form_sections/add_employee/PersonalInformation";
import AddressContact from "../content/form_sections/add_employee/AddressContact";
import EmploymentDetails from "../content/form_sections/add_employee/EmploymentDetails";
import EducationalAttainment from "../content/form_sections/add_employee/EducationalAttainment";
import GovernmentNumbers from "../content/form_sections/add_employee/GovernmentNumbers";
import Documents from "../content/form_sections/add_employee/Documents";
import AccountInformation from "../content/form_sections/add_employee/AccountInformation";

import {
  NewSchemaAddEmployee,
  NewSchemaAddEmployeeType,
} from "../../schema/HRISAddEmployee";

import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
import { useModalContext } from "../../context/HRISContext";

const AddEmployee = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(1);
  const [educationLevelStatus, setEducationLevelStatus] =
    useState<EducationLevels>({
      bachelor: true,
      doctorate: false,
      masteral: false,
    });

  //Existence Check
  const [emailList, setEmailList] = useState<Email[]>([]);
  const [employeeNumberList, setEmployeeNumberList] = useState<
    EmployeeNumbers[]
  >([]);
  const [sssList, setSSSList] = useState<SSS[]>([]);
  const [tinList, setTinList] = useState<BIR_TIN[]>([]);
  const [gsisList, setGsisList] = useState<GSIS[]>([]);
  const [pagibigList, setPagibigList] = useState<Pagibig[]>([]);
  const [philHealthList, setPhilHealthList] = useState<PhilHealth[]>([]);
  const [primaryContactList, setPrimaryContactList] = useState<
    PrimaryContacts[]
  >([]);

  // API Data
  const [plantillaData, setPlantillaData] = useState<FormPlantillaList[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentTable[]>([]);
  const [divisionData, setDivisionData] = useState<DivisionTable[]>([]);
  const [categoryData, setCategoryData] = useState<SelectIdDescription[]>([]);
  const [statusData, setStatusData] = useState<SelectIdDescription[]>([]);

  // Base loading states
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const schema = NewSchemaAddEmployee(
    employeeNumberList,
    educationLevelStatus,
    emailList,
    sssList,
    tinList,
    gsisList,
    pagibigList,
    philHealthList,
    primaryContactList,
  );

  const { refreshParentPage, closeModal } = useModalContext();

  const formMethods = useForm<NewSchemaAddEmployeeType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      plantilla: "none",
      department: "none",
      isDepartmentHead: false,
      division: "none",
      isDivisionHead: false,
      category: "none",
      status: "none",

      bachelor_studying: false,
      masteral_studying: false,
      doctorate_studying: false,
    },
  });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const [
          fetchEmailList,
          fetchEmployeeNumbers,
          fetchPlantilla,
          fetchDepartments,
          fetchCategory,
          fetchStatus,
          fetchDivisionData,
          fetchSSSData,
          fetchTinData,
          fetchGsisData,
          fetchPagibigData,
          fetchPhilHealthData,
          fetchPrimaryContactData,
        ] = await Promise.all([
          axios.get("/v1/existence/emails", {
            signal: controller.signal,
          }),
          axios.get("/v1/existence/employee_numbers", {
            signal: controller.signal,
          }),
          axios.get("/v1/forms/select/plantilla", {
            signal: controller.signal,
          }),
          axios.get("/v1/forms/select/department_table", {
            signal: controller.signal,
          }),
          axios.get("/v1/forms/select/category", {
            signal: controller.signal,
          }),
          axios.get("/v1/forms/select/status", {
            signal: controller.signal,
          }),
          axios.get("/v1/forms/select/division_table", {
            signal: controller.signal,
          }),
          axios.get("/v1/existence/sss", {
            signal: controller.signal,
          }),
          axios.get("/v1/existence/bir_tin", {
            signal: controller.signal,
          }),
          axios.get("/v1/existence/gsis", {
            signal: controller.signal,
          }),
          axios.get("/v1/existence/pagibig", {
            signal: controller.signal,
          }),
          axios.get("/v1/existence/philhealth", {
            signal: controller.signal,
          }),
          axios.get("/v1/existence/primary_contact", {
            signal: controller.signal,
          }),
        ]);

        setEmailList(fetchEmailList.data.rows);
        setEmployeeNumberList(fetchEmployeeNumbers.data.rows);
        setPrimaryContactList(fetchPrimaryContactData.data.rows);

        setPlantillaData(fetchPlantilla.data.rows);
        setDepartmentData(fetchDepartments.data.rows);
        setCategoryData(fetchCategory.data.rows);
        setStatusData(fetchStatus.data.rows);
        setDivisionData(fetchDivisionData.data.rows);

        setSSSList(fetchSSSData.data.rows);
        setTinList(fetchTinData.data.rows);
        setGsisList(fetchGsisData.data.rows);
        setPagibigList(fetchPagibigData.data.rows);
        setPhilHealthList(fetchPhilHealthData.data.rows);
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
              />
              <AddressContact
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
              />
              <EmploymentDetails
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
                plantillaData={plantillaData}
                departmentData={departmentData}
                divisionData={divisionData}
                categoryData={categoryData}
                statusData={statusData}
              />

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
