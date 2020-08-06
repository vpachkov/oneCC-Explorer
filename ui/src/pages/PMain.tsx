import React, { Component } from 'react'
import axios from "axios";

import { SourceEditor } from '../components/SourceEditor'
import { defaultSource } from '../consts'

interface P {}

interface ITranslateRequest {
    platform: string,
    sourceCode: string,
}

interface S {
    request: ITranslateRequest,
    translatedCode: string,
}

export class PMain extends Component<P, S> {
    constructor(props: P) {
        super(props)
        this.state = {
            request: {
                platform: "x86_32",
                sourceCode: defaultSource,
            },
            translatedCode: "",
        }
    }
    componentDidMount() {
        this.translateSourceCode()
    }

    public render() {
        return (
            <div>
                <h1>Hello, oneCC-Explorer</h1>
                <div style={{ display: 'flex' }}>
                    <SourceEditor
                        height={ window.innerHeight }
                        width={ window.innerWidth / 2 }
                        initValue={ this.state.request.sourceCode }
                    />
                    <SourceEditor
                        height={ window.innerHeight }
                        width={ window.innerWidth / 2 }
                        initValue={ this.state.translatedCode }
                    />
                </div>
            </div>
        )
    }

    public translateSourceCode() {
        console.log(JSON.stringify(this.state.request))
        axios
            .post('http://localhost:8080/api/Translator.translate', JSON.stringify(this.state.request))
            .then((response) => {
                this.setState({
                    ...this.state,
                    translatedCode: response.data.translatedCode[0] === '\n' ? response.data.translatedCode.slice(1) : response.data.translatedCode
                })
            }, (error) => {
                console.log(error);
            })
    }
}