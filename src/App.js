import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from "axios"

import './App.css';

import Destinations from "./components/pages/Destinations"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import SignUp from "./components/pages/SignUp"
import ParkDetails from "./components/pages/ParkDetails"
import Profile from "./components/pages/Profile"
import Layout from './components/partials/Layout'

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  const [parksInfo, setParksInfo] = useState([]);
  const [userDestinations, setUserDestinations] = useState([])
  const [message, setMessage] = useState('');

  //  Pings the api and stores the response data in the parksInfo State
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/nps`
        );
        setParksInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // if the user navigates away form the page, we will log them back in
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, [])

  // pings mongoDB to set state of usersDestinations
  // ****** i think this one needs to be rewritten to move the async into a named function. i think this is the one causing the error
  useEffect(() => {
    const findDestination = async () => {
      try {
        const token = localStorage.getItem('jwt')
        const options = {
          headers: {
            'Authorization': token
          }
        }
        const foundDestinations = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations`, options)
        setUserDestinations(foundDestinations.data)
      } catch (error) {
        console.log(error)
      }
    }
    findDestination()
  }, [])

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }

  }

  // ON CLICK ADD TO DESTINATIONS (page details, )
  const handleAddDestinationClick = async (park) => {
    const parkId = { parkId: park.id };
    const token = localStorage.getItem('jwt');
    const options = {
      headers: {
        'Authorization': token
      }
    }
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations`, parkId, options);
    const updatedDestinations = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations`, options);
    setUserDestinations(updatedDestinations.data)
  }

  // ONCLICK ADD TO EXPERIENCES 
  const handleAddExperienceClick = async (nationalPark) => {
    const newExperience = {
      park: {
        location: nationalPark.fullName,
        image: nationalPark.images[0].url
      }
    }
    const token = localStorage.getItem('jwt');
    const options = {
      headers: {
        'Authorization': token
      }
    }
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/${currentUser._id}`, newExperience, options);
  }

  // remove destination function
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

  return (
    <div className="App">
      <div className="content">
        <Router>
          <Layout
            handleLogout={handleLogout}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          >
            <Routes>
              <Route
                path='/'
                element={<Home parksInfo={parksInfo}
                  handleAddDestinationClick={handleAddDestinationClick}
                  userDestinations={userDestinations}
                  removeDestination={removeDestination}
                  currentUser={currentUser}
                />}
              />
              <Route
                path='/parks/:parkname/:id'
                element={<ParkDetails
                  parksInfo={parksInfo}
                  handleAddDestinationClick={handleAddDestinationClick}
                  handleAddExperienceClick={handleAddExperienceClick}
                  setUserDestinations={setUserDestinations}
                  userDestinations={userDestinations}
                  removeDestination={removeDestination}
                  currentUser={currentUser}
                />}
              />
              <Route
                path='/users/register'
                element={<SignUp currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              />
              <Route
                path='/users/login'
                element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              />
              <Route
                path='/users/profile'
                element={<Profile handleLogout={handleLogout} currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
                />}
              />
              <Route
                path='/destinations'
                element={<Destinations parksInfo={parksInfo}
                  userDestinations={userDestinations}
                  handleAddExperienceClick={handleAddExperienceClick}
                  setUserDestinations={setUserDestinations}
                  removeDestination={removeDestination}
                />}
              />
            </Routes>
          </Layout>
        </Router>

      </div>
    </div>
  );
}

export default App;