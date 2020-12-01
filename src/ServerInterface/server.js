// import entries from './entries';
let api = "https://eujinko-imagequiz.herokuapp.com/quizzes";

// let getEntries = () =>{
//     //Later on we will connect to a backend and fetch all the entries

//     fetch(api)
//     .then(x => {
//         console.log(x);
//         return x.json();
//     })
//     .then( y => console.log(y))
//     .catch(e=>console.log(e));

//     // return entries;
// }

let server = {
    fetchEntries : () => {
        return(
            fetch(api).then( x => {
                x.json();
            }).catch(e => {
                console.log(e);
            })
        );
    }
};

export default server;