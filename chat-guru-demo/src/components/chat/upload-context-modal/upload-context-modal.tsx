import React, {FC, useState} from 'react';
import styles from './upload-context-modal.module.scss'
import {chatStore} from "../../../stores/chat-store";
import {observer} from "mobx-react-lite";

type Props = {
    onClose: () => void
}

const UploadContextModal: FC<Props> = observer(({onClose}) => {
    return (
        <div onClick={onClose} className={styles.backdrop}>
        
        </div>
    );
});

export default UploadContextModal;