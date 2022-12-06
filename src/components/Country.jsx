import axios from "axios"
import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { Link, useParams } from "react-router-dom"


function Border({ theme, border }) {
    return (<div className={theme === "light" ? "border" : "border dark"}>{border}</div>)
}

function Country({ theme }) {
    const params = useParams()
    const name = params.country.split("_").join(" ")

    const [countryDetail, setCountryDetail] = useState({
        image: "",
        commonName: "",
        nativeName: "",
        population: "",
        region: "",
        subRegion: "",
        capital: "",
        tld: "",
        currency: "",
        languages: "",
        borders: []
    })

    useEffect(() => {
        function getCountryDetail() {
            axios.get(`https://restcountries.com/v3.1/name/${name}`)
                .then((response) => {
                    if (response.status === 200) {
                        const { data } = response

                        let native = data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].common
                        let money = data[0].currencies[Object.keys(data[0].currencies)[0]].name

                        let lang = ""
                        let keys = Object.keys(data[0].languages)
                        for (const lan_key in data[0].languages) {
                            if (keys[keys.length - 1] === lan_key) {
                                lang += data[0].languages[lan_key]
                            } else {
                                lang += `${data[0].languages[lan_key]}, `
                            }
                        }

                        setCountryDetail(prev => ({
                            ...prev,
                            image: data[0].flags.png,
                            commonName: data[0].name.common,
                            nativeName: native,
                            population: data[0].population,
                            region: data[0].region,
                            subRegion: data[0].subregion,
                            tld: data[0].tld[0],
                            capital: data[0].capital.length ? data[0].capital.join(", ") : "",
                            currency: money,
                            borders: data[0].borders && data[0].borders.length ? data[0].borders : [],
                            languages: lang
                        }))
                    }
                })
                .catch((error) => {
                    console.log("Error: ", error)
                })
        }

        getCountryDetail()
    }, [])


    return (
        <div className="container">
            <Link to="/country">
                <button className={theme === "light" ? "btn--back" : "btn--back dark"}>
                    <BiArrowBack color={theme === "light" ? "#000" : "#fff"}/>
                    <span>Back</span>                
                </button>
            </Link>
            <section className={theme === "light" ? "country" : "country dark"}>
                <img alt="flag" src={countryDetail.image} className="flag--img" />
                <div className="country--detail">
                    <p className={theme === "light" ? "country--name" : "country--name dark"}>
                        {countryDetail.commonName}
                    </p>
                    <div className="detail">
                        <ul className="first--half">
                            <li>
                                <span className="sub">Native Name:</span>
                                {countryDetail.nativeName}
                            </li>
                            <li>
                                <span className="sub">Population:</span>
                                {countryDetail.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </li>
                            <li>
                                <span className="sub">Region:</span>
                                {countryDetail.region}
                            </li>
                            <li>
                                <span className="sub">Sub Region:</span>
                                {countryDetail.subRegion}
                            </li>
                            <li>
                                <span className="sub">Capital:</span>
                                {countryDetail.capital}
                            </li>
                        </ul>
                        <ul className="second--half">
                            <li>
                                <span className="sub">Top Level Domain:</span>
                                {countryDetail.tld}
                            </li>
                            <li>
                                <span className="sub">Currencies:</span>
                                {countryDetail.currency}
                            </li>
                            <li>
                                <span className="sub">Languages:</span>
                                {countryDetail.languages}
                            </li>
                        </ul>
                    </div>
                    <div className="borders">
                        <span className="sub-u">
                            Border Countries:
                        </span> 
                        <span className="list">
                            {countryDetail.borders.map((border, idx) => (<Border key={idx} theme={theme} border={border} />))}
                        </span>
                    </div>
                </div>
            </section>
            <div className="gap"></div>
        </div>
    )
}

export default Country
