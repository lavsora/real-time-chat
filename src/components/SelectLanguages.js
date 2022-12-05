import React, { useContext } from 'react';
import { LangContext } from './context/langContext';
import { ThemeContext } from './context/themeContext';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        
        border: '1px solid #ced4da',
        fontSize: 15,
        padding: '8px 24px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        '&:focus': {
            borderRadius: 4,
            boxShadow: '0 0 0 0.2rem rgba(0,0,0,0)',
            
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const SwitchButton = () => {
    const { translations, setLangContext, langState } = useContext(LangContext);
    const { changeTheme } = useContext(ThemeContext)
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <NativeSelect
                    id="demo-customized-select-native"
                    value={langState}
                    onChange={(e) => setLangContext(e.target.value)}
                    className={classes.selectEmpty}
                    input={<BootstrapInput />}
                    style={{backgroundColor: `${changeTheme.buttons.bgColor}`, color: `${changeTheme.buttons.txtColor}`}}
                >
                    <option style={{backgroundColor: `${changeTheme.buttons.bgColor}`, color: `${changeTheme.buttons.txtColor}`}} value='ru'>{translations.selectLang.ru}</option>
                    <option style={{backgroundColor: `${changeTheme.buttons.bgColor}`, color: `${changeTheme.buttons.txtColor}`}} value='en'>{translations.selectLang.en}</option>
                    <option style={{backgroundColor: `${changeTheme.buttons.bgColor}`, color: `${changeTheme.buttons.txtColor}`}} value='es'>{translations.selectLang.es}</option>
                </NativeSelect>
            </FormControl>
        </div>
    );
}

export default SwitchButton;