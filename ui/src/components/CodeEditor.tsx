import React, { Component } from 'react'
import '../css/CodeEditor.css'

interface P {
    language?: string
    onChange: (value: any) => void,
    rules?: Record<string, string>
}
interface S {
    invisibleCode?: string,
    code: string,
    highlightedCode?: JSX.Element[]
}

export class CodeEditor extends Component<P, S> {
    private textarea: React.RefObject<HTMLTextAreaElement>

    private cHighlightRules: Record<string, string> = {
      "int": "blue", "char": "blue", "long": "blue",
      "float": "blue", "double": "blue", "return": "blue"
    }


    constructor(props: P) {
        super(props)
        this.state = {
            invisibleCode: "",
            code: "",
            highlightedCode: [],
        }
        this.textarea = React.createRef()
    }
  

  private hideChars(str: string): string {
      var array = str.split('')
      for (let index = 0; index < array.length; index++) {
      if (array[index] !== "\n")
          array[index] = " "
      }
      return array.join("")
    }
  
    private _highlight(str: string) {
        var typesArray = ["int", "char", "long", "float", "double"]
        var keyWordsArray = ["return", "#include", "struct"]
        var array = str.split('')
        var finalTagsArray = []
        var buffer = ''
        for (let index = 0; index < array.length; index++) {
            buffer += array[index]
            if (typesArray.includes(buffer) || keyWordsArray.includes(buffer)) {
                finalTagsArray.push(<span style={{ color: 'blue' }}>{buffer}</span>)
                buffer = ''
            } else if (array[index] === ' ' || array[index] === '\n' || array[index] === ';') {
                finalTagsArray.push(<span>{buffer}</span>)
                buffer = ''
            }
        }
        finalTagsArray.push(<span>{buffer}</span>)
        return finalTagsArray
  }

    private handleKey(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        let caretPosition = event.currentTarget.selectionStart
        if (event.key === "Tab") {
          var code: string = this.state.code.substr(0, caretPosition) + '    ' + this.state.code.substr(caretPosition)
          event.preventDefault();
          this.setState({
            invisibleCode: this.hideChars(code),
            code: code,
            highlightedCode: this._highlight(code)
          }, () => {
            setTimeout(() => {
              if (this.textarea.current != null) 
                this.textarea.current.setSelectionRange(caretPosition + 4, caretPosition + 4)
            }, 5)
            this.props.onChange(this.state.code)
          })
        }
    }
  
  private handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      event.persist()
      let caretPositionStart = event.currentTarget.selectionStart
      let caretPositionEnd = event.currentTarget.selectionEnd
      console.log(event.currentTarget.selectionStart, event.currentTarget.selectionEnd)
      this.handleCodes(event.target.value as string, caretPositionStart, caretPositionEnd, (caret: number) => {
        setTimeout(() => {
          if (this.textarea.current != null) 
            this.textarea.current.setSelectionRange(caret, caret)
        }, 2)
          this.props.onChange(this.state.code)
        })
    }

  
  private handleCodes(newCode: string, caretPositionStart: number, caretPositionEnd: number, completion?: Function) {
      console.log(caretPositionStart, caretPositionEnd)
      let difference = caretPositionEnd - caretPositionStart + 1
      if (newCode.length > this.state.code.length) {
        var newChar = newCode.charAt(caretPositionStart! - 1)
        if (newChar === "(") {
          newChar += ")"
        } else if (newChar === "{") {
          newChar += "}"
        } 
        let changedCode = this.state.code.substr(0, caretPositionStart! - 1)
          + newChar
          + this.state.code.substr(caretPositionStart! - 1)
          this.setState({
            invisibleCode: this.hideChars(changedCode),
            code: changedCode,
            highlightedCode: this._highlight(changedCode)
          }, completion!(caretPositionStart))
      } else {
        let changedCode = this.state.code.slice(0, caretPositionStart!)
          + this.state.code.slice(caretPositionStart! + difference)
          this.setState({
            invisibleCode: this.hideChars(changedCode),
            code: changedCode,
            highlightedCode: this._highlight(changedCode)
          })
        }
    }
    // TODO
    private onSelect() {}

  
  

    public render() {
      return (
          <div className="code_container">
          <textarea
            ref={this.textarea}
            className="code-in"
            value={this.state.invisibleCode}
            onSelect={this.onSelect}
            onKeyDown={(event) => this.handleKey(event)}
              onChange={(event) => this.handleChange(event)} />
            <pre className="code-out">
              <code>{this.state.highlightedCode}</code>
            </pre>
          </div>
        )
    }
}