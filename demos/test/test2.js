import { useState, useEffect } from "react";

const Page = (props) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearTimeout(timerId);
    }, []);

    return ( <div>{date}</div> );
}
 
export default Page;



class Change {
    constructor(changeType) {
        this.changeType = changeType;
        this.cache = {};
    }
    makeChange(amount) {
        let min = [];
        if (!amount) return [];
        if (this.cache[amount]) {
            return this.cache[amount];
        }
        for (let i = 0; i < this.changeType.length; i++) {
            // 先找1块
            const leftAmount = amount - this.changeType[i];
            let newMin;
            if (leftAmount >= 0) {
                // 没找完
                newMin = this.makeChange(leftAmount); // 动态规划
            }
            if (leftAmount >= 0 && (newMin.length < min.length -1 || !min.length)) {
                min = [this.changeType[i]].concat(newMin);
            }
        }
        return this.cache[amount] = min;
    }
}

const change = new Change([1, 3, 5]);

console.log(change.makeChange(2))
console.log(change.makeChange(6));



const Context = React.createContext();

export const Provider = props => {
    return <Context.Provider value={props.store}>{props.children}</Context.Provider>
}

const bindActionCreator = (creator, dispatch) => {
    return (...args) => dispatch(creator(...args));
}
const bindActionCreators = (creators, dispatch) => {
    return Object.keys(creators).reduce((ret, item) => ret[item] = bindActionCreator(creators[item], dispatch), {});
}
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => Comp => {
    return (props) => {
        const getProps = () => {
            const store = useContext(Context);
            const stateProps = mapStateToProps(store.getState());
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
            return {
                ...newProps,
                ...stateProps,
                ...dispatchProps,
            }
        }
        useEffect(() => {
            store.subscribe(() => {
                setProps({
                    ...newProps,
                    ...getProps()
                });
            })
            return () => {};
        }, []);
        const [newProps, setProps] = useState(...getProps());
        return (<Comp {...props} />)
    }
}


import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Component } from 'react';

function Search(props) {
    return (
        <div>
            <h1>
                Search
            </h1>
        </div>
    )
}
<BrowserRouter>
    <nav>
        <Link to="/" >首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to={`/Search/${searchId}`}>搜索</Link>
    </nav>
    <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <PrivateRoute path="/user" component={UserPage}></PrivateRoute>
        <Route path="/search/:id" component={Search}></Route>
        <Route path="login" component={LoginPage}></Route>
        <Route component={() => <div>404</div>}></Route>
    </Switch>
</BrowserRouter>


export default class LoginPage extends Component {

}


export default class PrivateRoute extends Component {
    render() {
        const { isLogin } = this.props;
        const redirect = location.pathname;
        return isLogin ? (<Route path={redirect} component={UserPage}></Route>) : (<Redirect to="login"/>)
    }
}


import { createBrowserHistory } from 'history';

const RouterContext = React.createContext();
const RouterProvider = RouterContext.Provider;
const RouterConsumer = RouterContext.Consumer;

export class BrowserRouter extends Component {
    constructor(props) {
        super(props);
        this.history = createBrowserHistory();
        this.state = {
            location: this.history.location
        }
        this.unlisten = this.history.listen(location => {
            this.setState({ location });
        })
    }
    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
        }
    }
    render() {
        const { children } = this.props;
        return <RouterProvider value={{ history: this.history, location: this.location }}>{children}</RouterProvider>;
    }
}

// export class Route extends Component {
//     constructor(props) {
//         super(props);
//         console.log(props);
//     }
//     render() {
//         const { component, path } = props;
//         return React.createElement(component);
//     }
// }

export function Route (props) {
    const { component, path } = props;
    const ctx = useContext(RouterContext);
    const { location } = ctx;
    const matchCurrent = path === location.pathname;
    const cmpProps = { ...ctx };
    return matchCurrent ? React.createElement(component, cmpProps) : null;
}

export class Link extends Component {
    handleClick = (event, history) => {
        event.prevntDefault();
        history.push(to);
    }
    render() {
        const { children, to } = this.props;
        return (<RouterConsumer>
            {
                ctx => {
                    <a href={to} onClick={(event) => this.handleClick(event, ctx.history)}>{children}</a>
                }
            }
        </RouterConsumer>)
    }
}


// Saga

import createSagaMiddleware from 'redux-saga';
import mySaga from './mySaga';
const sagaMid = createSagaMiddleware;

const store = createStore(
    combineReducers({ user: loginReducer}),
    applyMiddleware(sagaMid)
);

sagaMid.run(mySaga);

export default store;


import { call, put, takeEvery } from 'redux-saga';

