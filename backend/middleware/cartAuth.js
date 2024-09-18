import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Full authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token is missing or invalid!", success: false });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part after "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.body.userId = decoded.id; // Attach userId to request body
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error.message, success: false });
  }
};

export default authUser;
