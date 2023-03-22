const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.getSingleUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const user = await UserModel.findById(req.params.id)
      .select("-password")
      .exec();
    return res.send(user);
  } catch (err) {
    console.log("ID unknown : " + err);
    res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.addWidget = async (req, res) => {
  // Récupérer les données du widget à partir du corps de la requête
  const widgetData = req.body.widget;

  // Vérifier que l'utilisateur existe dans la base de données
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ajouter le widget à l'utilisateur et sauvegarder les modifications
    user.widget.push(widgetData);
    await user.save();
    res.status(200).json({ message: "Widget added successfully" });
  } catch (err) {
    console.log("Error adding widget : " + err);
    res.status(500).json({ message: err });
  }
};

module.exports.deleteWidget = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const widgetId = req.params.widgetId;
    const widgetIndex = user.widget.findIndex(
      (widget) => widget.id === widgetId
    );

    if (widgetIndex === -1) {
      return res.status(404).json({ message: "Widget not found" });
    }

    user.widget.splice(widgetIndex, 1);
    await user.save();
    res.status(200).json({ message: "Widget deleted successfully" });
  } catch (err) {
    console.log("Error deleting widget : " + err);
    res.status(500).json({ message: err });
  }
};

module.exports.getUserWidgets = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    const user = await UserModel.findById(req.params.id)
      .select("widget")
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.widget);
  } catch (err) {
    console.log("Error fetching widgets : " + err);
    res.status(500).json({ message: err });
  }
};

module.exports.updateWidget = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  const widgetId = req.params.widgetId;
  const updatedWidgetData = req.body.widget;

  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const widgetIndex = user.widget.findIndex(
      (widget) => widget.id === widgetId
    );

    if (widgetIndex === -1) {
      return res.status(404).json({ message: "Widget not found" });
    }

    // Mettre à jour les données du widget avec les nouvelles données
    user.widget[widgetIndex] = {
      ...user.widget[widgetIndex],
      ...updatedWidgetData,
    };

    await user.save();
    res.status(200).json({ message: "Widget updated successfully" });
  } catch (err) {
    console.log("Error updating widget : " + err);
    res.status(500).json({ message: err });
  }
};
