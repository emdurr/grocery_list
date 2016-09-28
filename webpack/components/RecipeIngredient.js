import React from 'react';

const RecipeIngredient = ({amount, unit, name, metaInformation}) => {
	return(
		<div className='row'>
			<div className='offset-s1 col s10'>
				<p>{`${amount} ${unit} ${name}`}</p>
			</div>
		</div>
	)
}

export default RecipeIngredient;