import React from 'react';
import styles from './context-type-select.module.scss'
import {chatStore} from "../../stores/chat-store";

const ContextTypeSelect = () => {
    const {listOfFiles, setChatContextFileName} = chatStore;

    const onSelect = (value: 'pdf' | 'video' | 'website') => {
        setChatContextFileName(value);
    }

    return (
        <div className={styles.componentWrapper}>
            <h3>Select context type</h3>
            <select onChange={e => onSelect(e.currentTarget.value as 'pdf' | 'video' | 'website')} className={styles.selectWrapper}>
                {listOfFiles.map((name) => {
                    return <option key={name} value={name}>{name}</option>
                })}
            </select>
        </div>
    );
};

export default ContextTypeSelect;