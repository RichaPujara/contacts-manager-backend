const app = require("./app");
const port = process.env.PORT || 4000;

// Start the app at port configured in environment variable or default at 4000
app.listen(port, () => {
  console.log(`Contact Management App listening on port ${port}`);
});
