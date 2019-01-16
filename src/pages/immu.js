import React,{PureComponent } from 'react';
import Test from '@/components/test/index'
import { List } from 'immutable';

export default class Immu extends PureComponent{
    /**
     * 定义数据
     */
    constructor(){

        super();

        this.state = {
            num: [0],
        }
        //console.log("-----------constructor-----------");
    }
    control(step){
        let { num } =  this.state;
        let arrayNew =  List(num);
        if(step){
            let len =  num.length-1< 0?0:num.length-1;
            let arrayNum =  num[ len ]+step?num[ len ]+step:0;
            num = arrayNew.set(num.length, arrayNum).toJS();
        }

        if(!step&&num.length){
            num =  arrayNew.pop().toJS();
        }
        this.setState({
            num:num
        })
    }


    render = ()=>{
        return <div>
            sdfsdf
            <Test num={this.state.num} control={this.control.bind(this)}/>
        </div>
    }

    componentDidMount(){

        // console.log("componentDidMount")
    }


    componentDidUpdate(){

    }
}


