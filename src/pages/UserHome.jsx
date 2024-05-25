import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";

function UserHome() {
  const [token, setToken] = useState(null);
  const [balance, setBalance] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setToken(decodedToken);
      setId(decodedToken.userId);
    }
  }, []);

  const handleCheckBalance = async () => {
    try {
      const response = await axiosInstance.get(`/checkBalance/${id}`);
      const balance = response.data.balance;
      console.log(balance, " balance ");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Welcome to Your Banking Portal
          </h1>
          <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100">
            Add Account
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
         

          <div className="bg-white rounded-lg shadow p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Check Balance</h2>
            <button
              onClick={handleCheckBalance}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Show
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Deposit</h2>
            <Link to={"/deposit"}>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                Deposit
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Withdrawal</h2>
            <Link to={"/withdrawal"}>
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                Withdrawal
              </button>
            </Link>
          </div>

          {/* Add more feature cards as needed */}
        </div>
      </main>
    </div>
  );
}

export default UserHome;
