import "./App.css";

import SignUp from "./components/signUp/SignUp";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import MainContainer from "./components/dashboard/MainContainer";
import LogIn from "./components/logIn/LogIn";

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
