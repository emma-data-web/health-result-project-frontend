import React, { useState } from "react";

const DiabetesForm = ({ onSubmit }) => {
  const [diabetesData, setDiabetesData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiabetesData({
      ...diabetesData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(diabetesData, () => {
        setDiabetesData({
          Pregnancies: "",
          Glucose: "",
          BloodPressure: "",
          SkinThickness: "",
          Insulin: "",
          BMI: "",
          DiabetesPedigreeFunction: "",
          Age: "",
        });
      });
      
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-6"
    >
      <h2 className="text-xl font-bold text-blue-700 text-center">
        Send Diabetes Report
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {Object.keys(diabetesData).map((key) => (
          <label key={key} className="text-left">
            <span className="block text-sm font-medium text-gray-700 mb-1">
              {key.replace("_", " ")}
            </span>
            <input
              type="number"
              name={key}
              placeholder={key.replace("_", " ")}
              value={diabetesData[key]}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2 w-full"
            />
          </label>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
      >
        Send Report
      </button>
    </form>
  );
};

export default DiabetesForm;
