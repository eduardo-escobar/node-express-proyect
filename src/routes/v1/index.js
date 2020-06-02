const productRoutes = require('./products-routes');
const userRoutes = require('./user-routes');

module.exports = app =>{
    app.use("/api/v1/user",userRoutes);
    app.use("/api/v1/product",productRoutes);
}