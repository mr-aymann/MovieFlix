import {useState ,useEffect} from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
//import Chip from '@mui/material/Chip';
import Genres from '../../components/Genres';
import useGenres from '../../hooks/useGenre';

const Series = () => {
  
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(500);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforUrl=useGenres(selectedGenres)

  const fetchMovie= async() =>{
      const{ data }= await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforUrl}`)

      setContent(data.results);
      setNumOfPages(data.total_pages<=500?data.total_pages:500);
  };

  useEffect(() => {
    fetchMovie();
     // eslint-disable-next-line 
  },[page,selectedGenres])
  return (
    <div><span className='pageTitle'> Tv Series</span>
    <Genres type ="tv" 
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres} 
      genres={genres} 
      setGenres={setGenres}
      setPage={setPage} />

      <div className='trending'>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
        </div>
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
    </div>
  )
}

export default Series