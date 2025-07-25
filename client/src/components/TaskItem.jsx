import axios from "axios";
import { useAuth } from "../context/AuthContext";

function TaskItem({ task, onDelete, onUpdate }) {
  const { token } = useAuth();
    const apiUrl = process.env.REACT_APP_API_URL;


  const toggleStatus = async () => {
    try {
      const updated = {
        ...task,
        status: task.status === "Pending" ? "Completed" : "Pending",
      };

      const res = await axios.put(
        `${apiUrl}/tasks/${task._id}`,
        updated,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedTask = res.data;

      // Defensive check to avoid undefined errors
      if (!updatedTask || !updatedTask._id) {
        console.error("Invalid updated task response:", updatedTask);
        return;
      }

      onUpdate(updatedTask);
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`${apiUrl}/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(task._id);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div
      className={`card mb-2 shadow-sm border ${
        task.status === "Completed" ? "border-success" : "border-secondary"
      }`}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-1">
            {task.title}{" "}
            <span
              className={`badge bg-${
                task.priority === "High"
                  ? "danger"
                  : task.priority === "Medium"
                  ? "warning"
                  : "secondary"
              }`}
            >
              {task.priority}
            </span>
          </h5>
          <p className="card-text text-muted mb-0">
            {task.category || "No Category"} | Due:{" "}
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            className={`btn btn-sm ${
              task.status === "Completed"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={toggleStatus}
          >
            {task.status === "Completed" ? "✓ Done" : "Mark Done"}
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={deleteTask}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
