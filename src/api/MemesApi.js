import React, { useState, useEffect } from 'react';

function MemesApi() {
    const api = 'https://api.imgflip.com/get_memes';
    const [templates, setTemplates] = useState([])
    useEffect(() => {
        fetch(api)
        .then((response) => response.json())
        .then((json) => setTemplates(json.data.memes))
    }, []);

    console.log('templates:', templates)
}

