// import entries from './entries';
let api = "https://eujinko-imagequiz.herokuapp.com";


let server = {
    fetchEntries : () => {
        return(
            fetch(api+"/quizzes").then( x => {
                return x.json();
            }).then( y => {
                return y;
            }).catch(e => {
                console.log("ERROR: From server\n"+e);
            })
        );
    },

    storeResults: (username, quizid, score) => {
        let data = {username: username, quizid: quizid, score:score};
        fetch("http://localhost:3002/score", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then( x => x.json()).then( y => console.log(y)).catch( e=> console.log(e));


    }

};

export default server;