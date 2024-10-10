import { useModalContext } from "../context/HRISContext";

import useTableProperties from "../../hooks/useTableProperties";

import PageHeader from "../components/content/PageHeader";
import TableHeader from "../components/ui/table/TableHeader";
import TableRecordPerPage from "../components/ui/TableRecordPerPage";
import TablePagination from "../components/ui/TablePagination";
import AddDepartment from "../components/modals/AddDepartment";
import TableData from "../components/ui/table/TableData";
import Table from "../../Shared/components/ui/layout/Table";
import TableRow from "../../Shared/components/ui/layout/TableRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastHandleAxiosCatch } from "../../utils/ToastFunctions";
import TableContainer from "../../Shared/components/ui/layout/TableContainer";
import TableHead from "../components/ui/table/TableHead";
import TableBody from "../components/ui/table/TableBody";
import { useFetchData } from "../../hooks/useFetchData";
import { ColumnHeader } from "../../utils/Globals";

interface FetchedData {
  id: string;
  department: string;
  head: string;
  image_path?: string;
  division_count: number;
}

const Department = () => {
  const breadcrumbs = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Departments", link: "/departments" },
  ];

  const tableHeader: ColumnHeader[] = [
    { id: "department", headerName: "Department", width: "w-[40%]" },
    { id: "head", headerName: "Department Head", width: "w-[30%]" },
    { id: "division", headerName: "Divisions", width: "w-[25%]" },
    { id: "action", headerName: "Action", width: "w-[5%]" },
  ];

  const { openModal, refresh } = useModalContext();

  const { tableData, isError, isLoading } = useFetchData<FetchedData>(
    "/v1/table/departments",
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
        header="Departments"
        importFunction={() => {
          // TO DO
        }}
        exportFunction={() => {
          // TO DO
        }}
        buttonText="Add Department"
        buttonFunction={() => {
          openModal({
            header: "Add Department",
            subheading:
              "Add a new department by entering the required information here.",
            content: <AddDepartment />,
          });
        }}
        breadcrumbs={breadcrumbs}
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
                {!isError ? (
                  <>
                    <TableBody>
                      {sortableTableData.map((item, index) => (
                        <TableRow key={item.id} colorIndex={index}>
                          <TableData defaultData={item.department} />
                          <TableData
                            withImage={{
                              imagePath: item.image_path,
                              text: item.head,
                            }}
                          />
                          <TableData defaultData={item.division_count} />
                          <TableData isAction={true} />
                        </TableRow>
                      ))}
                    </TableBody>
                  </>
                ) : (
                  <p>Error fetching data.</p>
                )}
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

      {/* {sortableTableData == null && <p>Loading Data.</p>} */}
    </>
  );
};

export default Department;

// import { useModalContext } from "../context/HRISContext";

// import useTableProperties from "../../hooks/useTableProperties";

// import PageHeader from "../components/content/PageHeader";
// import TableHeader from "../components/ui/table/TableHeader";
// import TableRecordPerPage from "../components/ui/TableRecordPerPage";
// import TablePagination from "../components/ui/TablePagination";
// import AddDepartment from "../components/modals/AddDepartment";
// import TableData from "../components/ui/table/TableData";
// import Table from "../../Shared/components/ui/layout/Table";
// import TableRow from "../../Shared/components/ui/layout/TableRow";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastHandleAxiosCatch } from "../../utils/ToastFunctions";
// import TableContainer from "../../Shared/components/ui/layout/TableContainer";
// import TableHead from "../components/ui/table/TableHead";
// import TableBody from "../components/ui/table/TableBody";

// interface FetchedData {
//   id: string;
//   department: string;
//   head: string;
//   image_url?: string;
//   division_count: number;
// }

// const Department = () => {
//   const breadcrumbs = [
//     { text: "Dashboard", link: "/dashboard" },
//     { text: "Departments", link: "/departments" },
//   ];

//   const tableHeader = [
//     { id: "department", text: "Department", width: "w-[40%]" },
//     { id: "head", text: "Department Head", width: "w-[30%]" },
//     { id: "division", text: "Divisions", width: "w-[25%]" },
//     { id: "action", text: "Action", width: "w-[5%]" },
//   ];

//   const [tableData, setTableData] = useState<FetchedData[] | undefined>(
//     undefined,
//   );
//   const [isLoading, setLoading] = useState<boolean>(true);
//   const [isError, setError] = useState<boolean>(false);
//   const { openModal, refresh } = useModalContext();

//   useEffect(() => {
//     (async () => {
//       const controller = new AbortController();
//       try {
//         const fetchData = await axios.get("/v1/departments", {
//           signal: controller.signal,
//         });
//         setTableData(fetchData.data.rows);
//       } catch (error) {
//         setError(ToastHandleAxiosCatch(error));
//       } finally {
//         setLoading(false);
//       }

//       return () => {
//         controller.abort();
//       };
//     })();
//   }, [refresh]);

//   const {
//     sortableTableData,
//     sortColumn,
//     changePagination,
//     setCurrentPage,
//     totalPage,
//     currentPage,
//     recordPerPage,
//   } = useTableProperties(tableData);

//   return (
//     <>
//       <PageHeader
//         header="Departments"
//         importFunction={() => {}}
//         exportFunction={() => {}}
//         buttonText="Add Department"
//         buttonFunction={() => {
//           openModal({
//             header: "Add Department",
//             subheading:
//               "Add a new department by entering the required information here",
//             content: <AddDepartment />,
//           });
//         }}
//         breadcrumbs={breadcrumbs}
//       />

//       {isLoading && <p>Loading...</p>}
//       {!isLoading && isError && <p>An error ocurred.</p>}
//       {!isLoading && !isError && (
//         <>
//           {sortableTableData && tableData && (
//             <>
//               <div className="flex flex-col gap-3">
//                 <TableRecordPerPage onChange={changePagination} />
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow colorIndex={1}>
//                         {tableHeader.map((item) => (
//                           <TableHeader
//                             key={item.id}
//                             tableHeader={{
//                               id: item.id,
//                               headerName: item.text,
//                               width: item.width,
//                             }}
//                             onColumnClick={sortColumn}
//                           />
//                         ))}
//                       </TableRow>
//                     </TableHead>
//                     {!isError ? (
//                       <>
//                         <TableBody>
//                           {sortableTableData.map((item, index) => (
//                             <TableRow key={index} colorIndex={index}>
//                               <TableData defaultData={item.department} />
//                               <TableData
//                                 withImage={{
//                                   imagePath: item.image_url,
//                                   text: item.head,
//                                 }}
//                               />
//                               <TableData defaultData={item.division_count} />
//                               <TableData isAction={true} />
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </>
//                     ) : (
//                       <p>Error fetching data.</p>
//                     )}
//                   </Table>
//                 </TableContainer>

//                 <TablePagination
//                   tableData={tableData}
//                   currentPage={currentPage}
//                   recordPerPage={recordPerPage}
//                   setCurrentPage={setCurrentPage}
//                   totalPage={totalPage}
//                 />
//               </div>
//             </>
//           )}
//         </>
//       )}

//       {/* {sortableTableData == null && <p>Loading Data.</p>} */}
//     </>
//   );
// };

// export default Department;
