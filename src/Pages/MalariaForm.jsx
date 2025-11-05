import React, { useState } from "react";

const MalariaForm = ({ onSubmit }) => {
  const [malariaData, setMalariaData] = useState({
    Age: "",
    Body_Temperature: "",
    Hemoglobin: "",
    RBC_Count: "",
    Platelet_Count: "",
    Has_Fever: false,
    Has_Chills: false,
    Has_Vomiting: false,
    Rainy_Season: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMalariaData({
      ...malariaData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(malariaData, () => {
        setMalariaData({
          Age: "",
          Body_Temperature: "",
          Hemoglobin: "",
          RBC_Count: "",
          Platelet_Count: "",
          Has_Fever: false,
          Has_Chills: false,
          Has_Vomiting: false,
          Rainy_Season: false,
        });
      });
      
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-6"
    >
      <h2 className="text-xl font-bold text-blue-700 text-center">
        Send Malaria Report
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {[
          "Age",
          "Body_Temperature",
          "Hemoglobin",
          "RBC_Count",
          "Platelet_Count",
        ].map((key) => (
          <label key={key} className="text-left">
            <span className="block text-sm font-medium text-gray-700 mb-1">
              {key.replace("_", " ")}
            </span>
            <input
              type="number"
              name={key}
              placeholder={key.replace("_", " ")}
              value={malariaData[key]}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2 w-full"
            />
          </label>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {["Has_Fever", "Has_Chills", "Has_Vomiting", "Rainy_Season"].map(
          (item) => (
            <label key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={item}
                checked={malariaData[item]}
                onChange={handleChange}
              />
              <span className="capitalize">{item.replace("_", " ")}</span>
            </label>
          )
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Send Report
      </button>
    </form>
  );
};

export default MalariaForm;
