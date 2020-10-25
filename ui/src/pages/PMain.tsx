import React from 'react'
import axios from 'axios'

import { ControlledEditor } from "@monaco-editor/react"

import { PBase } from './PBase'

import { IAlertParagraph, IAlertAction, Alert } from '../components/Alert'
import { SourceEditor } from '../components/SourceEditor'
import { CSelect } from '../components/Select'
import { Spinner } from '../components/Spinner'
import { defaultSource } from '../consts'

import { faGlassWhiskey, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faWifi } from '@fortawesome/free-solid-svg-icons'
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import { throws } from 'assert'

interface P {}

interface ITranslateRequest {
    platform: string,
    sourceCode: string,
}

interface S {
    request: ITranslateRequest,
    translatedCode: string,
    isLoading: boolean,
    
    errorIcon: IconDefinition,
    errorTitle: string,
    errorAccentTitle: string,
    errorBody: IAlertParagraph[],
    errorActions: IAlertAction[],
    isError: boolean,
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
            isLoading: false,
            
            errorIcon: faWifi,
            errorTitle: "",
            errorAccentTitle: "",
            errorBody: [],
            errorActions: [],
            isError: false,
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
                        onChange={ value => {
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
                                request: {
                                    ...this.state.request,
                                    sourceCode: value!,
                                }
                            })
                        } }
                    />
                    <div style={{
                        minWidth:( window.innerWidth - 36 * 2 ) / 2,
                        minHeight: window.innerHeight * .75,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        { this.state.isLoading ?
                            <Spinner/>
                            :
                            this.state.isError ?
                            <Alert
                                icon={this.state.errorIcon}
                                alertTitle={ this.state.errorTitle }
                                alertAccentTitle={ this.state.errorAccentTitle }
                                body={this.state.errorBody}
                                actions={this.state.errorActions}
                            />
                            :
                            <ControlledEditor
                                height={ window.innerHeight * .75 }
                                width={ (window.innerWidth - 36 * 2) / 2 }
                                value={ this.state.translatedCode }
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }

    public translateSourceCode() {
        axios
            .post('http://localhost:8080/api/Translator.translate', JSON.stringify(this.state.request))
            .then((response) => {
                const translatedCode = response.data.translatedCode[0] === '\n' ? response.data.translatedCode.slice(1) : response.data.translatedCode
                if (response.data.error) {
                    this.setState({
                        errorIcon: faLaptopCode,
                        errorTitle: response.data.error,
                        errorAccentTitle: "Compilation Error",
                        errorBody: [
                            {
                                text: response.data.translatedCode
                            }
                        ],
                        errorActions: [],
                        isError: true,
                    })
                } else {
                    this.setState({
                        isError: false
                    })
                }
                this.setState({
                    translatedCode: translatedCode,
                })
            }, (error) => {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
                this.setState({
                    errorIcon: faWifi,
                    errorTitle: "Seems we are offline",
                    errorAccentTitle: "Connection Error",
                    errorBody: [
                        {
                            text: "Please check your Internet connection. If it's alrigth, it's our mistake and we will fix it."
                        }
                    ],
                    errorActions: [],
                    isError: true,
                })
            })
    }
}