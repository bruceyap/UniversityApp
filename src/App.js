import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route} from 'react-router-dom';
import UniversityList from './components/UniversityList';
import Favourite from './components/Favourite';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<UniversityList/>} />
        <Route path="/favourite" element={<Favourite/>}/>  
      </Routes>      
      <Footer/>
    </div>
  );
}

export default App;
