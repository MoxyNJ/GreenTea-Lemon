import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.less';

import T1 from './pages/p1/t1';
import T2 from './pages/p1/t2';
import NinForm from './pages/NinForm';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Home />
        <Routes>
          <Route path='/Form' element={<NinForm />}></Route>
          <Route path='/t1' element={<T1 />}></Route>
          <Route path='/t2' element={<T2 />}></Route>
        </Routes>
      </header>
    </div>
  );
}

function Home() {
  return (
    <div className='ninHome'>
      <h1 className='ninjee'>Ninjee...</h1>
      <nav>
        <Link to='/Form' className='headerLink'>
          <button>Form</button>
        </Link>
        <Link to='/t1' className='headerLink'>
          <button>T1</button>
        </Link>
        <Link to='/t2' className='headerLink'>
          <button>T2</button>
        </Link>
      </nav>
    </div>
  );
}

export default App;
