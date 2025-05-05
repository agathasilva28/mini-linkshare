import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import LinksPages from './pages/LinksPages';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pages/:username" element={<LinksPages />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
