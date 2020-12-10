import React, { useEffect, useState } from 'react';
import axios from './axios';

function Row({ title, fetchUrl }) {
    const [ movies, setMovies ] = useState([]);

    // A snippet of code which runs based on a specific condition/varaible
    useEffect(() => {
        //if [], run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            //"https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213",
            console.log(request);
            return request;
        }
        fetchData();
    }, []);


    return (
        <div>
            <h2>{ title }</h2>
            {fetchUrl}
            {axios}
        </div>
    );
}

export default Row;
