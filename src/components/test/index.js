import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export default class Test extends PureComponent {
    static propTypes = {
        "num": PropTypes.array
    }

    static defaultProps = {
        num:[0]
    }

    state = {
        maxWidth: 50,
    };

    static getDerivedStateFromProps(props, state) {
        console.log("props", props, state);
        /**
         * 返回state对象
         */

        return null;
    }

    control(step){
        let { control } =  this.props;
        control(step);
    }



    render() {
        let { maxWidth } =  this.state, { num } =  this.props;
        return <div>
              <div>test----{maxWidth}</div>
              <div>test---props----{num.join(",")}</div>
              <div><Button type="primary" onClick={this.control.bind(this,1)}>+</Button><Button type="primary" onClick={this.control.bind(this,0)}>-</Button></div>
        </div>
    }

    componentDidUpdate(prevProps){
        console.log("11111111111",this.props, prevProps);
    }
}
