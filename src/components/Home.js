import React from 'react';
import './Home.css';

import cherryblossom from './images/cherryblossom.png';
import daffodil from './images/daffodil.png';
import daisy from './images/daisy.jpg';
import lily from './images/lily.jpg';
import rose from './images/rose.png';
import sunflower from './images/sunflower.png';
import tulip from './images/tulip.png';
import waterlily from './images/waterlily.png';

class Home extends React.Component {
    //Needs method to check whether user is already logged in
    constructor(props) { //Constructor always receive props
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
        if (this.state.username.trim().length > 0) {  //trim(): removes space at the beginning and the end
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
            <div className="flowerTable">
                <table>
                    <tr>
                        <td>
                            <div>
                                <img src={cherryblossom} alt="cherryblossom" />
                                <p>cherryblossom</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img src={daffodil} alt="daffodil" />
                                <p>daffodil</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img src={lily} alt="lily" />
                                <p>lily</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img src={daisy} alt="daisy" />
                                <p>daisy</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <img src={rose} alt="rose" />
                                <p>rose</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img src={sunflower} alt="sunflower" />
                                <p>sunflower</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img src={tulip} alt="tulip" />
                                <p>tulip</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img src={waterlily} alt="waterlily" />
                                <p>waterlily</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

        );
    }
    render() { //mandatory method
        if (!this.state.authenticated && this.state.showLoginForm) {
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange} //Normal react tag has onChange on every tag
                        ></input>
                        <button className="MyButton" type="submit">Login</button>
                    </form>
                </div>
            );
        }
        return (    //If authenticated == true, show the username, otherwise go to button
            <div>
                <div className="loginButton">

                    {this.state.authenticated
                        ? this.state.username
                        : <button className="MyButton" onClick={this.login}>Login</button>}

                </div>
                {this.body()}
            </div>
        );
    }
}
export default Home;    //Components which exported can be imported on other pages