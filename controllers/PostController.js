class PostController {
  constructor(service, constants) {
    const { statusCode, errorMessage } = constants;
      this.service = service;
      // this.sequelize = sequelize;
      this.statusCode = statusCode;
      this.errorMessage = errorMessage;

      this.createPost = this.createPost.bind(this);
      this.listAllPosts = this.listAllPosts.bind(this);
  }

  async createPost(req, res) {
    // const t = await this.sequelize.transaction();
    try {
      const { title, categoryIds, content } = req.body;
      const token = req.headers.authorization;
      const payload = { title, content, categoryIds, token };
      const result = await this.service.createPost(payload);

      res.status(this.statusCode.CREATED).json(result);
    } catch (error) {
      // t.rollback();
      res.status(
        error.statusCode || this.statusCode.SERVER_ERROR,
        ).json({ message: error.message });
    }
  }

  async listAllPosts(_req, res) {
    try {
      const list = await this.service.listPosts();
      res.status(this.statusCode.OK).json(list);
    } catch (error) {
      res.status(this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  } 
}

module.exports = PostController;