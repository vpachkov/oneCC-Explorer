import React, { Component } from 'react'
import { ControlledEditor } from "@monaco-editor/react"

interface P {
    height?: number,
    width?: number,
    initValue?: string,

    onSignificantUpdate?: () => void,
    onChange?: (value: string|undefined) => void
}
interface S {}

export class SourceEditor extends Component<P, S> {
    public static defaultProps = {
        height: window.innerHeight,
        width: window.innerWidth,
        initValue: ''
    };

    public render() {
        return (
            <div>
                <ControlledEditor
                    width={ this.props.width }
                    height={ this.props.height }
                    language="JavaScript"
                    onChange={ (ev, value) => {
                        if (this.props.onChange !== undefined) {
                            this.props.onChange(value)
                        }
                        if (this.props.onSignificantUpdate !== undefined) {
                            const newText = ev['changes'][0]['text']
                            if (newText.includes(';') || newText.includes('\n')) {
                                this.props.onSignificantUpdate!()
                            }
                        }
                    } }
                    value={ this.props.initValue }
                />
            </div>
        )
    }
}