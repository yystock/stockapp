
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

module.exports = {
  async getUserById(id) {
    if (!id) throw 'You must provide an id to search for';
    const userCollection = await users();
    const user = await userCollection.findOne({_id: id});
    if (!user) throw 'No player with that id';
    return user;
  },
  async register(id){
    if (!id) throw 'You must provide an id to search for';
    const userCollection = await users();
    const newUser = {
      _id: id,
      account: 1000000,
      balance: 1000000,
    }
    const userInfo = await userCollection.insertOne(newUser);
    if (!userInfo) throw 'No player with that id';
    return userInfo;
  },
  
  async updateAccount(id, updatedData) {
    const usersCollection = await users();
   
    try {
      const updated = await usersCollection.updateOne({_id: id,}, { $set: {balance: updatedData} });
      return true;
    } catch (e) {
      console.log(e);
      return 'No player with that id';
    }
  },

  async resetAccount(id) {
    const usersCollection = await users();
   
    try {
      const updated = await usersCollection.updateOne({_id: id,}, { $set: {account: 1000000, balance:1000000} });
      return true;
    } catch (e) {
      console.log(e);
      return 'error reseting the account';
    }
  },
}