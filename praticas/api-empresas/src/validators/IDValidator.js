const mongoose = require('mongoose');

function validObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  validObjectId
};
