
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Signup from './component/Signup';
import AddMenu from './component/AddMenu';
import PrivateComponent from './component/PrivateComponent';
import MenuList from './component/MenuList';
import EditMenu from './component/EditMenu';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element ={<PrivateComponent />}>
        <Route path='/' element={<MenuList />} />
        <Route path='/addmenu' element={<AddMenu />} />
        <Route path='/editmenu/:id' element={<EditMenu />} />
        </Route>
        <Route path='/signup' element = {<Signup />} />
        <Route path='/login' element = {<Login />} />

      </Routes>
      </BrowserRouter>
      
    
    </div>
  );
}

export default App;
