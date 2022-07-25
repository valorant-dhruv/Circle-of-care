const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
    validate: {
      validator: function (val) {
        //Lets say the value is cat
        //This is a chaining function which does 3 things
        //1)split() function splits the characters of the string into an array and the array becomes ['c','a','t'];
        //2)The reverse function reverses the given array ['t','a','c']
        //3)The join function joins the elements of the array and converts it back into a string "tac"
        let arr = val.split("");
        console.log(arr);
        let another = arr.reverse();
        let reverse = another.join("");
        console.log(reverse);
        if (reverse.substring(0, 15) === "ni.ude.tasurahc") {
          return true;
        }
        return false;
      },
    },
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  profilepicture: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//Creating a model
const User = mongoose.model("User", UserSchema);

module.exports = User;
