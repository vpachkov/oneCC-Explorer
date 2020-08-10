import React from 'react'
import axios from 'axios'

import { ControlledEditor } from "@monaco-editor/react"

import { PBase } from './PBase'

import { Alert } from '../components/Alert'
import { SourceEditor } from '../components/SourceEditor'
import { CSelect } from '../components/Select'
import { Spinner } from '../components/Spinner'
import { Link } from '../components/Link'
import { defaultSource } from '../consts'

import { faWifi } from '@fortawesome/free-solid-svg-icons'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'

interface P {}

interface ITranslateRequest {
    platform: string,
    sourceCode: string,
}

interface S {
    request: ITranslateRequest,
    translatedCode: string,
    isLoading: boolean,
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
                <div style={{ marginTop: '36px', display: 'flex', alignItems: 'center' }}>
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
                    <div style={{ marginLeft: 'auto' }}>
                        <Link url="/explore" text="Explore"/>
                    </div>
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
                                icon={faWifi}
                                alertTitle={ "Internet" }
                                alertAccentTitle={ "Error" }
                                body={[
                                    {
                                        text: 'Please check your internet connection. If you are sure that the problem is on your side, let us know as soon as possible. '
                                    },
                                ]}
                                actions={[
                                    {
                                        text: 'Try again'
                                    }
                                ]}
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
        this.setState({ isLoading: true })
        axios
            .post('http://localhost:8080/api/Translator.translate', JSON.stringify(this.state.request))
            .then((response) => {
                const translatedCode = response.data.translatedCode[0] === '\n' ? response.data.translatedCode.slice(1) : response.data.translatedCode
                this.setState({
                    translatedCode: response.data.error === '' ? translatedCode : response.data.error,
                    isLoading: false,
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
                    isError: true
                })
            })
    }
}