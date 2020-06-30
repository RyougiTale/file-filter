import * as React from 'react';
import { ListV } from '../ListV'
import './index.css'

interface Props {
    ButtonsArray: String[],
    SetSelected: Function,
};

interface State {
    ButtonState: any[]
};

export class Filter extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { ButtonState: [] };
    }
    //初始化按钮数组
    init() {
        let { ButtonsArray } = this.props;
        ButtonsArray.map((item: any, v: any) => {
            this.state.ButtonState[item] = 0
        })
    }
    componentWillMount() {
        this.init();
    }
    render() {
        let { ButtonsArray } = this.props;
        //循环渲染筛选按钮
        let ButtonDom: any = ButtonsArray.map((item: any, v: any) => {
            return <button key={item} onClick={this.clickButton.bind(this, item)} className={this.state.ButtonState[item] === 1 ? "targetButton" : ""}>{item}</button>
        });
        return (<div className="buttonList">
            {ButtonDom}
        </div>)
    }

    //点击筛选按钮
    clickButton(buttonName: any): void {
        switch (this.state.ButtonState[buttonName]) {
            // 未选中
            case 0:
                this.state.ButtonState[buttonName] = 1;
                break;
            // 选中
            case 1:
                this.state.ButtonState[buttonName] = 0;
                break;
        }
        let arr = this.state.ButtonState
        this.setState({ ButtonState: arr })

        /* to deleted */
        let selected:any = [];
        for (let ele in arr) if (arr[ele] == 1) selected.push(ele);
        console.log(selected);
        this.props.SetSelected(selected);
    }
    // componentDidMount() { }

    // componentWillReceiveProps() { }

    shouldComponentUpdate(nextProps: Props, nextState: State) { return true }

    // componentWillUpdate() { }

    // componentDidUpdate() { }

}