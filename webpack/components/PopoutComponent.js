import React, { Component } from 'react';
import { Link } from 'react-router';

const styles = {
  popup: { margin: '10px', textAlign: 'center', backgroundColor: '#f3f3f3', fontSize: '230%'},
  headpop: { fontSize: '280%', backgroundColor: '#6e7874', color: 'white', textAlign: 'center'}
}

class PopoutComponent extends Component {
  constructor(props) {
    super(props);
    this.redirectClose = this.redirectClose.bind(this);
    this.state = { lists: [] }
  }

  componentWillMount() {
    $.ajax({
      url: '/api/v1/lists',
      type: 'GET',
      dataType: 'JSON'
    }).done( lists => {
      this.setState({ lists });
    }).fail( data => {
      console.log(data);
    });
  }

  redirectClose(listId) {
    this.props.popoutClosed();
    this.props.handleRemoveIngredient(listId);
  }

  render() {
    if (this.state.lists) {
      let lists = this.state.lists.map( list => {
        return (
          <div>
            <div style={ styles.popup } key={ list.id }>
              <div onClick={ () => this.redirectClose(list.id)}>{list.name}</div>
            </div>
          </div>
        );
      })
      return(
         <div>
           <p style={ styles.headpop }>Pick a list to add item to</p>
           {lists}
         </div>
      )
    } else {
      return(<div>Loading</div>)
    }
  }
}

export default PopoutComponent;
