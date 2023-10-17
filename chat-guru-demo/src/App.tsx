import './App.css';
import Chat from "./components/chat/chat";
import ChatTitleLogo from "./components/chat-title-logo/chat-title-logo";

function App() {

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
            <ChatTitleLogo/>
                <Chat/>
        </div>
    );
}

export default App;
