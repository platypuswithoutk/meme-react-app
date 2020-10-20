import React, { useState, useEffect } from 'react';
import '../style/SearchInputStyle.css'

function SearchInput() {

    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState("");
    const api = 'https://api.imgflip.com/get_memes';
    const [templates, setTemplates] = useState([])
    useEffect(() => {
        fetch(api)
        .then((response) => response.json())
        .then((json) => setTemplates(json.data.memes))
    }, []);

    console.log('templates:', templates)

    function handleChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        if(fieldName === 'top') {
            setTopText(fieldValue);
        } else {
          setBottomText(fieldValue);
        }
    }

    function handleSubmit(event){
        event.preventDefault();
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="top" value={topText} onChange={handleChange}/>
            <input type="text" name="bottom" value={bottomText} onChange={handleChange}/>
            <input type="submit" value="Generate meme" id="btn"/>         
        </form>
    )
}

export default SearchInput;
