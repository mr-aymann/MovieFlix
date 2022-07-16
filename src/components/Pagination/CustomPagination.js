 import React from 'react'
 import Pagination from '@mui/material/Pagination';
 import { ThemeProvider, createTheme } from '@mui/material/styles';

 const CustomPagination = ({setPage,numOfPages =10}) => {

  const darkTheme=createTheme({
    palette :{
      mode:"dark"
    }
  })
    const handlePagination= (page) =>{
        setPage(page);
        window.scroll(0,0);
    }

   return (
    <div
     style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
    }}> 
    <ThemeProvider theme={darkTheme}>
            <Pagination  count={numOfPages}
            onChange={(e) =>{handlePagination(e.target.textContent)}}
            color="primary"
            hideNextButton
            hidePrevButton
            />
            </ThemeProvider>
     </div>
   );
 }
 
 export default CustomPagination