import React, { Component } from 'react';
import { Link } from 'react-router';
import RecipeListItem from './RecipeListItem';
import logoImg from '../images/ilarder_logo.png';
import RecipeSearch from './RecipeSearch';

const styles = {
	lcard: { fontSize: '40px' },
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
    this.setSearchType = this.setSearchType.bind(this)
    this.setSearchQuery = this.setSearchQuery.bind(this)
    this.handleSearch = this.handleSearch.bind(this)

    this.state = { recipes: [], searchType: 'general', searchQuery: '' };
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

    handleSearch(e) {
      e.preventDefault()
      $.ajax({
        url: `/api/v1/recipes?searchType=${this.state.searchType}&searchQuery=${this.state.searchQuery}`,
        type: 'GET',
        dataType: 'JSON'
      }).done( recipes => {
        this.setState( { recipes: recipes.recipesArray})
      }).fail( data => {
        console.log(data)
      })
    }

    setSearchType(e) {
      console.log(e.target.value)
      this.setState({ searchType: e.target.value})
    }

    setSearchQuery(e) {
      this.setState({ searchQuery: e.target.value})
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

    render() {
      if(this.state.recipes) {
    		return(
    			<div className='center container'>
            <div>
      				<h1 style={ styles.title }><img src={ logoImg }/> Recipe Box</h1>
              <RecipeSearch setSearchQuery={this.setSearchQuery} setSearchType={this.setSearchType} handleSearch={this.handleSearch}
                defaultType={this.state.searchType} defaultQuery={this.state.searchQuery} />
      				<Link to="/recipes/new" className='btn col s3 offset-s1 yellow' style={ styles.txt }>Add New Recipe</Link>
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
