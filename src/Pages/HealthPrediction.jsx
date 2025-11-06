import React, { useState } from "react";

const HealthPrediction = ({ onSubmit }) => {
  const [healthData, setHealthData] = useState({
    age: "",
    gender: "",
    temperature: "",
    heart_rate: "",
    systolic_bp: "",
    diastolic_bp: "",
    glucose_level: "",
    oxygen_level: "",
    bmi: "",
    cough: "",
    fatigue: "",
    headache: "",
    nausea: "",
    chest_pain: "",
    shortness_of_breath: "",
    vision_problem: "",
    frequent_urination: "",
    joint_pain: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData({
      ...healthData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(healthData, () => {
      setHealthData({
        age: "",
        gender: "",
        temperature: "",
        heart_rate: "",
        systolic_bp: "",
        diastolic_bp: "",
        glucose_level: "",
        oxygen_level: "",
        bmi: "",
        cough: "",
        fatigue: "",
        headache: "",
        nausea: "",
        chest_pain: "",
        shortness_of_breath: "",
        vision_problem: "",
        frequent_urination: "",
        joint_pain: "",
      });
    });
  };

  const numericFields = [
    "age",
    "temperature",
    "heart_rate",
    "systolic_bp",
    "diastolic_bp",
    "glucose_level",
    "oxygen_level",
    "bmi",
  ];

  const yesNoFields = [
    "cough",
    "fatigue",
    "headache",
    "nausea",
    "chest_pain",
    "shortness_of_breath",
    "vision_problem",
    "frequent_urination",
    "joint_pain",
  ];

  const formatLabel = (text) => {
    const formatted = text.replace(/_/g, " ");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl space-y-6"
    >
      <h2 className="text-xl font-bold text-blue-700 text-center">
        Send Health Report
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {numericFields.map((key) => (
          <label key={key} className="text-left">
            <span className="block text-sm font-medium text-gray-700 mb-1">
              {formatLabel(key)}
            </span>
            <input
              type="number"
              name={key}
              placeholder={formatLabel(key)}
              value={healthData[key]}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2 w-full"
            />
          </label>
        ))}

        <label className="text-left">
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </span>
          <select
            name="gender"
            value={healthData.gender}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 w-full bg-white text-gray-700"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        {yesNoFields.map((key) => (
          <label key={key} className="text-left">
            <span className="block text-sm font-medium text-gray-700 mb-1">
              {formatLabel(key)}
            </span>
            <select
              name={key}
              value={healthData[key]}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2 w-full bg-white text-gray-700"
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
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

export default HealthPrediction;
