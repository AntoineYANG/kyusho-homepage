/*
 * @Author: Kanata You 
 * @Date: 2020-09-24 17:46:45 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-24 18:08:21
 */

import { Component } from "react";


export interface InitComponentProps<S> {
    init: Partial<S>;
};

export class InitComponent<P, S> extends Component<InitComponentProps<S> & P, S> {

    public constructor(props: InitComponentProps<S> & P) {
        super(props);
    }

    public componentDidMount(): void {
        this.setState(this.props.init as unknown as Pick<S, keyof S>);
    }
};
