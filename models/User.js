import mongoose from "mongoose";
import bcrypt, { hash, genSalt, compare } from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving

userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    next();
  };

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

// Compare password method

userSchema.methods.matchPassword = async function (enterPassword) {
  return await compare(enterPassword, this.password);
};
const User = mongoose.model("userData", userSchema);

export default User;
