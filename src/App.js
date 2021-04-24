import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      proceText: '',
      hiddenText: [],
    }
  }

  // event for the button
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  submit = () => {
    // check if the textfield is empty
    if (!this.state.text) {
      alert(
        'Ops... You cannot submit this secret. Please fill the textarea form.'
      )
      return
    }
    // cloning a variable, and than stringigy & parse it
    let hiddenTextArray = JSON.parse(JSON.stringify(this.state.hiddenText))
    let textWrittern = JSON.parse(JSON.stringify(this.state.text))
    // format the text and replace the especial text keyword
    let formattedText = textWrittern.replace(/".*?"/g, 'XXXX')
    formattedText = formattedText.replace(/'.*?'/g, 'XXXX')
    // hiden text with single and double quotes
    let hiddenDoubleQuoteWords = textWrittern.match(/".*?"/g)
    let hiddenSingleQuoteWords = textWrittern.match(/'.*?'/g)

    if (
      hiddenDoubleQuoteWords &&
      Array.isArray(hiddenDoubleQuoteWords) &&
      hiddenDoubleQuoteWords.length > 0
    ) {
      hiddenTextArray = [
        ...hiddenTextArray,
        ...hiddenDoubleQuoteWords.map(
          (word) => word && word.replace(/['"]+/g, '')
        ),
      ]
    }
    if (
      hiddenSingleQuoteWords &&
      Array.isArray(hiddenSingleQuoteWords) &&
      hiddenSingleQuoteWords.length > 0
    ) {
      hiddenTextArray = [
        ...hiddenTextArray,
        ...hiddenSingleQuoteWords.map(
          (word) => word && word.replace(/['"]+/g, '')
        ),
      ]
    }

    this.setState({
      proceText: formattedText,
      hiddenText: hiddenTextArray,
    })
  }

  render() {
    return (
      <div className="App" style={{ margin: '20px' }}>
        <h1> The secret CIA Word Compiler</h1>
        <p>
          Given keywords or phrases using single and double quotes will result
          in a hidden text mask.
        </p>
        <p> </p>
        <textarea
          type="text"
          value={this.state.text}
          onChange={(e) => this.handleChange(e)}
          cols="100"
          rows="8"
          name="text"
          placeholder="Please enter keyword of phrase such as eg. Hello world “Boston Red Sox”, ‘Pepperoni Pizza’, ‘Cheese Pizza’, beer"
        />
        <br />
        <button type="button" onClick={() => this.submit()} value="Submit">
          Submit
        </button>
        <br />
        <br />
        {this.state.proceText && (
          <span>
            {' '}
            <b>The formatted text is: </b> {this.state.proceText}
          </span>
        )}
        <br />
        <br />
        {this.state.hiddenText && this.state.hiddenText.length > 0 && (
          <span>
            <strong>The hidden text is: </strong>
            {JSON.stringify(this.state.hiddenText.toString())}
          </span>
        )}
      </div>
    )
  }
}

export default App
