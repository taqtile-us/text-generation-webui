import React, {useEffect, useState} from 'react';
import './App.css';
import Chat from "./components/chat/chat";
import ChatTitleLogo from "./components/chat-title-logo/chat-title-logo";
import {chatStore} from "./stores/chat-store";
import BurgerMenu from "./components/burger-menu/burger-menu";

function App() {
    const {getListOfFiles} = chatStore

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getListOfFiles().then(() => setIsLoaded(true))
    })

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100vw',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#b9b9b9',
            position: 'relative',
            fontFamily: 'Helvetica',
        }}>
            <BurgerMenu/>
            <ChatTitleLogo/>
            {isLoaded
                ? (
                    <Chat/>
                )
                : <div>Loading</div>
            }
        </div>
    );
}

export default App;
