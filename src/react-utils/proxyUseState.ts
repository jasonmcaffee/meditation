import {Dispatch, SetStateAction, useState} from "react";

type UseStateType = <S>(initialState: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];


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

    console.log(`keyUseStateMap is: `, keyUseStateMap);

    const handler = {
        set(obj: TPageState, key: keyof TPageState, value: TPageState[keyof TPageState], receiver: any) {
            console.log(`setting key: ${key.toString()} = ${value} on object: `, obj);
            console.log(`receiver: `, receiver);
            obj[key] = value;
            const setValue = keyUseStateMap[key][1];
            setValue(value);
            console.log(`obj now: `, obj);
            //@ts-ignore
            // return Reflect.set(...arguments);
            return true;
        },
        get(obj: TPageState, key: keyof TPageState){
            //@ts-ignore
            console.log(`getting prop ${key} with value: ${obj[key]} object: `, obj);
            //@ts-ignore
            return obj[key];
        }
    };
    //@ts-ignore
    const proxy = new Proxy(pageState, handler);
    return proxy;
}


//this isn't very convenient :)
export function proxyUseState<TValue>(val: TValue){
    const [value, setValue] = useState(val);
    type ProxiedObjectType = {
        value: TValue
    }
    const proxiedObject: ProxiedObjectType = {
        value: val,
    }
    const handler = {
        set(obj: ProxiedObjectType, prop: string, value: TValue, receiver: any) {
            console.log(`setting prop: ${prop} = ${value} on object: `, obj);
            console.log(`receiver: `, receiver);
            //@ts-ignore
            obj[prop] = value;
            setValue(value);
            console.log(`obj now: `, obj);
            //@ts-ignore
            // return Reflect.set(...arguments);
            return true;
        },
        get(obj: ProxiedObjectType, prop: string){
            //@ts-ignore
            return value;
            // return obj[prop];
        }
    };
    const proxy = new Proxy(proxiedObject, handler);
    return proxy;
}

export interface IWrappedUseState<TValue>{
    get(): TValue,
    set(newValue: TValue): void,
}

export function wrappedUseState<TValue>(val: TValue): IWrappedUseState<TValue>{
    const [value, setValue] = useState(val);
    return {
        get(){ return value; },
        set(newVal: TValue){ setValue(newVal)}
    }
}