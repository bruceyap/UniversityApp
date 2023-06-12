import React, { useState, useEffect } from 'react';
import '../App';
import { useAppContext } from '../contexts/appContext';
import Remark from './Remark';

function Favourite() {

  const {favourites, addToFavourites, removeFromFavourites} = useAppContext();
  const [remarks, setRemark] = useState({});
  
  useEffect(() => {
    const storedRemarks = JSON.parse(localStorage.getItem('remarks'));
    if (storedRemarks) {
      setRemark(storedRemarks);
    }
  }, []);

  const updateRemark = (universityName, newRemark) => {
    setRemark((prevRemarks)=>{
      const latestRemarks = {...prevRemarks, [universityName]:newRemark};
      localStorage.setItem('remarks', JSON.stringify(latestRemarks));

      return latestRemarks;
    });
  };

  const deleteRemark = (universityName) => {
    setRemark((prevRemark)=>{
      const newRemark = { ...prevRemark };
      delete newRemark[universityName];
      localStorage.setItem('remarks', JSON.stringify(newRemark));
      return newRemark;
    })
  };

  const favouritesChecker = (name) =>{
    const boolean = favourites.some((uni) => uni.name === name);
    return boolean;
  };

  return (
    <div className='favourite'>
        {favourites.length > 0 ? favourites.map((uni, index) => (
            <div key={index} className='university'>
                <div><h3>{uni.name}</h3></div>
                <p><strong>Country:</strong> {uni.country}</p>
                <p><strong>Added Time:</strong> {uni.clickedTime}</p>
                <Remark 
                  remarks={remarks[uni.name] || ''} 
                  updateRemark={(newRemark)=>updateRemark(uni.name, newRemark)} 
                  deleteRemark={()=>deleteRemark(uni.name)}/>

                <div>
                  {favouritesChecker(uni.name) ?
                   (<button className='fav-button' onClick={() => removeFromFavourites(uni.name)}>Remove From Favourites</button>)
                   :
                   (<div>
                      <button className='fav-button' onClick={() => addToFavourites(uni)}>Add to Favourites</button>
                    </div>)
                  }
                 
                </div>
            </div>
        )) : (<h1>You don't have any favourite universities yet!</h1>)}
    </div>
  )
}

export default Favourite;