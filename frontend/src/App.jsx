
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import Navbar from './components/Navbar.jsx';

const App = () => {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;

