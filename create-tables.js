require("./models").sequelize.sync({force: true})
    .then(() => {
        console.log("Database synced");
    }).catch((error) => {
        console.log(`Error syncing database: ${error.message}`);
    })