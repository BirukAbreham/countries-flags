import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Countries from "./components/Countries"
import Country from "./components/Country"

function App() {
  	const [theme, setTheme] = useState("light")

	function handleThemeChange() {
		setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light")
		window.localStorage.setItem("theme", theme === "light" ? "dark" : "light")
	}

	useEffect(() => {
		let themeHistory = window.localStorage.getItem("theme")

		if (themeHistory) {
			setTheme(themeHistory)
		}

	}, [])

	return (
		<div className={theme === "light" ? "app--light" : "app--dark"}>
			<Navbar theme={theme} handleThemeChange={handleThemeChange} />
			<Routes>
				<Route index path="/" element={<Countries theme={theme} />} />
				<Route path="country" element={<Countries theme={theme} />} />
				<Route path="/country/:country" element={<Country theme={theme} />} />
			</Routes>
		</div>
	)
}

export default App
