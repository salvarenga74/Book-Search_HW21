const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const {} = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__ -password"
        );
        return userData;
      }
    },
    users: async () => {
      return User.find().select("-__v -password");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__ -password");
    },
  },

  Mutation: {},
};

module.exports = resolvers;
