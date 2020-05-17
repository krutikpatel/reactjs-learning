import React, { Component } from 'react';
import './App.css';
import Person from './components/Person';
import './components/Person.css';

/*
knote: 
    -passing props to components from app.js
    -state of compponents. state is object
*/
/*
knote: this App class is stateful component, while Person is stateless component.
    -it is good practice to create as many stateless components(presentational) as possible and lesser stateful (container) components
*/
class App extends Component {
  //knote: state Only available to class based components that extends Component
  state = {
    persons : [
      { name: 'Max', age: 28},
      { name: 'manu', age:29},
      { name: 'stephanie', age:26}
    ],
    otherState: 'some other data',
    showPersons: false
  } 

  /*
  just normal function, but ES6 style
  knote: usage: onClick={this.switchNameHandler}
        -we dont add () after method call, because we dont want it to be called when button is rendered.
        -example with method taking argument
  */
  switchNameHandler = (newName) => {
    console.log('button clicked');
    /* knote: DONT DO THIS to change content: this.state.persons[0].name = 'krutik';
      -Rather use setState, and react will diff and see which data was changed and which components needs to be updated.
        -then react changes DOM.

        knote: There are only 2 things that Reacts looks for or watches to update DOM: state and props
    */
    this.setState({
      //change the state's data that we want to change      
      persons : [
        { name: newName, age: 28},
        { name: 'manu', age:29},
        { name: 'stephanie', age:26}
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      //change the state's data that we want to change      
      persons : [
        { name: 'Max', age: 28},
        { name: event.target.value, age:29},
        { name: 'stephanie', age:26}
      ]
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
    console.log('toggle = '+doesShow);
  }

/*
knote: notice 2 ways of passing data to switchNameHandler below
*/
  render() {

    /*knote: inline Style. can scope to particulat element. 
      CSS will apply it to all such elements. 
      Eg if we want to apply some specific style to person2, we can use this mehtod.
    */
   const buttonStyle = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
   }

    return (
      <div className="App">
        <h1 className="App-title">Welcome to React</h1>
        <p> Conditional display example </p>
        <button 
          style = {buttonStyle}
          onClick={ this.togglePersonsHandler}> Toggle persons. Just specify function name </button>
        <p>Cant use if statement, can only use ternary expression, in JSX</p>

        { this.state.showPersons ?
          <div>
            <Person name = {this.state.persons[0].name} 
                    age={this.state.persons[0].age}/>

            <Person name = {this.state.persons[2].name} 
                    age={this.state.persons[0].age}/>
          </div>
          :null
        }

        <p>===========normal state and props passing example below</p>
        <button 
        style = {buttonStyle}
        onClick={ () => this.switchNameHandler('Krutik-way1-canBeInefficient')}> Switching Names using "state" in components. we defined new function inline, and called handler with args</button>
        <p/>
        /*
          -knote: passing data to components using "props". via html args and even content of that element
        */
        /*
          -knote: passing method references between components. 
          that way other components dont need to have access to state ! 
          And method from this component can take care of state change
        */
        <Person name = {this.state.persons[0].name} 
                age={this.state.persons[0].age}/>
        <Person name = {this.state.persons[1].name} 
                age={this.state.persons[0].age}
                passedMethod = {this.switchNameHandler.bind(this, 'Krutik-way2-preferred')} 
                nameChangeMethod = {this.nameChangedHandler}> 
                Additional info between tag passed as props.children
                </Person>
        <Person name = {this.state.persons[2].name} 
                age={this.state.persons[0].age}/>
      </div>
    );
  }
}

/*
<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        
*/
export default App;
