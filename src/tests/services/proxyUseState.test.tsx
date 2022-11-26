import "jest";
import {useState, Fragment, useEffect} from "react";
import renderer from 'react-test-renderer';
import {Text, View} from "react-native";
import {proxyUseState} from "../../react-utils/proxyUseState";


describe('proxyUseState', ()=>{

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