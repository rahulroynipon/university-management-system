
import AddNewDepartment from "./component/AddNewDepartment";
import DepartmentTable from "./component/DepartmentTable";

export default function Departments() {
 

  return (
    <div className="bg-white p-5 border border-gray-200">
      <AddNewDepartment />
      <DepartmentTable />
    </div>
  );
}
