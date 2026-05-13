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


export const notInterested = async (userId, category) => {

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
            [-5, userId, category]
        );

    } else {
        await db.query(
            `INSERT INTO user_interests (userId, category, points)
             VALUES (?, ?, ?)`,
            [userId, category, -5]
        );
    }
}

export const getUserInterest = async (userId) => {
    const [interests] = await db.query(
        `SELECT category
        FROM user_interests
        WHERE userId = ?
        ORDER BY points DESC
        LIMIT 3`,
        [userId]
    );

    if (interests.length === 0) {
        return [];
    }
    
    return interests.map(i => i.category);
}