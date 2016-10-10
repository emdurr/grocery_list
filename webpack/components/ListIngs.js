import React, { Component } from 'react';
import { Link } from 'react-router';
import Pantry from './Pantry';
import ListIng from './ListIng';

const styles = {
	addBtn: { fontSize: '18px' },
	cborder: { borderBottom: '1px solid grey', margin: '0' },
	tborder: { margin: '25px 6px 0 0 ', backgroundColor: '#e7ebea', padding: '10px', fontSize: '120%' },
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
		this.handleSuggestion = this.handleSuggestion.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.displaySearchIngredients = this.displaySearchIngredients.bind(this);
		this.addToDefaultValue = this.addToDefaultValue.bind(this);
		this.state = { addName: [], ingredients: [], listIngredients: this.props.list.ingredients, listId: this.props.list.id, defVal: null};
	}

	componentWillMount() {
		$.ajax({
			url: '/api/v1/ingredients',
			type: 'GET',
			dataType: 'JSON'
		}).done( ingredients => {
			this.setState({ ingredients });
		}).fail( data => {
			console.log(data);
		});
	}

	displayIngredients() {
		let listIngredients = this.state.listIngredients.map( ingredientData => {
			return(
				<div className="row" key={ingredientData.ingredient.id} style={ styles.cborder } >
					<ListIng 	ingredientData={ingredientData}
									 	editIngredient={this.editIngredient}
										deleteIngredient={this.deleteIngredient}
										removeIngredient={this.removeIngredient} />
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

	handleSuggestion(e) {
		e.preventDefault();
		let r = this.refs
		if(r.addName.value.length >= 3) {
			this.handleSearch(r.addName.value)
		} else {
			this.setState({ defVal: '', addName: []})
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
  					<h5 onClick={(e) => this.addToDefaultValue(e, ingredient)}>{ingredient.name}</h5>
  				</div>
  			)
	  	})
	  	return ingredients;
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
			let e = event
			this.addIngredientToPantry(e, ingredientData);
		}).fail( data => {
			console.log(data);
		});
	}

	addToDefaultValue(e, ingredient) {
		e.preventDefault();
		this.refs.addIngredientForm.reset();
		this.setState({ addName: [], defVal: ingredient.name})
	}

	handleAddIngredient(e) {
		e.preventDefault();
		let name = this.refs.addName.value;
		let qty_to_buy = this.refs.addQty.value;
		let listIngredients = this.state.listIngredients
		this.refs.addIngredientForm.reset();
		this.refs.addName.focus();
		$.ajax({
			url: `/api/v1/list_ings`,
			type: 'POST',
			data: { list_id: this.state.listId, ingredient: { name }, list_ing: { qty_to_buy }},
			dataType: 'JSON'
		}).done( data => {
			let findIngredient = listIngredients.findIndex( ingredient => ingredient.ingredient.id === data.ingredient.id );
      if (findIngredient === -1) {
        this.setState({ listIngredients: [...listIngredients, data],
       									defVal: '',
       									addName: [] })
      } else {
        this.setState({ listIngredients: [...listIngredients.slice(0, findIngredient),
                                          data,
                                          ...listIngredients.slice(findIngredient + 1, listIngredients.length)],
                        defVal: '',
                        addName: []})
      }
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
		}).fail( data => {
			console.log(data);
		})
	}

	editIngredient(refs, listObject) {
		let id = this.props.list.id;
		let list_ing_id = listObject.ingredient.list_ing.id;
		let ingredient = listObject.ingredient;
		let qty_to_buy = refs.editQty.value;
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

	render() {
		return(this.displayView());
	}

	displayView() {
  	return (
    	<div className='row' >
    		<form ref='addIngredientForm' id='addIngredientForm' onSubmit={this.handleAddIngredient}>
					<button type="submit" className=" btn-floating btn-small waves-effect waves grey"><i className="material-icons">add</i>
					</button>
					<div className='col s6 offset-s1' style={ styles.ingInput }>
						<input style={ styles.input }
									 type='text'
									 ref='addName'
									 placeholder='Item To Purchase'
									 defaultValue={this.state.defVal}
									 onChange= {this.handleSuggestion}
									 required/>
					</div>
					<div className='col s4'>
						<input style={ styles.input } type='number' ref='addQty' placeholder='QTY' required/>
					</div>
				</form>
				<div>
					<h2>{this.displaySearchIngredients()}</h2>
				</div>
				<div className="row" style={ styles.tborder } >
					<div className='col s4'>
						<p>Item </p>
					</div>
					<div className='col s2 center'>
						<p>QTY</p>
					</div>
					<div className='col s3 center' >
						<p>Delete</p>
					</div>
					<div className='col s2 center' >
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
