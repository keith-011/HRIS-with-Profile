import { ColumnHeader } from "../../../../utils/Globals";

import SwapVertIcon from "@mui/icons-material/SwapVert";

interface Props {
  tableHeader: ColumnHeader;
  onColumnClick: (key: any) => void;
}

const TableHeader: React.FC<Props> = ({
  onColumnClick: requestSort,
  tableHeader,
}) => {
  const isActionColumn = tableHeader.id === "action";
  return (
    <>
      <th
        // h-table-cell
        className={`px-6 py-4 text-left font-medium ${!isActionColumn && "hover:cursor-pointer"} ${tableHeader.width}`}
        onClick={
          !isActionColumn
            ? () => {
                requestSort(tableHeader.id);
              }
            : undefined
        }
      >
        <div
          className={`flex items-center gap-3 ${!isActionColumn ? "justify-between" : "justify-center"}`}
        >
          <span>{tableHeader.headerName}</span>
          {!isActionColumn && <SwapVertIcon />}
        </div>
      </th>
    </>
  );
};

export default TableHeader;
