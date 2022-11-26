import React, {PropsWithChildren, useState} from "react";
import {Pressable, StyleProp, View, ViewStyle, Text} from "react-native";
//@ts-ignore
import * as styles from '../style/common-components/modal-selector.scss';
import Modal from "./Modal";
import appEventBus from "../services/appEventBus";

type OptionRowClick<TOption> = (option:TOption) => void;
type RenderOption<TOption> = (option: TOption, onOptionRowClick?: OptionRowClick<TOption>) => React.ReactNode;

type Props<TOption> = PropsWithChildren<{
    className?: StyleProp<ViewStyle>,
    options: TOption[],
    value: TOption,
    renderOption?: RenderOption<TOption>,
    onOptionRowClick?: OptionRowClick<TOption>
}>;

function ModalSelector<TOption>({value, className = null, options, renderOption=defaultRenderOption, onOptionRowClick}: Props<TOption>) {
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
        <Text>{value + ''}</Text>
    </Pressable>;
}

function createModal<TOption>(options: TOption[], mandatoryOnClick: OptionRowClick<TOption>, renderOption: RenderOption<TOption>,  onModalCloseClick: ()=> void){
    const optionEls = createOptionEls(options, mandatoryOnClick, renderOption);
    return <Modal onCloseClick={onModalCloseClick}>
        {optionEls}
    </Modal>
}

function createOptionEls<TOption>(options: TOption[], mandatoryOnClick: OptionRowClick<TOption>, renderOption: RenderOption<TOption>){
    return options.map( (o, i) => createRenderOptionWrapper(o, i, mandatoryOnClick, renderOption));
}

function createRenderOptionWrapper<TOption>(option: TOption, index: number, mandatoryOnClick: OptionRowClick<TOption>, renderOption: RenderOption<TOption> ){
    return <View key={`optionRowWrapper${index}`} style={styles.optionRowWrapper}>
        {renderOption(option, mandatoryOnClick)}
    </View>
}

function defaultRenderOption<TOption>(option: TOption, onOptionRowClick?: OptionRowClick<TOption>){
    return <Pressable style={styles.defaultOptionRow} onPress={() => onOptionRowClick && onOptionRowClick(option) }>
        <Text>{option + ''}</Text>
    </Pressable>
}


export default ModalSelector;