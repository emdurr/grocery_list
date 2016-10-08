import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import About from '../components/About';
import Home from '../components/Home';
import { connect } from 'react-redux';
import { loggedIn, logout } from '../components/auth/actions';

const styles = {
	filler: { height: '350px' },
	txt: { color: 'black' }
}

class App extends React.Component {
  componentWillMount() {
    let userId = localStorage.getItem('userId');
    let apiKey = localStorage.getItem('apiKey');

    if (!this.props.auth && apiKey)
      this.props.dispatch(loggedIn(userId, apiKey))
    else
      this.props.dispatch(logout())
  }

  render() {
    return (
      <div className='page-flexbox-wrapper'>
        <Navbar auth={this.props.auth} history={this.props.history} />
        {this.props.children}
				<Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.auth)
    return {
      auth: state.auth.isAuthenticated
    }
  else
    return state
}


export default connect(mapStateToProps)(App);
