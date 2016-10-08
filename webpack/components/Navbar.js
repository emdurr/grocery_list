import React from 'react';
import { Link } from 'react-router';
import { handleLogout } from './auth/actions';
import { connect } from 'react-redux';
import logoSmall from '../images/ilarder_logo_small.png';

const styles = {
	logoName: { paddingRight: '10px', color: 'white', fontSize: '40px' },
	aboutLink: { fontSize: '18px', color: 'black', width: '200px' },
  navBack: { backgroundColor: '#81D153'},
  dropDwn: { backgroundColor: '#414E49', constrainWidth: 'false' },
  hamburger: { color: 'white', paddingLeft: '20px' }
}
// , fontFamily: 'Ubuntu'

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
    $('.button-collapse').sideNav({closeOnClick: true});
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
					<li className="divider"></li>
					<li> <Link to='/recipes' style={ styles.aboutLink }>Recipe Box</Link> </li>
	        <li className="divider"></li>
	        <li> <Link to='/pantry' style={ styles.aboutLink }>Pantry</Link> </li>
	        <li className="divider"></li>
	        <li> <Link to='/menus' style={ styles.aboutLink }>Menus</Link> </li>
	        <li className="divider"></li>
					<li key='auth-link-0'><a  style={ styles.aboutLink } href='#' onClick={this.logout}>Logout</a></li>
				</div>
			)
		} else {
			return(<li><Link to="/login" style={ styles.aboutLink }>Login</Link></li>);
		}
	}

	logoLink() {
		if (this.props.auth) {
			return(
				<Link to='/lists' style={ styles.logoName } className="right" >iLarder</Link>
			)
		} else {
			return(
				<Link to='/' style={ styles.logoName } className="right" >iLarder</Link>
			)
		}
	}



  render() {
    return(
    	<div className='navbar-fixed'>
	    	<nav>
	        <div className="nav-wrapper" style={ styles.navBack }>
	        	{ this.logoLink() }
	        	<a className="button-collapse show-on-large" href="#!" data-activates="mobile-demo"><i className="material-icons" style={ styles.hamburger } >menu</i></a>
	          <ul className="side-nav " id="mobile-demo" >
	       			<li> <Link to='/about' style={ styles.aboutLink }>About/Contact</Link> </li>
	       			<li className="divider"></li>
							{ this.authLink() }
	          </ul>
	        </div>
	      </nav>
	    </div>
    )
  }
}

export default connect()(Navbar);
