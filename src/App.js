import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import CreateBlog from './pages/CreateBlog';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import Blogview from './pages/Blogview';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />

        <main>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-blog' element={<CreateBlog />} />
            <Route path='/:id' element={<Blogview />} />
          </Routes>
        </main>
      </BrowserRouter>
      {/* <Footer /> */}
    </ChakraProvider>
  );
}

export default App;
