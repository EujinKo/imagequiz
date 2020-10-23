import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
//Link: for client side swithcing
//Button: for server side

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
    constructor(props){ //Constructor always receive props
        super(props);   //Superconstructor
        this.state = {
            username: ''
        };
    }

    getPathWithCursor=(cursor)=>{
        let from = {pathname: '/quiz', state: {
            username: this.state.username,
            cursor: cursor
        }};
        return from;
    }
    
    body = () => {
        return (
            <div className="flowerTable">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(0)}>
                                        <img src={cherryblossom} alt="cherryblossom"/>
                                    </Link>
                                    <p>cherryblossom</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(1)}>
                                        <img src={daffodil} alt="daffodil"/>
                                    </Link>
                                    <p>daffodil</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(2)}>
                                        <img src={lily} alt="lily"/>
                                    </Link>
                                    <p>lily</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(3)}>
                                        <img src={daisy} alt="daisy"/>
                                    </Link>
                                    <p>daisy</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(4)}>
                                        <img src={rose} alt="rose"/>
                                    </Link>
                                    <p>rose</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(5)}>
                                        <img src={sunflower} alt="sunflower"/>
                                    </Link>
                                    <p>sunflower</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(6)}>
                                        <img src={tulip} alt="tulip"/>
                                    </Link>
                                    <p>tulip</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(7)}>
                                        <img src={waterlily} alt="waterlily"/>
                                    </Link>
                                    <p>waterlily</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }


    SetUserName = (username) =>{
        this.setState({
            username: username
        });
    }

    render() { //mandatory method
        const location = this.props.location;
        //Anything sent from previous page is saved in props.location
        if(location){
            if(location.state){
                //Indicates that this comes from Login page
                if(location.state.user){
                    //Set additional condition to escape infinite loop
                    if(location.state.user !== this.state.username){
                        this.SetUserName(location.state.user);
                    }
                }
            }
        }

        return (    //If (this.state.username.length > 0 ) == true, show the username, otherwise go to button
            <div>
                <div className="loginButton">
                    
                    {this.state.username.length > 0 
                    ? this.state.username
                    :<Link className='MyButton' to='/login'>Login</Link>}
                
                </div>
                {this.body()}        
            </div>
        );
    }
}
export default Home;    //Components which exported can be imported on other pages