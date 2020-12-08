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

    storeResults: (quizid, score) => {
        let data = {quizid: quizid, score:score};
        fetch(api+'/score', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then( x => x.json()).then( y => console.log(y)).catch( e=> console.log(e));


    },
    findBestScore: () => {
        return (
            fetch(api+"/scores").then( x => {
                return x.json();
            }).then( y => {
                console.log(y);
                return y;
            }).catch(e => {
                console.log("ERROR: From server\n"+e);
            })
        )
    }

};

export default server;