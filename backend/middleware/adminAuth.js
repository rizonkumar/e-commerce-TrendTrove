import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};
export default adminAuth;
