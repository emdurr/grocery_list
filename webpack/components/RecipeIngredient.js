import React from 'react';

const styles = {
	spacing: { margin: '0'},
}

const RecipeIngredient = ({amount, unit, name, metaInformation}) => {
	return(
		<div className='row'>
			<div className='offset-s1 col s10'>
				<p style={ styles.spacing }>{`${amount} ${unit} ${name}`}</p>
			</div>
		</div>
	)
}

export default RecipeIngredient;
