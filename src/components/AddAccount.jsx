import { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
function AddBankDetails() {
  const [formData, setFormData] = useState({
    accountNumber: "",
    ifsc: "",
    phoneNumber: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveAccount = async () => {
    try {
      const response = await axiosInstance.post("/accountDetails", formData);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    saveAccount().then(() => {
      setSubmitting(false);
      setFormData({
        accountNumber: "",
        ifsc: "",
        phoneNumber: "",
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Add Bank Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Account Number
            </label>
            <input
            maxLength={9}
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="ifsc"
              className="block text-sm font-medium text-gray-700"
            >
              IFSC
            </label>
            <input
              type="text"
              id="ifsc"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                submitting ? "cursor-not-allowed" : ""
              }`}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBankDetails;
