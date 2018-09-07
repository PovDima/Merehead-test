import React from 'react';
import axios from 'axios';
import './style/App.css'
import Spinner from './Spinner'
import { connect } from "react-redux"
import store from './../reducer/store'
import { nextPage, initPage, isLoading } from './../actions/action'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    store.dispatch(isLoading(false))
    store.dispatch(nextPage(+event.target.id))
    setTimeout(() => { store.dispatch(isLoading(true)) }, 1000)
  }
  componentWillMount() {
    axios('https://cors-anywhere.herokuapp.com/http://dev.frevend.com/json/users.json').then(response => {

      store.dispatch(initPage(response))
    });
  }


  render() {
    const { users, currentPage, userPerPage, isLoad } = this.props.state;
    const indexOfLastTodo = currentPage * userPerPage;
    const indexOfFirstTodo = indexOfLastTodo - userPerPage;
    const currentUsers = users.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderUsers = currentUsers.map((user, index) => {
      return <div key={user.id} className="user">
        <div className='user_info'>
          <img src='http://dev.frevend.com/json/images/u_1.png' />
          <div className='user_info_text'>
            <p> Name:{user.name}</p>
            <p>Surname:{user.surname}</p>
            <p>Desc: {user.desc}</p>
          </div>
        </div>
      </div>;
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / userPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <div
          key={number}
          id={number}
          onClick={this.handleClick}
          className='button'
        >
          {number}
        </div>
      );
    });
    return (

      <div className="App" >
        {
          isLoad ?
            <div>
              {renderUsers}
              <div className='controls__buttons'>
                {renderPageNumbers}
              </div></div> :
            <div className='spiner'><Spinner /></div>
        }
      </div>
    )
  }
}
const mapStateToProps = store => {// посмотрим, что же у нас в store?
  return {
    state: store,
  }
}

// в наш компонент App, с помощью connect(mapStateToProps)
export default connect(mapStateToProps)(App)