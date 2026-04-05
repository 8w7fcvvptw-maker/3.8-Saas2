import { Router } from "express";
import * as itemsController from "../controllers/items.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, itemsController.list);
router.post("/", requireAuth, itemsController.create);
router.delete("/:id", requireAuth, itemsController.remove);

export default router;
