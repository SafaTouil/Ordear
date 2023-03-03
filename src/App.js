import logo from './logo.svg';
import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import CarouselComponent from './Components/Carousel';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/header" element={<Header />} />
    <Route exact path="/footer" element={<Footer />} />
    <Route exact path="/carousel" element={<CarouselComponent />} />
   
    </Routes>
    </BrowserRouter>
  );
}

export default App;
