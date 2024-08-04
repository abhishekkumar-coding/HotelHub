const mongoose = require("mongoose")
const initData = require("./data.js")
const listing = require("../Models/Listings.js")

const MONGO_URL = 'mongodb://127.0.0.1:27017/wondulust';

main().then(() => {
    console.log('connencted to DB')
})
    .catch((err) => {
        console.log('Error found', err)
    })
async function main() {
    await mongoose.connect(MONGO_URL)
}

const initDB = async ()=>{
    await listing.deleteMany({})
    await listing.insertMany(initData.data)
    console.log('Data intialized successfully')
}

initDB()