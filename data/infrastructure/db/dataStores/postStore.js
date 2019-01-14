const getPaginationOptions = options => ({
  lean: true,
  page: options.page,
  limit: options.limit,
  sort: { created: -1 },
});


const getQueryObject = (options) => {
  const queries = {
    userId: options.userId,
  };
  if (options.publisher) {
    queries.publisher = {
      $regex: new RegExp(options.publisher),
      $options: 'i',
    };
  }
  return queries;
};


const postStore = {
  async list(options) {
    const { Post: postSchema } = this.getSchemas();
    return postSchema.paginate(getQueryObject(options), getPaginationOptions(options));
  },
  async create(options) {
    const { Post: postSchema } = this.getSchemas();
    return postSchema({
      userId: options.userId,
      imageUrl: options.imageUrl,
      description: options.description,
      publisher: options.publisher,
    }).save();
  },
  async get(options) {
    const { Post: postSchema } = this.getSchemas();
    return postSchema.findOne({ userId: options.userId, _id: options.postId }).lean().exec();
  },
};


const create = ({ Post }) => Object.assign(Object.create(postStore), {
  getSchemas() {
    return {
      Post,
    };
  },
});

module.exports.create = create;