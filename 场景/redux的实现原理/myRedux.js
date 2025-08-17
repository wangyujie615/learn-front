function createStore(reducer, preloadedState) {
  let currentState = preloadedState;
  let listeners = [];

  // 获取状态
  function getState() {
    return currentState;
  }

  // 订阅
  function subscribe(listener) {
    listeners.push(listener);
    // 取消订阅的函数
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  // 派发 action
  function dispatch(action) {
    currentState = reducer(currentState, action); // reducer 生成新 state
    listeners.forEach(l => l()); // 通知订阅者
    return action;
  }

  // 初始化 state
  dispatch({ type: '@@redux/INIT' });

  return { getState, dispatch, subscribe };
}
// reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// 创建 store
const store = createStore(counterReducer);

// 订阅
const unsubscribe = store.subscribe(() => {
  console.log('state 更新:', store.getState());
});

// 派发 action
store.dispatch({ type: 'INCREMENT' }); // state: { count: 1 }
store.dispatch({ type: 'DECREMENT' }); // state: { count: 0 }

// 取消订阅
unsubscribe();
