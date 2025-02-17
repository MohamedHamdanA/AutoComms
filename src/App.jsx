import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Classes from "./pages/classes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Instagram from "./pages/instagram";
import Facebook from "./pages/facebook";
import Youtube from "./pages/youtube";
import Youtubelogin from "./pages/Youtubelogin";
import InstaLogin from "./pages/InstaLogin";
import ClassCreate from "./components/classcreate";
import ClassDetail from "./components/classDetails";
import Gformcreate from "./components/gformcreate";
import Announcement from "./components/Announcement";
import GformDetails from "./components/gformDetails";
import FaceLogin from "./pages/FaceLogin";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/Youtubelogin" element={<Youtubelogin />} />
        <Route path="/InstaLogin" element={<InstaLogin />} />
        <Route path="/FaceLogin" element={<FaceLogin />} />
        {/* Added route for the YouTube dashboard */}
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/createclass" element={<ClassCreate />} />
        <Route path="/classes/:classId" element={<ClassDetail />} />
        <Route path="/classes/googleform/:classId/:formId" element={<GformDetails />} />
        <Route path="/classes/googleform/create/:classId" element={<Gformcreate />} />
        <Route path="/classes/googleform/Announcement/:classId" element={<Announcement />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
