import React, { Component } from 'react'
import './styles.css'

interface P {
    height?: number,
    width?: number,
    text: string,
    onClick?: () => void
}
interface S {
    pressed: boolean,
}

export class NeuButton extends Component<P, S> {

    constructor(props: P) {
        super(props)
        this.state = {
            pressed: false,
        }
    }


    public render() {
        return (
            <div className={'element'}
                    onClick={ () => {
                        if (this.props.onClick !== undefined) {
                            this.props.onClick()
                        }
                        this.setState({
                            pressed: this.state.pressed!
                        })
            } }>
                  {this.props.text}
            </div>
        )
    }
}