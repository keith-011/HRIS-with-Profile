import { useState, useMemo } from "react";
import { maxTableRecord } from "../utils/Globals";

type SortConfig<T> = {
  key: keyof T;
  direction: "asc" | "desc";
} | null;

const useTableProperties = <T extends { [key: string]: any }>(
  initialData: T[],
) => {
  const [recordPerPage, setRecordPerPage] = useState<number>(maxTableRecord[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);

  const pageLastIndex = currentPage * recordPerPage;
  const pageFirstIndex = pageLastIndex - recordPerPage;
  const currentData = initialData.slice(pageFirstIndex, pageLastIndex);
  const totalPage = Math.ceil(initialData.length / recordPerPage);

  const sortedTableData = useMemo(() => {
    if (sortConfig && sortConfig.key == null) {
      throw new Error("headers and columns do not have a matching key");
    }
    let sortableData = [...currentData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [currentData, sortConfig]);

  // Events
  const onChangeMaxEntries = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRecordPerPage(Number(event.target.value));
  };

  const onClickHeaderSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return {
    sortedTableData,
    onClickHeaderSort,
    onChangeMaxEntries,
    setCurrentPage,
    totalPage,
    currentPage,
    recordPerPage,
  };
};

export default useTableProperties;
