import AddNewFaculty from "./component/AddNewFaculty";
import FacultyTable from "./component/FacultyTable";

export default function Faculties() {
  return (
    <div className="bg-white p-5 border border-gray-200">
      <AddNewFaculty />
      <FacultyTable />
    </div>
  );
}
