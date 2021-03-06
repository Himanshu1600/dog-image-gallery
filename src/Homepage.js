import React, { useEffect, useState } from "react";
import "./Homepage.css";

function Homepage() {
  const [breed, setbreed] = useState([]);
  const [subbreed, setsubbreed] = useState([]);
  const [currentbreed, setcurrentbreed] = useState("affenpinscher");
  const [currentSubbreed, setcurrentSubbreed] = useState("");
  const [breedimg, setbreedimg] = useState([]);
  const [getimg, setgetimg] = useState(false);

  //Store current value of breed coloum
  const handlebreed = (e) => {
    // console.log(e.target.value);
    setcurrentbreed(e.target.value);
  };

  //Store current value of subbreed coloum
  const handlesubbreed = (e) => {
    setcurrentSubbreed(`/${e.target.value}`);
    // console.log(currentSubbreed);
  };

  // Run the functions whenever breed or subbreed value will change
  useEffect(() => {
    getsubbreedApi();
    getbreedimageApi();
    setgetimg(false);
  }, [currentbreed, currentSubbreed]);

  // Run whenever the page reload
  useEffect(() => {
    getbreedApi();
    getsubbreedApi();
  }, []);

  // fetch the Breed list from api
  const getbreedApi = async () => {
    let data = await fetch("https://dog.ceo/api/breeds/list");
    let parsedata = await data.json();
    setbreed(parsedata.message);
    // console.log(breed);
  };

  // fetch the subbreed list of selected breed from api
  const getsubbreedApi = async () => {
    let subdata = await fetch(`https://dog.ceo/api/breed/${currentbreed}/list`);
    let parsedata = await subdata.json();
    // console.log(parsedata.message);
    !parsedata.message.length && setcurrentSubbreed("");
    setsubbreed(parsedata.message);
  };

  //fetch images of selected breed or subbreed
  const getbreedimageApi = async () => {
    let Url = `https://dog.ceo/api/breed/${currentbreed}${currentSubbreed}/images/random/10`;
    let subdata = await fetch(Url);
    let parsedata = await subdata.json();
    let newimg = await Object.values(parsedata.message);
    // console.log(newimg);
    setbreedimg(newimg);
  };

  return (
    <div className="container">
      <h1>The Dog Image Gallery</h1>
      <div className="heading">
        <div className="select_list">
          <label>Choose breed -</label>
          <select id="dogs" name="breed" onChange={handlebreed}>
            {breed.map((element, index) => {
              return <option id={index}>{element}</option>;
            })}
          </select>
        </div>
        {subbreed.length ? (
          <div className="select_list">
            <label>Choose subbreed -</label>
            <select id="subdogs" name="subbreed" onChange={handlesubbreed}>
              <option> </option>
              {subbreed.map((element) => {
                return <option>{element}</option>;
              })}
            </select>
          </div>
        ) : null}

        <button className="btn" onClick={() => setgetimg(true)}>
          Get image
        </button>
      </div>

      <div className="img-container">
        {getimg &&
          breedimg.map((imglink) => {
            return <img src={imglink} alt="loading" className="img" />;
          })}
      </div>
    </div>
  );
}

export default Homepage;
