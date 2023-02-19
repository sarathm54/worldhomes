import axios from 'axios';
import { useQuery } from "react-query";
const propertyURL = 'https://api.thegraph.com/subgraphs/name/sarathmohan54/worldhomes-trial';

const queryAllProperties = `
    {
        tokens {
            id
            name
            ipfsURI
            image
            description
            animation_url
            tokenID
            tokenURI
            updatedAtTimestamp
        }
    }
`;

const queryOwnedProperties = `
    {
        tokens {
            id
            name
            ipfsURI
            image
            description
            animation_url
            tokenID
            tokenURI
            updatedAtTimestamp
        }
    }
`;

let getProperties = () => {
        return axios({
            url: propertyURL,
            method: "POST",
            data: {
                query: queryAllProperties
            }
        });
}

let getOwnedProperties = (address) => {
    return axios({
        url: propertyURL,
        method: "POST",
        data: {
            query: queryOwnedProperties
        }
    });
}

export {
    getProperties,
    getOwnedProperties
}