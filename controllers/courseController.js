module.exports = {
  list: (req, res) => {
    return res.render("courses/list");
  },
  detail: (req, res) => {
    const { id } = req.params;

    return res.render("courses/detail", {
        title : "Detalle del curso",
      id,
    });
  },
};