// 模拟登录接口
const UserService = {
    login(name) {
        return new Promise((resolve, reject) => {
            console.log('omg');
            setTimeout(() => {
                if (name === '小明') {
                    resolve({ name: '小明' });
                } else {
                    reject('用户名和密码错误')
                }
            }, 1000)
        })
    }
}

// worker saga
function* loginHandle() {
    console.log('loginHandle');
    try {
        yield put({ type: 'loading' })
        const res = yield call(UserService.login, action.name);
        yield put({type: 'loginSuccess'})
    } catch (err) {
        yield put({type: 'loginFail'})
    }

}

// watcher saga
function mySaga() {
    yield takeEvery('login', loginHandle);
}

export default mySaga;


export default function create(Component, props) {
    const vm = new Vue({
        render(h) { // 提供h函数，渲染vnode
            return h(Component, { props });
        }
    }).$mount();
    const comp = vm.$children[0];
    document.body.appendChild(comp.$el);
    comp.remove = () => {
        document.body.removeChild(vm.$el);
        vm.$destroy();
    }
    return comp;
}

// mvvm 
// vdom js object





var isPalindrome = function(x) {
    if (!x) return false;
    var left = 0, right = x.length - 1;

    while(left < right) {
        console.log(x.charAt(left), x.charAt(right));
        if (x.charAt(left) !== x.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};

console.log(isPalindrome('0'));



var generate = function(numRows) {
    let res = [ [1] ];
    for (let i = 1; i < numRows; i++) {
        res.push([]);
        for (let j = 0; j <= i; j++) {
            if (i === j || j === 0) {
                res[i][j] = 1;
            } else {
                res[i][j] = res[i-1][j-1] + res[i-1][j];
            }
        }
    }
    return res;
};

console.log(generate(5));


const unique = (arr, m, n) => {
    let dp = (m, n) => {
        if (m === 2 && n === 2) {
           return (arr[1][1] === 1) || (arr[0][1] + arr[1][0] === 2)
                    ? 0
                    : (arr[1][0] === 1 || arr[0][1] === 1) 
                        ? 1
                        : 2;
        } else if (m < 2) {
            return arr[m-1].includes(1) ? 0 : 1;
        } else if (n < 2) {
            return arr.map(item => item[0]).includes(1) ? 0 : 1;
        } else {
            return dp(m-1, n) + dp(m, n-1);
        }
    }
    return dp(m, n);
}

// F(src, dst, k) = Min(F(src, dst-1, k-1), F(dst-1, dst, 1));

const distance = (src, dst, k) => {
    
    let flights = [
        [0,1,100],
        [1,2,100],
        [0,2,500]
    ];

    let cheap = (src, dst, k) => {
        let prev = flights.filter(item => item[1] === dst);
        let min = Math.min.apply(null, prev.map(item => {
            // 找到src，并且中转次数小于0
            if (item[0] === src && k > -1) {
                return item[2];
            }
            if (k === 0 && item[0] !== src) {
                return Number.MAX_SAFE_INTEGER;
            }
            cheap(item[2] + cheap(src, item[0], k-1));
        }));
        return min;
    }
    cheap(src, dst, k);
}

const maximalRectangle = (arr) => {

    let result = [];
    // for (let i = 0, iLen = arr.length; i < iLen; i++) {
    //     for (let j = 0, jLen = arr[i].length; j < jLen; j++) {

    //     }
    // }
    let reg = /1{2,}/g;
    arr = arr.map(item => {
        let str = item.join(''); // 变成字符串，提取1
        let r = reg.exec(str);
        let rs = [];
        while(r) {
            rs.push([r.index, r.index+r[0].length-1]);
            r = reg.exec(str);
        }
        return rs;
    });
    console.log(arr);

    let maxReact = (arr, result, n = 1) => {
        let top = arr.pop();
        let next = arr.pop();
        let tt, nn;
        let start, end;
        let width = 1, maxWidth = 1;
        n++;
        for (let i = 0, iLen = top.length; i < iLen; i++) {
            tt = top[i];
            for (let j = 0, jLen = next.length; j < jLen; j++) {
                nn = next[j];
                width = Math.min(tt[1], nn[1]) - Math.max(tt[0], nn[0]);
                if (width > maxWidth) {
                    maxWidth = width;
                    start = Math.max[tt[0], nn[0]];
                    end = Math.min(tt[1], nn[1])
                }
            }
        }
        if (start === undefined || end === undefined) {
            if (n < 3) {
                return false;
            } else {
                width = top[0][1] - top[0][0] + 1;
                if (width > 1) {
                    result.push((n-1)*width);
                }
            }
        }
    }

}

var arr = [
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
]
maximalRectangle(arr);