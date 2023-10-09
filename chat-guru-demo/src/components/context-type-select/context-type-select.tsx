import React from 'react';
import styles from './context-type-select.module.scss'
import {chatStore} from "../../stores/chat-store";

const ContextTypeSelect = () => {
    const {setChatContextType} = chatStore;

    const onSelect = (value: 'pdf' | 'video' | 'website') => {
        setChatContextType(value);
    }

    return (
        <div className={styles.componentWrapper}>
            <h3>Select context type</h3>
            <select onChange={e => onSelect(e.currentTarget.value as 'pdf' | 'video' | 'website')} className={styles.selectWrapper}>
                <option value={'pdf'}>PDF Instruction</option>
                <option value={'video'}>YouTube video</option>
                <option value={'website'}>WebSite</option>
            </select>
        </div>
    );
};

export default ContextTypeSelect;