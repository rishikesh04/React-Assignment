import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const RenderedForm = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      const docRef = doc(db, "forms", "form1");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setFields(snapshot.data().fields || []);
      }
    };
    fetchForm();
  }, []);

  const handleChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rendered Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            {field.type === "dropdown" ? (
              <select
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => handleChange(field.label, e.target.value)}
              >
                <option value="">Select...</option>
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => handleChange(field.label, e.target.value)}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RenderedForm;
