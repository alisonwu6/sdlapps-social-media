import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 bg-whit border-b-[1px] border-gray-300 p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Social Media App</Link>
      <div>
        {user ? (
          <>
            <Link to="/add-post" className="mr-4">Add Post</Link>
            <Link to="/profile" className="mr-4">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-400 hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
