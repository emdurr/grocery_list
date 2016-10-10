import React from 'react';
import RecipeStep from './RecipeStep';

const styles = {
	spacing: { margin: '15px'},
	heading: { borderBottom: '1px solid #414E49', paddingBottom: '4px'},
	bottom: { paddingBottom: '30px'},
}

class RecipeSteps extends React.Component {
	constructor(props) {
		super(props);
		this.displaySteps = this.displaySteps.bind(this);
		this.handlePreventDefault = this.handlePreventDefault.bind(this);
	}

	displaySteps() {
			let steps = this.props.steps.map( step => {
			if (this.props.edit) {
				return(
					<div  className='row' key={step.id}>
						<RecipeStep  {...step} />
						<button className='col s1' onClick={ () => this.props.deleteStep(step)}>x</button>
					</div>
				)
			} else {
				return(
					<div className='row' key={step.id}>
						<RecipeStep  {...step} />
					</div>
				)
			}
		})
		return steps
	}

	handlePreventDefault(e) {
		e.preventDefault();
		this.props.handleAddNewStep(this.refs);
		this.refs.addStepNumber.value = '';
		this.refs.addStepText.value = '';
		this.refs.addStepNumber.focus();
	}

	addStep() {
		if (this.props.edit) {
			return(
				<div className='row'>
					<form id='addRecipeStepForm' onSubmit={ this.handlePreventDefault }>
				 		<div className='col s2'>
				      <input type='number' ref='addStepNumber' placeholder='Step' required />
				    </div>
						<div className='col s8'>
				 			<input type='text' ref='addStepText' placeholder='Directions' required />
			  		</div>
				    <div className='col s1'>
						<button type="submit" className=" btn-floating btn-medium waves-effect waves grey"><i className="material-icons">add</i>
						</button>
				 		</div>
			 		</form>
				</div>
			)
		} else {
			return( null )
		}
	}

	render() {
		return(
			<div style={ styles.bottom }>
				<div style={ styles.spacing }>
					<h5 style={ styles.heading }>Directions</h5>
					<div>
						{ this.addStep() }
						<div>
							<ul>
							 	<div className='row'>
									<div className='col s12'>
										{this.displaySteps()}
									</div>
								</div>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default RecipeSteps;
