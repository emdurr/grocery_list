import React, { Component } from 'react';
import { Link } from 'react-router';
import EditPantryIngredient from './EditPantryIngredient';
import logoImg from '../images/ilarder_logo.png';

const styles = {
	cborder: { borderBottom: '1px solid grey', margin: '5px' },
	tborder: { margin: '35px 6px 0 0 ', backgroundColor: '#e7ebea', fontSize: '120%' },
	heading: { margin: '0', backgroundColor: '#414E49', padding: '10px', color: 'white'},
	backing: { backgroundColor: '#f3f3f3', display:'center', marginTop: '15px'},
	input: { borderBottom: '2px solid #414E49'},
	pbody: { margin: '10px'},
	qtystyle: { marginLeft: '55px', border: '1px solid #6e7874', borderRadius: '3px', padding: '5px'},
	cbtn: { margin: '20px', backgroundColor: 'transparent'},
}

class Pantry extends Component {
	constructor(props) {
		super(props);
		this.handleAddIngredient = this.handleAddIngredient.bind(this);
		this.showPantry = this.showPantry.bind(this);
		this.displayIngredients = this.displayIngredients.bind(this);
		this.editIngredient = this.editIngredient.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.addToDefaultValue = this.addToDefaultValue.bind(this);
		this.displaySearchIngredients = this.displaySearchIngredients.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSuggestion = this.handleSuggestion.bind(this);
		this.state = { pantry: {} , pantryIngredients: [], addName: [], defVal: null, ingredients: [] };
	}

	componentWillMount() {
		$.ajax({
			url: '/api/v1/pantries',
			type: 'GET',
			dataType: 'JSON'
		}).done( pantry => {
			this.setState({ pantry, pantryIngredients: pantry.pantry.ingredients, ingredients: pantry.ingredients });
		}).fail( data => {
			console.log('Failed!!')
		})
	}

	handleSuggestion(e) {
		e.preventDefault();
		let r = this.refs
		if(r.addName.value.length >= 3) {
			this.handleSearch(r.addName.value)
		} else {
			return null
		}
	}

	handleSearch(name) {
		let addName = this.state.addName;
		let addNameArr = [];
    let ingredients = this.state.ingredients.map( ingredient => {
    	let nameLength = name.length
    	let ingredientName = ''
    	let i = 0
    	let ingArr = ingredient.name.split('')
    	while (i < nameLength) {
    		ingredientName = ingredientName + ingArr[i]
    		i ++
    	}
    	if (name === ingredientName) {
    		addNameArr = [...addNameArr, ingredient]
    	}
    })
    this.setState({ addName: addNameArr})
    return ingredients
  }

  displaySearchIngredients() {
  	let ingredients = this.state.addName.map( ingredient => {
 			return(
 				<div key={ingredient.id}>
 					<h2 onClick={(e) => this.addToDefaultValue(e, ingredient)}>{ingredient.name}</h2>
 				</div>
 			)
  	})
  	return ingredients;
  }

	addToDefaultValue(e, ingredient) {
		e.preventDefault();
		this.refs.addIngredientForm.reset();
		this.setState({ addName: [], defVal: ingredient.name})
	}

	displayIngredients() {
		let pantryIngredients = this.state.pantryIngredients.map( ingredientData => {
			return(
				<div key={ingredientData.ingredient.id}>
					<EditPantryIngredient ingredientData={ingredientData}
																editIngredient={this.editIngredient}
																deleteIngredient={this.deleteIngredient}
																removeIngredient={this.removeIngredient} />
				</div>
			)
		})
		return pantryIngredients;
	}

	editIngredient(refs, listObject) {
		let pantry_ingredient_id = listObject.ingredient.pantry_ingredients.id;
		let ingredient = listObject.ingredient;
		let qty = refs.editQty.value;
		let pantryIngredients = this.state.pantryIngredients;
		$.ajax({
			url: `/api/v1/pantry_ingredients/${pantry_ingredient_id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { pantry_ingredient: { id: pantry_ingredient_id, qty: qty }, ingredient: { id: ingredient.id, name: ingredient.name } }
		}).done( data => {
			let findIngredient = pantryIngredients.findIndex( ingredient => ingredient.ingredient.id === data.ingredient.id );
      if (findIngredient === -1) {
        this.setState({ pantryIngredients: [...pantryIngredients, data]})
      } else {
        this.setState({ pantryIngredients: [...pantryIngredients.slice(0, findIngredient),
                                          data,
                                          ...pantryIngredients.slice(findIngredient + 1, pantryIngredients.length)]})
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
				<div style={ styles.backing } className='container center'>
					<div >
						<h3 style={ styles.heading }><img src={ logoImg }/> { this.state.pantry.pantry.name } </h3>
					</div>
					<div style={ styles.pbody } className='row'>
	    			<form ref='addIngredientForm' id='addIngredientForm' onSubmit={this.handleAddIngredient}>
						<div className='col s7'>
							<input autoFocus={ true } 
										 style={ styles.input } 
										 type='text' 
										 defaultValue={this.state.defVal} 
										 ref='addName'
										 onChange= {this.handleSuggestion}
										 placeholder='Ingredient Name' 
										 required />
						</div>
						<div className='col s3'>
							<input style={ styles.input } type='number' ref='addQty' placeholder='QTY'/>
						</div>
						<button type="submit" className=" btn-floating btn-small waves-effect waves grey"><i className="material-icons">add</i>
						</button>
						</form>
						{this.displaySearchIngredients() }
					<div className="row" style={ styles.tborder } >
						<div className='col s5'>
							<p>Ingredient</p>
						</div>
						<div className='col s3 center'>
							<p>Quantity</p>
						</div>
						<div className='col s2 center' >
							<p>Delete</p>
						</div>
						<div className='col s2 center' >
							<p>List</p>
						</div>
					</div>
					<ul>
						<div>
							{ this.displayIngredients() }
						</div>
					</ul>
					</div>
						<Link className= 'btn black-text' style={ styles.cbtn } to={'/lists'} >Grocery Lists</Link>
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

	removeIngredient(ingredientData, listId) {
		let pantryIngredients = this.state.pantryIngredients;
		let pantryId = this.state.pantry.pantry.id
		let list_id = listId
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
			let e = event
			this.addIngredientToList(e, ingredientData, list_id);
		}).fail( data => {
			console.log(data);
		});
	}

	addIngredientToList(e, ingredientData, list_id) {
		e.preventDefault();
		let qty_to_buy = ingredientData.ingredient.pantry_ingredients.qty;
		let name = ingredientData.ingredient.name;
		let ingId = ingredientData.ingredient.id;
		$.ajax({
			url: `/api/v1/list_ings`,
			type: 'POST',
			data: { list_id: list_id, ingredient: { name }, list_ing: { qty_to_buy }},
			dataType: 'JSON'
		}).done( data => {
			console.log(data);
		}).fail( data => {
			console.log(data);
		})
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
