function checkAuth(req, res, next) {
  const userIsAuthenticated = true; // Simplification, implémentez votre logique d'authentification ici

  if (userIsAuthenticated) {
    next();
  } else {
    res.status(401).send({ error: "User not authenticated" });
  }
}

module.exports = checkAuth;
