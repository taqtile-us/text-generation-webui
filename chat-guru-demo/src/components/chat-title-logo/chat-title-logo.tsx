import React from 'react';
import styles from './chat-title-logo.module.scss'

const ChatTitleLogo = () => {
    return (
        <div className={styles.componentWrapper}>
            <img height={'128px'} src={require('../../assets/images/Taqtile_Vertical_Black-removebg-preview.png')}/>
            <h1>ChatGuru</h1>
        </div>
    );
};

export default ChatTitleLogo;