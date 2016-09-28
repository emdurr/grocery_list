import React from 'react';

const RecipeStep =({number, stepText}) => {
	return(
		<div className='row'>
			<div className='offset-s1 col s1'>
				<p> {number} </p>
			</div>
			<div className='col s10'>
				<p> {stepText} </p>
			</div>
		</div>
	)
}

export default RecipeStep;