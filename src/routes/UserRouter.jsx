import Login from "../pages/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Auth from "../auth/Auth";
import UserHome from "../pages/UserHome";
import AdminHome from "../pages/AdminHome";
import AddBankDetails from "../components/AddAccount";
import Deposit from "../components/Deposit";
import Withdrawal from "../components/Withdrawal";

function UserRouter() {
  return (
    <div>
      {" "}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<UserHome />}></Route>
          <Route path="/admin" element={<AdminHome />}></Route>
          <Route path="/addAccount" element={<AddBankDetails />}></Route>
          <Route path="/deposit" element={<Deposit />}></Route>
          <Route path="/withdrawal" element={<Withdrawal />}></Route>


        </Route>
      </Routes>
    </div>
  );
}

export default UserRouter;
