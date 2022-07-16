import React from 'react'
import axios from 'axios';
import Chip from '@mui/material/Chip';
import { useEffect } from "react";
import "./Genre.css"

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
    }) => {

    const handleAdd=(genre) =>{
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g) => !(g.id === genre.id)))
        setPage(1);
        console.log(selectedGenres);
    }

    const handleRemove =(genre)=>{
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id!== genre.id)
        );
        setGenres([...genres,genre]);
        setPage(1);

    }

  
    const fetchGenres = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setGenres(data.genres);
        
      };
      

    useEffect(() => {
        fetchGenres();
        // eslint-disable-next-line
    }, []);


  return (
    <div className='chip' style={{ padding: "6px 0" }}>
          {
           selectedGenres.map((genre) =>
            <Chip
              style={{ margin: 2 ,}}
              label={genre.name}
              key={genre.id}
              size="medium"
              color='primary'
              clickable
              onDelete= {()=> handleRemove(genre)}>

              </Chip>
           )
        }
        {
           genres.map((genre) =>
            <Chip
              style={{ margin: 2 ,
                background:'#F5F5F5'}}
              label={genre.name}
              key={genre.id}
              size="small"
              clickable
              onClick={()=>handleAdd(genre)}>
              </Chip>
           )
        }
      
    
  </div>
  )
}

export default Genres