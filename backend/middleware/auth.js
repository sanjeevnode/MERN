import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearerToken = bearerHeader.split(' ')[1];

      try {
        const check = jwt.verify(bearerToken, process.env.JWT_SECRET);
        
        req.user =  check;
        next();
      } catch (error) {
        res.status(500).json({ error })
      }

    } else {
      // If no token, return unauthorized
      res.status(401).json({ message: "No token available" }); // Unauthorized
    }
  } catch (error) {
    res.status(400).json({ error })
  }
};

export {
  verifyToken
};