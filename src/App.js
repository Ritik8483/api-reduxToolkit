import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './components/Home';
import AddStudent from './components/AddStudent';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} /> 
          <Route path='/addStudent' element={<AddStudent/>} /> 
          <Route path='/editStudent/:id' element={<AddStudent/>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
