import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Promo from '../Promo/Promo'
import Techs from '../Techs/Techs'

import AboutProject from '../AboutProject/AboutProject'


function Main() {
  return (
    <>
      <Header />
      <div className="main">
        <Promo />
        <AboutProject />
        <Techs />
      </div>
      <Footer />
    </>
  );
}

export default Main;
