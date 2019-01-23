import React,{PureComponent} from 'react'

export default class Ts extends PureComponent{

    componentDidMount(){

        //定义数值类型
        let decLiteral: number = 6;
        //定义字符串类型
        let myName: string = 'Tom';

        let sentence: string = `Hello, my name is ${myName}.`
       // console.log("sentence",sentence);

        this.voidTest();
    }

    voidTest = ():void =>{
        console.log("我是没有返回的")
    }

    render = ()=>{
        return <div className='ts-container'>
            <div className='title'>typeScript的用法</div>
            <div className='container'>
                <div className='content'>
                    <div className='container-title'>原始数据类型</div>
                    <div className='desc'>
                        JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。
                        原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。
                        本节主要介绍前五种原始数据类型在 TypeScript 中的应用。
                    </div>
                    <div className='test'>
                        undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null。<br/>
                        与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：<br/>
                        <pre> let num: number = undefined;</pre>
                        而 void 类型的变量不能赋值给 number 类型的变量：<br/>
                        <pre>
                            //会报错
                            let u: void;
                            let num: number = u;
                        </pre>
                    </div>
                </div>


            </div>
        </div>
    }
}
