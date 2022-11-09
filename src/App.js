import "./App.css";

import SignUp from "./components/signUp/SignUp";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import MainContainer from "./components/dashboard/MainContainer";
import LogIn from "./components/logIn/LogIn";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./PrivateRouto";
import UserDashboard from "./components/dashboard/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <br />
      <br />
      <br />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
