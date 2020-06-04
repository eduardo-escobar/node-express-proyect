const Products = require('../../mongo/models/product');

const createProduct = async (req, res) => {
  const { title, desc, price, images, userId } = req.body;
  try {
    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId,
    });
    console.log(product);
    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

const deleteProduct = (req, res) => {};

const getProducts = async (req, res) => {
  try {
    const product = await Products.find({
      price: { $lt: 15 },
    })
      .populate('user', 'username email data role')
      .select('title desc price');

    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

const getProductsByUser = async (req, res) => {
  try {
    const product = await Products.find({ user: req.params.userId })
      .populate('user', 'username email data role')
      .select('title desc price');

    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsByUser,
};
