import React from 'react';
import { connect } from 'react-redux';
import { handleLogin, handleFacebookLogin } from './actions';
import { Link } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import logoImg from '../../images/ilarder_logo.png';

const styles = {
  inForm: { border: '1px solid grey', borderRadius: '8px', padding: '15px',
            marginTop:' 15px', boxShadow: '10px 10px 5px #888888' },
  cbtn: { backgroundColor: 'transparent', color: 'black', margin: '10px'},
  lhead: { backgroundColor: '#3B4743', padding: '15px', color: 'white'},
  formstyle: { margin: '25px', paddingBottom: '20px'},
  signstyle: { margin: '25px', padding: '10px'}

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

  responseFacebook = (auth) => {
    let name = auth.name.split(" ");
    let firstName = [0];
    let lastName = [1];
    this.props.dispatch(handleFacebookLogin(auth, firstName, lastName, this.props.history));
  }

  render() {
    return (
      <div className='container'>
          <div className='card'>
            <h3 style={ styles.lhead }><img src={ logoImg }/> Log In</h3>
            <div style={ styles.formstyle } >
              <form onSubmit={ this.handleSubmit }>
                <input ref="email" required placeholder="Email" />
                <input ref="password" required placeholder="Password" type="password" />
                <button style={ styles.cbtn } className="btn"  type="submit">Login</button>
                <div   style={ styles.cbtn }>
                  <FacebookLogin
                    appId='1175197775871367'
                    autoLoad={false}
                    fields='name, email'
                    cssClass='btn blue'
                    icon='fa-facebook'
                    callback={this.responseFacebook}
                  />
                </div>
                <Link className='btn' style={ styles.cbtn } to='/signup'>Sign Up</Link>
              </form>
            </div>
          </div>
      </div>
    )
  }
}

export default connect()(Login);
