import React, { useState } from 'react'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routes from "./components/Routes";
const App = () => {
    let isGscDark =  localStorage.getItem("isGscDark") || "false";
    const [darkTheme, setDarkTheme] = useState(isGscDark === "true");
    const setThemeDark = () => {
        let isDark = !darkTheme;
        localStorage.setItem('isGscDark', isDark);
        setDarkTheme(isDark);
    }
  return (
    <div className={darkTheme ? 'dark' : ''}>
        <div className='bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen'>
            <Navbar
                darkTheme={darkTheme}
                setThemeDark={setThemeDark}
            />
            <Routes/>
            <Footer/>
        </div>
    </div>
  )
}

export default App