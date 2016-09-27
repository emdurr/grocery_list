import React from 'react';
import { connect } from 'react-redux';
import { handleLogin } from './actions';
import { Link } from 'react-router';
import logoImg from '../../images/ilarder_logo.png';

const styles = {
  inForm: { border: '1px solid grey', borderRadius: '8px', padding: '15px',
            marginTop:' 15px', boxShadow: '10px 10px 5px #888888' },
  cbtn: { margin: '20px', backgroundColor: 'transparent'},
  lhead: { backgroundColor: '#3B4743', padding: '15px', color: 'white'},
  formstyle: { margin: '25px'}
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    let location = this.props.location.query.redirect;
    let redirectLocation = location ? location : '/lists';
    this.state = { error: false, redirectRoute: redirectLocation }
  }

  handleSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    this.props.dispatch(
      handleLogin(email, password, this.state.redirectRoute, this.props.history)
    );
  }

  render() {
    return (
      <div className='container'>
          <div className='card'>
            <h3 style={ styles.lhead }><img src={ logoImg }/> Log In</h3>
            <form style={ styles.formstyle } onSubmit={this.handleSubmit}>
              <input ref="email" required placeholder="Email" />
              <input ref="password" required placeholder="Password" type="password" />
              <button style={ styles.cbtn } className="btn black-text" type="submit">Login</button>
            </form>
            <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default connect()(Login);
