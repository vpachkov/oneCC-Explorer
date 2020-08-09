import React, { Component } from 'react'

interface P {
    text?: string,
    url?: string
    additionalText?: string,
}

interface S {}

export class Link extends Component<P, S> {
    public static defaultProps = {
        text: '',
        url: '',
        additionalText: '',
    }
    render() {
        return (
            <div >
                <a className="Clink" href={ this.props.url }>
                    <span>
                        <span className="labelC detailed"> { this.props.text }</span>
                        <span className="labelC selected"> { this.props.additionalText }</span>
                    </span>
                </a>
            </div>
        )
    }
}