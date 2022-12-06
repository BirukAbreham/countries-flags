import { BiMoon, BiSun } from "react-icons/bi"

function Navbar({ theme, handleThemeChange }) {

    const themeIcon = theme === "light" ? <BiMoon /> : <BiSun />

    return (
        <header className={theme === "light" ? "" : "dark"}>
            <nav className={theme === "light" ? "" : "dark"}>
                <div className="title">
                    Where in the world?
                </div>
                <div 
                    className="theme-mode"
                    onClick={handleThemeChange}
                >
                    {themeIcon}
                    <p>{ theme === "light" ? "Dark Mode" : "Light Mode"}</p>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
