import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './index.less';
import { List, is, Map, fromJS }  from 'immutable'

export default class Test extends PureComponent {
    static propTypes = {
        "num": PropTypes.array
    }

    static defaultProps = {
        num:[0]
    }

    state = {
        maxWidth: 50,
        IList:[0,1],
        IMap:[{key:1}]
    };

    componentDidMount(){
        /**
         * immutable应用
         */
        let arr1 = List([0]),arr2 = List([0]);
        //toJS转化成正常的js数组
        let arr_common =  arr1.toJS();
        //is:比较两个数组的值相同， 并非数组的索引相同
        //console.log("比较数组的值是否相同:",is(arr1,arr2),Object.is(arr1,arr2));
        //创建一个map对象
        let create_map = Map({'key':1, "val":'data_1'});
        //List.isList() 和 Map.isMap()
        //console.log("isList,isMap",List.isList(arr1), Map.isMap(create_map));
        //获取对象的长度
        //console.log("size",arr1.size, create_map.size);
        /**
         * get() 、 getIn()
         * 作用：获取数据结构中的数据
         */
        //console.log("get() 、 getIn()", arr1.get(0), create_map.get('key'), create_map.getIn(['val']))
        /**
         * has() 、 hasIn()
         * 作用：判断是否存在某一个key
         */
        //console.log('has() 、 hasIn()',arr1.has(0),create_map.has(0))
        /**
         * includes()
         * 作用：判断是否存在某一个value
         */
        //console.log("includes", arr1.includes(0));
        /**
         * first() 、 last()
         * 作用：用来获取第一个元素或者最后一个元素，若没有则返回undefined
         */

    }

    static getDerivedStateFromProps(props, state) {
       // console.log("props", props, state);
        /**
         * 返回state对象
         */

        return null;
    }

    control(step){
        let { control } =  this.props;
        control(step);
    }

    immutableClick(tag){
        let {IList, IMap} =  this.state;
        if(tag == 0){
            /**
             *first() 、 last()
             * 用来获取第一个元素或者最后一个元素，若没有则返回undefined
             */
            console.log("first", List(IList).first());
            console.log("last", List(IList).last());
        }
        if(tag === 1){
            /**
             * set:设置值
             */
            let IList_New  =  List(IList).set(IList.length,2);
            console.log("IList_New:得到一个新数组", IList_New.toJS())
        }

        if(tag === 2){
            let IMap_New =  Map(...IMap).setIn(["val"],'新增val');
            const originalMap = Map({
                subObject: Map({
                    subKey: 'subvalue',
                    subSubObject: Map({
                        subSubKey: 'subSubValue'
                    })
                })
            })

            const newMap = originalMap.setIn(['subObject', 'subKey'], 'ha ha!')

            console.log("IMap_New:setIn深层次的修改对象",IMap_New.toJS(), newMap.toJS());
        }

        if(tag === 4){
            let IList_New =  Map(...IMap).setIn(["val"],'新增val');
            console.log("IList_New:新增 setIn", IList_New.toJS());
            let IList_deleteIn =  IList_New.deleteIn(["val"]);
            console.log("IList_deleteIn:deleteIn",IList_deleteIn.toJS());
        }

        if(tag === 5){
            const names = Map({ a: "Aaron", b: "Barry", c: "Connor" })
            let IList_New =  Map(...IMap).setIn(["val"],'新增val');
            console.log("IList_New:新增 setIn", IList_New.toJS());
           // let IList_deleteIn =  IList_New.deleteAll(["key","val"]);
           // console.log("IList_deleteIn:deleteIn",names.deleteAll([ 'a', 'c' ]));
        }

        if(tag === 6){
            ////List
            const list = List([ 'a', 'b', 'c' ])
            const result = list.update(2, val => val.toUpperCase())
            console.log("list--update", list.toJS(),result.toJS());
            ///Map
            const aMap = Map({ key: 'value' })
            //Map中的数据更新失败
            const newMap = aMap.update('key', value => value + value);
            console.log("Map--update", aMap.toJS(),newMap.toJS());
        }

        if(tag === 7){
            const list = List([ 'a', 'b', 'c' ])
            const result = list.update(2, val => val.toUpperCase())
            console.log("list--update", list.toJS(),result.toJS());
            ///Map
            const aMap = Map({ key: 'value',val:Map({'data':'data_new'})})
            //Map中的数据更新失败
            const setInMap =  aMap.setIn(['val','data'],'data_new_setIn')
            const newMap = setInMap.updateIn(['val','data'], value => value + value);
            console.log("Map--update", aMap.toJS(),setInMap.toJS(), newMap.toJS());
        }

        if(tag === 8){
            const list = List([ 'a', 'b', 'c' ])
            const result = list.update(2, val => val.toUpperCase())
            const poplist =  list.pop();
            console.log("list--update:数据清空完了",poplist.clear());

        }

        if(tag === 9){
            const Map1 = fromJS({a:111,b:222,c:{d:333,e:444}});
            const Map2 = fromJS({a:111,b:222,c:{e:'ppp',f:555}});
            console.log("merge,对象的浅合并", Map1.merge(Map2).toJS());
            console.log("mergeDeep,对象的深合并", Map1.mergeDeep(Map2).toJS());
            console.log("mergeWith, 对象的深度合并，做个性化处理", Map1.mergeWith((oldData,newData,key)=>{
                if(key === 'a'){
                    return "aaaa";
                }else{
                    return newData
                }
            }, Map2).toJS())
        }

        if(tag === 10){
            const List1 =List([0]);
            const List2 =List([1]);
            console.log("concat", List1.concat(List2).toJS());
        }

        if(tag === 11){
            const List1 =  List([0,1,2]);
            List1.map((item)=>{
                console.log("List1-map",item);
            })
            const Map1 =  Map({"key":'1', val:'map_item1'})
            Map1.map((val)=>{
                console.log("Map1_item", val);
            })
        }

    }

