
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import MapPage from './pages/MapPage.jsx';
import FeaturesPage from './pages/Featurespage.jsx';
const App = () => {
  return (

    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage/>}/>
        <Route path="/resetpassword" element={<ResetPasswordPage/>}/>
        <Route path="/map" element={<MapPage/>}/>
        <Route path="/features" element={<FeaturesPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;

