import { Request, Response } from 'express';
import Products from '../../mongo/models/product';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const {
    title, desc, price, images, userId,
  } = req.body;
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

// const deleteProduct = (req: Request, res: Response): Promise<void> => { };

const getProducts = async (req: Request, res: Response): Promise<void> => {
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

const getProductsByUser = async (req: Request, res: Response): Promise<void> => {
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

export default {
  createProduct,
  getProducts,
  getProductsByUser,
};
