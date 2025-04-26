require("dotenv").config();
const express = require("express");
const session = require("express-session");
const redisStore = require("connect-redis").default;
const { createClient } = require("redis");
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect().catch(console.error);
const app = express();

// [Logging for Development]
if (process.env.ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan('dev'));
}

// [Handlebars]
const hbs = require("express-handlebars");
const { createStarList } = require("./helpers/handlebars-helper.js");
const { createPagination } = require("express-handlebars-paginate");

app.engine("hbs", hbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: "hbs",
    defaultLayout: "layout",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        createStarList,
        createPagination
    }
}));
app.set("view engine", "hbs");

// [Static files]
app.use(express.static("public"));

// [Session]
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new redisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000,
    }
}));

// [Read body from POST]
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// [Middleware - Initiate Cart]
app.use((req, res, next) => {
    let Cart = require("./controllers/cart.js");
    req.session.cart = new Cart(req.session.cart ? req.session.cart : {});
    res.locals.quantity = req.session.cart.quantity;

    next();
});

// [Routes]
app.use("/cart", require("./routes/cart-router.js"))
app.use("/products", require("./routes/products-router.js"));
app.use("/users", require("./routes/users-router.js"));
app.use("/", require("./routes/index-router.js"));

// [Error Handler]
app.use((error, req, res, next) => {
    res.render("error", {
        status: error.status || 500,
        message: error.message || "Unknown Error"
    })
});

// [Run server]
const PORT = process.env.PORT || 22700;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})