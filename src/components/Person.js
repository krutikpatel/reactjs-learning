import React, { Component } from 'react'
import { version } from 'react-dom';
/*
knote: way1 to create component, class based
    -problem : accessing props, its easy in functional component

https://www.freecodecamp.org/news/functional-components-vs-class-components-in-react/

a. dynamically load content via JS code. put between {}
b. using props to get data passed via app.js
*/

/*
//working props on class based component
export default class Person extends Component {

    render() {
        return (
            <div>
                <p>I am Person, class</p>  
                <p>I am  {this.props.name} and age = {this.props.age} </p>
            </div>
        )
    }
}
*/

/*
knote: way 2: instead of class we are just creating a function and export that.
        -functional component
        -to use state in functional components, we will need to use "hooks"
*/
/*
knote: If method referenced from props does not exist, its not a problem.
    -so it will only work on components for which method was passed (here, 2md person from app.js)

knote:  -2way data binding: onChange : passed user typed name via event to app.js thru props.nameChangeMethod
        -value=props.name gets initial value from app.js props
*/
const person = (props) => {
    return (
            <div className="Person">
                <p>I am Person, class</p>
                <p>Dynamic content : Age {Math.floor(Math.random() * 30)}</p>
                <p>I am  {props.name} and age = {props.age} </p>
                <p>{props.children}</p>
                <p onClick={props.passedMethod}> Clickable </p>
                <p onClick={props.deletePerson}> Click To Delete Person </p>
                <input type="text" onChange={props.nameChangeMethod} value={props.name}/>
            </div>
           )
};

export default person;



