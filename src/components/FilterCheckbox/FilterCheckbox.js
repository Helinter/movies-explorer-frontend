function FilterCheckbox() {
  return (
    <>
      <div className="filterCheckbox">
        <input type="checkbox" id="myCheckbox" className="filterCheckbox__checkbox"></input>
          <label for="myCheckbox" className="filterCheckbox__checkbox-label"></label>
          <p className="filterCheckbox__text">Короткометражки</p>
      </div>
    </>
  );
}

export default FilterCheckbox;