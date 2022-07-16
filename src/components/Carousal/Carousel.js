import React from 'react'
import axios from 'axios';
import Chip from '@mui/material/Chip';
import { useEffect,useState} from "react";
//import { useHref } from 'react-router-dom';

const Carousel = ({media_type,id}) => {

    const [provider, setProvider] = useState();

    

    const fetchGenres = async () => {
      if(typeof(media_type) == "undefined"){
        media_type="movie"
      }
        const {data}  = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&watch_region=" "`
        );
        setProvider(data.results["IN" || "US" || "AU" ||"NZ"|| "CA" ||"JP"]["flatrate"]);
        
        
      };
      useEffect(() => {
        fetchGenres();
        // eslint-disable-next-line
    }, [id,media_type]);

  return (
    <div style={{ padding: "6px 0" }}>
      {
       provider && provider.map((p) =>
            <Chip
              style={{ margin: 2 }}
              label={p["provider_name"]?p["provider_name"]:"No Streaming Provider"}
              key={p["provider_name"]}
              size="large"
              color='primary'
              clickable>
              </Chip>
              )
              
        }
        
  </div>
  )
}

export default Carousel