import React, { Component } from 'react';
import { Link } from 'react-router';
import foodImg from '../images/banana-pancakes.jpg';
import { connect } from 'react-redux';
import logoImg from '../images/ilarder_logo.png';
import logoBig from '../images/ilarder_logo_large.png';

const styles = {
	// filler: { height: '350px' },
	txt: { color: 'black' },
	food: { height: '1200px',
				  position: 'relative',
				  backgroundImage: 'url(' + foodImg + ')',
				  backgroundRepeat: 'no-repeat',
				  backgroundSize: 'cover',
				  boxShadow: '10px 10px 5px #444444' },
	overImg: { margin: '0 25%', textAlign: 'center', color:'white' },
	emptyBlock: { height: '100px' },
	emptyBlock1: { height: '15px' },
	ctxt: { fontSize: '150%', color: 'white', backgroundColor: '#81D153',
					borderRadius: '2px', padding: '8px', margin: '5px 45px'},
	logo: { color: 'white'}
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
		 				<div style={ styles.emptyBlock1} >
		 				</div>
		 				<div className='col s12' style={ styles.overImg } >
		 				</div>
				 	</div>
				</div>
			</div>
		)
	}

	render() {
		if (this.props.auth) {
			return(this.userHome());
		} else {
			return(
			<div>
				<div className='container'>
					<div className='row' >
						<div className='col s1 offset-s4'>
							<img src={ logoImg }/>
						</div>
						<div>
							<h2 style={ styles.logo }>iLarder</h2>
						</div>
			 			<div style={ styles.food } >
			 				<div style={ styles.emptyBlock} >
			 					<p></p>
			 				</div>
							<div>
			 				<div className='col s6' style={ styles.overImg } >
									<div>
										<img src={ logoBig }/>
									</div>
					 					<h4>Create your pantry, make your shopping list, discover new recipes</h4>
									<div style={ styles.emptyBlock } >
									</div>
									<div className='textAlign center'>
										<div className='row'>
								 			<Link to="/signup" className='col s8 m10' style={ styles.ctxt } >Create Account</Link>
										</div>
										<div className='row'>
											<Link to="/login" className='col s8 m10' style={ styles.ctxt }>Sign In</Link>
										</div>
									</div>
								</div>
						 	</div>
						</div>
					</div>
				</div>
			</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
  if (state.auth)
    return {
      auth: state.auth.isAuthenticated
    }
  else
    return state
}
export default connect(mapStateToProps)(Home);
