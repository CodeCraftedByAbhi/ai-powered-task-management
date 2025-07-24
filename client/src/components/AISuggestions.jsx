import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function AISuggestions({ onTaskAdded, existingTasks }) {
  const { token } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!prompt.trim()) return;

  setLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:5000/api/ai/suggest",
      { prompt },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = res.data;

    // Normalize suggestion result
    if (Array.isArray(data.suggestions)) {
      setSuggestions(data.suggestions);
    } else if (typeof data.suggestions === "string") {
      setSuggestions(data.suggestions.split("\n").filter(Boolean));
    } else if (typeof data === "string") {
      setSuggestions(data.split("\n").filter(Boolean));
    } else {
      console.error("Unexpected AI response format:", data);
      setSuggestions([]);
    }

  } catch (err) {
    console.error("AI suggestion error:", err.response?.data || err.message);
    setSuggestions([]);
  } finally {
    setLoading(false);
  }
};


  const handleAddSuggestion = async (title) => {
    const isDuplicate = existingTasks.some((task) => task.title === title);
    if (isDuplicate) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { title, category: "AI", priority: "Medium" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onTaskAdded(res.data);
      // remove added suggestion
      setSuggestions((prev) => prev.filter((s) => s !== title));
    } catch (err) {
      console.error("Error adding suggestion:", err);
    }
  };

  return (
    <div className="p-3 border rounded bg-light shadow-sm">
      <h5>AI Task Suggestions</h5>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="e.g. suggest work tasks"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Ask AI"}
          </button>
        </div>
      </form>

      <ul className="list-group overflow-auto" style={{ maxHeight: "50vh" }}>
        {suggestions.map((s, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            {s}
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleAddSuggestion(s)}
            >
              Add
            </button>
          </li>
        ))}
        {!loading && suggestions.length === 0 && <p>No suggestions yet.</p>}
      </ul>
    </div>
  );
}

export default AISuggestions;
