import React from 'react'
import RecipeIngredient from './RecipeIngredient';

const styles = {
	note: { margin: '0', fontStyle: 'italic'}
}

class IngredientCheck extends React.Component {
	constructor(props) {
		super(props)
		this.whichButton = this.whichButton.bind(this)
		this.toggleButton = this.toggleButton.bind(this)

		this.state = { remove: false, inStock: null }
	}

	componentWillMount() {
		this.setState( {inStock: this.props.ingredient.inStock } )
	}

	removeFromPantry() {
		if(this.state.inStock && this.state.remove){
			$.ajax({
				url: `api/v1/pantry_ingredients/${this.props.ingredient.pantryIngredientId}`,
				type: 'DELETE',
				dataType: 'JSON'
			}).done( data => {
			}).fail( data => {
				console.log(data)
			})
		}
	}

	toggleButton() {
		this.setState( { remove: !this.state.remove } )
		this.props.increment(!this.state.remove)
	}

	whichButton() {
		if (this.state.inStock) {
			if (this.state.remove) {
				return( <button className='btn-floating btn waves-effect waves grey' onClick={ this.toggleButton }><i className='tiny material-icons'>delete</i></button> )
			} else {
				return( <button className='btn-floating btn waves-effect waves grey' onClick={ this.toggleButton }><i className='tiny material-icons'>check</i></button> )
			}
		} else {
			return(
				<p style={styles.note}>Out</p>
			)
		}

	}

	render() {
		let ingredient = this.props.ingredient
		return(
			<div className='col s12 m6'>
				<span className='col s8'><RecipeIngredient {...ingredient} /></span>
				<span className='col s4'>{this.whichButton()}</span>
			</div>
		)
	}
}

export default IngredientCheck;