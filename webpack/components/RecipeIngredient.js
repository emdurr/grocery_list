import React from 'react';

const styles = {
	spacing: { margin: '0'},
}

const RecipeIngredient = ({amount, unit, name, metaInformation}) => {
	return(
		<div className='offset-s1 col s4'>
			<p style={ styles.spacing }>
				{`${amount} ${unit} ${name}`}
			</p>
		</div>
	)
}

export default RecipeIngredient;
