import React, {PropsWithChildren} from "react";
import {TouchableOpacity} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
//@ts-ignore
import * as styles from '../style/common-components/dropdown.scss';
import Div from "./Div";

const DropDown: React.FC<PropsWithChildren<{ className?: any, onSelected: (item: any)=> void, data: Array<any>, label?: string}>> = ({label, children, className = null, onSelected, data}) => {

    return <Div className={className}>
        <SelectDropdown
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            dropdownStyle={styles.dropDownStyle}
            defaultButtonText={"0" + (label ? ` ${label}`: '')}
            data={data}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                onSelected(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {

                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem + (label ? ` ${label}`: '');
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
        />
    </Div>
}

export default DropDown;