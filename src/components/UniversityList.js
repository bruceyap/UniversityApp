import React, {useState, useEffect} from 'react';
import '../App';
import axios from 'axios';
import { useAppContext } from '../contexts/appContext';

const API_ENDPOINT = "http://universities.hipolabs.com/search?";

function UniversityList() {
    const {favourites, addToFavourites, removeFromFavourites} = useAppContext();
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    
    useEffect(() => {
      const fetchUniversities = async () => {
        try {
          const apiUrl = selectedCountry === "" ? API_ENDPOINT : `${API_ENDPOINT}country=${selectedCountry}`;
          const response = await axios.get(apiUrl);
  
          const universitiesWithIds = response.data.map((university, index) => ({
            ...university,
            id: index + 1,
          }));
          setUniversities(universitiesWithIds);
          setFilteredUniversities(universitiesWithIds);
          setLoading(false);
        } catch (error) {
          setError('Error fetching universities.');
          setLoading(false);
        }
      };
      fetchUniversities();
    }, [selectedCountry]);
  
    useEffect(() => {
      if (selectedCountry) {
        const filtered = universities.filter((university) =>
          university.country.toLowerCase().includes(selectedCountry.toLowerCase())
        );
        setFilteredUniversities(filtered);
      } else {
        setFilteredUniversities(universities);
      }
    }, [selectedCountry, universities]);

    const favouritesChecker = (name) =>{
      const boolean = favourites.some((uni) => uni.name === name);
      return boolean;
    }

    const handleCountryChange = (event) => {
      setSelectedCountry(event.target.value);
    };

    if (error) {
      return <p>{error}</p>;
    };

    return (
      <div>
          {loading ? (
            <div className='university-list'>
            <p>Loading university list...<br/>Please wait for awhile since the list is too long...</p>
            
            </div>
          ) : (
          <>
            <div className='filter-option'>
              <label>
                <strong>Filter by Country: </strong>
                <input
                  type="text"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  placeholder="Enter country name"
                />
              </label>
            </div>
            <div className='university-list'>
            {
              filteredUniversities.map((uni) => (
                <div key={uni.id} className='university'>
                    <div><h4>{uni.name}</h4></div>
                    <p>Country: {uni.country}</p>
                    <a href = {uni.web_pages[0]} target='_blank' rel="noopener noreferrer">
                      {uni.web_pages[0]}
                    </a>
                    <div>
                      {favouritesChecker(uni.name) ?
                        (<button className='fav-button' onClick={() => removeFromFavourites(uni.name)}>Remove From Favourites</button>)
                        :
                        (<button className='fav-button' onClick={() => addToFavourites(uni)}>Add to Favourites</button>)
                      }
                    </div>
                </div>
              ))
            }
            </div>
            </>
          )}
      </div>
    )
}

export default UniversityList;