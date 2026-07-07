import db from "../config/db.js";
import { randomUUID } from "crypto";

import {
  getUserInterest,
  notInterested,
  updateUserInterest,
} from "../utils/userInterest.js";

export const CreatePosts = async (req, res) => {
  const user = req.user.id;

  const {
    title,
    content,
    media,
    type,
    communityId,
    category,
    externalLink,
    difficulty,
  } = req.body;

  if (!title || !content || !type || !category) {
    return res.status(400).json({
      message: "all fields required",
    });
  }

  try {
    if (communityId) {
      const [community] = await db.query(
        `SELECT * FROM community WHERE id = ?`,
        [communityId],
      );

      if (community.length === 0) {
        return res.status(404).json({ message: "community not found" });
      }
    }

    const postId = randomUUID();

    await db.query(
      `INSERT INTO posts
            (id, title, content, media, type, userId, communityId, category)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [postId, title, content, media, type, user, communityId, category],
    );

    if (type === "education" && (externalLink || difficulty)) {
      await db.query(
        `INSERT INTO learning_resources
                (postId, userId, difficulty, externalLink)
                VALUES (?, ?, ?, ?)`,
        [postId, user, difficulty || null, externalLink || null],
      );
    }

    await updateUserInterest(user, category, 5);

    return res.status(201).json({ message: "post created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server  error" });
  }
};

export const GetPosts = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

  const offset = (page - 1) * limit;

  try {
    let query = `
          SELECT
            p.*,
            u.name AS creatorName,
            e.id AS eventId,
            ed.id AS educationId
          FROM posts p
          JOIN users u ON p.userId = u.id
          LEFT JOIN events e ON e.postId = p.id
          LEFT JOIN learning_resources ed ON ed.postId = p.id
          ORDER BY p.createdAt DESC
        `;

    const values = [];

    query += ` LIMIT ? OFFSET ?`;

    values.push(limit, offset);

    const [rows] = await db.query(query, values);

    return res.status(200).json({ message: "posts found", posts: rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getFeedPosts = async (req, res) => {
  const user = req.user.id;
  const { category, title, communityId } = req.query;

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
  const type = req.query.type || null;
  const offset = (page - 1) * limit;

  try {
    let query = `
          SELECT
            p.*,
            u.name AS creatorName,
            e.id AS eventId,
            ed.id AS educationId
          FROM posts p
          JOIN users u ON p.userId = u.id
          LEFT JOIN events e ON e.postId = p.id
          LEFT JOIN learning_resources ed ON ed.postId = p.id
          WHERE 1=1
        `;

    const values = [];

    if (communityId) {
      query += " AND p.communityId = ?";
      values.push(communityId);
    }

    if (category) {
      query += " AND p.category = ?";
      values.push(category);
    }

    if (title) {
      query += " AND p.title LIKE ?";
      values.push(`%${title}%`);
    }

    if (type) {
      query += " AND p.type = ?";
      values.push(type);
    }

    if (!title && !category && !communityId) {
      const categories = await getUserInterest(user);
      //   console.log(categories);
      if (categories.length > 0) {
        query += ` AND p.category IN (${categories.map(() => "?").join(",")})`;

        values.push(...categories);
      }
    }

    query += " ORDER BY p.createdAt DESC";

    query += ` LIMIT ? OFFSET ?`;

    values.push(limit, offset);

    const [rows] = await db.query(query, values);

    return res.status(200).json({
      message: "posts found",
      data: {
        posts: rows,
        page,
        limit,
        totalPages: Math.ceil(rows.length / limit),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const GetPostsByCat = async (req, res) => {
  const user = req.user.id;
  const category = req.params.category;

  try {
    const [rows] = await db.query(
      `
            SELECT p.*, u.name AS creatorName
            FROM posts p
            JOIN users u ON p.userId = u.id
            WHERE p.category = ?
            ORDER BY p.createdAt DESC
        `,
      [category],
    );

    return res.status(200).json({ message: "posts found", posts: rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const GetPostById = async (req, res) => {
  const user = req.user.id;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "post id is required" });
  }
  try {
    const [post] = await db.query(
      `SELECT p.*, u.profilePic, u.name AS creatorName, ed.id AS educationId, ed.externalLink, ed.difficulty
            FROM posts p
            RIGHT JOIN users u ON p.userId = u.id
            LEFT JOIN learning_resources ed ON ed.postId = p.id
            WHERE p.id = ?`,
      [id],
    );

    if (post.length === 0) {
      return res.status(400).json({ message: "no post found" });
    }

    return res
      .status(201)
      .json({ message: "Community created successfully", post: post[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const UpdatePost = async (req, res) => {
  const user = req.user.id;
  const id = req.params.id;

  const { title, content, media, category } = req.body;

  try {
    const [post] = await db.query(`SELECT * FROM posts WHERE id = ?`, [id]);

    if (post.length === 0) {
      return res.status(404).json({ message: "post not found" });
    }

    if (post[0].userId !== user) {
      return res
        .status(400)
        .json({ message: "not authorized to update this post" });
    }

    const updates = {
      title,
      content,
      media,
      category,
    };

    const values = [];
    const fields = [];

    for (const key in updates) {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    }

    if (fields.length > 0) {
      values.push(post[0].id);

      await db.query(
        `
                UPDATE posts
                SET ${fields.join(", ")}
                WHERE id = ?`,
        values,
      );
    }

    const [updatedPost] = await db.query(`SELECT * FROM posts WHERE id = ?`, [
      id,
    ]);

    return res
      .status(200)
      .json({ message: "post updated successfully", post: updatedPost[0] });
  } catch (error) {
    console.log(error);
    return res.status().json({ message: "internal server  error" });
  }
};

export const DeletePosts = async (req, res) => {
  const user = req.user.id;
  const id = req.params.id;

  try {
    const [post] = await db.query(`SELECT * FROM posts WHERE id = ?`, [id]);

    if (post.length === 0) {
      return res.status(404).json({ message: "post not found" });
    }

    if (post[0].userId !== user) {
      return res
        .status(400)
        .json({ message: "not authorized to delete this post" });
    }

    await db.query(`DELETE FROM posts WHERE id = ?`, [id]);

    return res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status().json({ message: "internal server  error" });
  }
};

export const NotInterested = async (req, res) => {
  const user = req.user.id;
  const postId = req.params.id;

  try {
    const [post] = await db.query(`SELECT * FROM posts WHERE id = ?`, [id]);

    if (post.length === 0) {
      return res.status(404).json({ message: "post not found" });
    }

    if (post[0].userId === user) {
      return res.status(400).json({
        message: "the owner can not be interested in the post he created",
      });
    }

    await notInterested(user, post[0].category);

    return res.status(200).json({ message: "user interest updated" });
  } catch (error) {
    console.log(error);
    return res.status().json({ message: "internal server  error" });
  }
};
