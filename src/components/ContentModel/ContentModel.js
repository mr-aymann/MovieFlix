import * as React from 'react';
import { useState ,useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import {
    img_500,
    unavailable,
    unavailableLandscape,
  } from "../../config/config";
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './ContentModel.css'
import axios from "axios"
import Carousel from '../Carousal/Carousel';



const theme = createTheme();
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "70%",
   backgroundColor: "#39445a",
   border: "1px solid #282c34",
   borderRadius: 4,
   color: "white",
   boxShadow: theme.shadows[10],
   padding: theme.spacing(4, 4, 6),
};




export default function ContentModel({children, media_type, id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState()
  const [link, setLink] = useState();

  
  const fetchData = async () => {
    if(typeof(media_type) == "undefined"){
      media_type="movie"
    }
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
     //console.log(data);
  };
  const fetchVideo = async () => {
    if(typeof(media_type) == "undefined"){
      media_type="movie"
    }
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
      //console.log(data.results)
    setVideo(data.results[0]?.key);
  };
  
  const fetchlink=async () =>{
    if(typeof(media_type) == "undefined"){
      media_type="movie"
    }
    const {data}  = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&watch_region=" "`
  );
  setLink( data.results["IN" || "US" || "AU" ||"NZ"|| "CA" ||"JP"]["link"])
  }

  useEffect(() => {
    fetchData();
    fetchVideo();
    fetchlink();
    // eslint-disable-next-line
  }, []);

  return (
    <>
        <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        { children && children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          { content && (<Box sx={style}>
           <div className='ContentModal'>
           <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                 <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <Carousel id={id} media_type={media_type}/>
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>
                 
                 <Button
                    variant="contained"
                    startIcon={<MovieFilterIcon />}
                    color="primary"
                    target="__blank"
                    href={link}
                  >
                    Watch Movie
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
           </div>
          </Box>)}
        </Fade>
      </Modal>
    </>
  );
}