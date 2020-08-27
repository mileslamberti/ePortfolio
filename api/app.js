// @ts-check
//  <ImportConfiguration>
var CosmosClient = require('@azure/cosmos').CosmosClient;
var config = require('./config');
var express = require('express');
var testAPIRouter = require('./routes/testAPI');
var path = require('path');
var logger = require('morgan');
var cors = require("cors");
var dbContext = require("./data/databaseContext");

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//  </ImportConfiguration>

//  <DefineNewItem>
const newItem = {
  id: "12123",
  category: "Science",
  name: "foc",
  description: "python",
  isComplete: false
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use("/testAPI", testAPIRouter);



//  </DefineNewItem>

async function main() {
  
  const client = new CosmosClient({
    endpoint: config.host,
    key: config.authKey
  })

  

  const database = client.database(config.databaseId);
  const container = database.container(config.containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await dbContext.create(client, config.databaseId, config.containerId);

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
