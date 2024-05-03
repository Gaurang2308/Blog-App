import "./App.css";
import Nav from "./Components/Navbar/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Blog from "./Components/UserDashboard/Blog";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Nav} />
          <Route path="/signup" Component={Signup}></Route>
          <Route path="/signin" Component={Login}></Route>
          <Route path="/blogs" Component={Blog}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
