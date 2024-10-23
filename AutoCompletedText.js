import React from 'react';
import Countries from './Countries';

export default class AutoCompletedText extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            text: ''
        }
    }

    onTextChage = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = newRegExp('^${value}', 'i');
            suggestions = Countries.sort().filler(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {
                    suggestions.map((_item, index) => (<li key={index} onClick={() => this.selectedText}))
                }
            </ul>
        )
    }

    render() {
        const { text, suggestions } = this.state;
        return (

            <div id="notebooks">
                <h2>Auto-Selective Country Names:</h2>
                <input id="query" type="text" onChange={this.onTextChange} value={text} />
                {this.renderSuggestions()}
                <span>Suggestions: {suggestions.length}</span>
            </div>
        );
    }
}