import React from 'react';

const styles = {
	spacing: { margin: '2px'},
}

const RecipeStep =({number, stepText}) => {
	return(
		<div clasName='row'>
			<div className='col s12'>
				<div style={ styles.spacing }>
					<div className='col s1'>
						<p style={ styles.spacing }> {number} </p>
					</div>
					<div className='col s9'>
						<p style={ styles.spacing }> {stepText} </p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RecipeStep;
