import './App.css';
import Task from './components/Task';
import React, { useState } from 'react';
import AddTaskForm from './components/Form';
import React, { useState, useEffect } from 'react';
import {getTasks, addTask, deleteTask, updateTask} from "./api/tasky-api";


function App() {
  // Task state

const [ taskState, setTaskState ] = useState({tasks: []});

useEffect(() => {
    getTasks().then(tasks => {
      setTaskState({tasks: tasks});
    });
  }, []);	




  // Form state
    const [ formState, setFormState ] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low"
  });


  // Toggle task done status
     const doneHandler = (taskIndex) => {
      const tasks = [...taskState.tasks];
      tasks[taskIndex].done = !tasks[taskIndex].done;
      updateTask(tasks[taskIndex]);
      setTaskState({tasks});
    }


  // Delete a task
   const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    const id=tasks[taskIndex]._id;
    tasks.splice(taskIndex, 1);
    deleteTask(id);
    setTaskState({tasks});
  }


  // Handle form input changes
  const formChangeHandler = (event) => {
    let form = { ...formState };

    switch(event.target.name) {
      case "title":
        form.title = event.target.value;
        break;
      case "description":
        form.description = event.target.value;
        break;
      case "deadline":
        form.deadline = event.target.value;
        break;
      default:
        form = formState;
    }

    setFormState(form);
    console.log(formState); // For debugging
  }

  // Handle form submission
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const tasks = taskState.tasks?[...taskState.tasks]:[];
    const form = {...formState};
    const newTask = await addTask(form);
    tasks.push(newTask);
    setTaskState({tasks});
  }


    const tasks = [...taskState.tasks];
    const form = { ...formState };
    form.id = uuidv4();

    tasks.push(form);
    setTaskState({ tasks });

    // Optional: reset form
    setFormState({ title: "", description: "", deadline: "" });
  }

  return (
    <div className="container">
      <h1>Tasky</h1>
      {taskState.tasks.map((task, index) => (
        <Task
         key={task._id}        
          title={task.title}
          description={task.description}
          deadline={task.deadline}
          done={task.done}
          markDone={() => doneHandler(index)}
          deleteTask={() => deleteHandler(index)}
        />
      ))}
      <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />
    </div>
  );
}

export default App;
