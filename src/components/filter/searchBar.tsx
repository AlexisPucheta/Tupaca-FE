interface Props {
  onFilterChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ onFilterChange }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.value;
    onFilterChange(selectedOption);
  };
  return (
    <>
      <div className="w-full px-6 mt-2 h-5">
        <input
          placeholder="Filter your tasks"
          className="w-full h-full pl-2 rounded-md"
          onChange={handleFilterChange}
        ></input>
      </div>
    </>
  );
};
export default SearchBar;
