import React from 'react';
import '../style/Instruction.css'

class Instruction extends React.Component {
    render() {
        return(
            <div className="instruction">
                <h1>{this.props.title}</h1>
                    <li>1. Select a meme and click on it</li>
                    <li>2. Enter first or second text or both</li>
                    <li>3. Click generate meme button</li>
                    <li>4. Click right button in your mouse and download meme if you want</li>
                    <li>5. Start over</li>
            </div>
        )
    }
}

export default Instruction;