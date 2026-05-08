import React, { useState } from 'react';

const App = () => {
  // We use 'useState' to give our app a short-term memory!
  // 'newThought' stores the text as you type, and 'setNewThought' is the function we use to update it.
  const [newThought, setNewThought] = useState("");

  // This is our app's "permanent" memory (the feed).
  // We start with two dummy thoughts so we can see what the feed will look like!
  const [thoughts, setThoughts] = useState([
    { id: 1, text: "This is my first thought on Nova!", time: "10:00 AM" },
    { id: 2, text: "React state makes building feeds so much easier. 🚀", time: "11:30 AM" }
  ]);

  // This function handles the "Post" action.
  const handlePost = (e) => {
    // We prevent the default form submission (which would refresh the page).
    e.preventDefault();

    // We create a new thought object with a unique ID and current text.
    const newObject = {
      id: Date.now(), // Date.now() gives us a unique number based on the current millisecond!
      text: newThought,
      time: "Just now"
    };

    // We update the 'thoughts' array.
    // [newObject, ...thoughts] means: "Put the new thought first, then spread all the old ones after it."
    setThoughts([newObject, ...thoughts]);

    // Finally, we clear the textarea so you can type your next thought!
    setNewThought("");
  };

  // This function handles deleting a thought.
  const handleDelete = (id) => {
    // We use .filter() to create a new list that includes every thought EXCEPT the one we want to delete.
    // "Keep every thought whose ID is NOT equal to the ID we clicked."
    const updatedThoughts = thoughts.filter((thought) => thought.id !== id);
    setThoughts(updatedThoughts);
  };

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
         {/* We use .map() to loop through our 'thoughts' array and turn each object into a visual card! */}
         <div className="flex flex-col gap-4">
           {thoughts.map((thought) => (
             <div 
               key={thought.id} // Every item in a list needs a unique 'key' so React can keep track of it
               className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
             >
               <div className="flex items-start justify-between">
                 {/* Display the thought text in a large, readable font */}
                 <p className="text-xl font-medium text-gray-800 leading-relaxed mb-4">
                   {thought.text}
                 </p>
                 
                 {/* The Delete Button - visible by default on mobile, hover-only on desktop */}
                 <button 
                   onClick={() => handleDelete(thought.id)}
                   className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full text-gray-300 hover:text-red-500"
                   title="Delete thought"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                   </svg>
                 </button>
               </div>
               
               {/* Display the time in a smaller, subtle font at the bottom */}
               <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                 {thought.time}
               </span>
             </div>
           ))}
         </div>
      </main>

      {/* Fixed Bottom Compose Area */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/80 p-4 backdrop-blur-md">
        <div className="mx-auto max-w-2xl">
          {/* We wrap our inputs in a <form> to handle the submission professionally */}
          <form 
            onSubmit={handlePost}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg transition-shadow focus-within:ring-1 focus-within:ring-gray-200"
          >
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
                type="submit"
                disabled={newThought.length > 140 || newThought.length === 0}
                className="rounded-full bg-black px-6 py-2 text-sm font-bold text-white transition-all active:scale-95 hover:bg-gray-800 shadow-sm disabled:opacity-20 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default App;