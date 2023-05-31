import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import styled from 'styled-components';

// using syled-components to style this page
const ParkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 7px solid #ccc;
  padding: 0;
  margin: .5rem 1rem;
  width: 100%;
  height: auto;
  border-radius: 7%/5%;
  border: 0.1rem solid rgb(51, 61, 41);
  background-color: rgb(240, 239, 225) ;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    width: 20rem;
  }
  @media (min-width: 480px) {
    max-width: 20rem;  
`;

const DestinationsTitle = styled.h2`
  margin-top: 5.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  margin-top: -25px;
  margin-bottom: -30px;
  background-color: grey
  padding: 0;
  @media (max-width: 480px) {
    flex-direction: row;
  }
`;

const RemoveButton = styled.button`
  border: none;
  background-color: transparent;
  width: 30px;
  height: 70px;
  padding: 0;
  margin: 0;
  margin-right: 0.2rem; 
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('https://ucarecdn.com/70eb6013-f9b9-4377-9c48-4ded6a690e9f/');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 0
  font-weight: bold;
  color: maroon;
`;

const ExperienceButton = styled.button`
    border: none;
    background-color: transparent;
    width: 30px;
    height: 70px;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &::before {
    content: "";
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('https://ucarecdn.com/e8ede673-cced-4a2a-a020-941e395828ff/');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    }
`;

const ExperienceMessage = styled.p`
  height: 30px;
  width: 97%;
  display: flex;
  justify-content: center;
  align-items: center;
  font: 15px; 
  margin: 1.25rem 1rem;

`;

const ParkImage = styled.img`
    width: 18rem;
    height: 12rem;
    object-fit: cover;
    margin-bottom: 1rem; 
    border-radius: 5%/7%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3); 
    @media (max-width: 480px) {
    width: 90%;
    object-fit: cover;
    }
  
`;

const ParkText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    width: 90%;
    height: 5rem;
    padding: 0;
    font-family: 'Baloo 2', sans-serif;
    margin: 2rem 0.5rem;


`;

const ParkGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    // border: 10px solid orange;


    @media (max-width: 480px) {
        gap: 0.5rem;
  }
  @media (min-width: 32rem) {
    justify-content:space-between
    flex-wrap: wrap;
    width: 100%;
}
`;

const NoDestinationsMessage = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    color: #556b2f;
    font-family: 'Arial', sans-serif;
`;

const ImageAndButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const DestinationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin: 0 auto 0;
    width: 90%;
    


`;

const HeaderLocationContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    line-height: 1;
    width: 90%;
    height: 4rem;
    padding: 0.3rem 0;
    background: rgb(51, 61, 41);
    border-radius: 4%/15%;
    color: white;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    border: solid red


  p { 
    margin: 0.3rem .5rem 0 .5rem;
 
  }
  p {
    font-size: 16px;
    margin: 0.3rem
  }
`;







