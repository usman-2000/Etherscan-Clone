import "@/styles/globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const App = ({ Component, pageProps }) => (
  <div className="body">
    <Navbar />
    <div>
      <Component {...pageProps} />
    </div>
    <Footer />
  </div>
);

export default App;
