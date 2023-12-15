import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import More from '../More/More'

function SavedMovies({isFinded, setIsFinded, movies, setMovies, loading, setLoading}) {
  return (
  <>
    <Header />
    <section className="savedMovies">
    <SearchForm 
     isFinded = {isFinded}
     setIsFinded = {setIsFinded}
     movies = {movies}
     setMovies = {setMovies}
     loading = {loading}
     setLoading = {setLoading}
    />
      <MoviesCardList 
      movies = {movies}
      loading = {loading}
      isFinded = {isFinded}
      />
      <More showButton={false} />
    </section>
    <Footer />
  </>
  );
}

export default SavedMovies;