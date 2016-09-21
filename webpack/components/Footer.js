import React from 'react';
import { Link } from 'react-router';

const styles = {
	logoName: { paddingLeft: '10px', color: 'black', fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navFooter: { backgroundColor: '#F9E883' }
}

const Footer = () => (
	<footer className="page-footer" style={ styles.navFooter }>
    <div className="footer-copyright">
	      © 2014 Copyright Text
    </div>
  </footer>
)

export default Footer;
