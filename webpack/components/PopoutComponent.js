import React, { Component } from 'react';
import { Link } from 'react-router';

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
          <div key={ list.id }>
            <div onClick={ () => this.redirectClose(list.id)}>{list.name}</div>
          </div>
        );
      })
      return(
         <div>
           {lists}
         </div>
      )
    } else {
      return(<div>Loading</div>)
    }
  }
}

export default PopoutComponent;