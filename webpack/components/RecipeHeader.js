import React, { Component } from 'react';
import logoImg from '../images/ilarder_logo.png';

const styles = {
	imgstyle: { width: '100%', border: '1px solid gray'},
	title: { backgroundColor: '#414E49', color: 'white', textAlign: 'center', padding: '10px 0'},
	comment: {fontFamily: 'Kalam', color: '#1b4fa3',transform: 'rotate(-10deg)', fontSize: '120%'},
	publish: { padding: '10px'},
	listmarg: { margin: '0'}


}
class RecipeHeader extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.publishBox = this.publishBox.bind(this);
		this.state = { recipeHeaderInfo: this.props.recipeHeaderInfo,
									 published: this.props.recipeHeaderInfo.published }
	}

	handleClick() {
		let id = this.state.recipeHeaderInfo.id;
		let published = !this.state.published;
		$.ajax({
			url: `/api/v1/recipes/${id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { recipe: { id, published }}
		}).done( recipe => {
			console.log('changed');
		}).fail( data => {
			console.log('failed');
		});
    this.setState({ published: !this.state.published })
  }

  publishBox() {
  	if(this.props.edit) {
  		return(
  			<div style={ styles.publish }>
	  			<input
             id="publish"
             type='checkbox'
             name='check'
             defaultChecked={this.state.published}
             onChange={this.handleClick}
             value={ false }
			  	/>
			    <label htmlFor='publish'>Would you like to pubish for others to enjoy?
			    </label>
			  </div>
		  )
		} else {
			return( null )
		}
  }

	render() {
		if (this.state.recipeHeaderInfo) {
			let title = this.state.recipeHeaderInfo.title;
			let ready_in_minutes = this.state.recipeHeaderInfo.ready_in_minutes;
			let servings = this.state.recipeHeaderInfo.servings;
			let credit_text = this.state.recipeHeaderInfo.credit_text;
			let ingredientCount = this.state.recipeHeaderInfo.ingredientCount;
			let imageUrl = this.state.recipeHeaderInfo.imageUrl;
			let favoriteComment = this.props.favoriteComment;
			return(
				<div>
					<h4 style={ styles.title }><img src={ logoImg }/> {title} </h4>
					<div className='row'>
						<div style={ styles.cardmargin }className='container'>
							<div  style={ styles.listmarg } className='col s8 m3'>
								<h5> Ingredients: {ingredientCount} </h5>
								<h5> {ready_in_minutes ? ("Prep Time: " + ready_in_minutes) : null } </h5>
								<h5> {servings ? ("Servings: " + servings) : null } </h5>
								<p> {credit_text ? ("By: " + credit_text) : null } </p>
								</div>
								<div>
									<p className='center col s4 m3' style={ styles.comment }> {favoriteComment} </p>
								</div>
							</div>
							<div className='col s12 m5'>
								{this.publishBox()}
								{imageUrl ? <img style={ styles.imgstyle } src={imageUrl} alt={title} /> : null }
							</div>
						</div>
					</div>

			)
		} else {
			return(<div></div>)
		}
	}
}

export default RecipeHeader;
