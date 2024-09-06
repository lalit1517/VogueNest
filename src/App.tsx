import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./router/Router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { WavyContainer } from "react-wavy-transitions";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
      <Router>
        <ScrollToTop />
        <WavyContainer />
        <Header />
        <Routers />
        <Footer />
      </Router>
  );
}

export default App;
