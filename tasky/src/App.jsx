import './App.css';
import Task from './components/Task';
import React, { useState } from 'react';
import AddTaskForm from './components/Form';


function App() {
  // Task state
  const [taskState, setTaskState] = useState({
    tasks: [
      { id: 1, title: "Dishes", description: "Empty dishwasher", deadline: "Today", done: false },
      { id: 2, title: "Laundry", description: "Fold clothes and put away", deadline: "Tomorrow", done: false },
      { id: 3, title: "Tidy up", description: "Clean the room", deadline: "Today", done: false }
    ]
  });

  // Form state
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    deadline: ""
  });

  // Toggle task done status
  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    setTaskState({ tasks });
  }

  // Delete a task
  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks.splice(taskIndex, 1);
    setTaskState({ tasks });
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
  const formSubmitHandler = (event) => {
    event.preventDefault();

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
          key={task.id}
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
