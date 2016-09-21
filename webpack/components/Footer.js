import React from 'react';
import { Link } from 'react-router';

const styles = {
	logoName: { paddingLeft: '10px', color: 'black', fontSize: '40px' },
	aboutLink: { paddingLeft: '10px', fontSize: '16px', color: 'black' },
  navFooter: { backgroundColor: '#F9E883' }
}

const Footer = () => (
	<footer className="page-footer" style={ styles.navFooter }>
    <div className="footer-copyright" style={ styles.aboutLink } >
	      © 2014 Copyright Text
    </div>
  </footer>
)

export default Footer;
