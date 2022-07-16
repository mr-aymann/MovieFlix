const useGenres = (selectedGenres) =>{
    if(!selectedGenres.length) return "";

    const Genreids= selectedGenres.map((g) => g.id);
    return Genreids.reduce((acc,curr) => acc + "," + curr);
}

export default useGenres;