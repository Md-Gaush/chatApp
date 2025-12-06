import jwt from "jsonwebtoken";

export const isAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
   
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "User Not Authenticated.",
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(404).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        message:"Auth error"
    })
  }
};
