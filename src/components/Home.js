import React from 'react';
import Login from './Login';
import './Home.css';

class Home extends React.Component {
    //Needs method to check whether user is already logged in
    constructor(props){ //Constructor always receive props
        super(props);   //Superconstructor
        this.state = {
            username: '',
            showLoginForm: false,  //flag
            authenticated: false
        };
    }

    login = () => { //Wants to rerender the UI, but you can't change the state directly
        this.setState({
            showLoginForm: true
        });
    }
    onSubmit = (event) => {
        //You don't access the DOM object directly
        if(this.state.username.trim().length > 0){  //trim(): removes space at the beginning and the end
            //User Successfully signed in
            //Now changed the state
            this.setState({
                authenticated: true
            });
            
        }
        event.preventDefault();
    }
    handleChange = (event) => { //add event if you need to know which function fired the function
        //event target is the input tag
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value   //You need to add bracket to indicate that the string is a key
        });
    }
    body = () => {
        return (
            <div>Hello from the homepage!</div>
        );
    }
    render() { //mandatory method
        if(!this.state.authenticated && this.state.showLoginForm){
            return(
                <div>
                    <form onSubmit={this.onSubmit}>
                        <label>Username:</label>
                        <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange} //Normal react tag has onChange on every tag
                        ></input>
                        <button type="submit">Login</button>
                    </form>
                </div>
            );
        }
        return (    //If authenticated == true, show the username, otherwise go to button
            <div>
                <div className="loginButton">
                    
                    {this.state.authenticated 
                    ? this.state.username
                    :<button onClick={this.login}>Login</button>}
                
                </div>
                {this.body()}         
            </div>
        );
    }
}
export default Home;    //Components which exported can be imported on other pages