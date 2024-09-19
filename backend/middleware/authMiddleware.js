import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("AuthMiddleware: Checking token");
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("AuthMiddleware: No token provided");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This should include the user's ID
    console.log("AuthMiddleware: Token verified, user:", decoded);
    next();
  } catch (error) {
    console.error("AuthMiddleware: Token verification failed", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
