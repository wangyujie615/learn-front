import { useState, useEffect, useRef, useCallback } from "react"

function useDebounce(callback, delay) {
    const timeoutRef = useRef();
    const isFunction = typeof callback === 'function';

    //值防抖状态
    const [debounceValue, setDebounceValue] = useState(
        isFunction ? undefined : callback
    )
    //函数防抖的逻辑 设置函数更新的依赖
    const debounceFn = useCallback((...args) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay, isFunction])
    
    //值的处理
    useEffect(() => {
        if (isFunction) return;
        const handler = setTimeout(() => {
            setDebounceValue(callback)
        }, delay)
        return () => clearTimeout(handler)
    }, [callback, delay, isFunction])

    // 清理定时器
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);
    return isFunction ? debounceFn : debounceValue;

}