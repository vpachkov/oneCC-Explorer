import React, { Component } from 'react'

export interface ISelectOption{
    text: string,
    disabled: boolean,
}

interface P {
    options: ISelectOption[],
    size: string,
    onChange?: (value: string) => void,
}

interface S {
    selected: number,
}

export class CSelect extends Component<P, S> {
    constructor(props: P) {
        super(props)
        this.state = {
            selected: 0,
        }
    }
    render() {
        return (
            <div style={{ display: 'flex' }}>
                { this.props.options.map( (value, index) => {
                    let style = value.disabled ? "labelC disabled" : index === this.state.selected ? "labelC selected" : "labelC enabled active"
                    style += ` ${this.props.size}`
                    return (
                        <span
                            style={{ marginRight: '18px' }}
                            className={ style }
                            onClick={ () => {
                                if (!value.disabled) {
                                    this.setState({ selected: index })
                                    if (this.props.onChange !== undefined) {
                                        this.props.onChange(value.text)
                                    }
                                }
                            }}
                        >
                            { value.text }
                        </span>
                        )
                })}
            </div>
        )
    }
}