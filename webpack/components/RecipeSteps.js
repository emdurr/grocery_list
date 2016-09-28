import React from 'react';
import RecipeStep from './RecipeStep';

const styles = {
	spacing: { margin: '40px'},
	heading: { borderBottom: '1px solid #414E49', paddingBottom: '4px'},
	bottom: { paddingBottom: '30px'},
}

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
			<div style={ styles.bottom }>
				<div style={ styles.spacing }>
					<h5 style={ styles.heading }>Directions</h5>
				<div>
					<ul>
						{this.displaySteps()}
					</ul>
				</div>
				</div>
			</div>
		)
	}
}

export default RecipeSteps;
