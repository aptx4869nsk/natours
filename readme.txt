200 - success
201 - create
204 - delete  --- No Content
400 - bad request
401 - unauthorize
403 - forbidden  -- 禁止进入的

/// 
mailsac.com 

//// tenporary
BEM architecture
pk.eyJ1IjoiYXB0eDQ4Njluc2siLCJhIjoiY2t4MGQ1eGhoMDhnaDJzczZkdzk5OXV0bCJ9.rk_Aj-X0CNOJ3BF9JAZ-9g
///


### Git ###
git --version
git config --global user.name "aptx4869nsk"
git config --global user.email "nangsanthinzarlwin@gmail.com"

git init 
git add -A

####
node ./dev-data/data/import-dev-data.js --import
- before run above node, first command the userSchema.pre('save') in userModel, or not will occur 'passwordConfirm' error

### My Postman Documentation
https://documenter.getpostman.com/view/18253772/UVR4Lp5B

// "NODE_ENV" is not recognized as an internal or external command
https://stackoverflow.com/questions/11928013/node-env-is-not-recognized-as-an-internal-or-external-command-operable-comman

// Mongo --- collection(table) , document(row)
use natours-test
db.tours.insertOne({name: "The Forest Hiker", price: 297, rating: 4.7})
db.tours.find()
show dbs
show collections
quit()

// CRUD
---- Creating Documents
db.tours.insertMany([{name: "The Sea Explorer", price: 497, rating: 4.8}, {name: "The Snow Adventurer", price: 997, rating: 4.9}])

---- Querying(Reading) Documents
db.tours.find()
db.tours.find({name: "The Forest Hiker"})
db.tours.find({price: {$lte: 500}})  // price <= 500
db.tours.find({price: {$lt:500}, rating: {$gte: 4.8}})  // price < 500 and rating >= 4.8
db.tours.find({ $or: [ {price: {$gt: 500}}, {rating: {$gte: 4.8}} ] })  // price < 500 or rating >= 4.8
db.tours.find({ $or: [ {price: {$gt: 500}}, {rating: {$gte: 4.8}} ] }, {name: 1})  // price < 500 or rating >= 4.8  ---- select name

---- Updating Documents
db.tours.updateOne({name: "The Snow Adventurer"}, {$set: {price: 597}})  // update price to 597 where name "The Snow Adventurer"
db.tours.updateMany({price: {$gt:500}, rating: ${gte: 4.8}}, {$set: {premium: true}})
// db.tours.replaceOne, db.tours.replaceMany

---- Deleting Documents
db.tours.deltemany({rating: {$lt: 4.8}})  // delete where rating < 4.8

// My Mongo Shell
mongo "mongodb+srv://cluster0.ndek5.mongodb.net/myFirstDatabase" --username nang

// Model Name first letter use UpperCase

// MVC
Model ------ Business Logic
Controller  ------ Application Logic
View  ------ Presentation Logic

// Four Middleware in Mongoose
1. Document Middleware
2. Query Middleware
3. Aggregation Middleware
4. Model Middleware

// NDB Installation on Windows
https://stackoverflow.com/questions/57879150/how-can-i-solve-error-gypgyp-errerr-find-vsfind-vs-msvs-version-not-set-from-c

npm i -g windows-build-tools
npm install --g --production windows-build-tools    // install 'Vistual C++ build tools' from ' Vistual Studio Instalelr'
npm config set msvs_version 2017 --global
npm config list / npm config ls -l
npm i -g ndb

