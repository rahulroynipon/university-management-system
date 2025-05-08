const TableHeader = ({ items }) => {
  return (
    <thead className="py-3 bg-red-700">
      <tr>
        {items?.map((item, index) => (
          <th key={index} className="py-2 uppercase text-sm text-white">
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export { TableHeader };
