import React, { Component } from 'react';
import { Link } from 'react-router';

let backdropStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  zIndex: '9998',
  background: 'rgba(0, 0, 0, 0.3)'
}

let modalStyle = {
  position: 'absolute',
  padding: '40px',
  width: '90%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '9999',
  background: '#fff'
}

const styles = {
  popup: { margin: '10px', textAlign: 'center', backgroundColor: '#f3f3f3', fontSize: '230%', cursor: 'pointer'},
  headpop: { fontSize: '280%', backgroundColor: '#6e7874', color: 'white', textAlign: 'center'}
}

class PopoutComponent extends Component {
  constructor(props) {
    super(props);
    this.redirectClose = this.redirectClose.bind(this);
    this.handleAddList = this.handleAddList.bind(this);
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
    this.props.closeModal;
    this.props.handleRemoveIngredient(listId);
  }

  handleAddList(e, listId) {
    e.preventDefault();
    let name = this.refs.addName.value;
    $.ajax({
      url: '/api/v1/lists',
      type: 'POST',
      dataType: 'JSON',
      data: { list: { name }}
    }).done( list => {
      this.setState({
        lists: [
          ...this.state.lists,
          list
        ]
      });
      this.refs.addName.value = '';
    }).fail( data =>{
      console.log(data);
    });
  }

  render() {
    if (this.state.lists) {
      let lists = this.state.lists.map( list => {
        return (
          <div style={ styles.popup } key={ list.id } >
            <div onClick={ () => this.redirectClose(list.id)}>{list.name}</div>
          </div>
        );
      })
      return(
        <div>
          <div style={backdropStyle}>
            <div style={modalStyle}>
              <p style={ styles.headpop }>Pick a list to add item to</p>
              {lists}
              <form id='addForm' onSubmit={this.handleAddList}>
                <input style={ styles.input } className='col s9 offset-s1' type='text' ref='addName' required/>
                <button type="submit" className=" btn-floating btn-medium waves-effect waves grey"><i className="material-icons">add</i>
                </button>
              </form>
              <div className='row'>
                <button className='btn col s6 push-s3 m3 push-m4' onClick={this.props.closeModal}>Cancel</button>
              </div>
            </div>
          </div>
         </div>
      )
    } else {
      return(<div>Loading</div>)
    }
  }
}

export default PopoutComponent;
