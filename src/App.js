import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import SignIn from './components/signin';
import Main from './components/main';
import SignUp from './components/signup';
import CheckOut from './components/checkout';
import { UserProvider } from './context/userContext';
import api from './api';
import SimpleSnackbar from './components/SimpleSnackbar';
// import NotFound from './components/notfound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    const user = await api.GET_USER();
    this.setState({
      user: user.data
    });
  }

  render() {
    return (
      <div className='App'>
        <UserProvider value={{ ...this.state.user }}>
          <Router>
            <div>
              <Route exact path='/' component={Main} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/checkout' component={CheckOut} />
              {/* <Route path='*'  component={NotFound} /> */}
            </div>
          </Router>
        </UserProvider>
        <SimpleSnackbar></SimpleSnackbar>
      </div>
    );
  }
}

export default App;
