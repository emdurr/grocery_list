import React from 'react';
import { Link } from 'react-router';

const styles = {
	logoName: { paddingLeft: '10px', color: 'black', fontSize: '40px' },
	aboutLink: { paddingLeft: '10px', fontSize: '16px', color: 'white' },
  navFooter: { backgroundColor: 'transparent' }
}

const Footer = () => (
	<footer  style={ styles.navFooter }>
    <div  style={ styles.aboutLink } >
	      © 2016 iLarder Copyright
    </div>
  </footer>
)

export default Footer;
