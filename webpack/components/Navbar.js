import React from 'react';
import { Link } from 'react-router';
import { handleLogout } from './auth/actions';
import { connect } from 'react-redux';

const styles = {
	logoName: { paddingRight: '10px', color: 'black', fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' },
  dropDwn: { backgroundColor: '#F9E883', constrainWidth: 'false' },
  hamburger: { color: 'black' }
}



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
					<li key='auth-link-0'><a  style={ styles.aboutLink } href='#' onClick={this.logout}>Logout</a></li>
				</div>
			)
		} else {
			return(<li><Link to="/login" style={ styles.aboutLink }>Login</Link></li>);
		}
	}



  render() {
    return(
    	<div className='navbar-fixed'>

    		<ul id="dropdown1" className="dropdown-content" style={ styles.dropDwn } >


	      </ul>
	    	<nav>
	        <div className="nav-wrapper" style={ styles.navBack }>
	        	<Link to='/' style={ styles.logoName } className="right" >iLarder</Link>
	        	<a className="button-collapse show-on-large" href="#!" data-activates="mobile-demo"><i className="material-icons" style={ styles.hamburger } >menu</i></a>
	          <ul className="side-nav yellow darken-1 " id="mobile-demo" >
	          	<li> <Link to='/recipe_search' style={ styles.aboutLink }>Recipe Search</Link> </li>
	          	<li className="divider"></li>
	       			<li> <Link to='/about' style={ styles.aboutLink }>About</Link> </li>
	       			<li className="divider"></li>
	      			<li> <Link to='/contact' style={ styles.aboutLink }>Contact Us</Link> </li>
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
