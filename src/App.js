import { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {

  const [searchField, setsearchField] = useState(''); // [value, setvalue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setsearchField(searchFieldString);
  }

  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));

  }, []);

  useEffect(() =>{
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField)
    });
    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField]);   
 

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
    )
  }

  export default App
