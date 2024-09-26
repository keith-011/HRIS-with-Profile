import { useMemo, useState } from "react";

import SwapVertIcon from "@mui/icons-material/SwapVert";

interface Props {
  tableHeader: { id: string; text: string }[];
  requestSort: (key: any) => void;
}

const TableHeader: React.FC<Props> = ({ tableHeader, requestSort }) => {
  return (
    <>
      {tableHeader.map((item) => {
        const isActionColumn = item.id === "action";
        return (
          <th
            key={item.id}
            className={`h-table-cell bg-accent-50 px-6 text-left font-medium ${!isActionColumn && "hover:cursor-pointer"}`}
            onClick={
              !isActionColumn
                ? () => {
                    requestSort(item.id);
                  }
                : undefined
            }
          >
            <div
              className={`flex gap-3 ${!isActionColumn ? "justify-between" : "justify-center"}`}
            >
              <span>{item.text}</span>
              {!isActionColumn && <SwapVertIcon />}
            </div>
          </th>
        );
      })}
    </>
  );
};

export default TableHeader;
