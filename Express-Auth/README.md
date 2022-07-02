### Note

This is an update to the earlier project done by (Zach Gollwitzer](https://github.com/zachgoll)

The link to the parent repo : https://github.com/zachgoll/express-session-authentication-starter

### Updates

1. All libraries are updated.
2. Changes done in new libraries broke the earlier code, which is patched in this repo.
3. There was no all in one app in the parent report, that just worked out of the box. Combined all in one app now.

### How to Use

- you need to setup a seperate mongo db database, locally, if you already have a server change the config -> database file db_string
  - in it you need to create a new database named "user_db"
  - inside this database execute the below code.

```
//create new database
use newDatabase;

//create a new collection "users" and add one entry in bson format.
db.users.insertOne({"username": "sampleuser", "hash": "samplehash", "salt": "samplesalt"});

//set username and password for this database
db.createUser({user : "test", pwd : "yourPasswrd", roles : ["readWrite", "dbAdmin"]});
```

- After the database is created, run the below commands.

`npm install`

`npm run dev`

- This will create a new web server on port 3000, http://localhost:3000
