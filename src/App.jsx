import React, { useState } from 'react';

const App = () => {
  // We use 'useState' to give our app a short-term memory!
  // 'newThought' stores the text as you type, and 'setNewThought' is the function we use to update it.
  const [newThought, setNewThought] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-black tracking-tighter text-black">NOVA</h1>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-2xl px-4 py-8 pb-40">
         {/* Phase 4 feed will go here */}
      </main>

      {/* Fixed Bottom Compose Area */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/80 p-4 backdrop-blur-md">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg transition-shadow focus-within:ring-1 focus-within:ring-gray-200">
            {/* We connect the textarea to our 'newThought' state */}
            {/* 'value' locks the text to our state, and 'onChange' updates the state as we type */}
            <textarea
              className="w-full resize-none border-none bg-transparent text-lg placeholder-gray-400 focus:outline-none focus:ring-0"
              placeholder="What's shimmering in your mind?"
              rows="2"
              value={newThought}
              onChange={(e) => setNewThought(e.target.value)}
            ></textarea>
            
            <div className="mt-2 flex items-center justify-between border-t border-gray-50 pt-3">
              {/* We show an error message if the user goes over the 140 character limit */}
              <div className="flex flex-col">
                <span className={`text-sm font-medium transition-colors ${newThought.length > 140 ? 'text-red-500' : 'text-gray-400'}`}>
                  {newThought.length} / 140
                </span>
                {newThought.length > 140 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 animate-pulse">
                    Max characters exceeded
                  </span>
                )}
              </div>
              
              <button 
                disabled={newThought.length > 140 || newThought.length === 0}
                className="rounded-full bg-black px-6 py-2 text-sm font-bold text-white transition-all active:scale-95 hover:bg-gray-800 shadow-sm disabled:opacity-20 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;