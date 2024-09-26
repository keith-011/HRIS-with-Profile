import PageHeader from "../components/content/PageHeader";
import useTableProperties from "../../hooks/useTableProperties";
import TableRecordPerPage from "../components/ui/TableRecordPerPage";
import TableHeader from "../components/ui/TableHeader";
import Avatar1 from "/src/assets/images/Avatar.png";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import TablePagination from "../components/ui/TablePagination";

const Division = () => {
  const breadcrumbs = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Divisions", link: "/division" },
  ];

  const tableHeader = [
    { id: "division", text: "Division" },
    { id: "division_head", text: "Division Head" },
    { id: "department", text: "Department" },
    { id: "action", text: "Action" },
  ];

  const tableData = [
    {
      id: "1",
      division: "Parent and Community Outreach Division",
      division_head: "Delone Iarch",
      department: "Guidance and Counseling Services",
    },
    {
      id: "2",
      division: "Career Counseling Division",
      division_head: "Tricia De Leon",
      department: "Guidance and Counseling Services",
    },
    {
      id: "3",
      division: "Risk Assessment and Management Division",
      division_head: "Bruno Lockhart",
      department: "Safety and Security Management Office",
    },
    {
      id: "4",
      division: "Health and Safety Division",
      division_head: "Bruno Lockhart",
      department: "Safety and Security Management Office",
    },
    {
      id: "5",
      division: "IT Support Division",
      division_head: "Ian Calleu",
      department: "Center for Information  Management and Technical Support",
    },
    {
      id: "6",
      division: "Technology Integration Division",
      division_head: "Victor Galleo",
      department: "Center for Information  Management and Technical Support",
    },
    {
      id: "7",
      division: "Network Administration Division",
      division_head: "Francis Cordello",
      department: "Center for Information  Management and Technical Support",
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
          // TO DO
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
                  {/* Standard Cells */}
                  <td className="table-data">{item.division}</td>
                  {/* For cells with images */}
                  <td className="table-data">
                    <div className="flex items-center gap-3">
                      <div className="max-h-8 min-h-8 min-w-8 max-w-8 shrink-0 overflow-hidden rounded-full">
                        <img src={Avatar1} className="object-cover" />
                      </div>
                      <span>{item.division_head}</span>
                    </div>
                  </td>
                  <td className="table-data">{item.department}</td>
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

export default Division;
