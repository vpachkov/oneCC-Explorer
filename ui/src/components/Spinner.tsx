import React, { Component } from 'react'

interface P {
}

interface S {}

export class Spinner extends Component<P, S> {
    render() {
        return (
            <div className="loading-icon-container">
                <div className="loading-icon"/>
            </div>
        )
    }
}