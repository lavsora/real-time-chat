import { useState, useContext } from "react";
import { ThemeContext } from "./context/themeContext";

import { Switch } from "@material-ui/core";

import sunIcon from '../utils/icons/sun.png'
import moonIcon from '../utils/icons/moon.png'

const ToggleStyle = () => {
    const [theme, setTheme] = useState(false)
    const { changeTheme, setThemeContext } = useContext(ThemeContext)

    const onChangeValue = () => {
        setTheme(!theme)
        
        if(theme === true) setThemeContext('light')

        if(theme === false) setThemeContext('dark')
    }

    return (
        <div className="toggle-block">
            <img style={{filter: `${changeTheme.background.filterIcon}`}} src={sunIcon} alt='sun-icon' />
            <Switch color="default" onChange={onChangeValue} />
            <img style={{filter: `${changeTheme.background.filterIcon}`}} src={moonIcon} alt='moon-icon' />
        </div>
    )
}

export default ToggleStyle;