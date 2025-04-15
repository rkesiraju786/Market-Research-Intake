import { useState } from "react";

export default function HomeMinimal() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 gap-4">
      <h1 className="text-3xl font-bold mb-8">Clickability Test Page</h1>
      
      <div className="flex flex-col items-center gap-4 w-full max-w-lg">
        <div className="p-6 border rounded-lg shadow-sm w-full">
          <h2 className="text-xl font-medium mb-4">Button Test</h2>
          <p className="mb-4">Count: {count}</p>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setCount(prevCount => prevCount + 1)}
          >
            Increment
          </button>
        </div>

        <div className="p-6 border rounded-lg shadow-sm w-full">
          <h2 className="text-xl font-medium mb-4">Input Test</h2>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Type something here..."
          />
          <p>You typed: {text}</p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm w-full">
          <h2 className="text-xl font-medium mb-4">Simple Links</h2>
          <div className="flex gap-2">
            <a href="#" className="text-blue-500 underline hover:text-blue-700">Link 1</a>
            <a href="#" className="text-blue-500 underline hover:text-blue-700">Link 2</a>
            <a href="#" className="text-blue-500 underline hover:text-blue-700">Link 3</a>
          </div>
        </div>
      </div>
    </div>
  );
}