//This is the function for error handling

//There are different types of errors one needs to deal with in express and mongodb
//The MongoServerError is when lets say you have a phone number as unique in the schema and you try to enter a duplicate value then the
//server error occurs

//Validation error is when you have an in-built or custom validator and the validation fails
const error = (err) => {
  if ((err.name = "MongoServerError")) {
    if (err.code == 11000) {
      return err;
    }
  }

  if ((err.name = "ValidatorError")) {
    console.log(err.message);
    let str = err.message;
    var str2 = str.substring(str.indexOf(":") + 1, str.lastIndexOf(":"));
    console.log(str2);
    return str2;
  }
};

module.exports = error;
