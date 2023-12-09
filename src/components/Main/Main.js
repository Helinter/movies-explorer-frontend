import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Promo from '../Promo/Promo'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'
import AboutProject from '../AboutProject/AboutProject'


function Main() {
  return (
    <>

      <div className="sea-background">
        <Header />
      </div>
      <section className="main">
        <div className="sea-background">
          <Promo />
        </div>
        <AboutProject />
        <div className="grey-background">
        <Techs />
        </div>
        <AboutMe />
        <Portfolio />
      </section>
      <Footer />
    </>
  );
}

export default Main;
