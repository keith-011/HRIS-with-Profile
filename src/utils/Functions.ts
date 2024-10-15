// export const validateHeaders = (
//   headers: { id: string }[],
//   data: Record<string, any>[],
// ) => {
//   const filteredHeaders = headers.filter((header) => header.id !== "action");

//   const isHeaderMatch = data.every((item) =>
//     filteredHeaders.every((header) => header.id in item),
//   );

//   if (!isHeaderMatch) {
//     throw new Error("Column header id do not match table data structure");
//   }
// };
