import React, { Component } from 'react'
import { ControlledEditor } from '@monaco-editor/react'
import { clearInterval } from 'timers'

import { getTime } from '../utils'

interface P {
    height?: number,
    width?: number,
    initValue?: string,

    onSignificantUpdate?: () => void,
    onChange?: (value: string|undefined) => void
}
interface S {
    interval?: NodeJS.Timeout,
    lastTimeUpdate: number,
    refreshed: boolean,
}

export class SourceEditor extends Component<P, S> {
    public static defaultProps = {
        height: window.innerHeight,
        width: window.innerWidth,
        initValue: ''
    }

    constructor(props: P) {
        super(props)
        this.state = {
            lastTimeUpdate: 0,
            refreshed: true,
        }
    }

    componentDidMount() {
        this.setState({ interval: setInterval(() => {
                if (getTime()  - 1 > this.state.lastTimeUpdate && !this.state.refreshed) {
                    if (this.props.onSignificantUpdate !== undefined) {
                        this.props.onSignificantUpdate()
                    }
                    this.setState({
                       refreshed: true,
                    })
                }
        }, 1000) })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval as NodeJS.Timeout)
    }

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
                        this.setState({
                            lastTimeUpdate: getTime(),
                            refreshed: false,
                        })
                    } }
                    value={ this.props.initValue }
                />
            </div>
        )
    }
}