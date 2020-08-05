import React, { Component } from 'react'
import { SourceEditor } from '../components/SourceEditor'
import { defaultSource } from '../consts'

interface P {}
interface S {}

export class PMain extends Component<P, S> {
    public render() {
        return (
            <div>
                <h1>Hello, oneCC-Explorer</h1>
                <div style={{ display: 'flex' }}>
                    <SourceEditor
                        height={ window.innerHeight }
                        width={ window.innerWidth / 2 }
                        initValue={ defaultSource }
                    />
                    <SourceEditor
                        height={ window.innerHeight }
                        width={ window.innerWidth / 2 }
                    />
                </div>
            </div>
        )
    }
}