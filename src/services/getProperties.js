import axios from 'axios';

let getProperties = () => {
    return axios.get('/assets/data/propertylist.json');
}

export {
    getProperties
}