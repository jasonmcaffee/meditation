import {Dispatch, SetStateAction, useState} from "react";
//the return type of react's useState, which is an array of current value and a function to set the value.
type UseStateReturnType<S> = [S, Dispatch<SetStateAction<S>>];

export function pageState<TPageState extends object>(pageState: TPageState){
    type KeyUseStateMap = {
        [TKey in keyof TPageState] : UseStateReturnType<TPageState[keyof TPageState]>
    }
    //build up a map of property key to useState(value) so we can call get value and set value during our set and get in proxy.
    //@ts-ignore
    const keyUseStateMap: KeyUseStateMap = {};
    Object.entries(pageState).forEach(([key, value]) => {
        //@ts-ignore
        keyUseStateMap[key] = useState(value)
    });

    const handler = {
        set(obj: TPageState, key: keyof TPageState, value: TPageState[keyof TPageState]) {
            // console.log(`setting key: ${key.toString()} = ${value} on object: `, obj);
            obj[key] = value;
            const setValue = keyUseStateMap[key][1];
            setValue(value);
            return true;
        },
        get(obj: TPageState, key: keyof TPageState){
            //@ts-ignore
            // console.log(`getting prop ${key} with value: ${obj[key]} object: `, obj);
            const value = keyUseStateMap[key][0];
            return value;
        }
    };
    //@ts-ignore
    const proxy = new Proxy(pageState, handler);
    return proxy;
}
