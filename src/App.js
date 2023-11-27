import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WriteDiary from './pages/WriteDiary';
import MyDiaries from './pages/MyDiaries';
import EditDiary from './pages/EditDiary';
import CreateAccount from './pages/CreateAccount';
import { CookiesProvider } from 'react-cookie';


function App() {
  return (
    <CookiesProvider defaultSetOptions={{path : '/'}}>
      {/* 모든 주소에서 사용하도록 defaultSetOptions */}
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/write' element={<WriteDiary />} />
            <Route path='/mydiaries' element={<MyDiaries />} />
            <Route path='/createAccount' element={<CreateAccount />} />
            <Route path='/:id/edit' element={<EditDiary />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
