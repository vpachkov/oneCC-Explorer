import React from 'react'

import { PBase } from './PBase'

import { CSelect } from '../components/Select'
import { Link } from '../components/Link'

interface P {}

interface S {}

export class PExplore extends PBase<P, S> {
    renderHead(): React.ReactNode {
        return (
            <div>
                <div className="labelC enabled l">one</div>
                <CSelect
                    size="l"
                    options={[
                        { text: 'Self-Made', disabled: false },
                    ]}
                />
                <div className="labelC enabled l">compiler</div>
            </div>
        )
    }
    renderContent(): React.ReactNode {
        console.log(process.env.REACT_APP_GIT_SHA);
        return (
            <div>
                {/*TODO: Not sure if we even need this*/}
                {/*<div style={{ marginTop: '44px' }}>*/}
                {/*    <div className="labelC disabled xl">SETTINGS</div>*/}
                {/*</div>*/}
                <div style={{ marginTop: '44px' }}>
                    <div className="labelC disabled xl">SOURCES</div>
                    <div className="block vertical">
                        <Link text="oneCC"/>
                        <div style={{ marginTop: '16px' }}>
                        <Link text="oneCC-Explorer"/>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '44px' }}>
                    <div className="labelC disabled xl">AUTHORS</div>
                    <div className="block vertical">
                        <div>
                        <Link text="Vyacheslav Pachkov" additionalText="aka Plunkerusr" url="https://github.com/Plunkerusr"/>
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <Link text="Nikita Melokhin" additionalText="aka nimelehin" url="https://github.com/nimelehin"/>
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <Link text="Arman Djilavan" additionalText="aka armannz" url="https://github.com/armannz"/>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '44px' }}>
                    <div className="labelC disabled xl">VERSION</div>
                    <div className="block vertical">
                        <span>Web: {process.env.REACT_APP_GIT_SHA}</span>
                        <span>oneCC: {process.env.REACT_APP_ONECC_VERSION}</span>
                    </div>
                </div>
            </div>
        )
    }
}