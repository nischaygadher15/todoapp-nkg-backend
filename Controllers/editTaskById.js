const editTaskById = (req, res) => {
  let { taskId } = req.params;

  console.log(taskId);
  res.status(200).json({ id: taskId });
};

export default editTaskById;
