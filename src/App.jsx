import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home/Home';
import Single from './pages/Single/Single.jsx';
import Write from './pages/Write/Write';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/post/:id' element={<Single />} />
        <Route exact path='/write' element={user ? <Write /> : <Register />} />
        <Route
          exact
          path='/settings'
          element={user ? <Settings /> : <Register />}
        />
        <Route exact path='/login' element={user ? <Home /> : <Login />} />
        <Route
          exact
          path='/register'
          element={user ? <Home /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;
