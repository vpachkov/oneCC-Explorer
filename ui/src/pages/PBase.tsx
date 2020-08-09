import React, { Component, ReactNode } from "react";

export abstract class PBase<P, S> extends Component<P, S> {
    abstract renderHead?(): ReactNode
    abstract renderContent?(): ReactNode

    render() {
        return (
            <div style={{ width: window.innerWidth, height: window.innerHeight, backgroundColor: '#E5E5E5' }}>
                <div style={{ margin: '0 36px 0 36px' }}>
                    { this.renderHead !== undefined ? this.renderHead() : null }
                    { this.renderContent !== undefined ? this.renderContent() : null }
                </div>
            </div>
        )
    }
}

