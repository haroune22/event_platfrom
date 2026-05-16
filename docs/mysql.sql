
USE event_platform;

CREATE TABLE users (
	id CHAR(36) primary KEY DEFAULT (UUID()),
    email VARCHAR(255) unique NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    profilePic VARCHAR(500),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community (
	id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
	name VARCHAR(100) NOT NULL UNIQUE,
	description VARCHAR(500) NOT NULL,
    createdBy CHAR(36),
	FOREIGN KEY(createdBy) REFERENCES users(id) ON DELETE SET NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    index(createdBy)
);

CREATE TABLE community_members (
    userId CHAR(36) NOT NULL,
    communityId CHAR(36) NOT NULL,
    joinedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (userId, communityId),
    
	FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY(communityId) REFERENCES community(id) ON DELETE CASCADE,
    
    INDEX(userId),
    INDEX(communityId)
);

CREATE TABLE posts (
	id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
	title VARCHAR(100) NOT NULL,
	content VARCHAR(500) NOT NULL,
    media VARCHAR(500),
    type ENUM('normal', 'event', 'education') NOT NULL,
    userId CHAR(36) NOT NULL,
	communityId CHAR(36),
	FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY(communityId) REFERENCES community(id) ON DELETE SET NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
	INDEX(userId),
    INDEX(communityId)
);

CREATE TABLE comments (
	id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
	postId CHAR(36) NOT NULL,
	userId CHAR(36) NOT NULL,
	text TEXT NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,

	INDEX (postId),
	INDEX (userId)
);

CREATE TABLE events (
	id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
	postId CHAR(36) NOT NULL,

	eventDate DATETIME NOT NULL,
	maxParticipants INT,

	FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);


CREATE TABLE event_attendees (
	eventId CHAR(36) NOT NULL,
	userId CHAR(36) NOT NULL,
	joinedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (eventId, userId),

	FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE saved_posts (
	userId CHAR(36) NOT NULL,
	postId CHAR(36) NOT NULL,
	savedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (userId, postId),

	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);


CREATE TABLE learning_resources (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    postId CHAR(36) NOT NULL,
    userId CHAR(36) NOT NULL,
    difficulty ENUM('beginner', 'intermediate', 'advanced'),
    externalLink VARCHAR(500),

    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

use event_platform;

ALTER TABLE posts
ADD category ENUM('sports',
 'gaming',
 'technology',
 'fitness',
 'education',
 'movies') NOT NULL;
 
ALTER TABLE community
ADD category ENUM('sports',
 'gaming',
 'technology',
 'fitness',
 'education',
 'movies') NOT NULL;
 
 ALTER TABLE community_members
 ADD role ENUM('owner', 'moderator', 'member') DEFAULT 'member';
 
ALTER TABLE events
ADD column userId char(36);
 
ALTER TABLE events
ADD FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE;

 CREATE TABLE user_interests (
	id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
	userId CHAR(36) NOT NULL,
	category ENUM('sports', 'gaming', 'technology', 'fitness', 'education', 'movies') NOT NULL,
    points INT default(0),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,

	INDEX (userId)
);
use event_platform;

ALTER TABLE posts ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE community ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


ALTER TABLE events
MODIFY maxParticipants INT DEFAULT(20);

SELECT * FROM comments;


