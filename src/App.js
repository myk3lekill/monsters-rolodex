import './App.css';
import { useState, useEffect } from 'react'
import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

// Functional Component (Hooks)
const FunctionalApp = () => {

  const [searchField, setSearchField] = useState('')//[value, setValue]
  const [monsters, setMonsters] = useState([])
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  //UseEffetc will execute fetch on mount aviding infinte loop of re-rendering
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json(response))
    .then((users) => setMonsters(users))
  },[])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString)
  }

  return(
    <div className="App">
        <h1 className='app-title'>Monster Rolodex</h1>
        <SearchBox className='search-box' placeholder='search mosters' onChangeHandler={onSearchChange}/>
        <CardList monsters={filteredMonsters}/>
    </div>
  )
 }

// Class Component 
class ClassApp extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json(response))
    .then((users) => this.setState(
      () => {
        return {monsters: users};
      },
      () => {
        console.log(this.state)
      }
      ))
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    })}

  render() {

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this
    
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    
    return (
      <div className="App">
        <h1 className='app-title'>Monster Rolodex</h1>
      <SearchBox className='search-box' placeholder='search mosters' onChangeHandler={onSearchChange}/>
        {/* {filteredMonsters.map((monster) => {
          return  <div key={monster.id}>
                  <h1>{monster.name}</h1>
                  <
                  /div>
        })} */}
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default FunctionalApp;
