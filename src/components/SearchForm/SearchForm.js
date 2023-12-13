import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {
  return (
    <>
      <section className="searchForm">
        <form >
          <div className="searchForm__input__container">
          <input
            className="searchForm__input"
            minLength="2"
            maxLength="30"
            type="text"
            name="searchForm"
            placeholder="Фильм"
          />
          <button className="searchForm__button" >
            Поиск
          </button>
          
          </div>
          <FilterCheckbox />
        </form >
      </section>
    </>
  );
}

export default SearchForm;