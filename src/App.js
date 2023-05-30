import React, { useState, useEffect } from "react";
import "./App.css";

const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        content: inputValue,
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setInputValue("");
    }
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return tasks.filter((task) => !task.completed);
      case FILTERS.COMPLETED:
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="App">
      <h1>#todo</h1>

      <div className="TaskList">
        <div className="Filters">
          <button
            className={filter === FILTERS.ALL ? "active" : ""}
            onClick={() => handleFilterChange(FILTERS.ALL)}
          >
            All
          </button>
          <button
            className={filter === FILTERS.ACTIVE ? "active" : ""}
            onClick={() => handleFilterChange(FILTERS.ACTIVE)}
          >
            Active
          </button>
          <button
            className={filter === FILTERS.COMPLETED ? "active" : ""}
            onClick={() => handleFilterChange(FILTERS.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <div className="AddTask">
          <input
            type="text"
            placeholder="Add details"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTask} className="addBtn">
            Add
          </button>
        </div>
        <ul>
          {getFilteredTasks().map((task) => (
            <li key={task.id}>
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleteTask(task.id)}
                  style={{ width: "20px", height: "20px" }}
                />
                <span className={task.completed ? "completed" : ""}>
                  {task.content}
                </span>
              </div>

              <button
                onClick={() => handleDeleteTask(task.id)}
                className="btnDel"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {tasks.length > 0 && (
          <div className="TaskActions">
            <button onClick={handleDeleteAllTasks} className="btnDel">
              Delete All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
