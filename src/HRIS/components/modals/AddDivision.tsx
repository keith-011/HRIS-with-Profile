import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ToastHandleAxiosCatch } from "../../../utils/ToastFunctions";
import {
  DivisionNames,
  modalFormId,
  SelectIdDescription,
} from "../../../utils/Globals";

import {
  AddDivisionSchema,
  AddDivisionSType,
} from "../../schema/HRISAddDivision";

import { useModalContext } from "../../context/HRISContext";

import FormInput from "../../../Shared/components/ui/layout/FormInput";
import CustomSelect from "../../../Shared/components/ui/dropdown/CustomSelect";
import { toast } from "react-toastify";

const AddDivision = () => {
  const { refreshParentPage, closeModal } = useModalContext();

  const [departmentList, setDepartmentList] = useState<SelectIdDescription[]>(
    [],
  );
  const [nonHeadList, setNonHeadList] = useState<SelectIdDescription[]>([]);
  const [divisionNames, setDivisionNames] = useState<DivisionNames>([]);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const [fetchDepartments, fetchDivisions, fetchNonHeadUsers] =
          await Promise.all([
            await axios.get("/v1/forms/select/departments", {
              signal: controller.signal,
            }),
            await axios.get("/v1/existence/divisions", {
              signal: controller.signal,
            }),
            await axios.get("/v1/forms/select/department_head", {
              signal: controller.signal,
            }),
          ]);
        setDepartmentList(fetchDepartments.data.rows);
        setDivisionNames(fetchDivisions.data.rows);
        setNonHeadList(fetchNonHeadUsers.data.rows);
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

  const schema = AddDivisionSchema(divisionNames);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddDivisionSType>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onFormSubmit = handleSubmit(async (data) => {
    if (data.division_head === "none") {
      data.division_head = null;
    }
    try {
      const insertNewDivision = await axios.post(
        "/v1/forms/insert/division",
        data,
      );
      toast.success(insertNewDivision.data.message);
      refreshParentPage();
      closeModal();
      reset();
      setRefresh(!refresh);
    } catch (error) {
      ToastHandleAxiosCatch(error);
    }
  });

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
            autoComplete="off"
            className="flex flex-col gap-4 px-6 py-8"
            onSubmit={onFormSubmit}
          >
            <FormInput
              labelText="Department"
              errorMessage={errors.department_id?.message}
            >
              <CustomSelect
                typeOfData="IdAndDescription"
                data={departmentList}
                register={register("department_id")}
              />
            </FormInput>
            <FormInput
              labelText="Division Name"
              errorMessage={errors.division_name?.message}
            >
              <input
                type="text"
                placeholder="Division Name"
                maxLength={150}
                className="modal-input"
                {...register("division_name")}
              />
            </FormInput>
            <FormInput
              labelText="Division Head"
              errorMessage={errors.division_head?.message}
            >
              <CustomSelect
                typeOfData="IdAndDescription"
                data={nonHeadList}
                register={register("division_head")}
              />
            </FormInput>
          </form>
        </>
      )}
    </>
  );
};

export default AddDivision;
