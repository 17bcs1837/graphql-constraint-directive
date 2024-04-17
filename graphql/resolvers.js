// Dummy user data
let users = [
  {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    age: 25,
    createdAt: "2024-04-16",
    updatedAt: "2024-04-16",
  },
  {
    id: 2,
    username: "user2",
    email: "user2@example.com",
    age: 30,
    createdAt: "2024-04-16",
    updatedAt: "2024-04-16",
  },
];

const userResolvers = {
  Query: {
    getUser: (_, { id }) => users.find((user) => user.id === id),
    getUsers: () => users,
  },
  Mutation: {
    createUser: (_, { username, email, age }) => {
      const newUser = {
        id: String(users.length + 1),
        username,
        email,
        age,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      users.push(newUser);
      return newUser;
    },
    updateUser: (_, { id, username, email, age }) => {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        if (username) users[index].username = username;
        if (email) users[index].email = email;
        if (age) users[index].age = age;
        users[index].updatedAt = new Date().toISOString();
        return users[index];
      }
      return null;
    },
    deleteUser: (_, { id }) => {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        return deletedUser[0];
      }
      return null;
    },
  },
};

module.exports = userResolvers;
