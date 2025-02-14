import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Classes from "./pages/classes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Instagram from "./pages/instagram";
import Facebook from "./pages/facebook";
import Youtube from "./pages/youtube";
import ClassCreate from "./components/classcreate";
import ClassDetail from "./components/classDetails";
import Gformcreate from "./components/gformcreate";
import GformDetails from "./components/gformDetails";
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
        <Route path="/createclass" element={<ClassCreate />} />
        <Route path="/classes/:classId" element={<ClassDetail />} />
        <Route path="/classes/googleform/:classId/:gformId" element={<GformDetails />} />
        <Route path="/classes/googleform/create/:classId" element={<Gformcreate/>} />
      </Routes>
    </Router>
  );
}

export default App