import React, { Component } from 'react';
import { Link } from 'react-router';

const styles = {
	lcard: { fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' },
  inForm: { border: '1px solid grey', borderRadius: '8px', padding: '15px', marginTop:' 15px', boxShadow: '10px 10px 5px #888888' },
  addBtn: { fontSize: '18px' },
	cborder: { border: '1px solid grey', borderRadius: '10px', margin: '10px' },
	strike: { textDecoration: 'line-through' }
}

class Pantry extends Component {
	constructor(props) {
		super(props);
		this.handleAddIngredient = this.handleAddIngredient.bind(this);
		this.showPantry = this.showPantry.bind(this);
		this.displayIngredients = this.displayIngredients.bind(this);
		this.state = { pantry: {} , pantryIngredients: [] };
	}

	componentWillMount() {
		$.ajax({
			url: '/api/v1/pantries',
			type: 'GET',
			dataType: 'JSON'
		}).done( pantry => {
			this.setState({ pantry, pantryIngredients: pantry.pantry.ingredients });
		}).fail( data => {
			console.log('Failed!!')
		})
	}

	displayIngredients() {
		debugger
		let pantryIngredients = this.state.pantryIngredients.map( ingredientData => {
			return(
				<div className="row" key={ingredientData.ingredient.id} style={ styles.cborder } >
					<li>
						<div className='col s9'>
							<p> { ingredientData.ingredient.name } </p>
						</div>
						<div className='col s2'>
							<p>{ingredientData.ingredient.pantry_ingredients.qty}</p>
						</div>
						<div className='center col s1' >
							<p onClick={ () => this.deleteIngredient(ingredientData)} style={{ border: '1px solid grey', borderRadius: '10px' }}>X</p>
						</div>
					</li>
				</div>
			)
		})
		return pantryIngredients;
	}


	handleAddIngredient(e) {
		e.preventDefault();
		let name = this.refs.addName.value;
		let qty = this.refs.addQty.value;
		$.ajax({
			url: `/api/v1/pantry_ingredients`,
			type: 'POST',
			data: { pantry_id: this.state.pantry.pantry.id, ingredient: { name }, pantryIngredients: { qty }},
			dataType: 'JSON'
		}).done( data => {
			this.setState({
				pantryIngredients: [
				   data,
				   ...this.state.pantryIngredients
				]
			});
			this.refs.addIngredientForm.reset();
		}).fail( data => {
			console.log(data);
		})
	}


	showPantry() {
		return(
			<div className='center container'>
				<h1> { this.state.pantry.pantry.name } </h1>
				<div className='row'>
    		<form ref='addIngredientForm' id='addIngredientForm' onSubmit={this.handleAddIngredient}>
					<div className='col s9'>
						<input type='text' ref='addName' placeholder='Ingredient Name' required/>
					</div>
					<div className='col s3'>
						<input type='number' ref='addQty' placeholder='QTY on Hand'/>
					</div>
					<button style={ styles.addBtn } type="submit">Add Ingredient</button>
				</form>
				<div className="row" style={ styles.cborder } >
					<div className='col s9'>
						<p> Ingredient </p>
					</div>
					<div className='col s2'>
						<p>Quantity</p>
					</div>
					<div className='col s1' >
						<p>Delete</p>
					</div>
				</div>
				<ul>
					{ this.displayIngredients() }
				</ul>
				</div>
			</div>
		)
	}

	deleteIngredient(ingredientData) {
		let pantryIngredients = this.state.pantryIngredients;
		let pantryId = this.state.pantry.pantry.id
		$.ajax({
			url: `/api/v1/pantry_ingredients/${ingredientData.ingredient.pantry_ingredients.id}`,
			type: 'DELETE',
			dataType: 'JSON',
			data: { pantry_id: pantryId }
		}).done( data => {
			let deleteIndex = pantryIngredients.findIndex( pantryIngredient => pantryIngredient.ingredient.id === ingredientData.ingredient.id);
			this.setState({
				pantryIngredients: [
					...pantryIngredients.slice(0, deleteIndex),
					...pantryIngredients.slice(deleteIndex + 1, pantryIngredients.length)
				]
			});
		}).fail( data => {
			console.log(data);
		});
	}

	render() {
			if (this.state.pantry.pantry) {
				return(
					this.showPantry()
				)
			} else {
				return( 
					<div>Loading...</div>
				)
			}
	}
}

export default Pantry;
