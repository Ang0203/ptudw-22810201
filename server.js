require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();

// [Logging for Development]
if (process.env.ENV === "development") {
    app.use(morgan('dev'));
}

// [CORS]
const allowedOrigins = process.env.CLIENT_URLS 
    ? process.env.CLIENT_URLS.split(",") 
    : ["http://localhost:22700"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy error"), false);
        }
    },
    methods: ["GET", "POST"],
    credentials: true
}));

// [Handlebars]
const hbs = require("express-handlebars");
const { createStarList } = require("./helpers/handlebars-helper.js");
const { createPagination } = require("express-handlebars-paginate");

app.engine("hbs", hbs.engine({
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials"),
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
app.use(express.static(path.join(__dirname, "public")));

// [Session]
app.use(session({
    secret: "2207",
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