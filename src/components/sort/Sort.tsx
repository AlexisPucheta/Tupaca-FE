import React from "react";
import { SORT_TYPES } from "../../enums";

interface SortProps {
  onSortChange: (order: SORT_TYPES) => void;
}

const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSortChange(selectedOption as SORT_TYPES);
  };

  return (
    <div>
      <label htmlFor="sortSelect">Ordenar:</label>
      <select id="sortSelect" onChange={handleSortChange} defaultValue="custom">
        <option value="custom">Custom</option>
        <option value={SORT_TYPES.ASC_ALPHA}>A to Z</option>
        <option value={SORT_TYPES.DESC_ALPHA}>Z to A</option>
        <option value={SORT_TYPES.ASC_DATE}>Newest</option>
        <option value={SORT_TYPES.DESC_DATE}>Oldest</option>
      </select>
    </div>
  );
};

export default Sort;
