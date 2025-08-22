import React , { useState } from 'react';
import { FaRegSquare, FaCheckSquare , FaTrash, FaPencilAlt , FaCheck } from 'react-icons/fa';
  


const Todoitems = ({ 
  text, 
  id, 
  checked, 
  deleteTodo, 
  toggle, 
  onEditInline 
}) => {

  console.log("Rendering:", text);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);



  const handleSave = () => {
    if (editText.trim() !== "") {
      onEditInline(id, editText); 
    }
    setIsEditing(false);
  };

  
  

  return (
    <div className='flex items-center my-3'>

        <button
          onClick={() => {toggle(id)}} 
          className='text-violet-500 text-[20px] flex flex-1 items-center cursor-pointer'>

          {checked ? <FaCheckSquare/> : <FaRegSquare/>} 

        </button>

      
        {isEditing ? (

            <div className="flex items-center gap-2">

              <input 
                value={editText} 
                onChange={(e) => setEditText(e.target.value)} 
                onBlur={handleSave} 
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
                className="border px-2 py-1 rounded"
              />

              <FaCheck
                onClick={handleSave} 
                className="text-gray-400  cursor-pointer"
                title="Save Task"
              />

            </div>
          ) : (

            <p
            onDoubleClick={() => setIsEditing(true)} 
            className={ `font-medium mr-[10rem] text-gray-700 text-[20
              px] decoration-slate-500 ${
              checked ? "line-through text-gray-500" : ""
            }`}
            >
              {text}
            </p>

          )}
      

      <div className="flex gap-4">

        {!isEditing && (
          <FaPencilAlt 
            onClick={() => setIsEditing(true)} 
            className='text-gray-400 cursor-pointer' 
            title="Edit Task"
          />
        )}

        <FaTrash 
          onClick={() => deleteTodo(id)} 
          className='text-gray-400 cursor-pointer'
          title="Delete Task"
        />

      </div>

    </div>
  )
}

export default Todoitems
