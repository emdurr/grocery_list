import React, { Component } from 'react';
import { Link } from 'react-router';
import Recipe from './Recipe';

const styles = {
	lcard: { fontSize: '40px' },
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' }
}

class Recipes extends Component {
	constructor(props) {
		super(props);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.showRecipe = this.showRecipe.bind(this);
    this.recipeOn = this.recipeOn.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
		this.displayRecipes = this.displayRecipes.bind(this);
    this.state = { recipes: [] };
  }

    componentWillMount() {
  		$.ajax({
  			url: '/api/v1/recipes',
  			type: 'GET',
  			dataType: 'JSON'
  		}).done( recipes => {
  			this.setState({ recipes });
  		}).fail( data => {
  			console.log(data);
  		});
  	}

    showRecipe(id) {
  		this.props.history.push(`/recipes/${id}`)
    }

    deleteRecipe(id) {
      let recipes = this.state.recipes;
      $.ajax({
        url: `/api/v1/recipes/${id}`,
        type: 'DELETE',
        dataType: 'JSON'
      }).done( () => {
        let deleteIndex = recipes.findIndex( recipe => recipe.id === id);
        this.setState({
          recipes: [
            ...recipes.slice(0, deleteIndex),
            ...recipes.slice(deleteIndex + 1, recipes.length)
          ]
        })
      }).fail( data => {
				console.log(data);
			});
    }

    recipeOn(id) {
  		let recipe;
  		this.state.recipes.map( recipeId => {
  			if (id === recipeId) {
  				recipe = <Recipe id={recipeId} deleteRecipe={this.deleteRecipe} />
  			} else {
  				return( null )
  			}
  		})
  		return recipe
  	}

    displayRecipes() {
      let recipes = this.state.recipes.map( recipe => {
        return(
          <div className="row" key={recipe.id}>
            <div className="col s12">
              <div className="card yellow darken-1" style={ styles.lcard } >
                <div className="card-content black-text">
                  <li>
                    <p onClick={ () => this.showRecipe(recipe.id)}>{ recipe.name }</p>
                    <div>{ this.recipeOn(recipe.id) }
								  	<button className="btn-small" onClick={() => this.deleteRecipe(recipe.id)}>Delete Recipe</button>
										</div>
									</li>
                </div>
              </div>
            </div>
          </div>
        )
      })
      return recipes;
    }

    handleAddRecipe(e) {
      e.preventDefault();
      let name = this.refs.addName.value;
      $.ajax({
        url: '/api/v1/recipes',
        type: 'POST',
        dataType: 'JSON',
        data: { recipe: { name }}
      }).done( recipe => {
        this.setState({
          recipes: [
            ...this.state.recipes,
            recipe
          ]
        });
        this.refs.addName.value = '';
      }).fail( data => {
        console.log(data);
      });
    }

    render() {
  		return(
  			<div className='center container'>
  				<h1>Recipe Box</h1>
  				<Link to="/recipes/new" className='btn col s3 offset-s1 yellow' style={ styles.txt } >Add New Recipe</Link>
  				<ul>
  					{ this.displayRecipes() }
  				</ul>
  			</div>
  		)
  	}

	}

export default Recipes;