    render() {
        let { maxWidth } =  this.state, { num } =  this.props;
        return <div>
              <div>test----{maxWidth}</div>
              <div>test---props----{num.join(",")}</div>
              <div><Button type="primary" onClick={this.control.bind(this,1)}>+</Button><Button type="primary" onClick={this.control.bind(this,0)}>-</Button></div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>first() 、 last()</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,0)}>测试</Button>
                </div>
                <div className={styles.descipt}>作用：用来获取第一个元素或者最后一个元素，若没有则返回undefined</div>
                <div className={styles.format}>
                    <pre>{`Immutable.fromJS([1,2,3,{a:4,b:5}]).first()`}</pre>
                    <pre>{`Immutable.fromJS([1,2,3,{a:4,b:5}]).last()`}</pre>
                    <pre>{`Immutable.fromJS({a:1,b:2,c:{d:3,e:4}}).first()`}</pre>
                    <pre>{`Immutable.fromJS({a:1,b:2,c:{d:3,e:4}}).first()`}</pre>
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>设置 set()</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,1)}>测试</Button>
                </div>
                <div className={styles.descipt}>作用：设置第一层key、index的值; 会返回一个新对象</div>
                <div className={styles.format}>
                    <pre>{`
                            const originalList = List([ 0 ]);
                            // List [ 0 ]
                            originalList.set(1, 1);
                            // List [ 0, 1 ]
                            originalList.set(0, 'overwritten');
                            // List [ "overwritten" ]
                            originalList.set(2, 2);
                            // List [ 0, undefined, 2 ]

                            List().set(50000, 'value').size;
                            // 50001

                            const originalMap = Map()
                            const newerMap = originalMap.set('key', 'value')
                            const newestMap = newerMap.set('key', 'newer value')

                            originalMap
                            // Map {}
                                                    newerMap
                            // Map { "key": "value" }
                                                    newestMap
                            // Map { "key": "newer value" }
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>设置 setIn()</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,2)}>测试</Button>
                </div>
                <div className={styles.descipt}>作用：设置深层结构中某属性的值</div>
                <div className={styles.format}>
                    <pre>{`
                            const originalMap = Map({
                          subObject: Map({
                            subKey: 'subvalue',
                            subSubObject: Map({
                              subSubKey: 'subSubValue'
                            })
                          })
                        })

                        const newMap = originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
                        // Map {
                        //   "subObject": Map {
                        //     "subKey": "ha ha!",
                        //     "subSubObject": Map { "subSubKey": "subSubValue" }
                        //   }
                        // }

                        const newerMap = originalMap.setIn(
                          ['subObject', 'subSubObject', 'subSubKey'],
                          'ha ha ha!'
                        )
                        // Map {
                        //   "subObject": Map {
                        //     "subKey": "subvalue",
                        //     "subSubObject": Map { "subSubKey": "ha ha ha!" }
                        //   }
                        // }
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>删除 delete</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,3)}>测试</Button>
                </div>
                <div className={styles.descipt}>作用：用来删除第一层结构中的属性</div>
                <div className={styles.format}>
                    <pre>{`
                            // List
                            List([ 0, 1, 2, 3, 4 ]).delete(0);
                            // List [ 1, 2, 3, 4 ]

                            // Map
                            const originalMap = Map({
                              key: 'value',
                              otherKey: 'other value'
                            })
                            // Map { "key": "value", "otherKey": "other value" }
                            originalMap.delete('otherKey')
                            // Map { "key": "value" }
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>删除 deleteIn()</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,4)}>测试</Button>
                </div>
                <div className={styles.descipt}>作用：用来删除深层数据，用法参考setIn</div>
                <div className={styles.format}>
                    <pre>{`
                            deleteIn():
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>删除 deleteAll()</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,5)}>测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：用来删除Map中的多个key;方法已经废止<br/>
                    {`用法：deleteAll(keys: Iterable<K>)`}
                </div>
                <div className={styles.format}>
                    <pre>{`
                           const names = Map({ a: "Aaron", b: "Barry", c: "Connor" })
                            names.deleteAll([ 'a', 'c' ])
                            // Map { "b": "Barry" }
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>更新 update()</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,6)}>测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：对对象中的某个属性进行更新，可对原数据进行相关操作
                        其中Map数据没有被更新
                </div>
                <div className={styles.format}>
                    <pre>{`
                           ////List
                            const list = List([ 'a', 'b', 'c' ])
                            const result = list.update(2, val => val.toUpperCase())

                            ///Map
                            const aMap = Map({ key: 'value' })
                            const newMap = aMap.update('key', value => value + value)
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>更新 updateIn()</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,7)}>测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：对对象中的某个属性进行更新，可对原数据进行相关操作
                </div>
                <div className={styles.format}>
                    <pre>{`
                           用法参考setIn
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>清除 clear()</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,8)}>测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：清除所有数据;用法：clear(): this
                </div>
                <div className={styles.format}>
                    <pre>{`
                          Map({ key: 'value' }).clear()  //Map
                          List([ 1, 2, 3, 4 ]).clear()   // List
                          List中的各种删除与插入
                          List对应的数据结构是js中的数组，所以数组的一些方法在Immutable中也是通用的，比如push，pop,shift，
                          unshift，insert。
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>push()</span>
                    <Button type="primary">测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：在List末尾插入一个元素
                </div>
                <div className={styles.format}>
                    <pre>{`

                          List([ 1, 2, 3, 4 ]).push(8)   // List
                          会新生成一个数组
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>pop()</span>
                    <Button type="primary">测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：在List末尾删除一个元素
                </div>
                <div className={styles.format}>
                    <pre>{`

                          List([ 1, 2, 3, 4 ]).pop()   // List
                          会新生成一个数组
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>unshift()</span>
                    <Button type="primary">测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：在List首部插入一个元素
                </div>
                <div className={styles.format}>
                    <pre>{`

                          List([ 1, 2, 3, 4 ]).unshift(0)   // List
                          会新生成一个数组
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>shift()</span>
                    <Button type="primary">测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：在List首部删除一个元素
                </div>
                <div className={styles.format}>
                    <pre>{`

                          List([ 1, 2, 3, 4 ]).shift(0)   // List
                          会新生成一个数组
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>insert()</span>
                    <Button type="primary">测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：在List的index处插入元素
                </div>
                <div className={styles.format}>
                    <pre>{`

                         List([ 0, 1, 2, 3, 4 ]).insert(6, 5)
                         //List [ 0, 1, 2, 3, 4, 5 ]    //在第6个位置插入5
                         List([ 1, 2, 3, 4 ]).push(5)
                         // List [ 1, 2, 3, 4, 5 ]
                         List([ 1, 2, 3, 4 ]).pop()
                         // List[ 1, 2, 3 ]
                         List([ 2, 3, 4]).unshift(1);
                         // List [ 1, 2, 3, 4 ]
                         List([ 0, 1, 2, 3, 4 ]).shift();
                         // List [ 1, 2, 3, 4 ]
                         List中还有一个特有的方法用法设置List的长度，setSize()
                         List([]).setSize(2).toJS() //[undefined,undefined]
                        `}
                    </pre>
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>mergeDeep</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,9)}>测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：深合并，新旧数据中同时存在的的属性为新旧数据合并之后的数据(相同的替换，不相同的合并)
                </div>
                <div className={styles.format}>
                    <pre>{`
                     const Map1 = Immutable.fromJS({a:111,b:222,c:{d:333,e:444}});
                     const Map2 = Immutable.fromJS({a:111,b:222,c:{e:444,f:555}});

                     const Map3 = Map1.merge(Map2);
                      //Map {a:111,b:222,c:{e:444,f:555}}
                     const Map4 = Map1.mergeDeep(Map2);
                      //Map {a:111,b:222,c:{d:333,e:444,f:555}}
                     const Map5 = Map1.mergeWith((oldData,newData,key)=>{
                          if(key === 'a'){
                            return 666;
                          }else{
                            return newData
                          }
                        },Map2);
                      //Map {a:666,b:222,c:{e:444,f:555}}
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>mergeDeepIn,mergrDeepWith</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,9)}>测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：对深层数据进行深合并<br/>
                    作用：自定义深合并，可自行设置某些属性的值
                </div>
                <div className={styles.format}>
                    这里用一段示例彻底搞懂merge，此示例为Map结构，List与Map原理相同
                    <pre>{`
                     const Map1 = Immutable.fromJS({a:111,b:222,c:{d:333,e:444}});
                     const Map2 = Immutable.fromJS({a:111,b:222,c:{e:444,f:555}});

                     const Map3 = Map1.merge(Map2);
                      //Map {a:111,b:222,c:{e:444,f:555}}
                     const Map4 = Map1.mergeDeep(Map2);
                      //Map {a:111,b:222,c:{d:333,e:444,f:555}}
                     const Map5 = Map1.mergeWith((oldData,newData,key)=>{
                          if(key === 'a'){
                            return 666;
                          }else{
                            return newData
                          }
                        },Map2);
                      //Map {a:666,b:222,c:{e:444,f:555}}
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>concat</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,10)}>测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：对象数组的拼接，用法与js数组中的concat()相同，返回一个新的对象。
                    用法：const List = list1.concat(list2)
                </div>
                <div className={styles.format}>
                    这里用一段示例彻底搞懂merge，此示例为Map结构，List与Map原理相同
                    <pre>{`
                            const List1 =List([0]);
                            const List2 =List([1]);
                            console.log("concat", List1.concat(List2).toJS());
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>map</span>
                    <Button type="primary" onClick={this.immutableClick.bind(this,11)}>测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：遍历整个对象，对Map/List元素进行操作，返回一个新的对象。
                </div>
                <div className={styles.format}>
                    <pre>{`
                           Map({a:1,b:2}).map(val=>10*val)
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>Map特有的mapKey()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：遍历整个对象，对Map元素的key进行操作，返回一个新的对象。
                </div>
                <div className={styles.format}>
                    <pre>{`
                           Map({a:1,b:2}).mapKey(val=>val+'l')
                           //Map{al:10,bl:20}
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>Map特有的mapEntries()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：遍历整个对象，对Map元素的key和value同时进行操作，返回一个新的对象。Map的map()也可实现此功能。
                </div>
                <div className={styles.format}>
                    <pre>{`
                          Map({a:1,b:2}).map((key,val)=>{
                                return [key+'l',val*10]
                            })
                            //Map{al:10,bl:20}
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>过滤 filter</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：返回一个新的对象，包括所有满足过滤条件的元素
                </div>
                <div className={styles.format}>
                    <pre>{`
                        Map({a:1,b:2}).filter((key,val)=>{
                          return val == 2
                        })
                        //Map{b:2}
                        还有一个filterNot()方法，与此方法正好相反。
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>反转 reverse</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：将数据的结构进行反转
                </div>
                <div className={styles.format}>
                    <pre>{`
                        Immutable.fromJS([1, 2, 3, 4, 5]).reverse();
                        // List [5,4,3,2,1]
                        Immutable.fromJS({a:1,b:{c:2,d:3},e:4}).recerse();
                        //Map {e:4,b:{c:2,d:3},a:1}
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>排序 sort & sortBy</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：对数据结构进行排序
                </div>
                <div className={styles.format}>
                    <pre>{`
                       ///List
                            Immutable.fromJS([4,3,5,2,6,1]).sort()
                            // List [1,2,3,4,5,6]
                            Immutable.fromJS([4,3,5,2,6,1]).sort((a,b)=>{
                              if (a < b) { return -1; }
                              if (a > b) { return 1; }
                              if (a === b) { return 0; }
                            })
                            // List [1,2,3,4,5,6]
                            Immutable.fromJS([{a:3},{a:2},{a:4},{a:1}]).sortBy((val,index,obj)=>{
                              return val.get('a')
                            },(a,b)=>{
                              if (a < b) { return -1; }
                              if (a > b) { return 1; }
                              if (a === b) { return 0; }
                            })
                            //List  [ {a:3}, {a:2}, {a:4}, {a:1} ]

                            //Map

                            Immutable.fromJS( {b:1, a: 3, c: 2, d:5} ).sort()
                            //Map {b: 1, c: 2, a: 3, d: 5}
                            Immutable.fromJS( {b:1, a: 3, c: 2, d:5} ).sort((a,b)=>{
                              if (a < b) { return -1; }
                              if (a > b) { return 1; }
                              if (a === b) { return 0; }
                            })
                            //Map {b: 1, c: 2, a: 3, d: 5}
                            Immutable.fromJS( {b:1, a: 3, c: 2, d:5} ).sortBy((value, key, obj)=> {
                              return value
                            })
                            //Map {b: 1, c: 2, a: 3, d: 5}
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>分组 groupBy</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：对数据进行分组
                </div>
                <div className={styles.format}>
                    <pre>{`
                       const listOfMaps = List([
                          Map({ v: 0 }),
                          Map({ v: 1 }),
                          Map({ v: 1 }),
                          Map({ v: 0 }),
                          Map({ v: 2 })
                        ])
                        const groupsOfMaps = listOfMaps.groupBy(x => x.get('v'))
                        // Map {
                        //   0: List [ Map{ "v": 0 }, Map { "v": 0 } ],
                        //   1: List [ Map{ "v": 1 }, Map { "v": 1 } ],
                        //   2: List [ Map{ "v": 2 } ],
                        // }
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>查找数据 indexOf() 、 lastIndexOf Map不存在此方法</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：和js数组中的方法相同，查找第一个或者最后一个value的index值，找不到则返回-1
                </div>
                <div className={styles.format}>
                    <pre>{`
                      Immutable.fromJS([1,2,3,4]).indexof(3) //2
                        Immutable.fromJS([1,2,3,4]).lastIndexof(3) //2
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>findIndex() 、 findLastIndex() Map不存在此方法</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：查找满足要求的元素的index值
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1,2,3,4]).findIndex((value,index,array)=>{
                              return value%2 === 0;
                            })   // 1
                            Immutable.fromJS([1,2,3,4]).findLastIndex((value,index,array)=>{
                              return index%2 === 0;
                            })  // 3
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>find() 、 findLast()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：查找满足条件的元素的value值
                </div>
                <div className={styles.format}>
                            <pre>{`
                           Immutable.fromJS([1,2,3,4]).find((value,index,array)=>{
                              return value%2 === 0;
                            })  // 2

                            Immutable.fromJS([1,2,3,4]).findLast((value,index,array)=>{
                              return value%2 === 0;
                            })  // 4
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>findKey() 、 findLastKey()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：查找满足条件的元素的key值
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1,2,3,4]).findKey((value,index,array)=>{
                              return value%2 === 0;
                            })  // 1

                            Immutable.fromJS([1,2,3,4]).findLastKey((value,index,array)=>{
                              return value%2 === 0;
                            })  // 3
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>findKey() 、 findLastKey()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：查找满足条件的元素的key值
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1,2,3,4]).findKey((value,index,array)=>{
                              return value%2 === 0;
                            })  // 1

                            Immutable.fromJS([1,2,3,4]).findLastKey((value,index,array)=>{
                              return value%2 === 0;
                            })  // 3
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>findEntry() 、 findLastEntry()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：查找满足条件的元素的键值对 key:value
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1,2,3,4]).findEntry((value,index,array)=>{
                              return value%2 === 0;
                            })  // [1,2]

                            Immutable.fromJS([1,2,3,4]).findLastEntry((value,index,array)=>{
                              return value%2 === 0;
                            })  // [3,4]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>keyOf() lastKeyOf()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：查找某一个value对应的key值
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1,2,3,4]).keyOf(2) //1
                            Immutable.fromJS([1,2,3,4]).lastKeyOf(2) //1
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>max() 、 maxBy()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：查找最大值
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1, 2, 3, 4]).max() //4
                            Immutable.fromJS([{a;1},{a:2},{a: 3},{a:4}]).maxBy((value,index,array)=>{
                              return value.get('a')
                            })  //{a:4}
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>min() 、 minBy()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：查找最小值
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1, 2, 3, 4]).min() //1
                            Immutable.fromJS([{a;1},{a:2},{a: 3},{a:4}]).minBy((value,index,array)=>{
                              return value.get('a')
                            })  //{a:1}
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>slice()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用： 和原生js中数组的slice数组一样，包含两个参数，start和end，
                     start代表开始截取的位置，end代表结束的位置，不包括第end的元素。若不包括end，
                        则返回整个对象，若end为负数，则返回（start，length-end）对应的数据。若start只有一个并且为负数，
                     则返回最后的end个元素。
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1, 2, 3, 4]).slice(0); //[1,2,3,4]
                            Immutable.fromJS([1, 2, 3, 4]).slice(0,2); //[1,2]
                            Immutable.fromJS([1, 2, 3, 4]).slice(-2); //[3,4]
                            Immutable.fromJS([1, 2, 3, 4]).slice(0,-2); //[1,2]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>rest()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：返回除第一个元素之外的所有元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1, 2, 3, 4]).rest()//[2,3,4]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>butLast()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：返回除最后一个元素之外的所有元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1, 2, 3, 4]).rest()//[1,2,3]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>skip()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：有一个参数n, 返回截掉前n个元素之后剩下的所有元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1, 2, 3, 4]).skip(1)//[2,3,4]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>skipLast()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：有一个参数n, 返回截掉最后n个元素之后剩下的所有元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                           Immutable.fromJS([1, 2, 3, 4]).skip(1)//[1,2,3]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>skipWhile()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：返回从第一次返回false之后的所有元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                           Immutable.fromJS([1, 2, 3, 4]).skipWhile(list.skipWhile((value,index,list)=>{
                              return value > 2;
                            }))// [1,2,3,4]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>skipWhile()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：返回从第一次返回false之后的所有元素
                    作用：返回从第一次返回true之后的所有元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                            作用：返回从第一次返回false之后的所有元素
                           Immutable.fromJS([1, 2, 3, 4]).skipWhile(list.skipWhile((value,index,list)=>{
                              return value > 2;
                            }))// [1,2,3,4]

                           作用：返回从第一次返回true之后的所有元素
                           Immutable.fromJS([1, 2, 3, 4]).skipUntil(list.skipWhile((value,index,list)=>{
                             return value > 2;
                           }))// [3,4]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>take()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：有一个参数n, 返回前n个元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1, 2, 3, 4]).take(2)//[1,2]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>takeLast()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：有一个参数n, 返回最后n个元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1, 2, 3, 4]).takeLast(2)//[3,4]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>takeWhile()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：返回从第一次返回false之前的所有元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1, 2, 3, 4]).skipWhile(list.takeWhile((value,index,list)=>{
                              return value > 2;
                            }))// []
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>takeUntil()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：返回从第一次返回true之前的所有元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1, 2, 3, 4]).skipUntil(list.takeUntil((value,index,list)=>{
                              return value > 2;
                            }))// [1,2]
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>reduce()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：和js中数组中的reduce相同,按索引升序的顺序处理元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1,2,3,4]).reduce((pre,next,index,arr)=>{
                              console.log(pre+next)
                              return pre+next;
                            })
                            // 3 6 10
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>reduceRight()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：和js中数组中的reduce相同,按索引降序的顺序处理元素
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1,2,3,4]).reduceRight((pre,next,index,arr)=>{
                              console.log(pre+next)
                              return pre+next;
                            })
                            // 7 9 10
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>every()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：判断整个对象总中所有的元素是不是都满足某一个条件，都满足返回true，反之返回false。
                </div>
                <div className={styles.format}>
                            <pre>{`
                            Immutable.fromJS([1,2,3,4]).every((value,index,arr)=>{
                              return value > 2
                            }) // false
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>some()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：判断整个对象总中所有的元素是不是存在满足某一个条件的元素，若存在返回true，反之返回false。
                </div>
                <div className={styles.format}>
                            <pre>{`
                           Immutable.fromJS([1,2,3,4]).some((value,index,arr)=>{
                              return value > 2
                            }) // true
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>join()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：同js中数组的join方法。把准换为字符串
                </div>
                <div className={styles.format}>
                            <pre>{`
                           Immutable.fromJS([1,2,3,4]).join(',') //1,2,3,4
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>isEmpty()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：判断是否为空
                </div>
                <div className={styles.format}>
                            <pre>{`
                           Immutable.fromJS([]).isEmpty(); // true
                            Immutable.fromJS({}).isEmpty(); // true
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>count()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：返回元素个数，可自定义条件，返回满足条件的个数
                </div>
                <div className={styles.format}>
                            <pre>{`
                           const list = Immutable.fromJS([1,2,3,4]);
                            const map = Immutable.fromJS({a:1,b:2,c:3,d:4});

                            list.count((value,index,list)=>{
                              return value > 2;
                            })    //2

                            map.count((value,index,list)=>{
                              return value > 2;
                            })    //2
                        `}
                    </pre>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <span>countBy()</span>
                    <Button type="primary" >测试</Button>
                </div>
                <div className={styles.descipt}>
                    作用：与count不同的是，countBy返回一个对象
                </div>
                <div className={styles.format}>
                            <pre>{`
                           const list = Immutable.fromJS([1,2,3,4]);
                            const map = Immutable.fromJS({a:1,b:2,c:3,d:4});

                            list.countBy((value,index,list)=>{
                              return value > 2;
                            } //{false: 2, true: 2}

                            map.countBy((value,index,list)=>{
                              return value > 2;
                            } //{false: 2, true: 2}
                        `}
                    </pre>
                </div>
            </div>
        </div>
    }

    componentDidUpdate(prevProps){
        console.log("11111111111",this.props, prevProps);
    }
}
