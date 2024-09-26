import Avatar1 from "/src/assets/images/Avatar.png";

import { useModalContext } from "../context/HRISContext";

import PageHeader from "../components/content/PageHeader";
import AddEmployee from "../components/modals/AddEmployee";
import TableHeader from "../components/ui/TableHeader";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableRecordPerPage from "../components/ui/TableRecordPerPage";
import TablePagination from "../components/ui/TablePagination";
import useTableProperties from "../../hooks/useTableProperties";
import { validateHeaders } from "../../utils/Functions";

const Employee = () => {
  const { openModal } = useModalContext();

  const breadcrumbs = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Employees", link: "/employees" },
  ];

  const tableHeader = [
    { id: "name", text: "Name" },
    { id: "employee_number", text: "Employee Number" },
    { id: "email", text: "Email" },
    { id: "plantilla", text: "Designation (Plantilla)" },
    { id: "designation", text: "Designation (PCC)" },
    { id: "action", text: "Action" },
  ];

  const tableData = [
    {
      id: "1",
      name: "Isabella Gray",
      employee_number: "2020-00096-PQ-0",
      email: "sample@gmail.com",
      plantilla: "Associate Professor I",
      designation: "Local Human Resource Management Office",
    },
    {
      id: "2",
      name: "Isabella Gray",
      employee_number: "2020-00097-PQ-0",
      email: "sample@gmails.com",
      plantilla: "Associate Professor I",
      designation: "Local Human Resource Management Office",
    },
    {
      id: "3",
      name: "Isabella Gray",
      employee_number: "2020-00098-PQ-0",
      email: "sample@gmail.com",
      plantilla: "Associate Professor I",
      designation: "Local Human Resource Management Office",
    },
    {
      id: "4",
      name: "Isabella Gray",
      employee_number: "2020-00099-PQ-0",
      email: "sample@gmail.com",
      plantilla: "Associate Professor I",
      designation: "Local Human Resource Management Office",
    },
  ];

  validateHeaders(tableHeader, tableData);

  const {
    sortedTableData,
    onClickHeaderSort,
    onChangeMaxEntries,
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
        <TableRecordPerPage onChange={onChangeMaxEntries} />

        {/* Table */}
        <div className="scrollable overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <TableHeader
                  tableHeader={tableHeader}
                  requestSort={onClickHeaderSort}
                />
              </tr>
            </thead>
            <tbody className="table-body">
              {sortedTableData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 == 0 ? "bg-accent-150" : "bg-accent-50"}`}
                >
                  {/* For cells with images */}
                  <td className="table-data">
                    <div className="flex items-center gap-3">
                      <div className="max-h-8 min-h-8 min-w-8 max-w-8 shrink-0 overflow-hidden rounded-full">
                        <img src={Avatar1} className="object-cover" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  {/* Standard Cells */}
                  <td className="table-data">{item.employee_number}</td>
                  <td className="table-data">{item.email}</td>
                  <td className="table-data">{item.plantilla}</td>
                  <td className="table-data">{item.designation}</td>

                  {/* Action Cells */}
                  <td className="table-data flex items-center justify-center">
                    <button>
                      <MoreVertIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
