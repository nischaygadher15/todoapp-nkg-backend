import "dotenv/config";

const Auth = async (req, res) => {
  try {
    let token = req.headers?.authorization.split(" ")[1];

    if (token) {
      res.status(200).json({
        isAuthenticated: true,
        data: req.user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

export default Auth;
