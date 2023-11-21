//mongosh -u bicoarts -p bicoarts

db.createUser({user:'userDB',pwd:'passDB',roles:['readWrite']});
db.user.insertMany([
    {email:'webmaster@mail.com'},
    {email:'webuser@mail.com'},
]);

db.misc.deleteMany({});
db.undefinedWork.deleteMany({});
db.definedWork.deleteMany({});