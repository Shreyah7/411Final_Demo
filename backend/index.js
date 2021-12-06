const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password:' ',
  database:' ',
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM Users";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        //console.log(result);
    });
});

app.get("/api/getUser/:UserId", (require, response) => {
    const UserId = require.params.UserId;
    console.log(UserId)

    const sqlSelect = "SELECT * FROM Users WHERE UserId = ?";
    db.query(sqlSelect, UserId, (err, result) => {
        response.send(result);
        console.log(result);
    })
});

// app.post("/api/insertBooking", (require, response) => {
app.post("/api/login", (require, response) => {
    //const NewListingId = require.body.NewListingId;
    const LoginUserEmail = require.body.LoginUserEmail;
    const LoginPassword = require.body.LoginPassword;
    console.log(LoginUserEmail)

    const sqlSelect = "SELECT * FROM Users WHERE UserEmail = ? AND Password = ?";
    db.query(sqlSelect, LoginUserEmail, LoginPassword, (err, result) => {
        response.send(result);
        console.log(result);
    })
});

app.get("/api/getListing/:ListingId", (require, response) => {
    const ListingId = require.params.ListingId;
    //console.log(ListingId)
    //console.log("inside")

    const sqlSelect = "SELECT * FROM Listings WHERE ListingId = ?";
    db.query(sqlSelect, ListingId, (err, result) => {
        response.send(result);
        console.log(result);
    })
});

app.get("/api/getListingExtraInfo/:ListingId", (require, response) => {
    const ListingId = require.params.ListingId;
    console.log(ListingId)
    //console.log("inside")

    const sqlSelect = "call storage_friends.Filter(?)";
    db.query(sqlSelect, ListingId, (err, result) => {
        response.send(result);
        console.log(result);
    })
});

app.post("/api/insertBooking", (require, response) => {
    //const UserId = require.body.UserId;
    const Buid = require.body.Buid;
    const ListingId = require.body.ListingId;
    const BookingDates = require.body.BookingDates;
    const BookingRent = require.body.BookingRent;

    const sqlInsert = "INSERT INTO Bookings (UserId, ListingId, Dates, Rent) VALUES (?,?,?,?)";
    console.log(Buid, ListingId, BookingDates, BookingRent);
    db.query(sqlInsert, [Buid, ListingId, BookingDates, BookingRent], (err, result) => {
        //console.log(err);
        console.log(result);
    })
});

app.post("/api/insert", (require, response) => {
    //const UserId = require.body.UserId;
    const FirstName = require.body.FirstName;
    const LastName = require.body.LastName;
    const Email = require.body.Email;
    const Phone = require.body.Phone;
    const UserAddress = require.body.UserAddress;
    const Password = require.body.Password;

    const sqlInsert = "INSERT INTO Users (FirstName, LastName, Email, Phone, UserAddress, Password) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [FirstName, LastName, Email, Phone, UserAddress, Password], (err, result) => {
        //console.log(err);
        console.log(result);
    })
});

app.post("/api/createListing", (require, response) => {
    //const NewListingId = require.body.NewListingId;
    const NewListingUID = require.body.NewListingUID;
    const NewListingAddress = require.body.NewListingAddress;
    const NewListingDates = require.body.NewListingDates;
    const NewListingRent = require.body.NewListingRent;
    const NewListingSpace = require.body.NewListingSpace;
    console.log(NewListingAddress)

    const sqlInsert = "INSERT INTO Listings (UserId, Address, Dates, Rent, Space) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [NewListingUID, NewListingAddress, NewListingDates, NewListingRent, NewListingSpace], (err, result) => {
        //console.log(err);
        console.log(result);
    })
});

app.post("/api/createListingReview", (require, response) => {
    //const NewListingId = require.body.NewListingId;
    const ListingReviewListingId = require.body.ListingReviewListingId;
    const ListingReviewUID = require.body.ListingReviewUID;
    const ListingReviewSummary = require.body.ListingReviewSummary;
    const ListingReviewRating = require.body.ListingReviewRating;

    const sqlInsert = "INSERT INTO ListingReviews (ListingId, UserId, Summary, Rating) VALUES (?,?,?,?)";
    db.query(sqlInsert, [ListingReviewListingId, ListingReviewUID, ListingReviewSummary, ListingReviewRating], (err, result) => {
        //console.log(err);
        console.log(result);
    })
});

app.post("/api/createUserReview", (require, response) => {
    //const NewListingId = require.body.NewListingId;
    const ReviewerId = require.body.ReviewerId;
    const RecipientId = require.body.RecipientId;
    const UserReviewSummary = require.body.UserReviewSummary;
    const UserReviewRating = require.body.UserReviewRating;

    const sqlInsert = "INSERT INTO UserReviews (ReviewerId, RecipientId, Summary, Rating) VALUES (?,?,?,?)";
    db.query(sqlInsert, [ReviewerId, RecipientId, UserReviewSummary, UserReviewRating], (err, result) => {
        //console.log(err);
        console.log(result);
    })
});

