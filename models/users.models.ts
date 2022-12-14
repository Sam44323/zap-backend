import { prop, getModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'

/**
 * @class User
 * @description: User model for the user collection
 */

class User {
  @prop({ required: true, type: String })
  name: string

  @prop({ required: true, type: String })
  email: string
}

const UserModel = getModelForClass(User, {
  options: {
    customName: 'User'
  }
})
export default UserModel
