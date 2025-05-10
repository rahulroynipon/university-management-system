const SelectFilter = ({
  options = [],
  onChange,
  className = "",
  placeholder,
  value,
}) => {
  return (
    <select
      className={`p-2.5 cursor-pointer border border-gray-300 text-sm focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 ${className}`}
      value={value}
      onChange={onChange}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectFilter;
