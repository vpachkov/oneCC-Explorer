import React, { Component } from 'react'
import { ControlledEditor } from "@monaco-editor/react"

interface P {
    height?: number,
    width?: number,
    initValue?: string,
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
                        console.log('changed value', value)
                    } }
                    value={ this.props.initValue }
                />
            </div>
        )
    }
}