import './App.css';
import Chat from "./components/chat/chat";
import ChatTitleLogo from "./components/chat-title-logo/chat-title-logo";
import { chatStore } from './stores/chat-store';
import { useEffect } from 'react';

function App() {

    const {getListOfProjects} = chatStore

    useEffect(() => {
        getListOfProjects();
    },[])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100vw',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#b9b9b9',
            position: 'relative',
            fontFamily: 'Helvetica',
        }}>
            <ChatTitleLogo/>
                <Chat/>
        </div>
    );
}

export default App;
