import { prop, getModelForClass } from '@typegoose/typegoose'

class Blogs {
  @prop({ required: true, type: String })
  title: string

  @prop({ required: true, type: String })
  description: string

  @prop({ required: true, type: String })
  author: string

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
