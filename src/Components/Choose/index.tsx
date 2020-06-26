import * as React from 'react';
import { Button } from '@material-ui/core'

interface Props {
    depositoryArray: String[],
    callBack: Function,
};

interface State {
};

export default class Choose extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    componentWillMount() { }

    render() {
        let buttons = [];
        for (let ele of this.props.depositoryArray) {
            buttons.push(<Button key={ele.toString()} onClick={() => {
                this.props.callBack(ele);
            }}>{ele}</Button>)
        }
        return (<div>{buttons}</div>)
    }

    componentDidMount() { }

    componentWillReceiveProps() { }

    shouldComponentUpdate(nextProps: Props, nextState: State) { return true }

    componentWillUpdate() { }

    componentDidUpdate() { }

    componentWillUnmount() { }
}