import mongoose from 'mongoose'
import { Password } from '../services/password'

// <UserDoc> is generic syntax in TS which means UserDoc is an interface
// an interface to describe the properties required to create a new user
// this is used for Typescript checking 
interface UserAttrs {
  email: string;
  password: string;
}

// an interface describes what the entire User collection looks like 
// take the existing mongoose.Model interface and add the buid function
interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs) : UserDoc;
}

// an interface describes what properties a single user has in User Document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserDoc>({
  email: {
    type: String,
    required: true,
    
    
  },
  password: {
    type: String,
    required: true,
    
  }  
}, 
  {
    toJSON: { // toJSON method where doc is the user instance (UserDoc) and ret is what returns from it
      transform(doc, ret)
        {
          ret.id = ret._id // remap _id to id
          delete ret._id // delete _id property from the object
          delete ret.password
          delete ret.__v 
         }
      },
    timestamps: true
  }
)

userSchema.pre('save', async function(done) {
  // this refers to UserDoc
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})
// custom function build into model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

//const User = mongoose.model('User', userSchema) 
// hold down Ctrl + click on model to see the generic thing
// <UserDoc, UserModel> is TS generic type for the argument to pass in function model which is UserDoc 
// and UserModel is the return type of function model 
const User = mongoose.model<UserDoc, UserModel>('User', userSchema)
// replace this block by using static property
// since TS and Mongoose don't cooperate well
// we will not use new User({email: 'test@test.com', password: 'password'})
// we use a function to create a user
// export const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs) // pass in an object which contains email and password
// }

// test it
// const user = User.build({email: 'test@test.com', password:'123'})
// user.email  
// user.password

export default User
//export { User, buildUser }
