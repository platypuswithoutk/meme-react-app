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
        const idMemes = [
            181913649, 112126428, 87743020, 217743513, 124822590, 438680, 247375501, 148909805, 252600902,
            119139145, 4087833, 97984, 178591752, 135256802, 91538330, 91545132, 27813981, 89370399, 61579,
            135678846, 259237855, 101470, 21735, 6235864, 28251713, 61520, 3218037, 101287, 101288, 61556, 
            84341851, 14371066, 8072285, 5496396, 61532, 235589, 110163934, 99683372, 4173692, 460541, 16464531,
            61527, 61546, 563423, 285870, 29617627, 922147, 6531067, 56225174, 61585, 109765, 405658, 61539, 61533,
            28034788, 61582, 71428573, 89655, 444501, 61544, 1202623, 27920, 61581, 176908, 14230520, 101716, 54401824,
            61580, 40945639
        ]
        fetch("https://api.imgflip.com/get_memes")
        .then((response) => response.json())
        .then((json) => setTemplates(json.data.memes.filter((meme) => idMemes.includes(parseInt(meme.id)))));
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
        if (imageId === selectedId) {
            removeStylesForPreviouslyClickedElement();
            setSelectedId(null);
        }
    };

    const handleReset = () => {
        setMeme(null);
        setTopText("");
        setBottomText("");
        removeStylesForPreviouslyClickedElement();
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
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <input type="text" id="topTextInputId" name="top" placeholder="first meme text" value={topText} onChange={handleChange} />
                    <input type="text" id="bottomTextInputId" placeholder="second meme text" name="bottom" value={bottomText} onChange={handleChange}/>
                    <button type="submit" id="btn">Generate meme</button>
                    <button type="button" id="back-btn" onClick={handleReset}>Start over
                        <i className="fas fa-undo"></i>
                    </button>
                </form>
            </div>
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
