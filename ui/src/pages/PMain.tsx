import React from 'react'
import axios from 'axios'

import { ControlledEditor } from "@monaco-editor/react"

import { PBase } from './PBase'
import { SourceEditor } from '../components/SourceEditor'
import { CSelect } from '../components/Select'
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

export class PMain extends PBase<P, S> {

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
        if (this.state.request.platform !== prevState.request.platform) {
            this.translateSourceCode()
        }
    }

    renderHead(): React.ReactNode {
        return (
            <div>
                <div className="labelC enabled l">one</div>
                <CSelect
                    size="l"
                    options={[
                        { text: 'C', disabled: false },
                        { text: 'C++', disabled: true },
                        { text: 'Swift', disabled: true },
                        { text: 'Kotlin', disabled: true },
                    ]}
                />
                <div className="labelC enabled l">compiler</div>
            </div>
        )
    }

    renderContent(): React.ReactNode {
        return (
            <div>
                <div style={{ marginTop: '36px' }}>
                    <CSelect
                        onChange={value => {
                            this.setState({
                                request: {
                                    ...this.state.request,
                                    platform: value,
                                }
                            })
                        }}
                        size="s"
                        options={[
                            { text: 'x86_32', disabled: false },
                            { text: 'aarch32', disabled: false },
                        ]}
                    />
                </div>

                <div style={{ display: 'flex', marginTop: '36px' }}>
                    <SourceEditor
                        height={ window.innerHeight * .75 }
                        width={ (window.innerWidth - 36 * 2 ) / 2 }
                        initValue={ this.state.request.sourceCode }
                        onSignificantUpdate={ () => { this.translateSourceCode() } }
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
                    <ControlledEditor
                        height={ window.innerHeight * .75 }
                        width={ (window.innerWidth - 36 * 2 ) / 2}
                        value={ this.state.translatedCode }
                    />
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
                })
            }, (error) => {
                console.log(error);
            })
    }
}