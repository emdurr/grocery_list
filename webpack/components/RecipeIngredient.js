import React from 'react';

const styles = {
	spacing: { margin: '0'},
}

const RecipeIngredient = ({amount, unit, name, metaInformation}) => {
	return(
		<div >
			<div className='col s9 offset-s1 '>
				<p style={ styles.spacing }>
					{`${amount} ${unit} ${name}`}
				</p>
			</div>
		</div>
	)
}

export default RecipeIngredient;
