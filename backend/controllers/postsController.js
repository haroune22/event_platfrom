import db from "../config/db";

export const CreatePosts = async (req, res) => {
    const user = req.user.id
    const { title, content, media, type, communityId, category } = req.body

    if(!title || !content || !media || !type || !communityId || !category){
        return res.status(400).json({ message: "all fields required"})
    }

    try {

        const [community] = await db.query(
            `SELECT * FROM community WHERE id = ?`,
            [communityId]
        )

        if (community.length === 0) {
            return res.status(404).json({ message: "community not found" });
        }
        
        await db.query(
        `INSERT INTO posts (title, content, media, type, userId, communityId, category)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, content, media, type, user, communityId, category]
        );
        
        return res.status(201).json({ message: 'post created successfully'})

    } catch (error) {
        console.log(error)
        return res.status().json({ message: 'internal message error'})
    }
};

export const GetPosts = async (req, res) => {
    const { category, title, communityId } = req.query;

    try {
        let query = `
            SELECT p.*, u.name AS creatorName
            FROM posts p
            JOIN users u ON p.createdBy = u.id
            WHERE 1=1
        `;

        const values = [];

        if (communityId) {
            query += " AND p.communityId = ?";
            values.push(`%${communityId}%`);
        }
        
        if (category) {
            query += " AND p.category = ?";
            values.push(category);
        }

        if (title) {
            query += " AND p.title LIKE ?";
            values.push(`%${title}%`);
        }


        query += " ORDER BY p.createdAt DESC";

        const [rows] = await db.query(query, values);

        return res.status(200).json({message:'posts found', posts: rows });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }

};

export const GetPostsByCat = async (req, res) => {
   const category = req.params.category;

    try {
        const [rows] = await db.query(`
            SELECT p.*, u.name AS creatorName
            FROM posts p
            JOIN users u ON c.createdBy = u.id
            WHERE p.category = ?
            ORDER BY p.createdAt DESC
        `, [category]
        );

        return res.status(200).json({ message:'communities found', posts: rows });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};


export const GetPostById = async (req, res) => {
    const user = req.user.id
    const id = req.params.id 

    if(!id){
        return res.status(400).json({ message: "post id is required" })
    }
        try {

        const [post] = await db.query(
            `SELECT * FROM posts WHERE id = ?`,
            [id]
        )

        if (post.length === 0) {
            return res.status(400).json({ message: "no post found" });
        }


        return res.status(201).json({ message: "Community created successfully", post: post[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error"});
    }
}

export const UpdatePost = async (req, res) => {
    const user = req.user.id
    try {
        
    } catch (error) {
        console.log(error)
        return res.status().json({ message: 'internal message error'})
    }

};

export const DeletePosts = async (req, res) => {
    const user = req.user.id
    try {
        
    } catch (error) {
        console.log(error)
        return res.status().json({ message: 'internal message error'})
    }

}