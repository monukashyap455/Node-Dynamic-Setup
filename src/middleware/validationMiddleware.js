const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res
      .status(400)
      .send({ statusCode: 400, message: error.details[0].message.replace(/['"]/g, '') });
    return;
  }
};

export default validateSchema;
