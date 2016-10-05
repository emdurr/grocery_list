import React, { Component } from 'react';
import { Link } from 'react-router';
import Popout from 'react-popout';
import PopoutComponent from './PopoutComponent';

const styles = {
	cborder: { borderBottom: '1px solid grey', margin: '5px' },
	input: { borderBottom: '2px solid #414E49'},
	qtystyle: {margin: '16px 25px', border: '1px solid #6e7874', borderRadius: '3px', padding: '5px'}

}

class EditPantryIngredient extends Component {
	constructor(props) {
		super(props);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleEditIngredient = this.handleEditIngredient.bind(this);
		this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
		this.popout = this.popout.bind(this);
		this.popoutClosed = this.popoutClosed.bind(this);
		this.popoutContent = this.popoutContent.bind(this);
		this.state = { edit: false , isPoppedOut: false };
	}

	popout() {
		this.setState({isPoppedOut: true});
	}

	popoutClosed() {
		this.setState({isPoppedOut: false});
	}

	toggleEdit() {
		this.setState( { edit: !this.state.edit } );
	}

	handleEditIngredient(e) {
		e.preventDefault();
		this.props.editIngredient(this.refs, this.props.ingredientData);
		this.setState({ edit: false })
	}

	popoutContent() {
		if (this.state.isPoppedOut) {
			return(
				<div>
		      <Popout title='Window title' onClosing={this.popoutClosed}>
		        <PopoutComponent handleRemoveIngredient={this.handleRemoveIngredient}
		        								 popoutClosed={this.popoutClosed} />
	  	    </Popout>
	  	  </div>
			)
		} else {
			return(
				null
			)
		}
	}

	handleRemoveIngredient(listId) {
		let ingredientData = this.props.ingredientData
		this.props.removeIngredient(ingredientData, listId);
	}

	render() {
		let ingredientData = this.props.ingredientData
		if (this.state.edit) {
			return(
				<div>
					<div className="row" style={ styles.cborder } >
						<li>
							<div className='col s8'>
								<p> { ingredientData.ingredient.name } </p>
							</div>
							<div className='center col s3'>
								<form ref='editIngredientForm' id='editIngredientForm' onSubmit={this.handleEditIngredient}>
									<input autoFocus={ true } style={ styles.input } type='text' ref='editQty' defaultValue={`${ingredientData.ingredient.pantry_ingredients.qty}`} placeholder='Qty' required/>
								</form>
							</div>
							<div className='center col s1' >
								<p className="btn-floating btn-xs grey">
								<i className="xs material-icons" onClick={ () => this.props.deleteIngredient(ingredientData)}>delete</i></p>
							</div>
						</li>
					</div>
				</div>
			)
		} else {
			return(
				<div className="row" style={ styles.cborder } >
					{ this.popoutContent() }
					<li>
						<div className='col s6'>
							<p> { ingredientData.ingredient.name } </p>
						</div>
						<div className='center col s2'>
							<p style={ styles.qtystyle } onClick={ () => this.toggleEdit()} >{ingredientData.ingredient.pantry_ingredients.qty}</p>
						</div>
						<div className='center col s2' >
							<p className="btn-floating btn-xs grey">
							<i className="xs material-icons" onClick={ () => this.props.deleteIngredient(ingredientData)}>delete</i></p>
						</div>
						<div className='center col s2' >
							<p className="btn-floating btn-xs grey">
					    <i className="xs material-icons" onClick={this.popout}>check</i></p>
						</div>
					</li>
				</div>
			)
		}
	}
}

export default EditPantryIngredient;
