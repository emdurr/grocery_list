import React, { Component } from 'react';
import { Link } from 'react-router';
import foodImg from '../images/food.jpg';
import { connect } from 'react-redux';

const styles = {
	filler: { height: '350px' },
	txt: { color: 'black' },
	food: { height: '739px',
				  position: 'relative',
				  backgroundImage: 'url(' + foodImg + ')', 
				  backgroundRepeat: 'no-repeat', 
				  backgroundSize: 'cover', 
				  boxShadow: '10px 10px 5px #888888' },
	overImg: { paddingLeft: '40px', textAlign: 'justify', position: 'absolute' },
	emptyBlock: { height: '150px' },
	emptyBlock: { height: '150px' },
	ptxt: { color: 'black', backgroundColor: 'rgba(238,238,238,.6)', padding: '10px', borderRadius: '8px'  },
	wtxt: { color: 'white', backgroundColor: 'rgba(238,238,238,.6)', padding: '10px', borderRadius: '8px'  }
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.userHome = this.userHome.bind(this);
	}

	userHome() {
		return(
			<div>
		 		<div className='center container'>
		 			<div className='row' style={ styles.food } >
		 				<div style={ styles.emptyBlock} >
		 					<Link to='/lists' style={ styles.wtxt } >Lists</Link> 
		 					<Link to='/menus' style={ styles.wtxt } >Menus</Link>
		 					<Link to='/recipes' style={ styles.wtxt } >Recipes</Link>
		 					<Link to='/pantry' style={ styles.wtxt } >Pantry</Link>
		 				</div>
		 				<div className='col s6' style={ styles.overImg } >
		 				</div>
				 	</div>
				</div>
			</div>
		)
	}

	render() {
		if (this.props.auth) {
			this.userHome();
		} else {
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
					 			<Link to="/signup" className='btn col s3 offset-s1 yellow' style={ styles.txt } >Sign Up</Link>
					 			<Link to="/login" className='btn col s3 offset-s2 yellow' style={ styles.txt }>Login</Link>
					 		</div>
					 	</div>
					</div>
				</div>
			)
		}
	}
}
export default connect()(Home);