import React from 'react';
import server from '../ServerInterface/server';
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
            username: '',
            quiz0bestscore: 0,
            quiz1bestscore: 0,
            quiz2bestscore: 0,
            quiz3bestscore: 0,
        };
    }

    getPathWithCursor=(cursor)=>{
        let from = {pathname: '/quiz', state: {
            username: this.state.username,
            cursor: cursor
        }};
        return from;
    }
    componentDidMount(){

        server.findBestScore().then( x => {
            let score0 = x[0].score;
            let score1 = x[1].score;
            let score2 = x[2].score;
            let score3 = x[3].score;

            this.setState({
                quiz0bestscore: score0,
                quiz1bestscore: score1,
                quiz2bestscore: score2,
                quiz3bestscore: score3
            })
            console.log(this.state);

        }).catch(e => {
            console.log(e);
        })
    }

    body = () => {
        return (
            <div className="flowerTable">
                <p>Welcome to the image quiz!</p>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(0)}>
                                        <img src={cherryblossom} alt="cherryblossom"/>
                                    </Link>
                                    <p>cherryblossom</p>
                                    <p className="MyButton">Score: {this.state.quiz0bestscore}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(1)}>
                                        <img src={daffodil} alt="daffodil"/>
                                    </Link>
                                    <p>daffodil</p>
                                    <p className="MyButton">Score: {this.state.quiz1bestscore}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(2)}>
                                        <img src={lily} alt="lily"/>
                                    </Link>
                                    <p>lily</p>
                                    <p className="MyButton">Score: {this.state.quiz2bestscore}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Link to={this.getPathWithCursor(3)}>
                                        <img src={rose} alt="rose"/>
                                    </Link>
                                    <p>rose</p>
                                    <p className="MyButton">Score: {this.state.quiz3bestscore}</p>
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