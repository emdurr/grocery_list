import React from 'react';
import { connect } from 'react-redux';
import { handleSignup } from './actions';

const styles = {
  inForm: { border: '1px solid grey', borderRadius: '8px', padding: '15px', marginTop:' 15px', boxShadow: '10px 10px 5px #888888' }
}

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { error: false, redirectRoute: '/lists' }
  }

  handleSubmit(e) {
    e.preventDefault();
    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    this.props.dispatch(
      handleSignup(firstName, lastName, email, password, this.state.redirectRoute, this.props.history)
    )
  }

  render() {
    return (
      <div className='container'>
        <div style={ styles.inForm }>
          <h3>Sign Up</h3>
          <form onSubmit={this.handleSubmit}>
            <input ref="firstName" required placeholder="First Name (Required)" />
            <input ref="lastName" required placeholder="Last Name (Required)" />
            <input ref="email" required placeholder="Email (Required)" />
            <input ref="password" type="password" required placeholder="Password (Required)" />
            <button type="submit" className="btn">Sign Up</button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(Signup);
