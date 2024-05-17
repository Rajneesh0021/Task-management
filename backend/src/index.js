const app = require('./config/express');
const connectDB = require('./config/database');










const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
    await connectDB
  console.log(`Server is running on port ${PORT}`);
});
