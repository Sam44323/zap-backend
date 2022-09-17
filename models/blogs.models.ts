import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class Blogs {
  @prop({ required: true, type: String })
  title: string

  @prop({ required: true, type: String })
  description: string

  @prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  author: Ref<mongoose.Schema.Types.ObjectId>

  @prop({ required: true, type: Date, default: Date.now })
  createdAt: Date
}

const BlogsModel = getModelForClass(Blogs, {
  options: {
    customName: 'Blogs'
  }
})
// mongoose.model('Blogs')
export default BlogsModel
