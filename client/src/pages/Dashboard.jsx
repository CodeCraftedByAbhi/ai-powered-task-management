import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import AISuggestions from "../components/AISuggestions";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${apiUrl}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTaskDeleted = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  return (
    <>
      <div className="container-fluid p-2">
        <div className="row">
          {/* Left side: Task Form + List */}
          <div className="col-lg-7 mb-4">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <TaskForm onTaskCreated={handleTaskCreated} />
              </div>
            </div>

            <div className="card p-2 shadow-sm">
              <div
                className="card-body"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <h5 className="card-title">Your Tasks</h5>
                {loading ? (
                  <p>Loading...</p>
                ) : tasks.length === 0 ? (
                  <p>No tasks yet.</p>
                ) : (
                  tasks.map((task) => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onDelete={handleTaskDeleted}
                      onUpdate={handleTaskUpdated}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right side: AI Suggestions */}
          <div className="col-lg-5">
            <div className="card shadow-sm">
              <div
                className="card-body"
                style={{ maxHeight: "600px", overflowY: "auto" }}
              >
                <h5 className="card-title">AI Suggestions</h5>
                <AISuggestions
                  onTaskAdded={handleTaskCreated}
                  existingTasks={tasks}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
