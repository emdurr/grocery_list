import React from 'react';

const styles = {
	spacing: { margin: '2px'},
}

const RecipeStep =({number, stepText}) => {
	return(
		<div style={ styles.spacing }>
			<div className='offset-s1 col s1'>
				<p style={ styles.spacing }> {number} </p>
			</div>
			<div className='col s9'>
				<p style={ styles.spacing }> {stepText} </p>
			</div>
		</div>
	)
}

export default RecipeStep;
