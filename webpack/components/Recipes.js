
import React, { Component } from 'react';
import { Link } from 'react-router';
import RecipeListItem from './RecipeListItem';
import logoImg from '../images/ilarder_logo.png';
import RecipeSearch from './RecipeSearch';
import RecipesViews from './RecipesViews';

const styles = {
	aboutLink: { fontSize: '20px', color: 'black' },
  navBack: { backgroundColor: '#F9E883' },
	title: { color: 'white'}
}

class Recipes extends Component {
	constructor(props) {
		super(props);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
		this.displayRecipes = this.displayRecipes.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
		this.changeView = this.changeView.bind(this);

    this.state = { recipes: [], view: "favorites"};
  }

    componentWillMount() {
  		$.ajax({
  			url: '/api/v1/recipes',
  			type: 'GET',
  			dataType: 'JSON'
  		}).done( recipes => {
  			this.setState({ recipes: recipes.recipesArray });
  		}).fail( data => {
  			console.log('get recipes failed');
  		});
  	}

		changeView(view) {
			this.setState({view: view })
			$.ajax({
				url: '/api/v1/recipes',
				type: 'GET',
				dataType: 'JSON'
			}).done( recipes => {
				this.setState({ recipes: recipes.recipesArray });
			}).fail( data => {
				console.log('get recipes failed');
			});
		}

    handleSearch(query, type, sort, page) {
      $.ajax({
        url: `/api/v1/recipes`,
        type: 'GET',
        dataType: 'JSON',
        data: { searchType: type, searchQuery: query, searchSort: sort, view: this.state.view, page: page}
      }).done( recipes => {
        this.setState( { recipes: recipes.recipesArray })
      }).fail( data => {
        console.log(data)
      })
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

    displayRecipes() {
      let recipes = this.state.recipes.map( recipe => {
        return(
          <RecipeListItem key={recipe.id} {...recipe} />
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

	displaySearch() {
			return(
		 		<RecipeSearch handleSearch={this.handleSearch} changeView={this.changeView} view={this.state.view} recipesInView={this.state.recipes.length} />
	 		)
	}

	addNewRecipe(){
		if (this.state.view === 'favorites') {
			return(
				<Link to="/recipes/new" className='btn col s3 offset-s1' style={ styles.txt }>Add New Recipe</Link>
			)
		} else {
			  return null
		}
	}

	instructSuggest() {
		if (this.state.view === 'suggest') {
			return(
				<h5>Enter a keyword for Recipe suggestions using your Pantry</h5>
			)
		} else {
				return null
		}
	}

    render() {
      if(this.state.recipes) {
    		return(
    			<div className='center container'>
            <div>
      				<h1 style={ styles.title }><img src={ logoImg }/> Recipe Box</h1>
							{ this.instructSuggest() }
							{ this.displaySearch() }
							{ this.addNewRecipe() }
						</div>
    				<ul>
              {this.displayRecipes()}
    				</ul>
    			</div>
    		)
      } else
        return null
  	}

	}

export default Recipes;
