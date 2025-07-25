import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function TaskForm({ onTaskCreated }) {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post(
        `${apiUrl}/tasks`,
        { title, category, priority, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onTaskCreated(res.data);
      setTitle("");
      setCategory("General");
      setPriority("Low");
      setDueDate("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3 p-3 border rounded bg-light shadow-sm">
      <h5 className="mb-3">Add Task</h5>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="row g-2 mb-2">
        <div className="col">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>General</option>
            <option>Work</option>
            <option>Health</option>
            <option>Personal</option>
          </select>
        </div>
        <div className="col">
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>
      <div className="mb-2">
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-outline-primary w-100">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
