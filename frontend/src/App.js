import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <div className="max-w-lg flex flex-col">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
