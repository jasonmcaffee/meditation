import React, {PropsWithChildren, useState} from "react";
import {Pressable, StyleProp, View, ViewStyle, Text} from "react-native";
//@ts-ignore
import * as styles from '../style/common-components/modal-selector.scss';
import Modal from "./Modal";
import appEventBus from "../services/appEventBus";


export interface IDropDownOption<TValue> {
    value: TValue;
    label: string;
}

type OptionRowClick<TOption> = (option:TOption) => void;
type RenderOption<TOption> = (option: TOption, onOptionRowClick?: OptionRowClick<TOption>) => React.ReactNode;

type Props<TValue, TOption extends IDropDownOption<TValue>> = {
    className?: StyleProp<ViewStyle>,
    options: TOption[],
    currentOption: TOption,
    renderOption?: RenderOption<TOption>,
    onOptionRowClick?: OptionRowClick<TOption>
};

function ModalSelector<TValue, TOption extends IDropDownOption<TValue>>({currentOption, className = null, options, renderOption=defaultRenderOption, onOptionRowClick}: Props<TValue, TOption>) {
    //update state and close modal.
    function mandatoryOnOptionClick(option: TOption){
        appEventBus.app.showModal().set(null);
        onOptionRowClick && onOptionRowClick(option);
    }

    //show modal
    function onModalSelectorClick(){
        appEventBus.app.showModal().set(modalEl);
    }
    function onModalCloseClick(){
        appEventBus.app.showModal().set(null);
    }

    const modalEl = createModal(options, mandatoryOnOptionClick, renderOption, onModalCloseClick);

    return <Pressable onPress={onModalSelectorClick} style={[styles.modalSelector,className]}>
        <Text>{currentOption.label}</Text>
    </Pressable>;
}

function createModal<TValue, TOption extends IDropDownOption<TValue>>(options: TOption[], mandatoryOnClick: OptionRowClick<TOption>, renderOption: RenderOption<TOption>,  onModalCloseClick: ()=> void){
    const optionEls = createOptionEls(options, mandatoryOnClick, renderOption);
    return <Modal onCloseClick={onModalCloseClick}>
        {optionEls}
    </Modal>
}

function createOptionEls<TValue, TOption extends IDropDownOption<TValue>>(options: TOption[], mandatoryOnClick: OptionRowClick<TOption>, renderOption: RenderOption<TOption>){
    return options.map( (o, i) => createRenderOptionWrapper(o, i, mandatoryOnClick, renderOption));
}

function createRenderOptionWrapper<TValue, TOption extends IDropDownOption<TValue>>(option: TOption, index: number, mandatoryOnClick: OptionRowClick<TOption>, renderOption: RenderOption<TOption> ){
    return <View key={`optionRowWrapper${index}`} style={styles.optionRowWrapper}>
        {renderOption(option, mandatoryOnClick)}
    </View>
}

function defaultRenderOption<TValue, TOption extends IDropDownOption<TValue>>(option: TOption, onOptionRowClick?: OptionRowClick<TOption>){
    return <Pressable style={styles.defaultOptionRow} onPress={() => onOptionRowClick && onOptionRowClick(option) }>
        <Text>{option.label}</Text>
    </Pressable>
}


export default ModalSelector;