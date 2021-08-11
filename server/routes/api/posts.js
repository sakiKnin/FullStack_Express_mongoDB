const express = require('express')
const router = express.Router();

const mongodb = require("mongodb");

const dbConnectionUrl = "mongodb+srv://boris123:xxxx@cluster0-1q0yi.mongodb.net/test?retryWrites=true&w=majority";


// get Post

router.get('/', async (req, res) => {
	await loadPostsCollection(function(dbCollection){
			dbCollection.find().toArray(function(err, result){
				res.send(result);
			});

		});

	});

// add Post
 
router.post('/', async (req, res) => {
	await loadPostsCollection(function(dbCollection){
		 dbCollection.insertOne({
			text: req.body.text,
			createdAt: new Date()
			 
		});
	
	});
	res.status(201).send();

});

//delete Post

router.delete("/:id", async(req, res)=> {
	await loadPostsCollection(function(dbCollection){
		 
		 dbCollection.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
		
	});

	res.status(200).send();
	
});
 
// get the collection from a database 
 
async function loadPostsCollection(
    successCallback){
	mongodb.MongoClient.connect(dbConnectionUrl,function(err, dbInstance){
			const dbObject = dbInstance.db('test');
        		const dbCollection = dbObject.collection('posts');
            		console.log("[MongoDB connection] SUCCESS");
			successCallback(dbCollection);
	});

}

module.exports = router;

