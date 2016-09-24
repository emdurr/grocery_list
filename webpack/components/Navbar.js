import React from 'react';
import { Link } from 'react-router';
import { handleLogout } from './auth/actions';
import { connect } from 'react-redux';

const styles = {
	logoName: { paddingLeft: '10px', color: 'black', fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' }
}



class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout(e) {
		e.preventDefault();
		this.props.dispatch(handleLogout(this.props.history));
	}

	authLink() {
		if (this.props.auth) {
			return (
				<div>
					<li> <Link to='/lists' href='#!' style={ styles.aboutLink }>Lists</Link> </li>
					<li key='auth-link-0' style={ styles.aboutLink }><a href='#' onClick={this.logout}>Logout</a></li>
				</div>
			)
		} else {
			return(<li><Link to="/login" style={ styles.aboutLink }>Login</Link></li>);
		}
	}



  render() {
    return(
    	<div className='navbar-fixed'>
    		<ul id="dropdown1" className="dropdown-content">
	        <li> <Link to='/recipes' style={ styles.aboutLink }>Recipe Box</Link> </li>
	        <li> <Link to='/about' style={ styles.aboutLink }>About</Link> </li>
	      	<li> <Link to='/contact' style={ styles.aboutLink }>Contact Us</Link> </li>
					{ this.authLink() }
	      </ul>
	    	<nav>
	        <div className="nav-wrapper" style={ styles.navBack }>
	        	<Link to='/' style={ styles.logoName }>Grocery List</Link>
	          <ul className="right hide-on-med-and-down">
	          	<li><a className="dropdown-button" href="#!" data-activates="dropdown1">Dropdown</a></li>
	          </ul>
	        </div>
	      </nav>
	    </div>
    )
  }
}

export default connect()(Navbar);
