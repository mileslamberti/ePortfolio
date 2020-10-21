
//tags
import React, { useState, useEffect } from 'react';
import "./tags.component.css";
import { Input } from '@material-ui/core';
import axios from 'axios';
import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";


const Tags = () => {

  const [ tags, setTags ] = useState([]);

  const [tagInput, setTagInput] = useState("");

  useEffect( () => {
    axios.get(API_URL + "/tags", { headers: authHeader() })
        .then( res => {
            setTags(tags => tags.concat(res.data.tags));
        })
        .catch( err => {
            console.log(err);
        })
  }, []);

  
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
    <div className="input-tag">
      <ul className="input-tag__tags">
        { tags.map((tag, i) => (
          <li key={tag}>
            {tag}
            <button type="button" onClick={() => { removeTag(i); }}>+</button>
          </li>
        ))}
        <li className="input-tag__tags__input">
          <Input value={tagInput} onChange={onChangeTag} onKeyDown={inputKeyDown}/>   
        </li>
      </ul>
    </div>
  );
}

export default Tags;
