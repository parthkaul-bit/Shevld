const Flat = require("../models/flatModel");

class FlatRepository {
  async createFlat(flatData) {
    const flat = new Flat(flatData);
    return await flat.save();
  }

  async findFlatById(flatId) {
    return await Flat.findById(flatId);
  }

  async addUserToFlat(flatId, userId) {
    return await Flat.findByIdAndUpdate(
      flatId,
      { $addToSet: { members: userId } },
      { new: true }
    );
  }

  async removeUserFromFlat(flatId, userId) {
    return await Flat.findByIdAndUpdate(
      flatId,
      { $pull: { members: userId } },
      { new: true }
    );
  }
}

module.exports = new FlatRepository();
