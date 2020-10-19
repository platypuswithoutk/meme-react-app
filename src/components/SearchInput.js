import React from 'react';
import '../style/SearchInputStyle.css'

class SearchInput extends React.Component {
    render() {
        return(
            <form>
                <input type="text" name="top" value="top meme text..." />
                <input type="text" name="bottom" value="bottom meme text..." />
                <input type="submit" value="Generate meme" id="btn"/>         
            </form>
        )
    }
}

export default SearchInput;
