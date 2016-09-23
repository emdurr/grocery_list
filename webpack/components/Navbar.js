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
					<li key='auth-link-0' style={ styles.aboutLink }><a href='#' onClick={this.logout}>Logout</a></li>
			)
		} else {
			return(<li><Link to="/login" style={ styles.aboutLink }>Login</Link></li>);
		}
	}

  render() {
    return(
    	<nav>
        <div className="nav-wrapper" style={ styles.navBack }>
        	<Link to='/' style={ styles.logoName }>Grocery List</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li> <Link to='/lists' style={ styles.aboutLink }>Lists</Link> </li>
            <li> <Link to='/recipe_search' style={ styles.aboutLink }>Recipe Search</Link> </li>
            <li> <Link to='/about' style={ styles.aboutLink }>About</Link> </li>
          	<li> <Link to='/contact' style={ styles.aboutLink }>Contact Us</Link> </li>
						{ this.authLink() }
          </ul>
        </div>
      </nav>
    )
  }
}

export default connect()(Navbar);
