import { useContext, useState } from 'react';
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, Container, Grid } from "@material-ui/core";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import firebase from "firebase";
import { LangContext } from './context/langContext';
import { ThemeContext } from './context/themeContext';

const Chat = () => {
    const { translations } = useContext(LangContext)
    const { changeTheme } = useContext(ThemeContext)
    const { auth, firestore } = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    const renderMessages = (messages = []) => {
        return (messages === [] ? null : messages.map(message =>
            <div key={message.createdAt}
                style={{
                    margin: 10,
                    border: user === null ? null : user.uid === message.uid ? '2px solid green' : '2px dashed red',
                    marginLeft: user === null ? null : user.uid === message.uid ? '2px solid green' : '2px dashed red',
                    width: 'fit-content',
                    padding: 5,
                    borderRadius: '12px',
                    backgroundColor: `${changeTheme.chat.chatMsgColor}`,
                }}>
                <Grid container>
                    <Avatar src={message.photoURL} />
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>{message.displayName}</div>
                </Grid>
                <div>{message.text}</div>
            </div>)

        )
    }

    if (loading) return <Loader />

    return (
        <Container>
            <Grid container
                justify={"center"}
                style={{ height: window.innerHeight - 50, marginTop: 30 }}>
                <div style={{ width: '80%', height: '50vh', overflowY: 'auto', backgroundColor: `${changeTheme.chat.chatBgColor}`, color: `${changeTheme.chat.chatTxtColor}` }}>
                    {renderMessages(messages)}
                </div>
                <Grid
                    container
                    style={{ flexDirection: 'column', alignItems: 'flex-end', width: '80%' }}
                >
                    <input
                        name='message'
                        style={{ color: `${changeTheme.chat.chatTxtColor}`, backgroundColor: `${changeTheme.chat.chatBgColor}`}}
                        placeholder='message'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button
                        onClick={sendMessage}
                        variant={"outlined"}
                        style={{ backgroundColor: `${changeTheme.buttons.bgColor}`, color: `${changeTheme.buttons.txtColor}`, marginTop: '1.5rem'}}>
                        {translations.buttons.submit}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;
