// @ts-check
//  <ImportConfiguration>
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require("cors");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var testAPIRouter = require('./routes/welcome');
var user1 = require('./routes/user');
var InitiateMongoServer = require("./config/db");
//  CosmosDB requirements keeping here just for now

// var CosmosClient = require('@azure/cosmos').CosmosClient;
// var config = require('./config');
// var dbContext = require("./data/databaseContext");


var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use("/user", user1);
app.use(logger('dev'))
app.use("/welcome", testAPIRouter);



//  </DefineNewItem>

async function main() {
  InitiateMongoServer();


}




main();
module.exports = app
  // </CreateClientObjectDatabaseContainer>
  
 // try {
    // <QueryItems>
   //console.log(`Querying container: Items`);

   //// query to return all items
   //const querySpec = {
   //  query: "SELECT * from c"
   //};
   //
   //// read all items in the Items container
   //const { resources: items } = await container.items
   //  .query(querySpec)
   //  .fetchAll();

   //items.forEach(item => {
   //  console.log(`${item.id} - ${item.description}`);
   //});
    // </QueryItems>
    
    // <CreateItem>
    /** Create new item
     * newItem is defined at the top of this file
     */
  //  const { resource: createdItem } = await container.items.create(newItem);
  //  
  //  console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);
    // </CreateItem>
    
    // <UpdateItem>
    /** Update item
     * Pull the id and partition key value from the newly created item.
     * Update the isComplete field to true.
     */
  //  const { id, category } = createdItem;

  //  createdItem.isComplete = true;
    // </UpdateItem>
    
    // <DeleteItem>    
    /**
     * Delete item
     * Pass the id and partition key value to delete the item
     */
  //  const { resource: result } = await container.item(id, category).delete();
  //  console.log(`Deleted item with id: ${id}`);
    // </DeleteItem>  
    
//  } catch (err) {
//    console.log(err.message);
//  }
//}
