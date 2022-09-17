import NodeCache from 'node-cache'

/**
 * @description: Cache class initializer for caching blogs based data
 */
const BlogCache = new NodeCache({
  stdTTL: 100,
  checkperiod: 120
})

export default BlogCache
