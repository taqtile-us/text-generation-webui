import React from 'react';
import styles from './context-type-select.module.scss'
import { chatStore } from '../../stores/chat-store';
import {observer} from "mobx-react-lite";

const ContextTypeSelect = observer(() => {

    const {listOfProjects, setSelectedProject, selectedProject} = chatStore;
    const onSelect= (projectNane: string) => {
        setSelectedProject(projectNane)
        console.log(selectedProject)
    }

    return (
        <div className={styles.componentWrapper}>
            <h3>Select context type</h3>
            <select style={{width: '100%'}} onChange={e => onSelect(e.currentTarget.value)}>
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