export const updateUserInterest = async (userId, category, points) => {
      const [interest] = await db.query(
        `SELECT * FROM user_interests
         WHERE userId = ? AND category = ?`,
        [userId, category]
    );

    if (interest.length > 0) {
        await db.query(
            `UPDATE user_interests
             SET points = points + ?
             WHERE userId = ? AND category = ?`,
            [points, userId, category]
        );

    } else {
        await db.query(
            `INSERT INTO user_interests (userId, category, points)
             VALUES (?, ?, ?)`,
            [userId, category, points]
        );
    }
}