import db from "../config/db.js";

export const UpdateEducation = async (req, res) => {
  const user = req.user.id;
  const id = req.params.id;

  const { title, content, media, category, difficulty, externalLink } =
    req.body;

  try {
    const [post] = await db.query(
      `
      SELECT *
      FROM posts
      WHERE id = ?
      `,
      [id],
    );

    if (post.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post[0].userId !== user) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const postUpdates = {
      title,
      content,
      media,
      category,
    };

    const postFields = [];
    const postValues = [];

    for (const key in postUpdates) {
      if (postUpdates[key] !== undefined) {
        postFields.push(`${key} = ?`);
        postValues.push(postUpdates[key]);
      }
    }

    if (postFields.length > 0) {
      postValues.push(id);

      await db.query(
        `
        UPDATE posts
        SET ${postFields.join(", ")}
        WHERE id = ?
        `,
        postValues,
      );
    }

    const resourceUpdates = {
      difficulty,
      externalLink,
    };

    const resourceFields = [];
    const resourceValues = [];

    for (const key in resourceUpdates) {
      if (resourceUpdates[key] !== undefined) {
        resourceFields.push(`${key} = ?`);
        resourceValues.push(resourceUpdates[key]);
      }
    }

    if (resourceFields.length > 0) {
      resourceValues.push(id);

      await db.query(
        `
        UPDATE learning_resources
        SET ${resourceFields.join(", ")}
        WHERE postId = ?
        `,
        resourceValues,
      );
    }

    const [updatedEducation] = await db.query(
      `
        SELECT p.*, lr.difficulty, lr.externalLink
        FROM posts p
        JOIN learning_resources lr
        ON lr.postId = p.id
        WHERE p.id = ?
      `,
      [id],
    );

        return res.status(200).json({
        message: "Education updated successfully",
        education: updatedEducation[0],
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error" });
  }
};

export const DeleteEducation = async (req, res) => {
  const user = req.user.id;
  const id = req.params.id;

  try {
    const [post] = await db.query(
      `
      SELECT *
      FROM posts
      WHERE id = ?
      `,
      [id]
    );

    if (post.length === 0) {
      return res.status(404).json({ message: "Education not found" });
    }

    if (post[0].userId !== user) {
      return res.status(403).json({message: "Not authorized" });
    }

    await db.query(
      `
      DELETE FROM learning_resources
      WHERE postId = ?
      `,
      [id]
    );

    await db.query(
      `
      DELETE FROM posts
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({ message: "Education deleted successfully"});
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error"});
  }
};