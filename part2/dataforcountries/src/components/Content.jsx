export const CountryDetail = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>

            <h3>Languages:</h3>
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