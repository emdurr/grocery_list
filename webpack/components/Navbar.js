import React from 'react';
import { Link } from 'react-router';

const styles = {
	logoName: { paddingLeft: '10px', color: 'black', fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' }
}

const Navbar = () => (
	<nav>
    <div className="nav-wrapper" style={ styles.navBack }>
    	<Link to='/' style={ styles.logoName }>Grocery List</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li> <Link to='/list' style={ styles.aboutLink }>List</Link> </li>
        <li> <Link to='/recipe_search' style={ styles.aboutLink }>Recipe Search</Link> </li>
        <li> <Link to='/about' style={ styles.aboutLink }>About</Link> </li>
      	<li> <Link to='/contact_us' style={ styles.aboutLink }>Contact Us</Link> </li>
      </ul>
    </div>
  </nav>
)

export default Navbar;