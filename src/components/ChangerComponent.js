import React, { Component } from 'react'

class ChangerComponent extends Component {

    options = [
        {value: 'currentlyReading', label: 'Currently Reading'},
        {value: 'wantToRead', label: 'Want to Read'},
        {value: 'read', label: 'Read'},
        {value: 'none', label: 'None'},
    ]

    state = {
        currentValue: this.props.selectedOption
    }

    moveBook(e) {
        this.setState({ currentValue: e.target.value })
        // Update parent
        this.props.onMoveBook(e.target.value)
    }

    render() {
        return (

            <select onChange={ (e) => this.moveBook(e) }
                value={this.state.currentValue}>
                <option value="none" disabled>Move to...</option>
                {
                    this.options.map((option) => (
                        <option key={option.value} value={option.value} >{option.label}</option>
                    ))
                }
            </select>
        )
    }
}

export default ChangerComponent;