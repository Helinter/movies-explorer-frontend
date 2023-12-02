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
      <Header />
      <div className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </div>
      <Footer />
    </>
  );
}

export default Main;
