const app = require('./src/config/express');
const connectDB = require('./src/config/database');










const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
    await connectDB
  console.log(`Server is running on port ${PORT}`);
});
