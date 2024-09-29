import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Error from './components/Error';
import {BrowserRouter, Routes, Route, BrowserRoute} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/error' element={<Error/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
