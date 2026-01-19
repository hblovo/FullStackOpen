import {useEffect, useState} from "react";
import axios from "axios";
const WeatherDetail = ({capital,weather})=>{
    if (!weather) return null
    return(
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature is {(weather.main.temp-273.15).toFixed(2)} Celsius</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <p>Wind {(weather.wind.speed).toFixed(1)} m/s</p>
        </div>
    )
}
export const CountryDetail = ({ country }) => {
    const [weather,setWeather] = useState()
    const capital = country.capital[0]
    const API_KEY = `316f4701e497c8e5a9a4c1a81e525275`
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
            .then(response => {
                setWeather(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log('Error:', error)
            })
    }, [capital])
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>

            <h2>Languages:</h2>
            <ul>
                {Object.values(country.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                width="150"
            />
            <WeatherDetail capital={capital} weather={weather} />
        </div>
    )
}
const DetailButton = ({ onClick }) => (
    <button onClick={onClick}>show</button>
)
export const Content = ({ countries,setCountry}) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1 && countries.length <= 10) {
        return (
            <ul>
                {countries.map(c =>
                    <li key={c.cca3}>
                        {c.name.common}
                        <DetailButton onClick={() => setCountry(c)}/>
                    </li>)}
            </ul>
        )
    }

    if (countries.length === 1) {
        return <CountryDetail country={countries[0]}/>
    }

    return null
}