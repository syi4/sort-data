import { useCallback, useState } from "react";
import data from "../data.json";

type Data = typeof data;

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = data.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }
  return sortedData;
}

function SortableTable({ data }: { data: Data }) {
  const [sortKey, setSortKey] = useState<SortKeys>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const headers = [
    { key: "id", label: "ID" },
    { key: "first_name", label: "First name" },
    { key: "last_name", label: "Last name" },
    { key: "email", label: "Email" },
    { key: "gender", label: "Gender" },
    { key: "ip_address", label: "IP address" },
  ];

  const sortedData = useCallback(
    () =>
      sortData({
        tableData: data,
        sortKey,
        reverse: sortOrder === "desc",
      }),
    [data, sortKey, sortOrder]
  );

  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return <td key={row.key}>{row.label}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((person) => {
          return (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.first_name}</td>
              <td>{person.last_name}</td>
              <td>{person.email}</td>
              <td>{person.gender}</td>
              <td>{person.ip_address}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SortableTable;
