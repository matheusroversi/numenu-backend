import express from "express";
import authenticate from "./middlewares/authenticate";
import {
  authStrategy,
  authenticationHandler,
  authenticationCallbackHandler,
  currentUser,
  login,
  logout,
  isUserLoggedIn,
} from "./services/auth";

const router = express.Router();

const routes = {
  loginPath: "/",
  getMe: "/me",
  getUser: "/user",
  logoutPath: "/auth/logout",
  listCategoriesPath: "/categories",
  listProductsPath: "/products",
  loginStrategyPath: `/auth/${authStrategy}`,
  loginStrategyCallbackPath: `/auth/${authStrategy}/callback`,
  homePath: "https://localhost:3003/",
};

router.get(routes.loginPath, (req, res) => {
  if (isUserLoggedIn(req)) {
    return res.redirect(routes.homePath);
  }

  return res.render("index", { error: req.query.error });
});

router.get(routes.listCategoriesPath, (req, res) => {
  res.json(req.app.locals.categoriesDetail);
});

router.get(routes.listProductsPath, (req, res) => {
  res.json(req.app.locals.productsDetail);
});

router.get(routes.getMe, (req, res) => {
  res.json(req.app.locals.meDetail);
});

router.get(routes.getUser, authenticate(), (req, res) => {
  res.json(currentUser(req));
});

router.get(routes.loginStrategyPath, authenticationHandler());

router.get(
  routes.loginStrategyCallbackPath,
  authenticationCallbackHandler({
    successRedirect: routes.homePath,
    failureRedirect: routes.loginPath,
  })
);

router.get(routes.logoutPath, (req, res) => {
  logout(req);
  res.redirect(routes.homePath);
});

export default router;
