import express from "express";
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", sucess: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", sucess: false });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", sucess: false });
  }
};

export default adminAuth;
