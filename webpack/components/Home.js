import React from 'react';
import { Link } from 'react-router';

const styles = {
	filler: { height: '350px' },
	txt: { color: 'black' }
}



const Home = () => (
	<div>
 		<div className='center container'>
 			<div className='row'>
 				<div className='col s5'>
	 				<p>Proin eget tortor risus. Nulla porttitor accumsan tincidunt. 
		 				Curabitur arcu erat, accumsan id imperdiet et, 
		 				porttitor at sem. Curabitur non nulla sit 
		 				amet nisl tempus convallis quis ac lectus. 
		 				Vestibulum ante ipsum primis in faucibus 
		 				orci luctus et ultrices posuere cubilia Curae; 
		 				Donec velit neque, auctor sit amet aliquam vel, 
		 				ullamcorper sit amet ligula. Cras ultricies ligula 
		 				sed magna dictum porta. Sed porttitor lectus 
		 				nibh. Vivamus magna justo, lacinia eget 
		 				consectetur sed, convallis at tellus. Quisque 
		 				velit nisi, pretium ut lacinia in, elementum id enim. 
		 				Curabitur aliquet quam id dui posuere blandit.
		 			</p>
		 		</div>
		 		<div className='col s6' style={ styles.filler }>
		 			<p> </p>
		 		</div>
		 		<button className='btn col s2 offset-s1 yellow' style={ styles.txt }>Sign Up</button>
		 		<button className='btn col s2 offset-s1 yellow' style={ styles.txt }>Login</button>
		 	</div>
		</div>
	</div>
)

export default Home;