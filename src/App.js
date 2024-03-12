import React, { useState } from "react";
import './App.css';

function App() {
  const [tasklist,settasklist] = useState([])
  const [task,settask] = useState('')
  const [count,setcount] = useState(0)
  const [counters, setCounters] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  function onchangeinput(e){
    settask(e.target.value)
  }

  function onclickaddtask(){

    let n = parseInt(task.charAt(task.length-1))
    if (Number.isInteger(n)){
      for (let a = 1;a<=n;a++){
        settasklist(prevList => [...prevList, task]);
        setCounters(prevCounters => ({ ...prevCounters, [task]: (prevCounters[task] || 0) + 1 }));
      }
    }else{
      settasklist(prevList => [...prevList, task]);
      setCounters(prevCounters => ({ ...prevCounters, [task]: (prevCounters[task] || 0) + 1 }));
    }
    settask('')
  }

  function onclickedit(index){
    setEditIndex(index);
    setcount(count+1)
  }

  function onsubmitedit(index, editedTask) {
    const newTaskList = [...tasklist];
    newTaskList[index] = editedTask;
    settasklist(newTaskList);
    setEditIndex(null);
  }

  function onclickdelete(index){
    const deletedTask = tasklist[index];
    settasklist(prevList => prevList.filter((_, i) => i !== index)); //the underscore is used to denote that the first parameter of the filter function (_) is ignored, while i is used to represent the index of the element being filtered.
    setCounters(prevCounters => {
      const newCounters = { ...prevCounters };
      delete newCounters[deletedTask];
      return newCounters;  
    });
  }

  return (
    <div className="App">
      <h1 className="header">Day Goals!</h1>
      <input type="search" onChange={onchangeinput} value={task} className="input" placeholder="Add Todo"/>
      <br/>
      <button className= "addbtn" onClick={onclickaddtask}>Add Todo</button>
      <ul>
        {tasklist.map((eachtask,index)=>( //while doing operations with list like iterating over list we will have index property
          <div className="listcontainer">
            <li className="tasks" key={index}>
              <p>{eachtask} (Updated {count} times)</p>
             </li>
            <div>
              <img src="https://png.pngtree.com/png-vector/20190725/ourmid/pngtree-vector-pencil-icon-png-image_1576572.jpg" alt="edit" className="edit" onClick={() => onclickedit(index)}/>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpvSO1hVy_KBFARSXQFTJ-zXkt9zqZ5KpsOk8yN6BmjQ&s" alt="delete" className="edit" onClick={() => onclickdelete(index)}/>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;