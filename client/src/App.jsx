import { useState } from 'react';
// import Titulos from './components/TitulosContainer.jsx';
// import Home from './layouts/Home.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import TitulosContainer from './components/TitulosContainer.jsx';
// import Display from './components/Display.jsx';

function App() {
  const [count, setCount] = useState(0);
 
  return (
    <>
      <Header />
      <main>
        <section className="sec-home min-vh-100 fondo-color text-light">
          {/* <Display /> */}
          {/* <Home /> */}
          <TitulosContainer />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App

