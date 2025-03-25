import { Link } from 'react-router-dom';
import BugCard from '../components/BugCard';
import './BugList.css';

function BugList({ bugs }) {
  if (bugs.length === 0) {
    return (
      <div className="no-bugs">
        <h2>No bugs found</h2>
        <Link to="/new" className="btn">Report a Bug</Link>
      </div>
    );
  }

  return (
    <div className="bug-list">
      <div className="bug-list-header">
        <h1>Bug Tracker</h1>
        <Link to="/new" className="btn">Report New Bug</Link>
      </div>
      <div className="bugs-grid">
        {bugs.map(bug => (
          <BugCard key={bug._id} bug={bug} />
        ))}
      </div>
    </div>
  );
}

export default BugList;