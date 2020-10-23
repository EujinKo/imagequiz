import entries from './entries';

let getEntries = () =>{
    //Later on we will connect to a backend and fetch all the entries
    return entries;
}

let server = {
    fetchEntries : getEntries
};

export default server;