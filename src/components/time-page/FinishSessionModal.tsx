import React, {PropsWithChildren, useEffect, useState} from "react";
import {Text, TextInput} from 'react-native';
// @ts-ignore
import * as styles from "../../style/components/time-page/finish-session-modal.scss";
import Div from "../../common-components/Div";
import Modal from "../../common-components/Modal";
import IMeditationSession, {getFormattedDuration} from "../../models/IMeditationSession";
import IconButton from "../../common-components/IconButton";
type Prop = React.FC<PropsWithChildren<{
    onCloseClick?: ()=> void,
    onSaveClick?: (notes: string, rating: number)=> void,
    meditationSession: IMeditationSession,
}>>;
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import Button from "../../common-components/Button";
// import StarRating from "react-native-star-rating-widget/lib/typescript";
//@ts-ignore
import StarRating from 'react-native-star-rating-widget';
/**
 * Todo:
 * - rate your session
 * -- perhaps several things: concentration, number of distractions, peacefulness, jhana levels.
 * @param meditationSession
 * @param children
 * @param className
 * @param onCloseClick
 * @constructor
 */
const FinishSessionModal: Prop = ({meditationSession, children, onCloseClick, onSaveClick}) => {
    const [notes, setNotes] = useState<string>(meditationSession.notes);
    const [rating, setRating] = useState(0);

    return <Modal onCloseClick={onCloseClick} className={styles.finishSessionModal} windowClassName={styles.finishSessionModalWindow}>
        <Div>
            <Text>Duration { getFormattedDuration(meditationSession.durationMs)}</Text>
        </Div>
        <Div>
            <Text>Notes</Text>
            <TextInput style={styles.notesTextInput} value={notes} onChangeText={setNotes} multiline numberOfLines={4} placeholder={"Notes about your session"}/>
        </Div>
        <Div>
            <StarRating rating={rating} onChange={setRating} color={"rgb(37, 37, 37)"} starSize={50} animationConfig={{scale: 1}}/>
        </Div>
        <Div>
            <Button onClick={() => onSaveClick && onSaveClick(notes, rating)}><Text>Save</Text></Button>
        </Div>
    </Modal>
}

export default FinishSessionModal;