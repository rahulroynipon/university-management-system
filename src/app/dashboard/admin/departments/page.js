import { TableHeader } from "@/components/Table";
import AddNewDepartment from "./component/AddNewDepartment";

export default function Departments() {
  return (
    <div className="bg-white p-5 border border-gray-200">
      <AddNewDepartment />
      <table className="w-full table-auto">
        <TableHeader items={["ID", "Icon", "Name", "Description", "Actions"]} />

        <tbody></tbody>
      </table>
    </div>
  );
}
