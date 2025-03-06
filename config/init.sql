-- Activer l'extension pour la génération d'UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS expertise;
DROP TABLE IF EXISTS leaderboard;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100)        NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    profile_picture TEXT,
    points          INT              DEFAULT 0
);

CREATE TABLE articles
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title      VARCHAR(255) NOT NULL,
    content    TEXT         NOT NULL,
    author_id  UUID         NOT NULL,
    topic      VARCHAR(100),
    upvotes    INT              DEFAULT 0,
    downvotes  INT              DEFAULT 0,
    created_at TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE votes
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL,
    article_id UUID NOT NULL,
    vote_value INT CHECK (vote_value IN (1, -1)), -- 1 = Upvote, -1 = Downvote
    created_at TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE
);

CREATE TABLE expertise
(
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID         NOT NULL,
    topic            VARCHAR(100) NOT NULL,
    reputation_score INT              DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE leaderboard
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID UNIQUE NOT NULL,
    total_points INT              DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO users (id, name, email, profile_picture, points)
VALUES ('a8a9c05f-0f8a-4e2f-84b2-1db78a4e0c69', 'Alice Dupont', 'alice@example.com', 'https://example.com/alice.jpg',
        50),
       ('9c42d9a1-fd33-45f0-a5e8-9f7293bf6d22', 'Bob Martin', 'bob@example.com', 'https://example.com/bob.jpg', 30),
       ('d3a9f7f3-16b2-4b0f-bb71-7e8fa203a1b3', 'Charlie Leclerc', 'charlie@example.com',
        'https://example.com/charlie.jpg', 20);

INSERT INTO articles (id, title, content, author_id, topic, upvotes, downvotes)
VALUES ('11111111-1111-1111-1111-111111111111', 'Introduction à Docker', 'Contenu de l’article sur Docker...',
        'a8a9c05f-0f8a-4e2f-84b2-1db78a4e0c69', 'DevOps', 5, 1),
       ('22222222-2222-2222-2222-222222222222', 'Les bases de Node.js', 'Un guide pour débuter avec Node.js...',
        '9c42d9a1-fd33-45f0-a5e8-9f7293bf6d22', 'Backend', 3, 0),
       ('33333333-3333-3333-3333-333333333333', 'Maîtriser Angular', 'Techniques avancées pour Angular...',
        'd3a9f7f3-16b2-4b0f-bb71-7e8fa203a1b3', 'Frontend', 4, 2);

INSERT INTO votes (id, user_id, article_id, vote_value)
VALUES ('44444444-4444-4444-4444-444444444444', '9c42d9a1-fd33-45f0-a5e8-9f7293bf6d22',
        '11111111-1111-1111-1111-111111111111', 1),
       ('55555555-5555-5555-5555-555555555555', 'd3a9f7f3-16b2-4b0f-bb71-7e8fa203a1b3',
        '11111111-1111-1111-1111-111111111111', -1),
       ('66666666-6666-6666-6666-666666666666', 'a8a9c05f-0f8a-4e2f-84b2-1db78a4e0c69',
        '22222222-2222-2222-2222-222222222222', 1),
       ('77777777-7777-7777-7777-777777777777', '9c42d9a1-fd33-45f0-a5e8-9f7293bf6d22',
        '33333333-3333-3333-3333-333333333333', 1);

INSERT INTO expertise (id, user_id, topic, reputation_score)
VALUES ('88888888-8888-8888-8888-888888888888', 'a8a9c05f-0f8a-4e2f-84b2-1db78a4e0c69', 'DevOps', 80),
       ('99999999-9999-9999-9999-999999999999', '9c42d9a1-fd33-45f0-a5e8-9f7293bf6d22', 'Design pattern', 60),
       ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'd3a9f7f3-16b2-4b0f-bb71-7e8fa203a1b3', 'Architecture', 70);

INSERT INTO leaderboard (id, user_id, total_points)
VALUES ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'a8a9c05f-0f8a-4e2f-84b2-1db78a4e0c69', 50),
       ('cccccccc-cccc-cccc-cccc-cccccccccccc', '9c42d9a1-fd33-45f0-a5e8-9f7293bf6d22', 30),
       ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'd3a9f7f3-16b2-4b0f-bb71-7e8fa203a1b3', 20);