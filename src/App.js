import React, { Component } from "react";
import "./styles.css";

class App extends Component {
  state = {
    value: "",
    encoded: "",
    decoded: ""
  };

  enterText = async (e) => {
    await this.setState({ value: e.target.value });
    //console.log(this.state.value)
    if (this.state.value !== "") {
      this.encodeString(this.state.value);
    } else {
      this.setState({
        encoded: "",
        decoded: ""
      });
    }
    //this.checkHandler();
  };

  checkHandler = () => {
    console.log(this.state.value);
  };
  encodeString = (s) => {
    if (!s || s === undefined) this.setState({ encoded: "enter valid string" });
    var dict = new Map(); // Use a Map!
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i = 1; i < data.length; i++) {
      currChar = data[i];
      console.log(data[i]);
      if (dict.has(phrase + currChar)) {
        phrase += currChar;
      } else {
        out.push(phrase.length > 1 ? dict.get(phrase) : phrase.charCodeAt(0));
        dict.set(phrase + currChar, code);
        code++;
        phrase = currChar;
      }
    }
    console.log("phrase = " + phrase);
    out.push(phrase.length > 1 ? dict.get(phrase) : phrase.charCodeAt(0));

    for (var i = 0; i < out.length; i++) {
      out[i] = String.fromCharCode(out[i]);
    }
    const final = out.join("");
    this.setState({ encoded: final });
    this.decodeString(this.state.encoded);
  };

  decodeString = (s) => {
    var dict = new Map(); // Use a Map!
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i = 1; i < data.length; i++) {
      var currCode = data[i].charCodeAt(0);
      if (currCode < 256) {
        phrase = data[i];
      } else {
        phrase = dict.has(currCode) ? dict.get(currCode) : oldPhrase + currChar;
      }
      out.push(phrase);
      currChar = phrase.charAt(0);
      dict.set(code, oldPhrase + currChar);
      code++;
      oldPhrase = phrase;
    }
    const final = out.join("");
    this.setState({ decoded: final });
  };

  render() {
    return (
      <div className="App">
        <h1>Implementation of LZW Algorithm</h1>
        <h1>Enter text to encode</h1>
        <textarea
          id="text"
          name="Text"
          rows="4"
          cols="50"
          onChange={this.enterText}
        ></textarea>
        <h1>Encoded Text</h1>
        <textarea
          id="text"
          name="Text"
          value={this.state.encoded}
          rows="4"
          cols="50"
        ></textarea>
        <h1>decoded Text</h1>
        <textarea
          id="text"
          name="Text"
          rows="4"
          cols="50"
          value={this.state.decoded}
        ></textarea>
      </div>
    );
  }
}

export default App;
