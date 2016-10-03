import React, { Component } from 'react';
import { Link } from 'react-router';
import Pantry from './Pantry';

const styles = {
	addBtn: { fontSize: '18px' },
	cborder: { borderBottom: '1px solid grey', margin: '0' },
	tborder: { margin: '25px 6px 0 0 ', backgroundColor: '#e7ebea', padding: '10px', fontSize: '120%' },
	strike: { textDecoration: 'line-through' },
	ingInput: { margin: '0'},
	input: { borderBottom: '2px solid #414E49'}
}

class ListIngs extends Component {
	constructor(props) {
		super(props);
		this.handleAddIngredient = this.handleAddIngredient.bind(this);
		this.editIngredient = this.editIngredient.bind(this);
		this.displayIngredients = this.displayIngredients.bind(this);
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);
		this.addIngredientToPantry = this.addIngredientToPantry.bind(this);
		this.state = { listIngredients: this.props.list.ingredients, listId: this.props.list.id };
	}

	displayIngredients() {
		let listIngredients = this.state.listIngredients.map( ingredientData => {
			return(
				<div className="row" key={ingredientData.ingredient.id} style={ styles.cborder } >
					<li>
						<div className='col s6'>
							<p> { ingredientData.ingredient.name } </p>
						</div>
						<div className='col s3 center'>
							<p>{ingredientData.ingredient.list_ing.qty_to_buy}</p>
						</div>
						<div>
					
							<div className='col s1' >
								<p className="btn-floating btn-xs grey">
								<i className="xs material-icons" onClick={ () => this.removeIngredient(ingredientData)}>delete</i></p>
							</div>
							<div className='col s1 offset-s1' >
								<p className="btn-floating btn-xs grey">
						    <i className="xs material-icons" onClick={ () => this.deleteIngredient(ingredientData)}>check</i></p>
							</div>
						</div>
					</li>
				</div>
			)
		})
		return listIngredients;
	}

	deleteIngredient(ingredientData) {
		let listIngredients = this.state.listIngredients;
		$.ajax({
			url: `/api/v1/list_ings/${ingredientData.ingredient.list_ing.id}`,
			type: 'DELETE',
			dataType: 'JSON',
			data: { list_id: this.state.listId }
		}).done( () => {
			let deleteIndex = listIngredients.findIndex( listIngredient => listIngredient.ingredient.id === ingredientData.ingredient.id);
			this.setState({
				listIngredients: [
					...listIngredients.slice(0, deleteIndex),
					...listIngredients.slice(deleteIndex + 1, listIngredients.length)
				]
			});
		}).fail( data => {
			console.log(data);
		});
	}

	removeIngredient(ingredientData) {
		let listIngredients = this.state.listIngredients;
		$.ajax({
			url: `/api/v1/list_ings/${ingredientData.ingredient.list_ing.id}`,
			type: 'DELETE',
			dataType: 'JSON',
			data: { list_id: this.state.listId }
		}).done( () => {
			let removeIndex = listIngredients.findIndex( listIngredient => listIngredient.ingredient.id === ingredientData.ingredient.id);
			this.setState({
				listIngredients: [
					...listIngredients.slice(0, removeIndex),
					...listIngredients.slice(removeIndex + 1, listIngredients.length)
				]
			});
		}).fail( data => {
			console.log(data);
		});
	}


	handleAddIngredient(e) {
		e.preventDefault();
		let name = this.refs.addName.value;
		let qty_to_buy = this.refs.addQty.value;
		$.ajax({
			url: `/api/v1/list_ings`,
			type: 'POST',
			data: { list_id: this.state.listId, ingredient: { name }, list_ing: { qty_to_buy }},
			dataType: 'JSON'
		}).done( data => {
			console.log(data);
			this.setState({
				listIngredients: [
				   data,
				   ...this.state.listIngredients
				]
			});
			this.refs.addIngredientForm.reset();
			this.refs.addName.focus();

		}).fail( data => {
			console.log(data);
		})
	}

	addIngredientToPantry(e, ingredientData) {
		e.preventDefault();
		let qty = ingredientData.ingredient.list_ing.qty_to_buy;
		let name = ingredientData.ingredient.name;
		let ingId = ingredientData.ingredient.id;
		$.ajax({
			url: `/api/v1/pantry_ingredients`,
			type: 'POST',
			data: { pantry_id: this.state.pantryId, ingredient: { name }, pantryIngredients: { qty }},
			dataType: 'JSON'
		}).done( data => {
			console.log(data);
			console.log('for the win');
		}).fail( data => {
			console.log(data);
		})
	}

	editIngredient(e) {
		e.preventDefault();
		let qty = ingredientData.ingredient.list_ing.qty_to_buy;
		let name = ingredientData.ingredient.name;
		let ingId = ingredientData.ingredient.id;
		$.ajax({
			url: `/api/v1/pantry_ingredients`,
			type: 'POST',
			dataType: 'JSON',
			data: { listIngredients: {data} }
		}).done( data => {
			console.log(data)
			this.setState( { listIngredients: data })
		}).fail( data => {
			console.log(data);
		});
	}

	toggleEdit() {
		this.setState( { edit: !this.state.edit } );
	}

	render() {
			if(this.state.edit)
				return(this.editView());
			else
				return(this.displayView());
	}
	editView() {
		return(
			<div className='card-panel'>
				<form onSubmit={this.editIngredient}>
					<input style={ styles.input } type='text' defaultValue={this.state.listIngredient.name} required  ref="editIngredient" placeholder='Menu Name' />
					<br />
					<button type='submit' className='btn'>Save</button>
				</form>
				<button onClick={this.toggleEdit} className='btn'>Cancel</button>
			</div>
		)
	}

	displayView() {
  	return (
    	<div className='row' >
    		<form ref='addIngredientForm' id='addIngredientForm' onSubmit={this.handleAddIngredient}>
					<button type="submit" className=" btn-floating btn-small waves-effect waves grey"><i className="material-icons">add</i>
					</button>
					<div className='col s7 offset-s1' style={ styles.ingInput }>
						<input style={ styles.input } type='text' ref='addName' placeholder='Item To Purchase' required/>
					</div>
					<div className='col s4'>
						<input style={ styles.input } type='number' ref='addQty' placeholder='QTY to Buy'/>
					</div>
				</form>
				<div className="row" style={ styles.tborder } >
					<div className='col s6'>
						<p>Item </p>
					</div>
					<div className='col s3 center'>
						<p>Quantity</p>
					</div>
					<div className='col s1 center' >
						<p>Delete</p>
					</div>
					<div className='col s1 offset-s1 center' >
						<p>Bought</p>
					</div>
				</div>
				<ul>
					<div style={ styles.cborder }>
						{ this.displayIngredients() }
					</div>
				</ul>
    	</div>
    )
	}
}

export default ListIngs;
