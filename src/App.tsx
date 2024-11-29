import React from 'react';
import { CVForm } from './components/CVForm';
import { CVPreview } from './components/CVPreview';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">CV Builder</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="print:hidden">
            <CVForm />
          </div>
          <div className="print:w-full print:max-w-none">
            <CVPreview />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;