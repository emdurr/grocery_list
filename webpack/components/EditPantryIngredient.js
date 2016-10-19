import React, { Component } from 'react';
import { Link } from 'react-router';
import Popout from 'react-popout';
import PopoutComponent from './PopoutComponent';

const styles = {
	cborder: { borderBottom: '1px solid grey', margin: '5px' },
	input: { borderBottom: '2px solid #414E49'},
	qtystyle: { border: '1px solid #6e7874', borderRadius: '3px', padding: '5px'}

}

class EditPantryIngredient extends Component {
	constructor(props) {
		super(props);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleEditIngredient = this.handleEditIngredient.bind(this);
		this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.popoutContent = this.popoutContent.bind(this);
		this.state = { edit: false , modal: null };
	}

	componentWillMount() {
		if (this.props.ingredientData.ingredient.pantry_ingredients.qty <= 0) {
			this.setState({ modal: 'popoutContent'}) 
		} else {
			return null
		}
	}

	closeModal() {
		this.setState( { modal: null } )
	}

	toggleEdit() {
		this.setState( { edit: !this.state.edit } );
	}

	handleEditIngredient(e) {
		e.preventDefault();
		if (this.refs.editQty.value === '0') {
			this.props.editIngredient(this.refs, this.props.ingredientData);
			this.setState({ edit: false, modal: 'popoutContent' })
		} else {
			this.props.editIngredient(this.refs, this.props.ingredientData);
			this.setState({ edit: false })
		}
	}

	popoutContent() {
		if (this.state.modal === 'popoutContent') {
			if (this.refs.editQty) {
				return(
					<div>
						<PopoutComponent  handleRemoveIngredient={this.handleRemoveIngredient}
		       								 		closeModal={this.closeModal}
		       								 		ingredient={this.props.ingredientData.ingredient} />
		      </div>
				)
			} else {
				return(
					<div>
		      	<PopoutComponent handleRemoveIngredient={this.handleRemoveIngredient}
		       									 closeModal={this.closeModal}
		      	 								 ingredient={this.props.ingredientData.ingredient} />
	  	  	</div>
				)
			}
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
										<input autoFocus={ true } 
													 style={ styles.input } 
													 type='text' 
													 ref='editQty' 
													 defaultValue={`${ingredientData.ingredient.pantry_ingredients.qty}`} 
													 placeholder='Qty' 
													 min='0'
													 required/>
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
							<div className='col s5'>
								<p> { ingredientData.ingredient.name } </p>
							</div>
							<div className='center col s3'>
								<p style={ styles.qtystyle } onClick={ () => this.toggleEdit()} >{ingredientData.ingredient.pantry_ingredients.qty}</p>
							</div>
							<div className='center col s2' >
								<p className="btn-floating btn-xs grey">
								<i className="xs material-icons" onClick={ () => this.props.deleteIngredient(ingredientData)}>delete</i></p>
							</div>
							<div className='center col s2' >
								<p className="btn-floating btn-xs grey">
						    <i className="xs material-icons" onClick={ () => this.setState( { modal: 'popoutContent'} )}>check</i></p>
							</div>
						</li>
					</div>
				)
			}
	}
}

export default EditPantryIngredient;
