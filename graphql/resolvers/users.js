import User from "./../../models/User";
import {
  validateRegisterInput,
  validateLoginInput,
} from "./../../utils/validator";

export const userResolver = {
  Query: {
    async getUsers() {
      return await User.find();
    },
    async getUser(_, { id }) {
      try {
        const user = await User.findById(id);

        if (!user) {
          throw new Error("No user found with that ID.");
        }
        return user;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    async register(
      _,
      {
        registerInput: {
          name,
          email,
          gender,
          username,
          password,
          passwordConfirm,
        },
      }
    ) {
      const { valid, errors } = validateRegisterInput(
        name,
        email,
        username,
        password,
        passwordConfirm
      );

      if (!valid) {
        Object.values(errors).map((message) => {
          throw new Error(message);
        });
      }

      const userByEmail = User.findOne({ email });
      const userByUsername = User.findOne({ username });

      const [userEmail, userUsername] = await Promise.all([
        userByEmail,
        userByUsername,
      ]);

      if (userEmail) {
        throw new Error("This email address already exist. Choose another");
      }

      if (userUsername) {
        throw new Error("This username has been being taken. Choose another");
      }

      const user = await User.create({
        name,
        email,
        gender,
        username,
        password,
        passwordConfirm,
        createdAt: new Date().toISOString(),
      });

      const token = user.generateAuthToken();

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async login(_, { email, password }) {
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        Object.values(errors).map((el) => {
          throw new Error(el);
        });
      }

      const user = await User.findOne({ email });
      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new Error("Incorrect email or password");
      }

      const token = user.generateAuthToken();

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
