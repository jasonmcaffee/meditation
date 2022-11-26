import "jest";
import {useState, Fragment, useEffect, Dispatch, SetStateAction} from "react";
import renderer from 'react-test-renderer';
import {Text, View} from "react-native";
import {proxyUseState} from "../../react-utils/proxyUseState";



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

describe('proxyUseState', ()=>{

    test('pageState', async ()=>{
        function TestEl(){
            const state = pageState({
                value1: 123,
                value2: 'abc',
            });

            useEffect(() => {
                state.value2 = 'great';
                expect(state.value1).toBe(123);
                expect(state.value2).toBe('great');
                state.value1 = 456;
                expect(state.value1).toBe(456);
            }, []);

            return <Fragment>
                <Text>{state.value1}</Text>
                <Text>{state.value2}</Text>
            </Fragment>
        }
        renderer.create(<TestEl/>);

        const promise = new Promise((resolve) =>{
            setTimeout(resolve, 1000);
        });
        await promise;
    });

    test('proxyUseState should hold value', async ()=>{

        function TestEl(){
            const $p = proxyUseState(123);
            expect($p.value).toBe(123);
            useEffect(()=>{
                $p.value = 456;
                expect($p.value).toBe(456);
            }, []);
            return <Fragment>
                <Text>{$p.value}</Text>
            </Fragment>
        }
        renderer.create(<TestEl/>);

        const promise = new Promise((resolve) =>{
            setTimeout(resolve, 1000);
        });
        await promise;
    });


   test('primitive proxy', ()=>{
        type TValue = number;
        type ProxiedObjectType = {
           value: TValue
        }
        const handler = {
           set(obj: ProxiedObjectType, prop: string, value: TValue, receiver: any) {
               console.log(`setting prop: ${prop} = ${value} on object: `, obj);
               console.log(`receiver: `, receiver);
               //@ts-ignore
               obj[prop] = value;
               console.log(`obj now: `, obj);
               //@ts-ignore
               // return Reflect.set(...arguments);
               return true;
           },
           get(obj: ProxiedObjectType, prop: string){
               //@ts-ignore
               return obj[prop];
           }
        };

        const value = 123;
        const obj = {value};
        const proxy = new Proxy(obj, handler);
        proxy.value = 456;
        expect(obj.value).toBe(456);

   })

});