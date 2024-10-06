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

  async inviteUserToFlat(userId, flatId) {
    const flat = await flatRepository.findFlatById(flatId);
    if (!flat) {
      throw new Error("Flat not found");
    }

    const userToInvite = await userRepository.findUserById(userId);
    if (!userToInvite) {
      throw new Error("User not found");
    }

    // Add the user to the flat's user list if not already added
    if (!flat.users.includes(userId)) {
      flat.users.push(userId);
      await flatRepository.saveFlat(flat);
      return `User ${userToInvite.name} invited to the flat`;
    } else {
      throw new Error("User is already a member of this flat");
    }
  }
}

module.exports = new FlatService();
