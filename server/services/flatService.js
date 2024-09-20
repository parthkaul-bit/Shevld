const flatRepository = require("../repositories/flatRepository");

class FlatService {
  async createFlat(flatData) {
    return await flatRepository.createFlat(flatData);
  }

  async addUserToFlat(flatId, userId) {
    const flat = await flatRepository.findFlatById(flatId);
    if (!flat) {
      throw new Error("Flat not found");
    }
    return await flatRepository.addUserToFlat(flatId, userId);
  }

  async removeUserFromFlat(flatId, userId) {
    const flat = await flatRepository.findFlatById(flatId);
    if (!flat) {
      throw new Error("Flat not found");
    }
    return await flatRepository.removeUserFromFlat(flatId, userId);
  }
}

module.exports = new FlatService();
