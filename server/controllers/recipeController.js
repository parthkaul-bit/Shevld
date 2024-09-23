const recipeSuggestionsService = require("../services/recipeSuggestionsService");

exports.getRecipeSuggestions = async (req, res) => {
  try {
    const suggestions = await recipeSuggestionsService.getRecipeSuggestions(
      req.params.groceryId
    );
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
