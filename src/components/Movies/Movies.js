import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies({isFinded, setIsFinded, movies, setMovies, loading, setLoading}) {

  return (
  <>
    <Header />
    <section className="movies">
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
      setLoading = {setLoading}
      isFinded = {isFinded}
      />
    </section>
    <Footer />
  </>
  );
}

export default Movies;