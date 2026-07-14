import db from "../config/db.js";
import { randomUUID } from "crypto";
import { getUserInterest, updateUserInterest } from "../utils/userInterest.js";

export const CreateCommunity = async (req, res) => {
  const user = req.user.id;
  const { name, description, category, image, banner } = req.body;

  if (!name || !description || !category || !image) {
    return res.status(400).json({ message: "all fields required" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM community WHERE name = ?", [
      name,
    ]);

    if (rows.length > 0) {
      return res
        .status(400)
        .json({ message: "community with this name already exists " });
    }

    const communityId = randomUUID();

    await db.query(
      "INSERT INTO community (id, name, description, image, category, createdBy) VALUES (?, ?, ?, ?, ?, ?)",
      [communityId, name, description, image, category, user],
    );

    await db.query(
      "INSERT INTO community_members (userId, communityId, role) VALUES (?, ?, ?)",
      [user, communityId, "owner"],
    );

    await updateUserInterest(user, category, 5);

    return res.status(201).json({ message: "Community created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const GetCommunities = async (req, res) => {
  const user = req.user.id;
  const { category, name } = req.query;

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

  const offset = (page - 1) * limit;

  try {
    let query = `
            SELECT c.*, u.name AS creatorName, u.profilePic
            FROM community c
            JOIN users u ON c.createdBy = u.id
            WHERE 1=1
        `;

    const values = [];

    if (category) {
      query += " AND c.category = ?";
      values.push(category);
    }

    if (name) {
      query += " AND c.name LIKE ?";
      values.push(`%${name}%`);
    }

    if (!name && !category) {
      const categories = await getUserInterest(user);

      if (categories.length > 0) {
        query += ` AND c.category IN (${categories.map(() => "?").join(",")})`;
        values.push(...categories);
      }
    }

    query += " ORDER BY c.createdAt DESC";
    query += ` LIMIT ? OFFSET ?`;

    values.push(limit, offset);

    const [rows] = await db.query(query, values);

    return res
      .status(200)
      .json({ message: "communities found", communities: rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const GetCommunitiesByCat = async (req, res) => {
  const category = req.params.category;

  try {
    const [rows] = await db.query(
      `SELECT c.*, u.name AS creatorName, u.profilePic
             FROM community c
             JOIN users u ON c.createdBy = u.id
             WHERE c.category = ?
             ORDER BY c.createdAt DESC`,
      [category],
    );

    return res
      .status(200)
      .json({ message: "communities found", communities: rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const GetCommunityById = async (req, res) => {
  const user = req.user.id;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "community id is required" });
  }
  try {
    const [community] = await db.query(
      `SELECT c.*, u.name AS creatorName, u.profilePic
            FROM community c
            JOIN users u ON c.createdBy = u.id
            WHERE id = ?`,
      [id],
    );

    if (community.length === 0) {
      return res.status(400).json({ message: "no community found" });
    }

    const [members] = await db.query(
      `SELECT cm.role, cm.userId, u.id, u.name, u.email, u.profilePic
            FROM community_members cm
            JOIN users u ON cm.userId = u.id
            WHERE cm.communityId = ?`,
      [id],
    );

    const currentUser = members.find((m) => m.userId === user);

    const currentUserRole = currentUser?.role ?? null;

    return res.status(201).json({
      message: "Community found successfully",
      community: community[0],
      currentUserRole,
      members,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const UpdateCommunity = async (req, res) => {
  const user = req.user.id;
  const id = req.params.id;
  const { name, description, category, image, banner } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM community WHERE id = ?", [id]);

    const [isMember] = await db.query(
      `
            SELECT * 
            FROM community_members
            WHERE communityId = ? AND userId = ?
            `,
      [id, user],
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "community does not exist " });
    }

    if (isMember.length === 0) {
      return res.status(400).json({ message: "you are not even a member" });
    }

    if (isMember[0].role !== "moderator") {
      return res
        .status(403)
        .json({ message: "you are not authorized to delete this community" });
    }

    if (rows[0].createdBy !== user) {
      return res
        .status(403)
        .json({ message: "you are not authorized to delete this community" });
    }

    const updates = {
      name,
      description,
      category,
      image,
      banner,
    };

    const fields = [];
    const values = [];

    for (const key in updates) {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    }

    if (fields.length > 0) {
      values.push(id);
      await db.query(
        `UPDATE community 
                SET ${fields.join(", ")}
                WHERE id = ?`,
        values,
      );
    }

    const [updatedCommunity] = await db.query(
      `SELECT * FROM community WHERE id = ?`,
      [id],
    );

    return res.status(201).json({
      message: "Community updated successfully",
      rows: updatedCommunity[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const DeleteCommunity = async (req, res) => {
  const user = req.user.id;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "community id is required" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM community WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "community does not exist " });
    }

    if (rows[0].createdBy !== user) {
      return res
        .status(403)
        .json({ message: "you are not authorized to delete this community" });
    }

    await db.query("DELETE FROM community WHERE id = ?", [id]);

    await updateUserInterest(user, rows[0].category, -5);

    return res.status(201).json({ message: "Community deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
