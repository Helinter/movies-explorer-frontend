// В FilterCheckbox.js
function FilterCheckbox({ isChecked, onCheckboxChange }) {
  return (
    <div className="filterCheckbox">
      <input
        type="checkbox"
        id="myCheckbox"
        className="filterCheckbox__checkbox"
        checked={isChecked}
        onChange={onCheckboxChange}
      />
      <label htmlFor="myCheckbox" className="filterCheckbox__checkbox-label"></label>
      <p className="filterCheckbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
