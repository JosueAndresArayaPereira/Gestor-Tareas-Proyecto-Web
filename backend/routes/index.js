import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/vista", (req, res) => {
  res.render("tareasVista");
});
router.get("/tarea", (req, res) => {
  res.render("modificar");
});

router.get("/*", (req, res) => {
  res.render("404");
});

export default router;
