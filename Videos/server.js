const app = require("./src/app");
const { DB_URI } = require("./src/config/index");
const mongoose = require("mongoose");

mongoose
  .connect(DB_URI)
  .then(result=>
    app.listen(3000, () => {
      console.log("running on port 3000");
      console.log("--------------------------");
    })
  )
  .catch(err => console.log(err));
