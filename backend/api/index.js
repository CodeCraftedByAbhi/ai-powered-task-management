const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const taskRoutes = require('../routes/taskRoutes');
const userRoutes = require('../routes/authRoutes');
const aiRoutes = require('../routes/aiRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("Welcome to the Backend of AI Powered Task Manager");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    // 🔽 This line is missing in your code
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Export the app for Vercel
module.exports = app;