app.delete("/api/delete/:Email", (require, response) => {
    const Email = require.params.Email;
    //const Password = require.body.Password;
    console.log(Email)
    //console.log(Password)

    const sqlDelete = "DELETE FROM Users WHERE Email = ?";
    db.query(sqlDelete, Email, (err, result) => {
        console.log(result);
    })

    /*
    const sqlDelete = "DELETE FROM Users WHERE Email = ? AND Password = ?";
    db.query(sqlDelete, [Email, Password], (err, result) => {
        console.log(result);
    })

    <label> Enter Password </label>
            <input type="text" name="delPassword" onChange={(e) => {
              setPassword(e.target.value)
          }}/>
    */
});

app.put("/api/update/", (require, response) => {
    const Email = require.body.Email;
    const newPassword = require.body.newPassword;
    const oldPassword = require.body.oldPassword;
    console.log(Email)
    console.log(newPassword)
    console.log(oldPassword)

    const sqlUpdate = "UPDATE Users SET Password = ? where Email = ? and Password = ?";
    db.query(sqlUpdate, [newPassword, Email, oldPassword], (err, result) => {
        console.log(result);
    })
});

// AQ 1
app.get("/api/get/popularCities/:Address", (require, response) => {
    
    const sqlAQ1= " \
    SELECT Address, COUNT(*) as freq \
    FROM Listings JOIN ListingReviews USING (ListingId) \
    WHERE Rating > 3 \
    GROUP BY Address \
    ORDER BY freq DESC \
    LIMIT 25";

    db.query(sqlAQ1, (err, result) => {
        response.send(result);
        console.log(result);
    });
});

// AQ 2
app.get("/api/get/mostListings/:Address", (require, response) => {
    //const Address = require.params.Address; // BUG: NOT LETTING ME REMOVE ADDRESS
    //console.log(Address)

    const sqlAQ2= " \
    SELECT FirstName, LastName, freq \
    FROM Users  \
    JOIN (SELECT UserId, COUNT(*) as freq \
    FROM Users NATURAL JOIN Listings \
    GROUP BY UserId) AS NewTable USING (UserId) \
    ORDER BY freq DESC \
    LIMIT 10";

    db.query(sqlAQ2, (err, result) => {
        response.send(result);
        console.log(result);
    });
});

app.get("/api/get/cityListings/:Address", (require, response) => {
    const Address = require.params.Address;
    //console.log(Address)

    const searchQuery= "SELECT * FROM Listings WHERE Address = ?;";

    db.query(searchQuery, Address, (err, result) => {
        response.send(result);
        console.log(result);
    });
});

app.get("/api/get/pastBookings/:UserId", (require, response) => {
    const UserId = require.params.UserId;
    //console.log(Address)

    const searchQuery= "SELECT * FROM Bookings WHERE UserId = ?;";

    db.query(searchQuery, UserId, (err, result) => {
        response.send(result);
        console.log(result);
    });
});

app.get("/api/getUserReview/:UserId", (require, response) => {
    const UserId = require.params.UserId;
    console.log(UserId)

    const sqlSelect = "SELECT RecipientId, count(Rating) AS count, avg(Rating) AS avg FROM UserReviews WHERE RecipientId = ? GROUP BY RecipientId;";
    db.query(sqlSelect, UserId, (err, result) => {
        response.send(result);
        console.log(result);
    })
});

app.get("/api/get/getAllUserReviews/:UserId", (require, response) => {
    const UserId = require.params.UserId;
    //console.log(Address)

    const searchQuery= "SELECT * FROM UserReviews WHERE RecipientId = ?;";

    db.query(searchQuery, UserId, (err, result) => {
        response.send(result);
        console.log(result);
    });
});

app.get("/api/get/getAllListingReviews/:ListingId", (require, response) => {
    const ListingId = require.params.ListingId;
    //console.log(Address)

    const searchQuery= "SELECT * FROM ListingReviews WHERE ListingId = ?;";

    db.query(searchQuery, ListingId, (err, result) => {
        response.send(result);
        console.log(result);
    });
});



/*
app.get('/', (require, response) => {
    const sqlInsert = `INSERT INTO test1 (tempID, tempName, tempVal) VALUES ('7', 'baby', 'keem');`;
    db.query(sqlInsert, (err, result) => {
        response.send("yessir");
        if (err) throw err;
        console.log(result);
    })
})
*/

/*
app.get('/', (require, response) => {
    const sqlInsert = "INSERT INTO Users (UserId, FirstName, LastName, Email, Phone, UserAddress, Password) \
        VALUES ('7000', 'travis', 'scott', 'cactusjack@hotmail.com', '7054821738', 'LA california', 'autotune');";
    db.query(sqlInsert, (err, result) => {
        response.send("plz work");
        if (err) throw err;
        console.log(result);
    })
})
*/


app.listen(3002, () => {
    console.log("running on port 3002");
})

// node index.js
// npm run devStart