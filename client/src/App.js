import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <Navbar/>
      <main style={{ paddingTop: '70px' }} className="container mt-5 pt-4">
      <Routes>
        <Route path={token ? "/dashboard" : "/login"} element={token ? <Dashboard /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={token ? <Dashboard /> : <Home />} />
      </Routes>
      </main>
    </Router>
  );
}

export default App;
