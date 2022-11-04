import "./App.css";
import MainContainer from "./components/Dashboard/MainContainer";
import SignUp from "./components/SignUp/SignUp";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
