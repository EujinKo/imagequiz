import React from 'react';
import server from '../ServerInterface/server';
import {Redirect} from 'react-router-dom';
import './Home.css';


class Quiz extends React.Component {
    constructor(props){ //Constructor always receive props
        super(props);   //Superconstructor
        this.state = {
            username: '',
            entries: [],
            cursor: 0,
            cursor_quiz: 0,
            score: 0,
            trigger: false
        };
    }
    
    componentDidMount(){
        const entries = server.fetchEntries();
        //window: created by browser
        //Binds the function to the key
        // window.addEventListener("keydown",this.handleKeyDown);
        const {username,cursor} = this.props.location.state;
        this.setState({
            entries: entries,
            username: username,
            cursor: cursor,
            cursor_quiz: 0,
            score: 0
        });
    }
    matchQuiz=(quiz,choice)=>{
        if(choice === quiz.answer){
            this.setState({
                score: (this.state.score + 1),
                cursor_quiz: (this.state.cursor_quiz + 1)
            });
        }else{
            this.setState({
                cursor_quiz: (this.state.cursor_quiz + 1)
            });
        }
    }

    displayQuiz = ()=>{
        let quiz = this.state.entries[this.state.cursor].quizzes[ this.state.cursor_quiz];
        
        return (

            <div>
                <img src={require(quiz.imgSrc+"")} alt={quiz.answer}/>
                <div>   
                    <button className="MyButton" onClick={()=>{this.matchQuiz(quiz,quiz.choices[0])}}>
                        {quiz.choices[0]}
                    </button>
                    <br/>
                    <button className="MyButton" onClick={()=>{this.matchQuiz(quiz,quiz.choices[1])}}>
                        {quiz.choices[1]}
                    </button>
                    <br/>
                    <button className="MyButton" onClick={()=>{this.matchQuiz(quiz,quiz.choices[2])}}>
                        {quiz.choices[2]}
                    </button>
                    <br/>
                    <button className="MyButton" onClick={()=>{this.matchQuiz(quiz,quiz.choices[3])}}>
                        {quiz.choices[3]}
                    </button>
                </div>
            </div>
        );
    }

    bodyQuiz = ()=>{
        //---------------------------------------
        // const entries = this.state.entries;
        // const cursor = this.state.cursor;

        // Below statement same with above
        
        const {entries, cursor, cursor_quiz} = this.state;
        //---------------------------------------
        return (
            <div className="flowerTable">
                {entries.length > 0 ?
                this.displayQuiz():
                'TODO'}
            </div>
        );
    }
    setTrigger = () =>{
        this.setState({
            trigger: true
        });
    }

    render(){
        //Save the data which wants to be passed to the variable 'from'
        let from = {pathname: '/', state: {user: this.state.username}};
        if(this.state.trigger){
            return (
                <Redirect to= {from} />
            );
        }
        if(this.state.cursor_quiz == 3){
            return(
                <div className="flowerTable">
                    Total Score: (current score:{this.state.score}/{3})
                    <br/>
                    Would you like to play again?
                    <br/>
                    <button className="MyButton" onClick={()=>{this.componentDidMount()}}>Yes</button>
                    <button className="MyButton" onClick={()=>{this.setTrigger()}}>No</button>
                </div>
            );
        }

        return(
            <div>
                <div className="loginButton">
                    {this.state.username}
                    <br/>
                    (current score:{this.state.score}/{3})
                </div>
                <div>
                    {this.bodyQuiz()}
                </div>
            </div>
        );
    }
}


export default Quiz;