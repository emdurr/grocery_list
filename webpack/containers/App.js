import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../components/Home';
// import Images from '../src/images';

const styles = {
	filler: { height: '350px' },
	txt: { color: 'black' }
}



const App = ({ children }) => (
	<div>
		<Navbar />
		{ children }
  	<Footer />
  </div>
)

export default App;

