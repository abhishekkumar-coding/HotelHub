const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./Models/Listings.js");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")


const MONGO_URL = 'mongodb://127.0.0.1:27017/wondulust';

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to DB');
    } catch (err) {
        console.error('Error connecting to DB:', err);
    }
}

main();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname, "/Public")))

app.get("/", (req, res) => {
    res.send("Hi! I am the root server");
});

// Index Route
app.get("/listings", async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render("listings/index.ejs", { listings });
    } catch (err) {
        console.error("Error fetching listings:", err);
        res.status(500).send("Error fetching listings");
    }
});

// new Route

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
})

// Show Route
app.get("/listings/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/show.ejs", { listing });
    } catch (err) {
        console.error("Error fetching listing data:", err);
        res.status(500).send("Error fetching listing data");
    }
});

// create Route
app.post("/listings", async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    } catch (error) {
        console.error("Error creating new listing:", error);
        res.status(500).send("Error creating new listing");
    }
});


// edit Route
app.get("/listings/:id/edit", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/edit.ejs", { listing });
    } catch (error) {
        console.error("Error fetching listing data for editing:", error);
        res.status(500).send("Error fetching listing data for editing");
    }
});


// Update Route
app.put("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndUpdate(id, {...req.body.listing});
        res.redirect("/listings");
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).send("Error updating listing");
    }
});
//Delete Route
app.delete("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing)
    res.redirect("/listings")
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
