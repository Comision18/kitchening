module.exports = (res,{message,status}) => {
  const sts = status || 500;
  const msg = message || "SERVER ERROR";
  res.status(sts).json({
    ok: false,
    error: { status: sts, message: msg },
  });
}