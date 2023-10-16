import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import {chatStore} from "../../stores/chat-store";
import {observer} from "mobx-react-lite";
import styles from './chat.module.scss'
import UploadContextModal from "./upload-context-modal/upload-context-modal";
import {apiAskAssistant} from "../../api/chat-api";

const Chat = observer(() => {
    const {
        messages,
        isRequestAble,
        addMessage,
        askAssistant
    } = chatStore;

    const [prompt, setPrompt] = useState('');
    const [showContextModal, setShowContextModal] = useState(false)
    const chatInputRef = useRef<HTMLDivElement>()

    const onSendMessageHandler = async () => {
        if(!prompt) return
        addMessage({
            id: Date.now() as number,
            author: 'user',
            message: prompt
        });
        await apiAskAssistant(prompt);
        await setPrompt('')
    }

    useEffect(() => {
        //@ts-ignore
        chatInputRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages.length])

    return (
        <div className={styles.chatWrapper}>
            {showContextModal && <UploadContextModal onClose={() => setShowContextModal(false)}/>}
            <div className={styles.messagesWrapper}>
                {messages.map((message, index) => {
                    return <div key={message.message + index} className={message.author === 'llama' ? styles.llamaMessage : styles.userMessage}>
                        {message.message}
                    </div>
                })}
            </div>
            <div ref={chatInputRef as LegacyRef<HTMLDivElement> | undefined} style={{display: 'flex', columnGap: '12px', width: '50%'}}>
                <input onKeyPress={e => e.key === 'Enter' && onSendMessageHandler()} onSubmit={onSendMessageHandler} className={styles.chatInput} type={'text'} value={prompt} onChange={e => setPrompt(e.currentTarget.value)}/>
                <button disabled={!isRequestAble} className={styles.addContextButton} onClick={() => setShowContextModal(true)}>📎</button>
                <button disabled={!isRequestAble} className={styles.askButton} onClick={onSendMessageHandler}>
                    {!isRequestAble ? '...' : 'Ask'}
                </button>
            </div>
        </div>
    );
});

export default Chat;