import { useState, useEffect } from 'react'
import axios from 'axios'
import {CountryDetail,Content} from "./components/Content.jsx";


const App = () => {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])
    const [selectedCountry,setSelectedCountry] = useState(null)

    // 1. 获取所有国家数据 (Fetch all countries)
    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setCountries(response.data)
                console.log(response.data)
            })
    }, [])

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
        setSelectedCountry(null)
    }

    // 2. 过滤逻辑 (Filtering logic)
    const countriesToShow = query === ''
        ? []
        : countries.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))

    return (
        <div>
            find countries <input value={query} onChange={handleQueryChange} />
            {selectedCountry ?
                (<CountryDetail country={selectedCountry} />) :
                (<Content countries={countriesToShow} setCountry={setSelectedCountry}/>)
            }
        </div>
    )
}
export default App