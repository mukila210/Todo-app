import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center my-7 bg-gray-200 rounded-full"> 
      <input 
        className="bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder:text-slate-600" 
        type="text" 
        placeholder="Search Your Task"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> 
      
      <button 
        onClick={() => setSearchTerm(searchTerm)}  // just reconfirms search
        className="border-none rounded-full bg-violet-600 w-32 h-12 text-white text-lg font-medium cursor-pointer" 
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;