module.exports = (res, { status = 200, data, otherProps = {} } = {}) => {
  res.status(status).json({
    ok: true,
    data,
    ...otherProps,
  });
};
