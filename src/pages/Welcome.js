import React,{PureComponent } from 'react';

export default class Welcome extends PureComponent{
    /**
     * 定义数据
     */
    constructor(){

        super();

        this.state = {

        }
        //console.log("-----------constructor-----------");
    }


    render = ()=>{
        return <p style={{ textAlign: 'center' }}>
            想要添加更多页面？请参考1111111111111
            <a href="https://umijs.org/guide/block.html" target="_blank" rel="noopener noreferrer">
                umi 区块
            </a>
            。
        </p>
    }

    componentDidMount(){

       // console.log("componentDidMount")
    }


    componentDidUpdate(){

    }
}


