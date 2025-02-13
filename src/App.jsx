import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Classes from "./pages/classes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Instagram from "./pages/instagram";
import Facebook from "./pages/facebook";
import Youtube from "./pages/youtube";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/instagram" element={<Instagram/>}/>
        <Route path="/youtube" element={<Youtube/>}/>
        <Route path="/facebook" element={<Facebook/>}/>
      </Routes>
    </Router>
  );
}

export default App