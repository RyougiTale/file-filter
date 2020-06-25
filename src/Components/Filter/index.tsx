import * as React from 'react';
import { ListV } from '../ListV'

interface Props {
    ButtonsArray: String[],
    ButtonNum: number,
};

interface State {
};

export class Filter extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() { }

    render() {
        return (<div></div>)
    }

    componentDidMount() { }

    componentWillReceiveProps() { }

    shouldComponentUpdate(nextProps: Props, nextState: State) { return true }

    componentWillUpdate() { }

    componentDidUpdate() { }

    componentWillUnmount() { }
}