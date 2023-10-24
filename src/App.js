import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NotesState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const ShowAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home ShowAlert={ShowAlert} />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login ShowAlert={ShowAlert} />} />
            <Route exact path='/signup' element={<Signup ShowAlert={ShowAlert} />} />
          </Routes>
        </div>
      </NoteState>
    </>
  )
}

export default App;
