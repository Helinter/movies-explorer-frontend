import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import More from '../More/More'

function SavedMovies() {
  return (
  <>
    <Header />
    <div className="savedMovies">
    <SearchForm />
      <MoviesCardList />
      <More showButton={false} />
    </div>
    <Footer />
  </>
  );
}

export default SavedMovies;