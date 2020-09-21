const app = require("./src/app");
const { DB_URI } = require("./src/config/index");


app.listen(3000, () => {
      console.log("running on port 3000");
      console.log("--------------------------");
});
  