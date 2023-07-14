import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "../models/user";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();
    if (existingUsername) {
      throw createHttpError(409, "Username already taken.");
    }
    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(
        409,
        "Invalid email, please use another or log in instead."
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10); // salting

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
      state: "",
      zip: "",
      zone: {
        zone: "",
        coordinates: { lat: "", lon: "" },
        temperature_range: "",
      },
    });

    // New user created, create session.
    req.session.userId = newUser._id;

    // Send new user to FE.
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing.");
    }

    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec(); // Explicitly find email & pw too.
    if (!user) {
      throw createHttpError(401, "Invalid credentials.");
    }

    // If user found, compare pws.
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    // User exists, establish session.
    req.session.userId = user._id;
    // Return logged-in user to FE.
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  }); // Doesn't return a promise so we can't use async/await
};

interface UpdateUserProfileParams {
  userId: string;
}

interface UpdateUserProfileBody {
  state?: string;
  zip?: string;
  zone?: {
    zone: string;
    coordinates: { lat: string; lon: string };
    temperature_range: string;
  };
}

export const updateUserProfile: RequestHandler<
  UpdateUserProfileParams,
  unknown,
  UpdateUserProfileBody,
  unknown
> = async (req, res, next) => {
  const userId = req.params.userId;
  const newState = req.body.state;
  const newZone = req.body.zone;
  const newZip = req.body.zip;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      throw createHttpError(400, "Invalid user id");
    }

    if (!newState && !newZone && !newZip) {
      throw createHttpError(400, "No profile fields to update");
    }

    const existingUser = await UserModel.findById(userId).exec(); // Execute to make this a promise

    if (!existingUser) {
      throw createHttpError(404, "User not found");
    }

    if (!existingUser._id.equals(userId)) {
      throw createHttpError(401, "You cannot update this user");
    }

    existingUser.state = newState || existingUser.state;
    existingUser.zone = newZone || existingUser.zone;
    existingUser.zip = newZip || existingUser.zip;

    // Use the updated user immediately in UI.
    const updatedUser = await existingUser.save();
    // Return updated note to db.
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
