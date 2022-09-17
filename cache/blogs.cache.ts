import NodeCache from 'node-cache'

const BlogCache = new NodeCache({
  stdTTL: 100,
  checkperiod: 120
})

export default BlogCache
