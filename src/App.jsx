import React from "react";
import FormBuilder from "./components/FormBuilder";
import RenderedForm from "./components/RenderedForm";
import DataGrid from "./components/DataGrid";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">
        Dynamic Form Builder and Data Grid with Filtering & Pagination
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <FormBuilder />
        <RenderedForm />
      </div>

      <DataGrid />
    </div>
  );
}

export default App;
