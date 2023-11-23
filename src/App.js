import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WriteDiary from './pages/WriteDiary';
import MyDiaries from './pages/MyDiaries';
import Login from './pages/Login';
import EditDiary from './pages/EditDiary';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/write' element={<WriteDiary/>}/>
          <Route path='/mydiaries' element={<MyDiaries/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/:id/edit' element={<EditDiary/>}/>
        </Routes>      
        <Footer/> 
      </div>
    </BrowserRouter>
  );
}

export default App;
