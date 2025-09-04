import { useEffect, useState } from "react";
import submit from '../service/service.js';  // submit is the function
import AnswerModal from "../components/answer.js";
import NWImage from '../resources/NW.png';
import Waiting from "../components/waiting.js";
// ...

// const success = await submit(formData);

const SearchForm = () => {
  const [formData, setFormData] = useState({
    region: "",
    price_category: "",
    rating: "",
    cuisine: "",
    features: "",
  });
  const [received, setRecieved] = useState('');
  const [errorMessage, setErrorMessage] = useState(false)
  const [resultWindowVisibility, setResultWindowVisibility] = useState(false)
  const [mapi, setMap] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  // const [showRecieved, setShowRecieved] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    const jsonObject = await submit(formData);
  
    if (jsonObject.prediction !== '') {
      // if (received != null && received !== '') {
      
        // setRecieved('')
        // setRecieved(jsonObject.prediction);  
      // }
      setRefreshKey(refreshKey => refreshKey + 1)
      setRecieved(jsonObject.prediction); // triggers useEffect
      setWaiting(true);
    } else {
      setErrorMessage(true);
    }
  };
  
  useEffect(() => { 
    if (received) { 
      setResultWindowVisibility(false);
  
      const timer = setTimeout(() => { 
        setWaiting(false);
        setResultWindowVisibility(true);
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [refreshKey]); // only runs when 'received' changes
  
  const question = (e) =>  {
    e.preventDefault();
    setMap(true)
    
  }

  return (
    <>
<form className="form-container" onSubmit={handleSubmit}>
<div className="form-group">
  <div style={{ display: "flex" }}>
    <label>Location:</label>
    <button
      onClick={question}
      style={{
        maxHeight: "20px",
        maxWidth: "20px",
        alignItems: "center",
        margin: "5px"
      }}
    >
      ?
    </button>
  </div>

  <select
    name="region"
    value={formData.region}
    onChange={handleChange}
    required
  >
    <option value="">Select a region</option>
    <option value="NW">SW</option>
    <option value="NE">SE</option>
    <option value="SW">SE</option>
    <option value="SE">SW</option>
    <option value="SE">SW</option>
    <option value="C">C</option>
  </select>

  <div style={{ maxWidth: "200px", maxHeight: "200px" }}>
    {mapi && (
      <img
        src={NWImage}
        style={{
          display: "flex",
          width: "100%"
        }}
        alt="Map preview"
      />
    )}
  </div>
</div>


  <div className="form-group">
    <label>Price Range:</label>
    <select
      name="price_category"
      value={formData.price_category}
      onChange={handleChange}
      required
    >
      <option value="">Select</option>
      <option value="<20">&lt;20</option>
      <option value="<50">&lt;50</option>
      <option value="<100">&lt;100</option>
      <option value="100+">100+</option>
    </select>
  </div>

  <div className="form-group">
    <label>Min Rating:</label>
    <input
      type="number"
      name="rating"
      min="0"
      max="5"
      step="0.1"
      value={formData.rating}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Cuisine:</label>
    <select
      name="cuisine"
      value={formData.cuisine}
      onChange={handleChange}
      required
    >
      <option value="">Select</option>
      <option value="Turkish">Turkish</option>
      <option value="Georgian">Georgian</option>
      <option value="Belgian">Belgian</option>
      <option value="French">french</option>
      <option value="Asian">Asian</option>
      <option value="Italian">Italian</option>
      <option value="Mediteranean">Mediteranean</option>
      <option value="Wraps/Bowls">Wraps/Bowls</option>
      <option value="cafe">other</option>
      <option value="sandwiches">sandwiches</option>
      <option value="cafe">cafe</option>
    </select>
  </div>

  <div className="form-group">
    <label>Few words to describe what you are searching for:</label>
    <input
      type="text"
      name="features"
      value={formData.features}
      onChange={handleChange}
    />
  </div>

  <button type="submit" className="submit-button">Submit</button>
</form>

    {received && (
      <>
      {waiting &&
      <Waiting 
      onClose={() => setWaiting(false)}/> 
    }
     
     { resultWindowVisibility &&
      <AnswerModal
      answer={received} // Also change this - recieved is already the prediction string
      onClose={() => setResultWindowVisibility(false)} />
          
    }
          </>
)}

    {errorMessage?? 
     <h1>chat something went wrong</h1>
    }
    </>
);
};

export default SearchForm;
