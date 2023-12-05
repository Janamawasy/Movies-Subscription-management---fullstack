import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login'
import MainPage from './Pages/MainPage'
import CreatAccount from './Pages/CreatAccount';
import UsersComp from './Pages/Users/UsersComp';
import SubsComp from './Pages/Subs/SubsComp';
import MoviesComp from './Pages/Movies/MoviesComp';
import EditUserComp from './Pages/Users/EditUserComp';
import EditMovieComp from './Pages/Movies/EditMovieComp';
import EditSubComp from './Pages/Subs/EditSubComp';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated based on your authentication logic
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  // Route guard function
  const requireAuth = (element) => {
    return isLoggedIn ? element : <Navigate to="/" />;
  };
  return (
    <div>
      {/*    <Route path='/main' element={requireAuth(<MainPage />)}>     */}
      
    <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/creataccount' element={<CreatAccount />}/>
          <Route path='/main' element={requireAuth(<MainPage />)}>
                <Route path='UsersPage' element={<UsersComp />} >
                  <Route path='EditUser' element={<EditUserComp />}/>
                </Route>
                <Route path='SubsPage' element={<SubsComp />} >
                  <Route path='EditSub' element={<EditSubComp />}/>
                </Route>
                <Route path='MoviesPage' element={<MoviesComp />} >
                  <Route path='EditMovie' element={<EditMovieComp />}/>
                </Route>
          </Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
