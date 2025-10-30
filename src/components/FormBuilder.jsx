import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState("");

  const addField = () => {
    const newField = { label, type, options: options.split(",").map(o => o.trim()).filter(Boolean) };
    setFields([...fields, newField]);
    setLabel("");
    setOptions("");
  };

  const saveToFirebase = async () => {
    try {
      await setDoc(doc(db, "forms", "form1"), { fields });
      alert("Form saved successfully!");
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Form Builder</h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Field Label"
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <select
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="dropdown">Dropdown</option>
        </select>

        {type === "dropdown" && (
          <input
            type="text"
            placeholder="Enter options (comma separated)"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
          />
        )}

        <button
          onClick={addField}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all"
        >
          + Add Field
        </button>
      </div>

      <ul className="mt-4 text-sm text-gray-700">
        {fields.map((field, index) => (
          <li key={index} className="py-1 border-b">
            {field.label} — <span className="italic">{field.type}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={saveToFirebase}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold mt-4 px-4 py-2 rounded-lg transition-all"
      >
       Save to Firebase
      </button>
    </div>
  );
};

export default FormBuilder;
