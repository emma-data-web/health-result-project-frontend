import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Report.css";
import MalariaForm from "../MalariaForm";
import DiabetesForm from "../DiabetesForm";
import HealthPrediction from "../HealthPrediction";

const Report = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleMalariaSubmit = async (malariaData, resetForm) => {
    const {
      Age,
      Body_Temperature,
      Hemoglobin,
      RBC_Count,
      Platelet_Count,
      Has_Fever,
      Has_Chills,
      Has_Vomiting,
      Rainy_Season,
    } = malariaData;

    if (
      !Age ||
      !Body_Temperature ||
      !Hemoglobin ||
      !RBC_Count ||
      !Platelet_Count
    ) {
      setPopupMessage("Please fill all required fields before submitting!");
      setShowPopup(true);
      return;
    }

    const payload = {
      Age: Number(Age),
      Body_Temperature: Number(Body_Temperature),
      Hemoglobin: Number(Hemoglobin),
      RBC_Count: Number(RBC_Count),
      Platelet_Count: Number(Platelet_Count),
      Has_Fever: Has_Fever ? 1 : 0,
      Has_Chills: Has_Chills ? 1 : 0,
      Has_Vomiting: Has_Vomiting ? 1 : 0,
      Rainy_Season: Rainy_Season ? 1 : 0,
    };

    try {
      const res = await fetch(
        "https://health-result-project.onrender.com/malpredict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail?.[0]?.msg || "Server Error!");
      }

      setPopupMessage(`
        <strong style="font-size: 20px; color: ${
          data?.Result === 1 ? "#dc2626" : "#2563eb"
        };">
          Malaria Result: ${data?.Result === 1 ? "Positive" : "Negative"}
        </strong><br/><br />
        <span style="font-size: 16px; color: #374151;">
          Confidence:${data?.confidence || "N/A"}
        </span>
      `);

      setShowPopup(true);
      resetForm();
    } catch (error) {
      setPopupMessage(error.message || "Something went wrong!");
      setShowPopup(true);
    }
  };

  const handleDiabetesSubmit = async (diabetesData, resetForm) => {
    const {
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age,
    } = diabetesData;

    if (
      !Pregnancies ||
      !Glucose ||
      !BloodPressure ||
      !SkinThickness ||
      !Insulin ||
      !BMI ||
      !DiabetesPedigreeFunction ||
      !Age
    ) {
      setPopupMessage("Please fill all required fields before submitting!");
      setShowPopup(true);
      return;
    }

    const payload = {
      Pregnancies: Number(Pregnancies),
      Glucose: Number(Glucose),
      BloodPressure: Number(BloodPressure),
      SkinThickness: Number(SkinThickness),
      Insulin: Number(Insulin),
      BMI: Number(BMI),
      DiabetesPedigreeFunction: Number(DiabetesPedigreeFunction),
      Age: Number(Age),
    };

    try {
      const res = await fetch(
        "https://health-result-project.onrender.com/diapredict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail?.[0]?.msg || "Server Error!");
      }

      setPopupMessage(`
        <strong style="font-size: 20px; color: ${
          data?.Outcome === 1 ? "#dc2626" : "#2563eb"
        };">
          Diabetes Result: ${data?.Outcome === 1 ? "Positive" : "Negative"}
        </strong>
      `);

      setShowPopup(true);
      resetForm();
    } catch (error) {
      setPopupMessage(error.message || "Something went wrong!");
      setShowPopup(true);
    }
  };

  const handleHealthSubmit = async (healthData, resetForm) => {
    const {
      age,
      gender,
      temperature,
      heart_rate,
      systolic_bp,
      diastolic_bp,
      glucose_level,
      oxygen_level,
      bmi,
      cough,
      fatigue,
      headache,
      nausea,
      chest_pain,
      shortness_of_breath,
      vision_problem,
      frequent_urination,
      joint_pain,
    } = healthData;

    if (
      !age ||
      !gender ||
      !temperature ||
      !heart_rate ||
      !systolic_bp ||
      !diastolic_bp ||
      !glucose_level ||
      !oxygen_level ||
      !bmi ||
      !cough ||
      !fatigue ||
      !headache ||
      !nausea ||
      !chest_pain ||
      !shortness_of_breath ||
      !vision_problem ||
      !frequent_urination ||
      !joint_pain
    ) {
      setPopupMessage("Please fill all required fields before submitting!");
      setShowPopup(true);
      return;
    }

    const payload = {
      age: Number(age),
      gender,
      temperature: Number(temperature),
      heart_rate: Number(heart_rate),
      systolic_bp: Number(systolic_bp),
      diastolic_bp: Number(diastolic_bp),
      glucose_level: Number(glucose_level),
      oxygen_level: Number(oxygen_level),
      bmi: Number(bmi),
      cough,
      fatigue,
      headache,
      nausea,
      chest_pain,
      shortness_of_breath,
      vision_problem,
      frequent_urination,
      joint_pain,
    };

    try {
      const res = await fetch(
        "https://health-result-project.onrender.com/healthpredict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail?.[0]?.msg || "Server Error!");
      }

      setPopupMessage(`
        <strong style="font-size: 20px; color: #dc2626;">
          Health Result: ${data?.predicted_disease}
        </strong>
      `);      

      setShowPopup(true);
      resetForm();
    } catch (error) {
      setPopupMessage(error.message || "Something went wrong!");
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-center background bg-cover bg-center relative overflow-auto">
      <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>

      <nav className="relative z-10 flex items-center justify-between px-5 md:px-8 py-4 shadow-lg">
        <Link
          to="/"
          className="text:xl md:text-3xl font-extrabold text-blue-700 tracking-wide"
        >
          Ota Health AI
        </Link>
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-500 cursor-pointer"
        >
          Logout
        </button>
      </nav>

      <div className="flex flex-col items-center py-8 space-y-6 relative z-10">
        <h2 className="text-2xl font-bold text-gray-800">Choose AI Action</h2>

        <select
          className="border border-gray-300 rounded-md px-4 py-2 bg-white shadow-sm cursor-pointer text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={activeForm}
          onChange={(e) => setActiveForm(e.target.value)}
        >
          <option value="">Select an AI Option</option>
          <option value="malaria">Malaria Prediction</option>
          <option value="diabetes">Diabetes Prediction</option>
          <option value="health">Health Prediction</option>
        </select>
      </div>

      <div className="flex justify-center mb-10 relative z-10">
        {activeForm === "malaria" && (
          <MalariaForm onSubmit={handleMalariaSubmit} />
        )}
        {activeForm === "diabetes" && (
          <DiabetesForm onSubmit={handleDiabetesSubmit} />
        )}
        {activeForm === "health" && (
          <HealthPrediction onSubmit={handleHealthSubmit} />
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300">
          <div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl shadow-2xl p-10 w-11/12 max-w-md text-center animate-fadeIn">
            <h3 className="text-3xl font-extrabold mb-4 text-blue-700 drop-shadow-sm">
              AI Health Report
            </h3>
            <p
              className="text-lg leading-relaxed mb-8 font-medium border border-blue-100 rounded-lg p-4 bg-blue-50/30"
              dangerouslySetInnerHTML={{ __html: popupMessage }}
            />

            <button
              onClick={() => setShowPopup(false)}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
