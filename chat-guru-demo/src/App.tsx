import React, {useState} from 'react';
import './App.css';
import Chat from "./components/chat/chat";
import ContextTypeSelect from "./components/context-type-select/context-type-select";
import ChatTitleLogo from "./components/chat-title-logo/chat-title-logo";

function App() {

    const [isLoaded, setIsLoaded] = useState(true);

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
            <ContextTypeSelect/>
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
