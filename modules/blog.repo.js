const Blog = require("./blog.model");

exports.isExist = async (filter) => {
  let blog = await Blog.findOne(filter);
  if (blog) {
    return {
      code: 200,
      record: blog,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "blog is not found",
    };
  }
};

exports.list = async (filter) => {
  let records = await Blog.find(filter);
  return {
    code: 200,
    records,
    success: true,
  };
};

exports.create = async (form) => {
  let newBlog = new Blog(form)
    await newBlog.save();
    return {
      success: true,
      code: 201,
      record: newBlog,
    };
  } 


exports.update = async (id, form) => {
  await Blog.findByIdAndUpdate({_id:id}, form);
  let blogUpdate = await this.isExist({ _id: id });
  if (user.success) {
    return {
      code: 201,
      success: true,
      record: blogUpdate.record,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "User doesn't exist",
    };
  }
};

exports.get = async (id) => {
  if (filter) {
    let record = await Blog.find({_id:id});
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: true,
      error: "Blog Id is required",
    };
  }
};

exports.remove = async (id) => {
  const blog = await this.isExist({ _id: id });
  if (id && blog.success) {
    await Blog.findByIdAndDelete({ _id: id });
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "blog doesn't exist",
    };
  }
};
