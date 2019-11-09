import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import SignIn from './components/signin';
import Main from './components/main';
import SignUp from './components/signup';
import CheckOut from './components/checkout';
// import NotFound from './components/notfound';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
          <Route exact path='/' component={Main} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/checkout' component={CheckOut} />
          {/* <Route path='*'  component={NotFound} /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
