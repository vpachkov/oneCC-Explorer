import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Link } from '../components/Link'
import { PassThrough } from 'node-fetch/node_modules/form-data'

export interface IAlertParagraph{
    text: string,
}

export interface IAlertAction{
    text: string,
    callback?: () => void,
}

interface P {
    icon?: IconDefinition,
    alertTitle?: string,
    alertAccentTitle?: string
    body?: IAlertParagraph[],
    actions?: IAlertAction[],
}

interface S {}

export class Alert extends Component<P, S> {
    public static defaultProps = {
        text: '',
        url: '',
        additionalText: '',
    }
    render() {
        return (
            <div className="alert-container">
                <div className="alert-title-container">
                    <FontAwesomeIcon className="alert-logo" icon={this.props.icon!} size="5x"/>
                    <span className="alert-title xl">{this.props.alertTitle!}</span>
                    <span className="alert-title selected xl">{this.props.alertAccentTitle!}</span>
                </div>
                <div className="alert-discription-container">
                    { this.props.body !== undefined ? this.props.body.map( (value, index) => {
                        return (
                            <p className="alert-discription">{value.text}</p>
                        )
                    }) : null
                    }
                </div>
                <div className="alert-actions-container">
                    { this.props.actions !== undefined ? this.props.actions.map( (value, index) => {
                        return (
                            <div className="alert-action"><Link text={value.text}/></div>
                        )
                    }) : null
                    }
                </div>
            </div>
        )
    }
}