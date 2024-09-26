import PageHeader from "../components/content/PageHeader";
import TableHeader from "../components/ui/TableHeader";
import TableRecordPerPage from "../components/ui/TableRecordPerPage";

import Avatar1 from "/src/assets/images/Avatar.png";

import TablePagination from "../components/ui/TablePagination";
import useTableProperties from "../../hooks/useTableProperties";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useModalContext } from "../context/HRISContext";
import AddDepartment from "../components/modals/AddDepartment";

const Department = () => {
  const { openModal } = useModalContext();
  const breadcrumbs = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Departments", link: "/departments" },
  ];

  const tableHeader = [
    { id: "department", text: "Department" },
    { id: "head", text: "Department Head" },
    { id: "division", text: "Divisions" },
    { id: "action", text: "Action" },
  ];

  const tableData = [
    {
      id: "1",
      department: "Business Development",
      head: "Isabella Gray",
      division: 0,
    },
    {
      id: "2",
      department: "Guidance and Counseling Services",
      head: "Mason Reed",
      division: 3,
    },
    {
      id: "3",
      department: "General Education",
      head: "Harper Collins",
      division: 0,
    },
    {
      id: "4",
      department: "Center for Information  Management and Technical Support",
      head: "Jameson Clark",
      division: 4,
    },
    {
      id: "5",
      department: "Safety and Security Management Office",
      head: "Lily Morris",
      division: 2,
    },
    {
      id: "6",
      department: "Information Resource Center",
      head: "Alexander King",
      division: 0,
    },
  ];

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
        header="Departments"
        importFunction={() => {}}
        exportFunction={() => {}}
        buttonText="Add Department"
        buttonFunction={() => {
          openModal({
            header: "Add Department",
            subheading:
              "Add a new department by entering the required information here",
            content: <AddDepartment />,
          });
        }}
        breadcrumbs={breadcrumbs}
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
                  {/* Standard Cells */}
                  <td className="table-data">{item.department}</td>
                  {/* For cells with images */}
                  <td className="table-data">
                    <div className="flex items-center gap-3">
                      <div className="max-h-8 min-h-8 min-w-8 max-w-8 shrink-0 overflow-hidden rounded-full">
                        <img src={Avatar1} className="object-cover" />
                      </div>
                      <span>{item.head}</span>
                    </div>
                  </td>
                  <td className="table-data">{item.division}</td>
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
          currentPage={currentPage}
          recordPerPage={recordPerPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      </div>
    </>
  );
};

export default Department;
