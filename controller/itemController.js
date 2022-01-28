const productFactory = require("./handlerProductFactory");

exports.createProduct = async (req, res) => {
  try {
    let payload = {
      name: req.body.name,
      price: req.body.price,
    };
    let product = await productFactory.createProduct({
      ...payload,
    });
    res.status(201).json({
      status: true,

      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let product = await productFactory.products();
    res.status(200).json({
      status: true,
      result: product.length,

      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};
