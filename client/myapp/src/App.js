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
  //   <div>
  //   <Router>
  //     <Routes>
  //       <Route path='/' element={<Login />}/>
  //       <Route path='/creataccount' element={<CreatAccount />}/>
  //       <Route path='/main' element={requireAuth(<MainPage />)}>
  //         <Route path='UsersPage' element={requireAuth(<UsersComp />)}>
  //           <Route path='EditUser' element={requireAuth(<EditUserComp />)} />
  //         </Route>
  //         <Route path='SubsPage' element={requireAuth(<SubsComp />)}>
  //           <Route path='EditSub' element={requireAuth(<EditSubComp />)} />
  //         </Route>
  //         <Route path='MoviesPage' element={requireAuth(<MoviesComp />)}>
  //           <Route path='EditMovie' element={requireAuth(<EditMovieComp />)} />
  //         </Route>
  //       </Route> 
  //     </Routes>
  //   </Router>
  // </div>
    <div>
      
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
