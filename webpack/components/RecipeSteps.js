import React from 'react';
import RecipeStep from './RecipeStep';

class RecipeSteps extends React.Component {
	constructor(props) {
		super(props)
		this.displaySteps = this.displaySteps.bind(this)
	}

	displaySteps() {
		console.log('displaySteps')
		console.log(this.props.steps)
		let steps = this.props.steps.map( step => {
			return(
				<RecipeStep key={step.id} {...step} />
			)
		})
		return steps
	}
	render() {
		return(
			<div>
				<h5>Directions</h5>
				<ul>
					{this.displaySteps()}
				</ul>
			</div>
		)
	}
}

export default RecipeSteps;