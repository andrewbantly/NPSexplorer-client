import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

const DestinationsPage = (props) => {
    const [message, setMessage] = useState('');
    const { parksInfo,
         userDestinations, 
         handleRemoveDestination, 
         handleAddExperienceClick,
         setUserDestinations} = props

    const removeDestination = async (destinationId) => {
        try {
            const token = localStorage.getItem('jwt');
            const options = {
                headers: {
                    'Authorization': token,
                },
            };
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations/${destinationId}`, options);

            const foundDestinations = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations`, options)
            setUserDestinations(foundDestinations.data)

            setMessage('Destination removed from favorites');
        } catch (error) {
            setMessage('Error removing destination from favorites');
        }
    };

    const findParkById = (destinationId) => {
        return parksInfo.find((park) => park.id === destinationId);
    };

    const userDestinationsList = userDestinations.map((destination, index) => {
        const park = findParkById(destination);
        return (
            <div className='parkContainer'>
                <button
                    onClick={() => removeDestination(destination)}
                    className="removeButton"
                >
                    Remove from Destinations
                </button>
                <button
                    onClick={() => handleAddExperienceClick(park)}
                    className="experienceButton"
                >
                    Add to Experience
                </button>
                <Link to={`/parks/${park?.fullName}/${index}`} key={`${park?.id}-${index}`}>

                    <div>
                        <img
                            src={park?.images[0].url}
                            className="parkImage"
                            alt={park?.fullName}
                        />
                    </div>
                    <div className="parkText">
                        <h3>{park?.fullName}</h3>
                        <p>
                            {park?.addresses[0]?.city}, {park?.addresses[0]?.stateCode}
                        </p>

                        <p>
                            Activities: {park?.activities[0]?.name},{" "}
                            {park?.activities[1]?.name}, {park?.activities[2]?.name},{" "}
                            {park?.activities[3]?.name}, {park?.activities[4]?.name}
                        </p>
                    </div>
                </Link >
            </div>
        );
    });

    return (
        <div>

            <h2>User Destinations</h2>
            <ul>
                {userDestinationsList}
            </ul>

        </div>
    );

};


export default DestinationsPage;