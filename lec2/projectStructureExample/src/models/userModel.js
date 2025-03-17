class UserModel {
    constructor() {
      this.users = [
        { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
        { id: 2, name: "Jane Doe", email: "jane@example.com", age: 25 }
      ];
    }
  
    getAllUsers() {
      return this.users;
    }
  
    createUser(user) {
      const newUser = {
        id: this.users.length + 1,
        ...user
      };
      this.users.push(newUser);
      return newUser;
    }
  }
  
  module.exports = new UserModel();