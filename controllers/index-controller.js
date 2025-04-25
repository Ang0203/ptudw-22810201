const controller = {};
const models = require("../models");

controller.showHomePage = async (req, res) => {
    // Featured Products
    const featuredProducts = await models.Product.findAll({
        attributes: ["id", "name", "imagePath", "stars", "price", "oldPrice"],
        order: [["stars", "DESC"]],
        limit: 10
    });
    res.locals.featuredProducts = featuredProducts;
    
    // Recent Products
    const recentProducts = await models.Product.findAll({
        attributes: ["id", "name", "imagePath", "stars", "price", "oldPrice", "createdAt"],
        order: [["createdAt", "DESC"]],
        limit: 10
    });
    res.locals.recentProducts = recentProducts;

    // Categories
    const categories = await models.Category.findAll();
    const secondArray = categories.splice(2, 2);
    const thirdArray = categories.splice(1, 1);
    res.locals.categoryArray = {
        categories,
        secondArray,
        thirdArray
    }

    // Brands
    const brands = await models.Brand.findAll();
    res.locals.brands = brands;

    res.render("index");
};

controller.showPage = (req, res, next) => {
    const pages = [
        "cart", "checkout", 
        "contact", "login", 
        "my-account", "product-detail", 
        "product-list", "wishlist"
    ];
    const page = req.params.page;

    if (pages.includes(page)){
        return res.render(page);
    };
    
    const error = new Error();
    error.status = 404;
    error.message = "Page Not Found";
    next(error);
};

module.exports = controller;