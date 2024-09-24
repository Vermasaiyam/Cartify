
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useEffect } from 'react';

function App() {

  const fetchUserDetails = async () => {
    const response = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });

    const Api = await response.json();

    // if (Api.success) {
    //   dispatch(setUserDetails(Api.data));
    // }
  }

  useEffect(() => {
    fetchUserDetails();
    // fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-58px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
