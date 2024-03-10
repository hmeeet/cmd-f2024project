const mc = require("mongodb");
const sav = require("mongodb");

//import { MongoClient } from "mongodb";
//import { ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://cmdf:pesto@cmd-f2024.xdlyfm6.mongodb.net/?retryWrites=true&w=majority&appName=cmd-f2024";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mc.MongoClient(uri, {
  serverApi: {
    version: sav.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  ssl: true,
});
const cmdf = client.db("cmdf");
const termdef = cmdf.collection("term-def");

async function connectMongoDb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    await addEntryToDb("frog.png", "froggy");
    await deleteEntryFromDb("frog.png", "froggy");

    const arr =  await returnAllEntriesDb();
    console.log(arr[0]);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function addEntryToDb(image_str, comment_str) {
  //ADD AN ELEMENT TO COLLECTION
  const doc = { image: image_str, def: comment_str };
  const result = await termdef.insertOne(doc);
  console.log(
     `A document was inserted with the _id: ${result.insertedId}`,
  );
}

async function deleteEntryFromDb(image_str, comment_str) {
  //DELETE AN ELEMENT FROM COLLECTION
   const doc = { image: image_str, def: comment_str };
  const deleteResult = await termdef.deleteOne(doc);
  console.dir(deleteResult.deletedCount);
}

async function returnAllEntriesDb() {
  //RETURN ALL ELEMENTS IN COLLECTION
  var arr = [];
  const collectionElements = termdef.find();
  for await (const doc of collectionElements) {
    arr.push({
      image: doc.image,
      def: doc.def,
    });
  } 
  return arr;
}



//run().catch(console.dir);
module.exports = { connectMongoDb, addEntryToDb };


//--------------------------------------------

// import http from "http";
// import fs from "fs";

// fs.readFile('index.html', function (err, html) {
//     if (err) {
//         throw err;
//     }
//     http.createServer(function(request, response) {
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     }).listen(8000);
// });
// const express = require('express');
