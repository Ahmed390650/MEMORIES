import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 223;
    let decodedData;
    if (token && isCustomAuth) {
      //can't get token for google oauth
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.id;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
