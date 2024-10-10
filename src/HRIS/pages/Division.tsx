import Table from "../../Shared/components/ui/layout/Table";
import TableRow from "../../Shared/components/ui/layout/TableRow";

import PageHeader from "../components/content/PageHeader";
import TablePagination from "../components/ui/TablePagination";
import TableHeader from "../components/ui/table/TableHeader";
import TableData from "../components/ui/table/TableData";
import TableRecordPerPage from "../components/ui/TableRecordPerPage";

import useTableProperties from "../../hooks/useTableProperties";

import { ColumnHeader } from "../../utils/Globals";
import { useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import { useModalContext } from "../context/HRISContext";
import TableContainer from "../../Shared/components/ui/layout/TableContainer";
import { TableHead } from "@mui/material";
import TableBody from "../components/ui/table/TableBody";
import AddDivision from "../components/modals/AddDivision";

interface FetchedData {
  id: string;
  division: string;
  division_head: string;
  image_path?: string;
  department: string;
}

const Division = () => {
  const breadcrumbs = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Divisions", link: "/division" },
  ];

  const tableHeader: ColumnHeader[] = [
    { id: "division", headerName: "Division", width: "w-[40%]" },
    { id: "division_head", headerName: "Division Head", width: "w-[30%]" },
    { id: "department", headerName: "Department", width: "w-[25%]" },
    { id: "action", headerName: "Action", width: "w-[5%]" },
  ];

  const { openModal, refresh } = useModalContext();

  const { tableData, isError, isLoading } = useFetchData<FetchedData>(
    "/v1/table/divisions",
    refresh,
  );

  const {
    sortableTableData,
    sortColumn,
    changePagination,
    setCurrentPage,
    totalPage,
    currentPage,
    recordPerPage,
  } = useTableProperties(tableData);

  return (
    <>
      <PageHeader
        header="Divisions"
        breadcrumbs={breadcrumbs}
        exportFunction={() => {
          // TO DO
        }}
        importFunction={() => {
          // TO DO
        }}
        buttonText="Add Division"
        buttonFunction={() => {
          openModal({
            header: "Add Division",
            subheading:
              "Add a new division by entering the required information here.",
            content: <AddDivision />,
          });
        }}
      />

      {isLoading && <p>Loading...</p>}
      {!isLoading && isError && <p>An error ocurred.</p>}
      {!isLoading && !isError && (
        <>
          <div className="flex flex-col gap-3">
            <TableRecordPerPage onChange={changePagination} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow colorIndex={1}>
                    {tableHeader.map((item) => (
                      <TableHeader
                        key={item.id}
                        tableHeader={{
                          id: item.id,
                          headerName: item.headerName,
                          width: item.width,
                        }}
                        onColumnClick={sortColumn}
                      />
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortableTableData.map((item, index) => (
                    <TableRow key={item.id} colorIndex={index}>
                      <TableData defaultData={item.division} />
                      <TableData
                        withImage={{
                          imagePath: item.image_path,
                          text: item.division_head,
                        }}
                      />
                      <TableData defaultData={item.department} />
                      <TableData isAction={true} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              tableData={tableData}
              currentPage={currentPage}
              recordPerPage={recordPerPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Division;
