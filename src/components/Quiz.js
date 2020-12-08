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
        server.fetchEntries()
        .then(x => {
            this.setState({entries: x});
            console.log(this.state);
        })
        .catch(e => {
            console.log(e);
        });
        //window: created by browser
        //Binds the function to the key
        // window.addEventListener("keydown",this.handleKeyDown);
        const {username,cursor} = this.props.location.state;
        this.setState({
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

            <div className='quizDiv'>
                <img src={require(quiz.imgSrc+"")} alt={quiz.answer}/>
                <div className='quizButtons'>   
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
        server.storeResults(this.state.username,this.state.cursor_quiz,this.state.score);
    }

    render(){
        //Save the data which wants to be passed to the variable 'from'
        let from = {pathname: '/', state: {user: this.state.username}};
        if(this.state.trigger){
            return (
                <Redirect to= {from} />
            );
        }
        if(this.state.entries.length != 0 ){
            var length = this.state.entries[this.state.cursor].quizzes.length;

            if(this.state.cursor_quiz == length){
                return(
                    <div className="flowerTable">
                        <br/><br/>
                        <label>Total Score: (current score:{this.state.score}/{length})</label>
                        <br/>
                        <label>Would you like to play again?</label>
                        <br/>
                        <button className="MyButton" onClick={()=>{this.componentDidMount()}}>Yes</button>
                        <button className="MyButton" onClick={()=>{this.setTrigger()}}>No</button>
                        <br/><br/>
                    </div>
                );
            }
    
            return(
                <div>
                    <div className="loginButton">
                        {this.state.username}
                        <br/>
                        (current score:{this.state.score}/{length})
                    </div>
                    <div>
                        {this.bodyQuiz()}
                    </div>
                </div>
            );
        }
        return(
            <div>Page is loading</div>
        );
    }
}


export default Quiz;