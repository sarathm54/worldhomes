import axios from "axios";
import { useQuery } from "react-query";

const endpoint = "https://graphql.icy.tools/graphql";

const getNFT = () => {

    const FILMS_QUERY = `
    {
      launchesPast(limit: 10) {
        id
        mission_name
      }
    }
  `;
  
  // const { data, isLoading, error } = useQuery("launches", () => {
      return axios({
        url: endpoint,
        method: "POST",
        data: {
          query: FILMS_QUERY
        }
      }).then(response => response.data.data);
  //   });
};

export {
    getNFT
}
