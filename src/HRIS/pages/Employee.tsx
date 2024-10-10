import { useModalContext } from "../context/HRISContext";

import Table from "../../Shared/components/ui/layout/Table";
import TableRow from "../../Shared/components/ui/layout/TableRow";

import PageHeader from "../components/content/PageHeader";
import TableHeader from "../components/ui/table/TableHeader";
import TableRecordPerPage from "../components/ui/TableRecordPerPage";
import TablePagination from "../components/ui/TablePagination";
import TableData from "../components/ui/table/TableData";

import useTableProperties from "../../hooks/useTableProperties";

import { validateHeaders } from "../../utils/Functions";
import AddEmployee from "../components/modals/AddEmployee";

const Employee = () => {
  const { openModal } = useModalContext();

  const breadcrumbs = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Employees", link: "/employees" },
  ];

  const tableHeader = [
    { id: "employee_number", text: "Employee Number", width: "w-[10%]" },
    { id: "name", text: "Name", width: "w-[15%]" },
    { id: "email", text: "Email", width: "w-[20%]" },
    { id: "plantilla", text: "Designation (Plantilla)", width: "w-[25%]" },
    { id: "designation", text: "Designation (PCC)", width: "w-[25%]" },
    { id: "action", text: "Action", width: "w-[5%]" },
  ];

  const tableData = [
    {
      id: "1",
      image_url: "/src/assets/images/Avatar.png",
      name: "Isabella Gray",
      employee_number: "2020-00096-PQ-0",
      email: "sample@gmail.com",
      plantilla: "Associate Professor I",
      designation: "Local Human Resource Management Office",
    },
    {
      id: "2",
      image_url: "/src/assets/images/Avatar.png",
      name: "Isabella Gray",
      employee_number: "2020-00097-PQ-0",
      email: "sample@gmails.com",
      plantilla: "Associate Professor eI",
      designation: "Local Human Resource Management Office",
    },
    {
      id: "3",
      image_url: "/src/assets/images/Avatar.png",
      name: "Isabella Gray",
      employee_number: "2020-00098-PQ-0",
      email: "sample@gmail.com",
      plantilla: "Associate Professor I",
      designation: "Local Human Resource Management Office",
    },
    {
      id: "4",
      image_url: "/src/assets/images/Avatar.png",
      name: "Isabella Gray",
      employee_number: "2020-00099-PQ-0",
      email: "sample@gmail.com",
      plantilla: "Associate Professor I",
      designation: "Local Human Resource Management Office",
    },
  ];

  validateHeaders(tableHeader, tableData);

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
        header="Employees"
        breadcrumbs={breadcrumbs}
        exportFunction={() => {
          // TO DO
        }}
        importFunction={() => {
          // TO DO
        }}
        buttonText="Add Employee"
        buttonFunction={() => {
          openModal({
            header: "Add Employee",
            subheading:
              "Add a new employee by entering the required information here",
            content: <AddEmployee />,
          });
        }}
      />

      <div className="flex flex-col gap-3">
        <TableRecordPerPage onChange={changePagination} />

        <Table>
          <thead>
            <tr>
              {tableHeader.map((item) => (
                <TableHeader
                  key={item.id}
                  tableHeader={{
                    id: item.id,
                    headerName: item.text,
                    width: item.width,
                  }}
                  onColumnClick={sortColumn}
                />
              ))}
            </tr>
          </thead>
          <tbody className="table-body">
            {sortableTableData.map((item, index) => (
              <TableRow key={index} colorIndex={index}>
                <TableData defaultData={item.employee_number} />
                <TableData
                  withImage={{ imagePath: item.image_url, text: item.name }}
                />
                <TableData defaultData={item.email} />
                <TableData defaultData={item.plantilla} />
                <TableData defaultData={item.designation} />
                <TableData isAction={true} />
              </TableRow>
            ))}
          </tbody>
        </Table>

        <TablePagination
          tableData={tableData}
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          recordPerPage={recordPerPage}
        />
      </div>
    </>
  );
};

export default Employee;
