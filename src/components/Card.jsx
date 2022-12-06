import { Link } from "react-router-dom"


function Card({ theme, country }) {
    
    let path = country.name.toLowerCase().split(" ").join("_")

    return (
        <div>
            <Link to={`/country/${path}`}>
                <div className={theme === "light" ? "card" : "card dark"}>
                    <img
                        className="card--img"
                        src={country.flag}
                        alt="country_flag"
                    />
                    <p className="name">{country.name}</p>
                    <ul className="ul-list">
                        <li>
                            <span className="attribute">Population: </span>{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </li>
                        <li>
                            <span className="attribute">Region: </span>{country.region}
                        </li>
                        <li>
                            <span className="attribute">Capital: </span>{country.capital}
                        </li>
                    </ul>
                </div>
            </Link>
        </div>
    )
}

export default Card
