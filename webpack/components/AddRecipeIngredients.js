import React from 'react';

let backdropStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  zIndex: '9998',
  background: 'rgba(0, 0, 0, 0.3)'
}

let modalStyle = {
  position: 'fixed',
  width: '75%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '9999',
  background: '#fff',
  padding: '20px'
}

class AddRecipeIngredients extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div style={backdropStyle}>
				<div style={modalStyle}>
					<button className='btn' onClick={this.props.closeModal}>Cancel</button>
				</div>
			</div>
		)
	}
}

export default AddRecipeIngredients;
