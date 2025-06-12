//Add to our NodeJS Rest api project Product model. Products consists from fields: category, title, price, array of warehouses where product is located within its quantity, field which contains all specifications of product. Add Rest method for to retrieve all records, one record by id, add new product
 //and update product specifications. Add search method, which returns products with pagination and can filter product list by title of product. 



 const warehouseSchema = new mongoose.Schema({
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    quantity: { type: Number, required: true }
  }, { _id: false });
  
  const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    warehouses: [warehouseSchema], 
    specifications: { type: mongoose.Schema.Types.Mixed } 
  }, {
    collection: 'products',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeoutMS: 30000
    }
  });
  
  const Product = mongoose.model('Product', productSchema);
  
  module.exports = Product;