import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./router/Router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { WavyContainer } from "react-wavy-transitions";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <WavyContainer />
        <Header />
        <Routers />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
