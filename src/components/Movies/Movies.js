import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import More from '../More/More'

function Movies() {
  return (
  <>
    <Header />
    <div className="movies">
      <SearchForm />
      <MoviesCardList />
      <More showButton={true}/>
    </div>
    <Footer />
  </>
  );
}

export default Movies;