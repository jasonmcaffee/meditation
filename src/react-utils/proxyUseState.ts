import {Dispatch, SetStateAction, useState} from "react";

type UseStateType = <S>(initialState: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];

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