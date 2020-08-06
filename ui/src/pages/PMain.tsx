import React, { Component } from 'react'
import axios from "axios";

import { SourceEditor } from '../components/SourceEditor'
import { defaultSource } from '../consts'
import { Select } from "semantic-ui-react";

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

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any) {
        if (this.state.request != prevState.request) {
            this.translateSourceCode()
        }
    }

    public render() {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <h1>Hello, oneCC-Explorer</h1>
                </div>
                <Select
                    placeholder={ this.state.request.platform }
                    options={ [
                        { key: 'x86_32', value: 'x86_32', text: 'x86_32' },
                        { key: 'aarch32', value: 'aarch32', text: 'aarch32' },
                    ] }
                    onChange={ (event, data) => {
                        this.setState({
                            ...this.state,
                            request: {
                                ...this.state.request,
                                platform: data!.value!.toString(),
                            }
                        })
                    }}
                />
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