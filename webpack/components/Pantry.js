import React, { Component } from 'react';
import { Link } from 'react-router';
import EditPantryIngredient from './EditPantryIngredient';
import logoImg from '../images/ilarder_logo.png';

const styles = {
	cborder: { borderBottom: '1px solid grey', margin: '5px' },
	tborder: { margin: '35px 6px 0 0 ', backgroundColor: '#e7ebea', fontSize: '120%' },
	heading: { backgroundColor: '#414E49', padding: '10px', color: 'white'},
	backing: { backgroundColor: '#f3f3f3'},
	input: { borderBottom: '2px solid #414E49'},
	pbody: { margin: '10px'},
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
		let pantryIngredients = this.state.pantryIngredients.map( ingredientData => {
			return(
				<div key={ingredientData.ingredient.id}>
					<EditPantryIngredient ingredientData={ingredientData} editIngredient={this.editIngredient} />
				</div>
			)
		})
		return pantryIngredients;
	}

	editIngredient(e, listObject) {
		e.preventDefault();
		let id = listObject.listId;
		let list_ing_id = listObject.listIngredients[0].ingredient.list_ing.id;
		let ingredient = listObject.listIngredients[0].ingredient;
		let qty_to_buy = this.refs.editIngredientToBuy.value;
		let listIngredients = this.state.listIngredients;
		$.ajax({
			url: `/api/v1/list_ings/${list_ing_id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { list_id: id, list_ing: { id: list_ing_id, qty_to_buy: qty_to_buy }, ingredient: { id: ingredient.id, name: ingredient.name } }
		}).done( data => {
			let findIngredient = listIngredients.findIndex( ingredient => ingredient.id === data.id );
      if (findIngredient === -1) { 
        this.setState({ listIngredients: [...listIngredients, data] })
      } else {
        this.setState({ listIngredients: [...listIngredients.slice(0, findIngredient),
                                          data,
                                          ...listIngredients.slice(findIngredient + 1, listIngredients.length)],
                        edit: false})
      }
		}).fail( data => {
			console.log('failed');
		});
	}

	handleAddIngredient(e) {
		e.preventDefault();
		let name = this.refs.addName.value;
		let qty = this.refs.addQty.value;
		let pantryIngredients = this.state.pantryIngredients;
		$.ajax({
			url: `/api/v1/pantry_ingredients`,
			type: 'POST',
			data: { pantry_id: this.state.pantry.pantry.id, ingredient: { name }, pantryIngredients: { qty }},
			dataType: 'JSON'
		}).done( data => {
			let findIngredient = pantryIngredients.findIndex( ingredient => ingredient.ingredient.id === data.ingredient.id );
      if (findIngredient === -1) {
        this.setState({ pantryIngredients: [...pantryIngredients, data] })
      } else {
        this.setState({ pantryIngredients: [...pantryIngredients.slice(0, findIngredient),
                                          data,
                                          ...pantryIngredients.slice(findIngredient + 1, pantryIngredients.length)]})
      }
			this.refs.addIngredientForm.reset();
			this.refs.addName.focus();
		}).fail( data => {
			console.log(data);
		})
	}


	showPantry() {
			return(
				<div style={ styles.backing } className='container'>
					<div className='center' >
						<h3 style={ styles.heading }><img src={ logoImg }/> { this.state.pantry.pantry.name } </h3>
					</div>
					<div style={ styles.pbody } className='row'>
	    			<form ref='addIngredientForm' id='addIngredientForm' onSubmit={this.handleAddIngredient}>
						<button type="submit" className=" btn-floating btn-small waves-effect waves grey"><i className="material-icons">add</i>
						</button>
						<div className='col s8'>
							<input autoFocus={ true } style={ styles.input } type='text' ref='addName' placeholder='Ingredient Name' required />
						</div>
						<div className='col s3'>
							<input style={ styles.input } type='number' ref='addQty' placeholder='QTY on Hand'/>
						</div>
						</form>
					<div className="row" style={ styles.tborder } >
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
						<div>
							{ this.displayIngredients() }
						</div>
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
