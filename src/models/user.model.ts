import mongoose from 'mongoose';

const TABLE_NAME = "User";

interface IUser {
  userName: string
  password: string
  firstName: string
  lastName: string
}

interface UserDoc extends mongoose.Document {
  userName: string
  password: string
}

interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc
}

const userScheme = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
}, { timestamps: true })

userScheme.statics.create = async (attr: IUser) => {
  return new User(attr).save()
}

const User = mongoose.model<UserDoc, userModelInterface>(TABLE_NAME, userScheme)

export { IUser, User }