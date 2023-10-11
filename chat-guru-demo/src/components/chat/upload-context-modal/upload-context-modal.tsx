import React, {FC, useState} from 'react';
import styles from './upload-context-modal.module.scss'
import {chatStore} from "../../../stores/chat-store";
import {observer} from "mobx-react-lite";

type Props = {
    onClose: () => void
}

const UploadContextModal: FC<Props> = observer(({onClose}) => {
    const {chatContextType} = chatStore;
    const [file, setFile] = useState();

    return (
        <div onClick={onClose} className={styles.backdrop}>
            <div onClick={e => e.stopPropagation()} className={styles.fileInputWrapper}>
                {chatContextType === 'pdf' ? (
                    <>
                        <h3>Choose PDF file</h3>
                        <input className={styles.fileInput} type={'file'}/>
                    </>
                ) : chatContextType === 'video' ? (
                    <>
                        <h3>Insert YouTube Link</h3>
                        <input style={{width: '75%'}} className={styles.fileInput} type={'url'}/>
                    </>
                ) : (
                    <>
                        <h3>Insert WebSite Link</h3>
                        <input style={{width: '75%'}} className={styles.fileInput} type={'url'}/>
                    </>
                )
                }
            </div>
        </div>
    );
});

export default UploadContextModal;