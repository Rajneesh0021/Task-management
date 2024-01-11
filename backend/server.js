const app = require('./src/config/express');
const connectDB = require('./src/config/database');










// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
    await connectDB
  console.log(`Server is running on port ${PORT}`);
});
