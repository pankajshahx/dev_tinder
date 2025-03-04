const validateProfileEditData = (req) => {
  const ALLOWED_DATA = [
    "firstName",
    "lastName",
    "age",
    "skills",
    "gender",
    "photoUrl",
    "about",
  ];

  const isAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_DATA.includes(key)
  );

  return isAllowed;
};

module.exports = {
  validateProfileEditData,
};
