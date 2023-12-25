import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css';
import authService from "./appwrite/auth"
import {login , logout} from "./store/authSlice";
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from "./components/Footer/Footer";

function App() {

    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          const userData = await authService.getCurrentUser();
  
          if (userData) {
            dispatch(login({ userData }));
          } else {
            dispatch(logout());
          }
        } catch (error) {
          // Handle any errors (e.g., log them, show a notification)
          console.error('Error fetching current user:', error);
        } finally {
          // Set loading to false once the request is completed (either success or error)
          setLoading(false);
        }
      };
  
      fetchCurrentUser();
    }, [dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App
