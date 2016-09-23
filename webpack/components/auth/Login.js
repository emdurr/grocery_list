import React from 'react';
import { connect } from 'react-redux';
import { handleLogin } from './actions';
import { Link } from 'react-router';

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
      <div>
        <h3>Login</h3>
        <form onSubmit={ this.handleSubmit }>
          <input ref="email" required placeholder="Email" />
          <input ref="password" required placeholder="Password" type="password" />
          <button className="btn" type="submit">Login</button>
        </form>
        <Link to='/signup'>Sign Up</Link>
      </div>
    )
  }
}

export default connect()(Login);
