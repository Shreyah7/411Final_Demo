import './App.css';
import React, {useState, useEffect, Component} from "react";
import Axios from 'axios';


/*
notes:
- make password invisible when typing : html label for textbox
- other filters for searching

next steps:
- 
*/

function App() {
  const [LoginUserEmail, setLoginUserEmail] = useState('');
  const [LoginPassword, setLoginPassword] = useState('');
  const [LoggedInUserId, setLoggedInUserId] = useState('');

  const [BookingId, setBookingId] = useState('');
  const [Buid, setBuid] = useState('');
  const [ListingId, setListingId] = useState('');
  const [BookingDates, setBookingDates] = useState('');
  const [BookingRent, setBookingRent] = useState('');
  const [BookingMessage, setBookingMessage] = useState('');
  const [PastBookingsList, setPastBookingsList] = useState([]); // SEARCH

  const [ListingAddress, setListingAddress] = useState('');
  const [ListingUid, setListingUid] = useState('');
  const [ListingSpace, setListingSpace] = useState('');
  const [AllListingReviews, setAllListingReviews] = useState([]);

  const [UserReviewCount, setUserReviewCount] = useState('');
  const [UserReviewAvg, setUserReviewAvg] = useState('');
  const [UserReviewMessage, setUserReviewMessage] = useState('');
  const [AllUserReviews, setAllUserReviews] = useState([]);

  // new listing
  //const [NewListingId, setNewListingId] = useState('');
  const [NewListingUID, setNewListingUID] = useState('');
  const [NewListingAddress, setNewListingAddress] = useState('');
  const [NewListingDates, setNewListingDates] = useState('');
  const [NewListingRent, setNewListingRent] = useState('');
  const [NewListingSpace, setNewListingSpace] = useState('');

  // new listing review
  const [ListingReviewListingId, setListingReviewListingId] = useState('');
  const [ListingReviewUID, setListingReviewUID] = useState('');
  const [ListingReviewSummary, setListingReviewSummary] = useState('');
  const [ListingReviewRating, setListingReviewRating] = useState('');

  // new user review 
  const [ReviewerId, setReviewerId] = useState('');
  const [RecipientId, setRecipientId] = useState('');
  const [UserReviewSummary, setUserReviewSummary] = useState('');
  const [UserReviewRating, setUserReviewRating] = useState('');
  
  const [UserId, setUserID] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [UserAddress, setUserAddress] = useState('');
  const [Password, setPassword] = useState('');
  const [userList, setUserList] = useState([]);

  const [mostListingsList, setMostListingsList] = useState([]); // AQ2
  //const [freq, setFreq] = useState(0);

  const [popularCitiesList, setPopularCitiesList] = useState([]); // AQ1

  const [cityListingList, setCityListingsList] = useState([]); // SEARCH
  const [Address, setAddress] = useState('temp');

  const [newPassword, setNewPassword] = useState("");

  const [ExtraPriceStatus, setExtraPriceStatus] = useState('');
  const [ExtraSpaceStatus, setExtraSpaceStatus] = useState('');
  const [ExtraRatingStatus, setExtraRatingStatus] = useState('');
  const [ExtraListerRatingStatus, setExtraListerRatingStatus] = useState('');
  const [ExtraPopularCityStatus, setExtraPopularCityStatus] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setUserList(response.data)
    })
  },[])

  // CREATE
  const submitUser = () => { 
    Axios.post('http://localhost:3002/api/insert', {
      //UserId: UserId,
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Phone: Phone,
      UserAddress: UserAddress,
      Password: Password
    });

    setUserList([
      ...userList,
      {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Phone: Phone,
        UserAddress: UserAddress,
        Password: Password
      },
    ]);
  };

  const createListing = () => { 
    Axios.post('http://localhost:3002/api/createListing', {
      //UserId: UserId,
      //NewListingId: NewListingId,
      NewListingUID: NewListingUID,
      NewListingAddress: NewListingAddress,
      NewListingDates: NewListingDates,
      NewListingRent: NewListingRent,
      NewListingSpace: NewListingSpace
    });
  };

  const createListingReview = () => { 
    Axios.post('http://localhost:3002/api/createListingReview', {
      ListingReviewListingId: ListingReviewListingId,
      ListingReviewUID: ListingReviewUID,
      ListingReviewSummary: ListingReviewSummary,
      ListingReviewRating: ListingReviewRating
    });
  }; 

  const createUserReview = () => { 
    Axios.post('http://localhost:3002/api/createUserReview', {
      ReviewerId: ReviewerId,
      RecipientId: RecipientId,
      UserReviewSummary: UserReviewSummary,
      UserReviewRating: UserReviewRating
    });
  }; 

  /*
  const login = () => { 
    Axios.post('http://localhost:3002/api/login', {
      LoginUserEmail: LoginUserEmail,
      LoginPassword: LoginPassword
    }).then(res => {
      setLoggedInUserId(res.data[0].UserId)
    });
    if (LoggedInUserId != null) {
      console.log("LOGGED IN")
      console.log(LoggedInUserId)
    }
  };
  */

  const submitBooking = () => { 
    if (BookingDates == 'Booked') {
      setBookingMessage("Sorry, this listing is booked. Please book another listing.")
      return;
    }
    Axios.post('http://localhost:3002/api/insertBooking', {
      //UserId: UserId,
      //BookingId: BookingId,
      Buid: Buid,
      ListingId: ListingId,
      BookingDates: BookingDates,
      BookingRent: BookingRent
    });
    setBookingMessage("Thanks for booking!")
  };

  // get listing
  const getListing = (ListingId) => {
    Axios.get(`http://localhost:3002/api/getListing/${ListingId}`).then((resp) => {
      //setUserList(response.data)
      //alert('UserId: ' + resp.data[0].UserId + ' First Name: ' 

      setListingId(resp.data[0].ListingId)
      setListingUid(resp.data[0].UserId)
      setListingAddress(resp.data[0].Address)
      setBookingDates(resp.data[0].Dates)
      setBookingRent(resp.data[0].Rent)
      setListingSpace(resp.data[0].Space)
    })
    getUser(ListingUid)
    getUserReview(ListingUid)
    getAllUserReviews(ListingUid)
    getAllListingReviews(ListingId)
    getListingExtraInfo(ListingId)
  }

  const getListingExtraInfo = (ListingId) => {
    Axios.get(`http://localhost:3002/api/getListingExtraInfo/${ListingId}`).then((resp) => {
      //alert(resp.data[0][0].priceStatus)
      if (resp.data[0].length > 0) {
        setExtraPriceStatus(resp.data[0][0].priceStatus)
        setExtraSpaceStatus(resp.data[0][0].spaceStatus)
        setExtraRatingStatus(resp.data[0][0].ratingStatus)
        setExtraListerRatingStatus(resp.data[0][0].listerRatingStatus)
        setExtraPopularCityStatus(resp.data[0][0].popularCityStatus)
      } 
      
    })

    if (ExtraPopularCityStatus != 'True' || ExtraPopularCityStatus == null) {
      setExtraPopularCityStatus('False') 
    }
  }
  

  // READ
  const getUser = (UserId) => {
    Axios.get(`http://localhost:3002/api/getUser/${UserId}`).then((resp) => {
      //setUserList(response.data)
      //alert('UserId: ' + resp.data[0].UserId + ' First Name: ' 

      setUserID(resp.data[0].UserId)
      setFirstName(resp.data[0].FirstName)
      setLastName(resp.data[0].LastName)
      setEmail(resp.data[0].Email)
      setPhone(resp.data[0].Phone)
      setUserAddress(resp.data[0].UserAddress)
      setPassword(resp.data[0].Password)

      /*
      return (
        <div className = "card">
          <h1> Email: {resp.data.Email} </h1>
          <p> First Name: {resp.data.FirstName}</p>
        </div>
      );
      */
    })
  }

  const getUserReview = (UserId) => {
    Axios.get(`http://localhost:3002/api/getUserReview/${UserId}`).then((resp) => {
      if (resp.data.length > 0) {
        setUserReviewCount(resp.data[0].count)
        setUserReviewAvg(resp.data[0].avg)
        setUserReviewMessage("Average rating of " + UserReviewAvg + " based on " + UserReviewCount + " reviews")

      } else {
        setUserReviewMessage("No reviews for this user.")
      }
    })
  }

  const getAllUserReviews = (UserId) => {
    Axios.get(`http://localhost:3002/api/get/getAllUserReviews/${UserId}`).then((response) => {
      setAllUserReviews(response.data)
    })
  };

  const getAllListingReviews = (ListingId) => {
    Axios.get(`http://localhost:3002/api/get/getAllListingReviews/${ListingId}`).then((response) => {
      setAllListingReviews(response.data)
    })
  };

  // UPDATE
  const updatePassword = (Email) => {
    Axios.put(`http://localhost:3002/api/update`, {
      Email: Email,
      oldPassword: Password,
      newPassword: newPassword
    });
    setNewPassword("")
  };

  // DELETE email
  const deleteUser = (Email) => {
    Axios.delete(`http://localhost:3002/api/delete/${Email}`);
  };

  const deleteUser2 = (Email) => {
    Axios.delete(`http://localhost:3002/api/delete`, {
      Email: Email,
      Password: Password
    });
  };

  // SEARCH for listings in city x
  const getListingsInCity = (Address) => {
    Axios.get(`http://localhost:3002/api/get/cityListings/${Address}`).then((response) => {
      setCityListingsList(response.data)
    })
  };

  // SEARCH for past bookings of user x
  const getPastBookings = (UserId) => {
    Axios.get(`http://localhost:3002/api/get/pastBookings/${UserId}`).then((response) => {
      setPastBookingsList(response.data)
    })
  };


  
  // AQ 1
  const getPopularCities = () => {
    Axios.get(`http://localhost:3002/api/get/popularCities/${Address}`).then((response) => {
      setPopularCitiesList(response.data)
    })


  };

  // AQ 2
  const getUsersMostListings = () => {
    Axios.get(`http://localhost:3002/api/get/mostListings/${Address}`).then((response) => {
      setMostListingsList(response.data)
    })
  };

  /*
    <div className="form">
        <h2> Login: </h2>

        <label>Enter Email</label>
        <input type="text" name="LoginUserEmail" onChange={(e) => {
          setLoginUserEmail(e.target.value)
        }}/>

        <label>Enter Password</label>
        <input type="text" name="LoginUserPassword" onChange={(e) => {
          setLoginPassword(e.target.value)
        }}/>

        <button onClick={login}> Login </button>

      </div>
  */
  
  return (
    <div className="App">
      <h1> StorageFriends </h1>
      <div className="form">

        <h2> Add User: </h2>

        <label>First Name</label>
        <input type="text" name="FirstName" onChange={(e) => {
          setFirstName(e.target.value)
        }}/>

        <label>Last Name</label>
        <input type="text" name="LastName" onChange={(e) => {
          setLastName(e.target.value)
        }}/>

        <label>Email</label>
        <input type="text" name="Email" onChange={(e) => {
          setEmail(e.target.value)
        }}/>

        <label>Phone</label>
        <input type="text" name="Phone" onChange={(e) => {
          setPhone(e.target.value)
        }}/>

        <label>User Address</label>
        <input type="text" name="UserAddress" onChange={(e) => {
          setUserAddress(e.target.value)
        }}/>

        <label>Password</label>
        <input type="text" name="Password" onChange={(e) => {
          setPassword(e.target.value)
        }}/>

        <button onClick={submitUser}> Submit</button>

      </div>

      <h1> </h1>
      <div class="wrapper">
        <div id="one">
          <h2> Users with Most Listings: </h2>
          <div>
            <button onClick={() => { getUsersMostListings() }}> Search </button>
          </div>
        </div>

        <div id="two">
          {mostListingsList.map((val) => {
            return (
              <div style={{height: '40px'}} className = "smallCard"> 
                <p> <b> Name: {val.FirstName} {val.LastName} </b> </p> 
                <p>Listings: {val.freq}</p>
              </div>
            );
            ;
          })}
        </div>
      </div>

      <h1> </h1>

      <div class="wrapper">
        <div id="one">
          <h2> Most Popular Cities: </h2>
          <div>
            <button onClick={() => { getPopularCities() }}> Search </button>
          </div>
        </div>

        <div id="two">
          {popularCitiesList.map((val) => {
            return (
              <div style={{height: '40px'}} className = "smallCard"> 
                <p> <b> Name: {val.Address}</b> </p> 
                <p>Listings: {val.freq}</p>
              </div>
            );
            ;
          })}
        </div>

      </div>


      <div class="form">
      <h2> Find Listings: </h2>
        <label> Enter City </label>
          <input type="text" name="Address" onChange={(e) => {
            setAddress(e.target.value)
        }}/>
        <button onClick={() => { getListingsInCity(Address) }}> Search </button>

        
      </div>

      {cityListingList.map((val) => {
        return (
          <div class="card">
            <h2>Listing {val.ListingId} </h2>
            <p class="rent"> Dates: {val.Dates} </p>
            <p class="rent">${val.Rent}/mo.</p>
            <p class="rent"> Space: {val.Space} ft</p>
          </div>
        );
        ;
      })}

      <h1> </h1>

      <div class="wrapper">
        <div id="three">
          <h2> Select Listing to Book: </h2>

          <label> Enter ListingId to search </label>
            <input type="text" name="ListingId" onChange={(e) => {
              setListingId(e.target.value)
          }}/>

          <button onClick={() => { getListing(ListingId) }}> Search</button>

          <h2> Additional Info: </h2>
          <p> <b>Price Status:</b> {ExtraPriceStatus} </p>
          <p> <b>Space Status:</b> {ExtraSpaceStatus} </p>
          <p> <b>Rating Status:</b> {ExtraRatingStatus} </p>
          <p> <b>Lister Rating Status:</b> {ExtraListerRatingStatus} </p>
          <p> <b>In Popular City:</b> {ExtraPopularCityStatus} </p>

        </div>

        <div id="four">
          <div class="card">
            <h2>Listing {ListingId}</h2>
            <p class="rent">city: {ListingAddress}</p>
            <p class="rent">${BookingRent}/mo.</p>
            <p class="rent"> Space: {ListingSpace} ft</p>
            <p class="rent"> Dates: {BookingDates} </p>
            <p class="rent"> Lister: {ListingUid} </p>

            <label>Enter UserId to book: </label>
            <input type="text" name="Buid" onChange={(e) => {
              setBuid(e.target.value)
            }}/>

            <h1> </h1>
            <button onClick={submitBooking}> Book</button>

            <h4> {BookingMessage} </h4>

          </div>
        </div> 

        <div id="four">
        <h2>Reviews for Listing: {ListingId}</h2>
          {AllListingReviews.map((val) => {
          return (
            <div style={{height: '70px'}} className = "smallCard"> 
              <p class="ratingHeader"> <b> Review: {val.ListingReviewId} </b> </p>
              <p class="rating">Rating: {val.Rating}</p>
              <p class="rating">Summary: {val.Summary}</p>
            </div>
          );
          ;
          })}
        </div>      
        
      </div>

      <h1> </h1>
      <div class="wrapper">
        <div id="one">
          <h2> Lister Information: </h2>
        </div>

        <div id="five">
          <h2> Contact Info: </h2>
          <p> <b>Email:</b> {Email} </p>
          <p> <b>Phone:</b> {Phone} </p>
        </div>

        <div id="two">
          <h3> {UserReviewMessage} </h3>
          {AllUserReviews.map((val) => {
          return (
            <div style={{height: '70px'}} className = "smallCard"> 
              <p class="ratingHeader"> <b> Review: {val.UserReviewId} </b> </p>
              <p class="rating">Rating: {val.Rating}</p>
              <p class="rating">Summary: {val.Summary}</p>
            </div>
          );
          ;
          })}
        </div>

      </div>
      
      <h1> </h1>
      <div class="wrapper">
        <div id="one">
          <h2> View past bookings: </h2>
          <div>
            <label> Enter UserId to search </label>
              <input type="text" name="UserId" onChange={(e) => {
                setUserID(e.target.value)
            }}/>
            <button onClick={() => { getPastBookings(UserId) }}> Search </button>
          </div>
        </div>

        <div id="two">
          {PastBookingsList.map((val) => {
          return (
            <div class="card">
              <h2>Booking {val.BookingId} </h2>
              <p class="rent">Listing: {val.ListingId}</p>
              <p class="rent">Dates: {val.Dates}</p>
              <p class="rent">${val.Rent}/mo.</p>
            </div>
          );
          ;
          })}
        </div>

      </div>

      <div class="row">
        <div class="column">
          <div className="form">
            <h2> Create Listing: </h2>
            <label> Enter your UserId </label>
              <input type="text" name="NewListingUID" onChange={(e) => {
                setNewListingUID(e.target.value)
            }}/>
            <label> Enter Listing Address </label>
              <input type="text" name="NewListingAddress" onChange={(e) => {
                setNewListingAddress(e.target.value)
            }}/>
            <label> Enter Listing Dates </label>
              <input type="text" name="NewListingDates" onChange={(e) => {
                setNewListingDates(e.target.value)
            }}/>
            <label> Enter Listing Rent </label>
              <input type="text" name="NewListingRent" onChange={(e) => {
                setNewListingRent(e.target.value)
            }}/>
            <label> Enter Listing Space </label>
              <input type="text" name="NewListingSpace" onChange={(e) => {
                setNewListingSpace(e.target.value)
            }}/>
          

            <button onClick={createListing}> Create</button>

          </div>
        </div>

        <h1> </h1>

        <div class="column">
        
          <div className="form">
            <h2> Write Listing Review: </h2>
            <label> Enter ListingId </label>
              <input type="text" name="NewListingUID" onChange={(e) => {
                setListingReviewListingId(e.target.value)
            }}/>
            <label> Enter Your UserId  </label>
              <input type="text" name="NewListingAddress" onChange={(e) => {
                setListingReviewUID(e.target.value)
            }}/>
            <label> Enter Rating Summary </label>
              <input type="text" name="NewListingDates" onChange={(e) => {
                setListingReviewSummary(e.target.value)
            }}/>
            <label> Enter Rating (1 - 5) </label>
              <input type="text" name="NewListingRent" onChange={(e) => {
                setListingReviewRating(e.target.value)
            }}/>

            <button onClick={createListingReview}> Create</button>

          </div>
        </div>
        <div class="column">
          <div className="form">
            <h2> Write User Review: </h2> 
            <label> Enter Recipient's UserId </label>
              <input type="text" name="RecipientId" onChange={(e) => {
                setRecipientId(e.target.value)
            }}/>
            <label> Enter Your UserId  </label>
              <input type="text" name="ReviewerId" onChange={(e) => {
                setReviewerId(e.target.value)
            }}/>
            <label> Enter Rating Summary </label>
              <input type="text" name="UserReviewSummary" onChange={(e) => {
                setUserReviewSummary(e.target.value)
            }}/>
            <label> Enter Rating (1 - 5) </label>
              <input type="text" name="UserReviewRating" onChange={(e) => {
                setUserReviewRating(e.target.value)
            }}/>

            <button onClick={createUserReview}> Create</button>

          </div>
        </div>
      </div>


      <h2> Change Password: </h2>
      <div className="form">
        <label> Enter your email </label>
          <input type="text" name="Email" onChange={(e) => {
            setEmail(e.target.value)
        }}/>
        <label> Enter old password </label>
          <input type="text" name="oldPassword" onChange={(e) => {
            setPassword(e.target.value)
        }}/>
        <label> Enter new password </label>
          <input type="text" name="updatePassword" onChange={(e) => {
            setNewPassword(e.target.value)
        }}/>
        <button onClick={() => { updatePassword(Email) }}> Update</button>
      </div>

      <h2> Delete User Account: </h2>
        <div className="form">
          <label> Enter Email </label>
            <input type="text" name="Email" onChange={(e) => {
              setEmail(e.target.value)
          }}/>
          <button onClick={() => { deleteUser(Email) }}> Delete</button>
      </div>

    </div>

    
  );
}

export default App;

// to run: npm start