import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomeBody.css';

const HomeBody = () => {
  //----------------------------------------------
  // const requestToken = process.env.REACT_APP_REQUEST_TOKEN;   // env로 수정해보기
  const apiKey = '1a02b35f976359d06db6ac9ca88a1e90';
  const baseURL = 'https://api.themoviedb.org/3'
  const [moviePopular, setMoviePopular] = useState([]);
  const [moviePopularTop, setMoviePopularTop] = useState([]);
  const [movieTopRate, setMovieTopRate] = useState([]);
  //----------------------------------------------
  const getPopular = async() => {
    const res = await axios.get(`${baseURL}/movie/popular?api_key=${apiKey}`);
    setMoviePopular(res.data.results);
    setMoviePopularTop(res.data.results[0]);
  };
  console.log(moviePopular);
  //----------------------------------------------
  // 평점
  const getTopRated = async() => {
    const res = await axios.get(`${baseURL}/movie/top_rated?api_key=${apiKey}`) 
    setMovieTopRate(res.data.results);  
  };
  console.log(movieTopRate);
  //----------------------------------------------
  let backImgUrl = moviePopularTop['backdrop_path'];
  const backImgLink = `https://image.tmdb.org/t/p/original${backImgUrl}`;
  //----------------------------------------------

  useEffect(()=>{
    getPopular();
    getTopRated();
  },[]);

  return (
    <div>
      <header style={{
        backgroundSize:'cover',
        backgroundImage:`url(${backImgLink})`,
        backgroundPosition:'center center',
        objectFit:'contain',
        height:'450px'
      }}>
        <h1>LOGO</h1>
      </header>

      <section id='sec1'>
        <div className='ranking'>
          <h3>현재 영화 인기 순위</h3>
          <div>
            {moviePopular.map(movie=>(
              <div key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}/>
                {/* <p>{movie.id}</p> */}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className='ranking'>
          <h3>영화 평점 순위</h3>
          <div>
            {movieTopRate.map(rate=>(
              <div key={rate.id}>
                <img src={`https://image.tmdb.org/t/p/w200${rate.poster_path}`}/>
                {/* <p>{movie.id}</p> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeBody;