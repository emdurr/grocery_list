import React, { Component } from 'react';
import { Link } from 'react-router';

const styles = {
	addBtn: { fontSize: '18px' },
	cborder: { borderBottom: '1px solid grey', margin: '0' },
	tborder: { margin: '25px 6px 0 0 ', backgroundColor: '#e7ebea', padding: '10px', fontSize: '120%' },
	strike: { textDecoration: 'line-through' },
	ingInput: { margin: '0'},
	input: { borderBottom: '2px solid #414E49'},
	qtystyle: { marginLeft: '55px', border: '1px solid #6e7874', borderRadius: '3px', padding: '5px'}
}

class ListIng extends Component {
	constructor(props) {
		super(props);
		this.handleEditIngredient = this.handleEditIngredient.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.state = { edit: false };
	}

	toggleEdit() {
		this.setState( { edit: !this.state.edit } );
	}

	handleEditIngredient(e) {
		e.preventDefault();
		this.props.editIngredient(this.refs, this.props.ingredientData);
		this.setState({ edit: false })
	}

	render() {
		let ingredientData = this.props.ingredientData
		if (this.state.edit) {
			return(
				<div>
					<li>
						<div className='col s6'>
							<p> { ingredientData.ingredient.name } </p>
						</div>
						<div className='col s3 center'>
							<form ref='editIngredientForm' id='editIngredientForm' onSubmit={this.handleEditIngredient}>
								<input autoFocus={ true } style={ styles.input } type='text' ref='editQty' defaultValue={`${ingredientData.ingredient.list_ing.qty_to_buy}`} placeholder='Qty' required/>
							</form>
						</div>
						<div>
							<div className='col s1' >
								<p className="btn-floating btn-xs grey">
								<i className="xs material-icons" onClick={ () => this.props.deleteIngredient(ingredientData)}>delete</i></p>
							</div>
							<div className='col s1 offset-s1' >
								<p className="btn-floating btn-xs grey">
						    <i className="xs material-icons" onClick={ () => this.props.removeIngredient(ingredientData)}>check</i></p>
							</div>
						</div>
					</li>
				</div>
			)
		} else {
			return(
				<div>
					<li>
						<div className='col s6'>
							<p> { ingredientData.ingredient.name } </p>
						</div>
						<div className='col s2 center'>
							<p style={ styles.qtystyle } onClick={ () => this.toggleEdit()} >{ingredientData.ingredient.list_ing.qty_to_buy}</p>
						</div>
						<div>

							<div className='col s1 offset-s1' >
								<p className="btn-floating btn-xs grey">
								<i className="xs material-icons" onClick={ () => this.props.deleteIngredient(ingredientData)}>delete</i></p>
							</div>
							<div className='col s1 offset-s1' >
								<p className="btn-floating btn-xs grey">
						    <i className="xs material-icons" onClick={ () => this.props.removeIngredient(ingredientData)}>check</i></p>
							</div>
						</div>
					</li>
				</div>
			)
		}
	}
}

export default ListIng;
