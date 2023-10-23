import React from 'react';
import styles from './context-type-select.module.scss'
import { chatStore } from '../../stores/chat-store';
import {observer} from "mobx-react-lite";

const ContextTypeSelect = observer(() => {

    const {listOfProjects, setSelectedProject} = chatStore;

    return (
        <div className={styles.componentWrapper}>
            <select onChange={e => setSelectedProject(e.currentTarget.value)}>
                {listOfProjects.map((el) => {
                    return (
                        <option key={el} value={el}>{el}</option>
                    )
                })}
            </select>
        </div>
    );
});

export default ContextTypeSelect;