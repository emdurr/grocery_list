import React, { Component } from 'react';
import { Link } from 'react-router';
import foodImg from '../images/food.jpg';

const styles = {
	filler: { height: '350px' },
	txt: { color: 'black' },
	food: { height: '739px', position: 'relative', backgroundImage: 'url(' + foodImg + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', boxShadow: '10px 10px 5px #888888' },
	overImg: { paddingLeft: '40px', textAlign: 'justify', position: 'absolute' },
	emptyBlock: { height: '250px' },
	ptxt: { color: 'black', backgroundColor: 'rgba(238,238,238,.6)', padding: '10px', borderRadius: '8px'  }
}

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
		 		<div className='center container'>
		 			<div className='row' style={ styles.food } >
		 				<div style={ styles.emptyBlock} >
		 					<p></p>
		 				</div>
		 				<div className='col s6' style={ styles.overImg } >
			 				<p style={ styles.ptxt} >
			 					Proin eget tortor risus. Nulla porttitor accumsan tincidunt. 
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
				 			<button className='btn col s3 offset-s1 yellow' style={ styles.txt } onClick={this.SignUp}>Sign Up</button>
				 			<button className='btn col s3 offset-s2 yellow' style={ styles.txt }>Login</button>
				 		</div>
				 	</div>
				</div>
			</div>
		)
	}
}
export default Home;