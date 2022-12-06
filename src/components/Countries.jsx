import { useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import axios from "axios"
import Card from "./Card"


function Countries({ theme }) {
    const [searchVal, setSearchVal] = useState("")
    const [filterVal, setFilterVal] = useState("")
    const [countries, setCountries] = useState([])
    const [defState, setDefaultState] = useState(true)

    useEffect(() => {
        function getCountriesList() {
            axios.get("https://restcountries.com/v3.1/all", {
                params: {
                    fields: "name,population,flags,continents,capital",
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    let listOfCountries = []
                    response.data.forEach((val) => {
                        listOfCountries.push({
                            name: val.name.common,
                            population: val.population,
                            flag: val.flags.png,
                            region: val.continents.join(", "),
                            capital: val.capital ? val.capital.join(", ") : ""
                        })
                    })
                    setCountries(listOfCountries)
                }
            })
            .catch(error => {
                console.log("Error: ", error)
            })
        }

        getCountriesList()
    }, [defState])

    function handleChange(event) {
        event.preventDefault()

        if (event.target.name === "searchVal") {
            setSearchVal(event.target.value)
        }

        if (event.target.name === "filterVal" && !event.target.value) {
            setFilterVal("Filter by region")
            setDefaultState((prev) => !prev)
        }

        if (event.target.name === "filterVal" && event.target.value) {
            let region = event.target.value
            setFilterVal(region)
            axios.get(`https://restcountries.com/v3.1/subregion/${region.toLowerCase()}`, {
                params: {
                    fields: "name,population,flags,continents,capital",
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    let listOfCountries = []
                    response.data.forEach((val) => {
                        listOfCountries.push({
                            name: val.name.common,
                            population: val.population,
                            flag: val.flags.png,
                            region: val.continents.join(", "),
                            capital: val.capital ? val.capital.join(", ") : ""
                        })
                    })
                    setCountries(listOfCountries)
                }
            })
            .catch(error => {
                console.log("Error: ", error)
            })
        }
    }

    function handleSearch(event) {
        if (event.key === "Enter") {
            event.preventDefault()

            axios.get(`https://restcountries.com/v3.1/name/${searchVal.toLowerCase()}`, {
                params: {
                    fields: "name,population,flags,continents,capital",
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    let listOfCountries = []
                    response.data.forEach((val) => {
                        listOfCountries.push({
                            name: val.name.common,
                            population: val.population,
                            flag: val.flags.png,
                            region: val.continents.join(", "),
                            capital: val.capital ? val.capital.join(", ") : ""
                        })
                    })
                    setCountries(listOfCountries)
                }
            })
            .catch(error => {
                console.log("Error: ", error)
            })
        }
    }

    const countryElements = countries.map((country, idx) => {
        return <Card key={idx} theme={theme} country={country} />
    })

    return (
        <div>
            <div className="container">
                <section className="search--filter">
                    <div className="input--section">
                        <BiSearch 
                            className="input--icon"
                            color={theme === "light" ? "#000" : "#fff"}
                        />
                        <input
                            type="text"
                            name="searchVal"
                            value={searchVal}
                            placeholder="Search for a country.."
                            onChange={(event) => handleChange(event)}
                            onKeyDown={(event) => handleSearch(event)}
                            className={theme === "light" ? "" : "input--dark"}
                        />
                    </div>
                    <select 
                        name="filterVal"
                        value={filterVal}
                        onChange={(event) => handleChange(event)}
                        className={theme === "light" ? "select" : "select dark"}
                    >
                        <option value="">Filter by Region</option>
                        <option value="africa">Africa</option>
                        <option value="america">America</option>
                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                    </select>
                </section>
                <section className="card--list">
                    {countryElements}
                </section>
            </div>
            <div className="gap"></div>
        </div>
    )
}

export default Countries
