import AddNewCourse from "./component/AddNewCourse";
import CourseTable from "./component/CourseTable";

export default function Courses() {
  return (
    <div className="bg-white p-5 border border-gray-200">
      <AddNewCourse />
      <CourseTable />
    </div>
  );
}
