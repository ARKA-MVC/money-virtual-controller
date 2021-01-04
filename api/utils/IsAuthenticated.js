const IsAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new Error("not authenticated"));
  }
};

export default IsAuthenticated;