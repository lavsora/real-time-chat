import { useContext, useEffect, useState } from 'react';
import { Button, Container, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { AuthContext } from "../index";
import Loader from "./Loader";
import firebase from 'firebase/compat/app';
import { LangContext } from './context/langContext';
import { ThemeContext } from './context/themeContext';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useInput from '../utils/useInput';

const Login = () => {
    const email = useInput('', { isEmpty: true, minLength: 3, emailError: true })
    const password = useInput('', { isEmpty: true, minLength: 3 })

    const [errorAuthMessage, setErrorAuthMessage] = useState(false)

    const { auth } = useContext(AuthContext)
    const { translations } = useContext(LangContext)
    const { changeTheme } = useContext(ThemeContext)

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const loginWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        // eslint-disable-next-line
        const { user } = await auth.signInWithPopup(provider)
    }

    const loginWithEmailAndPassword = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(email.value, password.value)
    }

    useEffect(() => {
        if (error) {
            setErrorAuthMessage(true)
        }
    }, [error])

    if (loading) return <Loader />

    return (
        <Container>
            <Grid container
                style={{ height: '80vh' }}
                alignItems={"center"}
                justify={"center"}
            >
                <Grid style={{ width: 400, backgroundColor: `${changeTheme.chat.chatBgColor}` }}
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box p={2}>
                        <form
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            onSubmit={loginWithEmailAndPassword}>
                            <input
                                type='text'
                                name='email'
                                placeholder={translations.inputs.placeholderEmail}
                                style={{ color: `${changeTheme.chat.chatTxtColor}`, backgroundColor: `${changeTheme.chat.chatBgColor}` }}
                                value={email.value}
                                onChange={(e) => email.onChange(e)}
                                onBlur={(e) => email.onBlur(e)} />

                            {(email.isDirty && email.emailError) && <div className='errorMessage'>{translations.errors.errorEmailCorrect}</div>}
                            {(email.isDirty && email.isEmpty) && <p className='errorMessage'>{translations.errors.errorEmptyEmail}</p>}


                            <input
                                type='password'
                                name='password'
                                placeholder={translations.inputs.placeholderPass}
                                style={{ color: `${changeTheme.chat.chatTxtColor}`, backgroundColor: `${changeTheme.chat.chatBgColor}` }}
                                value={password.value}
                                onChange={(e) => password.onChange(e)}
                                onBlur={(e) => password.onBlur(e)} />

                            {(password.isDirty && password.isEmpty) && <p className='errorMessage'>{translations.errors.errorEmptyPass}</p>}
                            {(password.isDirty && password.minLengthError) && <p className='errorMessage'>{translations.errors.errorLength}</p>}

                            <Button
                                disabled={!email.inputValid || !password.inputValid}
                                type='submit'
                                style={{ backgroundColor: `${changeTheme.buttons.bgColor}`, color: `${changeTheme.buttons.txtColor}`, width: 'fit-content' }}
                                variant={"outlined"}
                            >{translations.buttons.logIn}</Button>

                            {errorAuthMessage ? <p className='errorMessage'>{translations.errors.errorSignIn}</p> : null}
                        </form>
                    </Box>
                    <Box p={5}>
                        <Button style={{ backgroundColor: `${changeTheme.buttons.bgColor}`, color: `${changeTheme.buttons.txtColor}` }} onClick={loginWithGoogle} variant={"outlined"}>{translations.buttons.logWith}</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
