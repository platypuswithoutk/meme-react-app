import React, { useState, useEffect } from 'react';
import '../style/MemeGeneratorStyle.css';
import qs from "qs";

function MemeGenerator() {

    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [templates, setTemplates] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [meme, setMeme] = useState(null);
    const [clickedElementClass] = useState("clicked-img");

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then((response) => response.json())
        .then((json) => setTemplates(json.data.memes));
    }, []);

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        if (fieldName === "top") {
            setTopText(fieldValue);
        } else {
            setBottomText(fieldValue);
        }
    };

    const handleClick = (imageId) => {
        removeStylesForPreviouslyClickedElement();
        setSelectedId(imageId);
        addStyles(imageId);
        if(imageId == selectedId) {
            removeStylesForPreviouslyClickedElement();
        }
    };

    function removeStylesForPreviouslyClickedElement() {
        let image = document.getElementById(selectedId);
        if(image){
            image.classList.remove(clickedElementClass);
        }
    }

    function addStyles(imageId) {
        let image = document.getElementById(imageId);
        image.classList.add(clickedElementClass);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const params = {
            template_id: selectedId,
            text0: topText,
            text1: bottomText,
            username: "xzk03017",
            password: "xzk03017@cndps.com"
        };
            
    fetch(`https://api.imgflip.com/caption_image?${qs.stringify(params)}`)
        .then((response) => response.json())
        .then((json) => {
            if (json.success) {
            setMeme(json.data.url);
            }
        });
    };

    return (
        <div className="App">
        <form onSubmit={handleSubmit}>
            <input type="text" name="top" value={topText} onChange={handleChange} />
            <input
                type="text"
                name="bottom"
                value={bottomText}
                onChange={handleChange}
                />
            <input type="submit" value="Generate meme" id="btn" />
        </form>
        <div className="meme">{meme ? <img src={meme} alt="" /> : null}</div>
        <div className="meme-container">
            {templates &&
            templates.map((elem) => (
                <img
                id={elem.id}
                onClick={() => handleClick(elem.id)}
                src={elem.url}
                alt=""
                />
            ))}
        </div>
    </div>
    );
    }

export default MemeGenerator;
