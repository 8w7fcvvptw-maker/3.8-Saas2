import type { Response } from "express";
import { z } from "zod";
import type { AuthedRequest } from "../middleware/auth";
import * as itemsService from "../services/items.service";

const createSchema = z.object({
  title: z.string().min(1, "Title is required").max(500),
});

export async function list(req: AuthedRequest, res: Response): Promise<void> {
  try {
    const token = req.accessToken!;
    const items = await itemsService.listItems(token);
    res.json({ items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to load items" });
  }
}

export async function create(req: AuthedRequest, res: Response): Promise<void> {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Validation failed",
      details: parsed.error.flatten(),
    });
    return;
  }

  try {
    const token = req.accessToken!;
    const item = await itemsService.createItem(token, parsed.data);
    res.status(201).json({ item });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create item" });
  }
}

export async function remove(req: AuthedRequest, res: Response): Promise<void> {
  const id = req.params.id;
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  try {
    const token = req.accessToken!;
    await itemsService.deleteItem(token, id);
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete item" });
  }
}
