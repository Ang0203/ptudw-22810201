const controller = {};
const models = require("../models");

controller.show = (req, res) => {
    res.locals.cart = req.session.cart.getCart();
    
    res.render("cart");
};

controller.add = async (req, res) => {    
    let id = isNaN(req.body.id) ? 0 : parseInt(req.body.id);
    let quantity = isNaN(req.body.quantity) ? 0 : parseInt(req.body.quantity);

    let product = await models.Product.findByPk(id);
    if (product && quantity > 0){
        req.session.cart.add(product, quantity);
    }
    
    res.json({ quantity: req.session.cart.quantity });
};

controller.update = (req, res) => {
    let id = isNaN(req.body.id) ? 0 : parseInt(req.body.id);
    let quantity = isNaN(req.body.quantity) ? 0 : parseInt(req.body.quantity);

    if (quantity > 0){
        let updatedItem = req.session.cart.update(id, quantity);

        return res.json({ 
            item: updatedItem,
            quantity: req.session.cart.quantity,
            subtotal: req.session.cart.subtotal,
            total: req.session.cart.total
        });
    };
    
    res.sendStatus(204).end();
};

controller.remove = (req, res) => {
    let id = isNaN(req.body.id) ? 0 : parseInt(req.body.id);
    req.session.cart.remove(id);

    res.json({
        quantity: req.session.cart.quantity,
        subtotal: req.session.cart.subtotal,
        total: req.session.cart.total,
    });
};

controller.clear = (req, res) => {
    req.session.cart.clear();
    res.sendStatus(200).end();
};

module.exports = controller;