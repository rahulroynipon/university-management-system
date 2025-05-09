import AddNewBatch from "./component/AddNewBatch";
import BatchTable from "./component/BatchTable";

export default function Batches() {
  return (
    <div className="bg-white p-5 border border-gray-200">
      <AddNewBatch />
      <BatchTable />
    </div>
  );
}