const DestinationsPage = (props) => {
    const [message, setMessage] = useState('');
    const [experienceMessage, setExperienceMessage] = useState('');
    const [showText, setShowText] = useState(false);
    const [showRemoveText, setShowRemoveText] = useState(false);
    const { parksInfo,
        userDestinations,
        handleRemoveDestination,
        handleAddExperienceClick,
        setUserDestinations } = props

        useEffect(() => {
            const token = localStorage.getItem('jwt');
            if (token) {
              axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations`, {
                headers: {
                  Authorization: token,
                },
              })
              .then((response) => {
                setUserDestinations(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
            }
          }, []);


    function NewScreen() {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [])
    }

    NewScreen()

    //const removeDestination = async (destinationId, park) => { ... }: This line defines an asynchronous function called removeDestination. This function takes two arguments: destinationId (the ID of the destination to be removed) and park (an object containing the details of the park associated with the destination).

    //Retrieve the JSON Web Token (JWT) from the browser's local storage.

    //After successfully deleting the destination, the code sends another request to the server to fetch the updated list of user destinations using the axios.get method

    //The updated list of destinations is then passed to the setUserDestinations function to update the state in the parent component.

    const removeDestination = async (event, destinationId, park) => {
        event.stopPropagation();
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

            setMessage(`${park.fullName} was removed from favorites`);
            setShowRemoveText(true);
            setTimeout(() => {
                setShowRemoveText(false);
            }, 3000);
        } catch (error) {
            setMessage(`Error removing ${park.fullName} from favorites`);
            setShowRemoveText(true);
            setTimeout(() => {
                setShowRemoveText(false);
            }, 3000);
        }
    };
    //event: The event object that is automatically passed when the function is called from an event listener (onClick in this case). The event object contains information about the event that occurred, such as the target element and the type of event.

    // event.stopPropagation(); is used to prevent the parent element from reciving the click

    const handleExperienceButtonClick = (event, park) => {
        event.stopPropagation();
        handleAddExperienceClick(park);
        setExperienceMessage(`An experience was added to your profile`);
        setShowText(true);
        setTimeout(() => {
            setShowText(false);
        }, 3000);
    };

    // the findParkById function takes destinationId as an argument, destionsIs is the Id of the park we want to find

    // the findIndex method is used on the parksInfo array. This method goes through each element "park" in the array and checks if the id of the park is equal to the destinationId. If it finds a match, it returns the index of that element "park" in the array. The result is stored in the parkIndex variable.

    //  The originalIndex property holds the value of parkIndex, which is the original index of the park in the parksInfo array.

    // returns this object containing the park and originalIndex properties.

    const findParkById = (destinationId) => {
        const parkIndex = parksInfo.findIndex((park) => park.id === destinationId);
        return {
            park: parksInfo[parkIndex],
            originalIndex: parkIndex
        };
    };

    //The userDestinations array is being mapped over, which means a new array is being created by transforming each destination

    // For each destination, the findParkById function is called it passes the destination as an argument. This returns an object containing the park and originalIndex properties

    // The returned object is then destructured using the syntax const { park, originalIndex } = findParkById(destination);. This means that the park and originalIndex properties are extracted from the returned object 

    const userDestinationsList = userDestinations.map((destination) => {
        const { park, originalIndex } = findParkById(destination);


        return (
            <ParkContainer key={destination}>
                <HeaderLocationContainer>
                    <p className='parkTitle'>{park?.fullName}</p>
                    <p>
                        {park?.addresses[0]?.city}, {park?.addresses[0]?.stateCode}
                    </p>
                </HeaderLocationContainer>

                <ImageAndButtons>
                    <Link to={`/parks/${park?.fullName}/${originalIndex}`}>
                        <ParkImage
                            src={park?.images[0].url}
                            alt={park?.fullName}
                        />
                    </Link>
                    <ButtonsContainer>
                        {showText ? (
                            <ExperienceMessage>
                                {experienceMessage}
                            </ExperienceMessage>
                        ) : (
                            <>
                                <RemoveButton
                                    onClick={(event) => removeDestination(event, destination, park)}
                                >
                                </RemoveButton>
                                <ExperienceButton
                                    onClick={(event) => {
                                        // Check if showText is false before adding an experience.
                                        // If showText is true, it means the user has recently clicked the button,
                                        // so we should ignore the click.
                                        if (!showText) {
                                            handleExperienceButtonClick(event, park);
                                        }
                                    }}
                                >
                                </ExperienceButton>
                            </>
                        )}
                    </ButtonsContainer>
                </ImageAndButtons>

                <ParkText>
                    <p>
                        Activities: {park?.activities[0]?.name},{" "}
                        {park?.activities[1]?.name}, {park?.activities[2]?.name},{" "}
                        {park?.activities[3]?.name}, {park?.activities[4]?.name}
                    </p>
                </ParkText>
            </ParkContainer>
        );
    });

    return (
        <DestinationsContainer>
            <DestinationsTitle>Your Saved Destinations</DestinationsTitle>
            {userDestinations.length === 0 && (
                <NoDestinationsMessage>
                    You have no destinations! Go and explore!
                </NoDestinationsMessage>
            )}
            {showRemoveText && (
                <MessageContainer>
                    <p>{message}</p>
                </MessageContainer>
            )}
            <ParkGrid>{userDestinationsList}</ParkGrid>
        </DestinationsContainer>
    );
};


export default DestinationsPage;