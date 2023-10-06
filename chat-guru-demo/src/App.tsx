import React, {useState} from 'react';
import './App.css';

function App() {

    const [isLoaded, setIsLoaded] = useState(true);
    const [prompt, setPrompt] = useState('');
    const [chatMessages, setChatMessages] = useState(['Hi! My name is ChatGuru! I am your personal AI assistant! How can I help you?', 'User\'s request will be here', 'ChatGuru response will be here'])
    const [selectedManualPath, setSelectedManualPath] = useState('./')
    const [disableNewRequest, setDisableNewRequest] = useState(false)


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#b9b9b9',
            position: 'relative',
            fontFamily: 'Helvetica'
        }}>

            <div style={{position: 'absolute', top: '32px', right: '32px'}}>
                <h3>Select Instruction</h3>
                <select
                    style={{
                        borderRadius: '8px',
                        border: 'none',
                        height: '32px',
                        minWidth: '256px',
                        fontSize: '14px',
                        padding: '8px'
                    }}
                    defaultValue={selectedManualPath}
                >
                    <option value={'./assets/manuals/WMF1000manual.pdf'}>Coffee Machine user manual</option>
                    <option value={'./assets/manuals/air-condition-manual.pdf'}>Air Conditioner service manual</option>
                </select>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <img height={'128px'} src={require('./assets/images/Taqtile_Vertical_Black-removebg-preview.png')}/>
                <h1>ChatGuru</h1>
            </div>
            {isLoaded
                ? (
                    <div style={{height: '75%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', rowGap: '32px'}}>

                        <div style={{width: '50%', display: 'flex', flexDirection: "column", rowGap: '16px'}}>
                            {chatMessages.map((message, index) => {
                                return <div style={{display: 'flex', maxWidth: '75%', borderRadius: '12px', backgroundColor: index%2 ? 'rgba(238,127,49,0.75)' : 'rgba(0,0,0,0.25)', alignSelf: index%2 ? 'flex-end' : 'flex-start', padding: '8px 12px 8px 12px', color: '#FFFFFF'}}>
                                            {message}
                                       </div>
                            })}
                        </div>

                        <div style={{display: 'flex', columnGap: '12px', width: '50%'}}>
                            <input onSubmit={e => e.preventDefault()} style={{
                                fontSize: '16px',
                                padding: '0 12px 0 12px',
                                backgroundColor: '#fffffe',
                                border: '0px',
                                borderRadius: '5px',
                                height: '36px',
                                width: '100%'
                            }} type={'text'} value={prompt} onChange={e => setPrompt(e.currentTarget.value)}/>
                            <button
                                disabled={disableNewRequest}
                                style={{
                                color: '#FFFFFF',
                                backgroundColor: disableNewRequest ? '#6a3e1e' : '#ee7f31',
                                border: '0px',
                                borderRadius: '5px',
                                height: '40px',
                                width: '64px',
                                fontSize: '16px',
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}>
                                {disableNewRequest ? '...' : 'Ask'}
                            </button>
                        </div>
                    </div>
                )
                : <div>Loading</div>
            }
        </div>
    );
}

export default App;
