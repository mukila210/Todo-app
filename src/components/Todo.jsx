




import React, { useEffect, useRef, useState } from 'react';
import Todoitems from './Todoitems'; 
import { FaClipboardList } from 'react-icons/fa'; 
import NewTaskModal from './NewTaskModal';
import SearchBar from './SearchBar';


const Todo = () => {   

  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos")) 
    : []
  ); 


  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastDeleted, setLastDeleted] = useState(null);
  const [showUndo, setShowUndo] = useState(false);
  const [undoCountdown, setUndoCountdown] = useState(5);
  const [editingTask, setEditingTask] = useState(null);
  


 
  
  const add = (taskText) => {
  if (editingTask) {
    setTodoList(prev => prev.map(todo => todo.id === editingTask ? {...todo, text: taskText} : todo));
    setEditingTask(null);
  } else {
    const newTodo = { id: Date.now(), text: taskText, checked: false };
    setTodoList(prev => [...prev, newTodo]);
  }
};



  
const deleteTodo = (id) => { 
  const todoToDelete = todoList.find(todo => todo.id === id);
  setLastDeleted(todoToDelete);
  setTodoList(prev => prev.filter(todo => todo.id !== id));
  setShowUndo(true);
  setUndoCountdown(5); 

  const timer = setInterval(() => {
    setUndoCountdown(prev => {
      if (prev <= 1) {
        clearInterval(timer);
        setShowUndo(false); 
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};




const undoDelete = () => {
  if (lastDeleted) {
    setTodoList(prev => [...prev, lastDeleted]);
    setLastDeleted(null);
    setShowUndo(false);
  }
};
  



const handleEditInline = (id, newText) => {
  setTodoList(prev => 
    prev.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
};



  
  
  const toggle = (id) => { 
    setTodoList((prevTodos) => { 
      return prevTodos.map((todo) => { 
        if(todo.id === id){ 
          return {...todo, checked: !todo.checked} 
        } 
        return todo; 
      }) 
    }) 
  };
  
  


  useEffect(() => { 
    localStorage.setItem("todos", 
      JSON.stringify(todoList)); 
    },[todoList]
  );




  const filteredTodos = todoList.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );





  return (
    
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'> 
    
      {/* ------ title ------ */} 

      <div className='flex items-center mt-7 gap-2'> 
        
        <FaClipboardList className='text-2xl text-gray-500'/>

        <h1 className='text-2xl font-semibold'>To-Do List</h1> 

      </div> 
      

      
        {/* ------ Search Component ------ */}
      
      <div>

        <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} />

      </div>

      
      
      {/*------ todo List ------ */} 

      <div> 
        
        {filteredTodos.length > 0 ? (
            filteredTodos.map((item) => (
          <Todoitems 
            key={item.id} 
            text={item.text} 
            id={item.id} 
            checked={item.checked} 
            deleteTodo={deleteTodo} 
            toggle={toggle}
            onEditInline={handleEditInline}
          /> 
        ))
        ) : (
            <p className="text-center text-gray-400 mt-4">No tasks found</p>
        )}

      </div> 



      {/* ------ floating button ------ */} 

        <button
          onClick={() => setShowModal(true)}
          className="absolute bottom-20 border-none 
          rounded-full bg-violet-600 w-32 h-12 
          text-white text-lg font-medium cursor-pointer"
        >
          + New Task
        </button>

        {showModal && (
            <NewTaskModal
              onClose={() => setShowModal(false)}
              onAdd={add} 
            />
          )}

      



        {/* ------ Undo Snackbar ------ */}
        {showUndo && (
          <div
           className="absolute bottom-20 transform -translate-x-1/2border-none
          rounded-full bg-gray-600 w-32 h-12 text-white
          text-lg font-medium cursor-pointer flex justify-center 
          items-center gap-3" 
          > 

            <button 
            onClick={undoDelete} 
            > 
            Undo 
            </button>

            <span > 
              ({undoCountdown}s) 
            </span>

          </div>
        )}
      
      

    </div>
  ) 
};

export default Todo
