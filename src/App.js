import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import Movies from './pages/Movies/Movies'
import Search from './pages/Search/Search'
import Series from './pages/Series/Series'
import Trending from './pages/Trending/Trending'


function App() {
  return (
    <Router>
    <Header/>
    <div className="App">
      <Container>
          <Routes>
          <Route  exact path="/" element={<Trending/>} />
          <Route  path='/movies' element={<Movies/>} />
          <Route  path='/series' element={<Series/>} />
          <Route  path="/search" element={<Search/>} />
          </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation/>
    </Router>
    
  );
}

export default App;
