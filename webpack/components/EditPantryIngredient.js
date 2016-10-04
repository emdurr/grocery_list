import React, { Component } from 'react';
import { Link } from 'react-router';

const styles = {
	cborder: { borderBottom: '1px solid grey', margin: '5px' },
	input: { borderBottom: '2px solid #414E49'}
}

class EditPantryIngredient extends Component {
	constructor(props) {
		super(props);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleEditIngredient = this.handleEditIngredient.bind(this);
		this.state = { edit: false };
	}

	toggleEdit() {
		this.setState( { edit: !this.state.edit } );
	}

	handleEditIngredient(e) {
		e.preventDefault();
		this.props.editIngredient(this.refs)
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
									<input autoFocus={ true } style={ styles.input } type='text' ref='editQty' defaulValue={`${ingredientData.ingredient.pantry_ingredients.qty}`} placeholder='Qty' required/>
								</form>
							</div>
							<div className='center col s1' >
								<p className="btn-floating btn-xs grey">
								<i className="xs material-icons" onClick={ () => this.deleteIngredient(ingredientData)}>delete</i></p>
							</div>
						</li>
					</div>
				</div>
			)
		} else {
			return(
				<div className="row" style={ styles.cborder } >
					<li>
						<div className='col s8'>
							<p> { ingredientData.ingredient.name } </p>
						</div>
						<div className='center col s3'>
							<p onClick={ () => this.toggleEdit()} >{ingredientData.ingredient.pantry_ingredients.qty}</p>
						</div>
						<div className='center col s1' >
							<p className="btn-floating btn-xs grey">
							<i className="xs material-icons" onClick={ () => this.deleteIngredient(ingredientData)}>delete</i></p>
						</div>
					</li>
				</div>
			)
		}
	}
}

export default EditPantryIngredient;