//FILENAME : AboutME.js
const mongoose = require("mongoose");
const AboutMeSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  inspirations: {
    type: String,
    required: true
  },
  jobs: {
    type: String,
    required: true
  },
  experiences: {
    type: String,
    required: true
  }
});
// export model user with UserSchema
module.exports = mongoose.model("aboutMe", AboutMeSchema);