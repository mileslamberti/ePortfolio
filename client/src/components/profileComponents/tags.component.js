
//tags
import React, { useState, useEffect } from 'react';
import "./tags.component.css";
import { Input } from '@material-ui/core';
import axios from 'axios';
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";


const Tags = (props) => {

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [authorised, setAuthorised] = useState(props.authorised);
  const [loading, setLoading] = useState(false);

  useEffect( () => {

    setAuthorised(props.authorised);

    // Only want to request data if it hasn't been loaded
    if(tags.length === 0){
      setLoading(true);

      axios.post(API_URL + "/gettags", {handle : props.profileHandle})
      .then( res => {
          setTags(tags => tags.concat(res.data.tags));
          setLoading(false);
      })
      .catch( err => {
          console.log(err);
          setLoading(false);
      })
    }

  }, [props]);

  
  const removeTag = (i) => {
    const newTags = [ ...tags ];
    newTags.splice(i, 1);
    setTags(newTags);
    axios.post(API_URL+'/tags', {tags: newTags}, { headers: authHeader() })
        .then( res => {
          console.log(res.data);
        }); 
  }

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      onSubmit(e);
    }
  }
  const onChangeTag = (e) => {
    setTagInput(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault(); // allows us override the default html stuff
    // Check for tagInput value and make sure the same card does not exist
    if (tagInput !== "" && ! (tags.find(tag => tag.toLowerCase() === tagInput.toLowerCase())) ){
      setTags(tags => tags.concat([tagInput]));
      const updatedTags = tags.concat([tagInput]);
      setTagInput("");
      axios.post(API_URL+'/tags', {tags: updatedTags}, { headers: authHeader() })
        .then( res => {
          console.log(res.data);
        }); 
    }
  }

  return (
    <div>
      {loading ? <span className="spinner-border spinner-border-sm"></span> : 
      <>
        <div className="input-tag">
          <ul className="input-tag__tags">
            { tags.map((tag, i) => (
              <li key={tag}>
                {tag}
                {authorised ? (<>
                  <button type="button" onClick={() => { removeTag(i); }}>+</button>
                </>) : (<></>)}
              </li>
            ))}
            {authorised ? (<>
              <li className="input-tag__tags__input">
                <Input value={tagInput} onChange={onChangeTag} onKeyDown={inputKeyDown}/>   
              </li>
            </>) : (<></>)}
          </ul>
        </div>
      </>
      }
    </div>
  );
}

export default Tags;
