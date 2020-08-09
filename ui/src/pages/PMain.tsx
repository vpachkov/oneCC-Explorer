import React, { Component } from 'react'
import axios from "axios";

import { SourceEditor } from '../components/SourceEditor'
import { defaultSource } from '../consts'
import { Select } from "semantic-ui-react";
import { ControlledEditor } from "@monaco-editor/react";
import { NeuButton } from '../components/neuButton';

interface P {}

interface ITranslateRequest {
    platform: string,
    sourceCode: string,
}

interface S {
    request: ITranslateRequest,
    translatedCode: string,
    isLoading: boolean
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
            isLoading: false,
        }
    }
    componentDidMount() {
        this.translateSourceCode()
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any) {
        if (this.state.request.platform !== prevState.request.platform) {
            this.translateSourceCode()
        }
    }

    public render() {
        return (
            <div style={{backgroundColor: '#eeeeee'}}>
                <div style={{ display: 'flex' }}>
                    <h1>Hello, oneCC-Explorer</h1>
                </div>
                <div style={{ display: 'flex', flexFlow: 'row' }}>
                <Select
                    placeholder={ this.state.request.platform }
                    options={ [
                        { key: 'x86_32', value: 'x86_32', text: 'x86_32' },
                        { key: 'aarch32', value: 'aarch32', text: 'aarch32' },
                    ] }
                    onChange={ (event, data) => {
                        this.setState({
                            request: {
                                ...this.state.request,
                                platform: data!.value!.toString(),
                            }
                        })
                    }}
                />
                <NeuButton text={"Compile"} onClick={ () => { this.translateSourceCode() } } ></NeuButton>
                </div>
                
                <div style={{ display: 'flex', backgroundColor: '#eeeeee'}}>
                    <SourceEditor
                        height={ window.innerHeight }
                        width={ window.innerWidth / 2 }
                        initValue={ this.state.request.sourceCode }
                        onSignificantUpdate={() => {
                            this.setState({ isLoading: true })
                            this.translateSourceCode()
                        }}
                        onChange={ value => {
                            this.setState({
                                ...this.state,
                                request: {
                                    ...this.state.request,
                                    sourceCode: value!,
                                }
                            })
                        } }
                    />
                    { this.state.isLoading! ? <ControlledEditor
                                                height={window.innerHeight}
                                                width={window.innerWidth / 2}
                                                value={this.state.translatedCode}
                                                /> : <h1>Loading..</h1> }
                </div>
            </div>
        )
    }

    public translateSourceCode() {
        axios
            .post('http://localhost:8080/api/Translator.translate', JSON.stringify(this.state.request))
            .then((response) => {
                const translatedCode = response.data.translatedCode[0] === '\n' ? response.data.translatedCode.slice(1) : response.data.translatedCode
                this.setState({
                    translatedCode: response.data.error === '' ? translatedCode : response.data.error,
                    isLoading: false
                })
            }, (error) => {
                console.log(error);
            })
    }
}