import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {

  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };

  }

  componentDidMount() {
    //this willrun when a component mounts
    //add api requests
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(
        () => {
          return { monsters: users }
        }
      ));
  }


  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField }
    });
  }


  render() {

    //destructuring
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField)
    });

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        {/* searchbox */}
        <SearchBox onChangeHandler={onSearchChange}
          placeHolder="Search Monsters"
          className="search-box" />
        {/* render monster cardlist */}
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
