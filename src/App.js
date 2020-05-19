import React, { Component } from 'react';
import './App.css';
import Person from './components/Person';
import './components/Person.css';
import person from './components/Person';

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
  /*
  knote: state Only available to class based components that extends Component
  knote: all elems in state are used somewhere by some components mostly. 
          So, to help React work efficiently to figure out which components/DOM needs to be updated, 
          we should assign each object some unique ID.
          -then use that as "key" {}, in component JSX code below
  */
  state = {
    persons : [
      { id:'asdas1', name: 'manu', age:29},
      { id:'fdgdf3', name: 'stephanie', age:26},
      { id:'fdghg5', name: 'Max', age: 28},
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

  nameChangedHandler = (event, id) => {
    
    /*
      knote: not so good way, inefficient.
          -we hsould just be able to access the elem that was changed and just modify and set that one.
    
    this.setState({
      //change the state's data that we want to change
      persons : [
        { name: 'Max', age: 28},
        { name: event.target.value, age:29},
        { name: 'stephanie', age:26}
      ]
      
    })
    */

    //better way, id of object passed to us.
    //step1: find elem by id
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //step2 : make copy of that person, good practice to update state at once at end. because this is ogiginal object pointer
    const personCopy = {
      ...this.state.persons[personIndex]
    };
    //knote: other way to make copy : const personNew = Object.assign({} , personOrig)
    personCopy.name = event.target.value;

    //step3: copy persons so that we can update new object
    const persons = [...this.state.persons];
    persons[personIndex] = personCopy;

    //step4 : update state
    this.setState({
      persons : persons
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
    console.log('toggle = '+doesShow);
  }

  /*
  knote: this gives error because, same elems are used in older way showPersons code. ideally we need diff component for this for this example.
  */
  deletePersonHandler = (personIndex) => {
    
    /*
    knote: Bad practice to remove this way as we are modifying original state beforehand. remove this person. 
      -rather we should make copy of arr, do it in immutable fashion, set new state at once at end
      const persons = this.state.persons;
      persons.splice(personIndex, 1);
    */
    
    //step 1: make copy of arr
    const persons = [...this.state.persons];

    //step 3: make change to copy    
    persons.splice(personIndex, 1);

    //step 2: update/set state
    this.setState({persons: persons});
  }

/*
knote: notice 2 ways of passing data to switchNameHandler below
knote: render gets called EVERY time react renders or re-renders component(s)
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

    /*
      knote: better way to show/hide components.
        -create var to store JSX content/components
        -then use if to set/clear that
        -put that var in return method inside {}
    */
    let persons = null;//placeholder for JSX code, our components that we want to show/hide
    if(this.state.showPersons) {
      /*
      knote: using loop to display/populate all elems as components, rather than manually creating each component
      */
      persons = (
        <div>
          <p>Person names are clickable, to delete them</p>
          {
            this.state.persons.map( (person_i, index) => {
              return <Person 
                deletePerson={ () => this.deletePersonHandler(index)}
                name = {person_i.name} 
                age={person_i.age}
                key={person.id}
                />
            })
          }
          
        </div>
      );
    }

    return (
      <div className="App">
        <h1 className="App-title">Welcome to React</h1>
        <h2> Conditional display example. Better JS  way </h2>
        <button 
          style = {buttonStyle}
          onClick={ this.togglePersonsHandler}> Conditional show components JS way, thru render method.
        </button>
          {persons}
        
        <h2> Conditional display example. not so good way </h2>
        <button 
          style = {buttonStyle}
          onClick={ this.togglePersonsHandler}> Conditional show components.
                                                Toggle persons. Just specify function name  as handler.</button>
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

        <h2>===========normal state and props passing example below</h2>
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
                nameChangeMethod = {(event) => this.nameChangedHandler(event, person.id) }> 
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
