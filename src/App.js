import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Loading from './Loading'

const App = () => {

  const [cat,setCat] = useState("");
  const [done,setDone] = useState(undefined)
  const [imgLoad, setImgLoad] = useState(false)
  useEffect(()=>{
    getCat()
  }, [])
  

  const getCat = ()=> {
    setDone(false)
    setImgLoad(false)
    setTimeout(() => {
      fetch("https://aws.random.cat/meow")
      .then(res => res.json())
      .then(data => {
        setCat(data.file)
        setDone(true)
      })
    });
  }

  // Styles 
  const appConainer = {
    textAlign:"center",
  }

   const catContainer = {
    maxWidth: '30rem',
    margin: '2rem auto',
  }


  const loadStyle = imgLoad ? {visibility: 'visible'} : {visibility: 'hidden'}
  const loadStyleLoading = !imgLoad ? {visibility: 'visible'} : {visibility: 'hidden'}

  
  const catImage = {
      width: '100%',
      height: '30rem',
      objectFit: 'cover',
      borderRadius: '5px',
      border: "10px solid black",
      boxSizing: "border-box",
      loadStyle
  }

  const btnStyle = {
    background: 'blue',
    padding: '0.5rem 1rem',
    border: 'none',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
  }
  
  return (
  <div className="app" style={appConainer}>
    <h3 style={{marignTop: "2rem"}}>Get random Cat Images by click button here!</h3>
    <button style={btnStyle} onClick={()=> getCat()}>Get Cat</button>
    <div className="cat-pic" style={catContainer}>
      {!done ? (
        <Loading/>
      ) : (
        <div>
          <p style={loadStyleLoading}>Loading image in DOM .. </p>
          <img onLoad={()=> setImgLoad(true)} style={{...catImage, ...loadStyle}} src={cat} alt="Random Cat"/>
        </div>
      )}
    </div>
  </div>
  );
}

export default App;
