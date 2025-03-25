import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BugList from './pages/BugList';
import BugForm from './pages/BugForm';
import BugDetail from './pages/BugDetail';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { getBugs } from './services/bugService';
import './App.css';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bugs on component mount
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const data = await getBugs();
        setBugs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  // Handle bug creation
  const handleBugCreated = (newBug) => {
    setBugs([newBug, ...bugs]);
  };

  // Handle bug update
  const handleBugUpdated = (updatedBug) => {
    setBugs(bugs.map(bug => bug._id === updatedBug._id ? updatedBug : bug));
  };

  // Handle bug deletion
  const handleBugDeleted = (id) => {
    setBugs(bugs.filter(bug => bug._id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <Router>
      <Navbar />
      <div className="container">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<BugList bugs={bugs} />} />
            <Route 
              path="/new" 
              element={<BugForm onBugCreated={handleBugCreated} />} 
            />
            <Route 
              path="/bugs/:id" 
              element={
                <BugDetail 
                  onBugUpdated={handleBugUpdated} 
                  onBugDeleted={handleBugDeleted} 
                />
              } 
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;