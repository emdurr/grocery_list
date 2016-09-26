import React, { Component } from 'react';
import { Link } from 'react-router';

class PantryIngredients extends Component {


	render() {
		return(
			<div className='center container'>
				<h1>{ }s Pantry</h1>
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
				<ul>
					{ this.displayIngredients() }
				</ul>
				</div>
			</div>
		)
	}
}

export default PantryIngredients;