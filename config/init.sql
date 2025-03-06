CREATE
EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS expertise;
DROP TABLE IF EXISTS domains;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100)        NOT NULL,
    password            VARCHAR(50)        NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    points          INT              DEFAULT 0
);

CREATE TABLE articles
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title      VARCHAR(255) NOT NULL,
    content    TEXT         NOT NULL,
    author_id  UUID         NOT NULL,
    tags       TEXT[] DEFAULT '{}',
    upvotes    INT              DEFAULT 0,
    downvotes  INT              DEFAULT 0,
    created_at TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE domains
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id  UUID         NOT NULL,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE,
    CONSTRAINT unique_article_domain UNIQUE (article_id, name)
);

CREATE TABLE votes
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL,
    article_id UUID NOT NULL,
    vote_value INT CHECK (vote_value IN (1, -1)),
    created_at TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE
);

CREATE TABLE expertise
(
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL,
    domain_id        UUID NOT NULL,
    reputation_score INT              DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (domain_id) REFERENCES domains (id) ON DELETE CASCADE
);

INSERT INTO users (id, name, password, email, points)
VALUES ('00000000-0000-0000-0000-000000000001', 'Alice Dupont', 'password', 'alice@example.com',
        50),
       ('00000000-0000-0000-0000-000000000002', 'Bob Martin', 'password', 'bob@example.com', 30),
       ('00000000-0000-0000-0000-000000000003', 'Charlie Leclerc', 'password', 'charlie@example.com', 20);

INSERT INTO articles (id, title, content, author_id, tags, upvotes, downvotes)
VALUES ('10000000-0000-0000-0000-000000000001', 'Introduction à Docker', 'Contenu de l’article sur Docker...',
        '00000000-0000-0000-0000-000000000001', ARRAY['docker', 'installation', 'basics'], 5, 1),
       ('10000000-0000-0000-0000-000000000002', 'Les bases de Node.js', 'Un guide pour débuter avec Node.js...',
        '00000000-0000-0000-0000-000000000002', ARRAY['nodejs', 'javascript', 'installation'], 3, 0),
       ('10000000-0000-0000-0000-000000000003', 'Maîtriser Angular', 'Techniques avancées pour Angular...',
        '00000000-0000-0000-0000-000000000003', ARRAY['angular', 'framework', 'advanced'], 4, 2);

INSERT INTO domains (id, article_id, name, description)
VALUES ('50000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000001', 'DevOps',
        'Pratiques de déploiement'),
       ('50000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000001', 'Architecture',
        'Conception et architecture logicielle.');

INSERT INTO domains (id, article_id, name, description)
VALUES ('50000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000002', 'Java',
        'Langage de programmation Java'),
       ('50000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000002', 'DevOps',
        'Pratiques de déploiement');

INSERT INTO domains (id, article_id, name, description)
VALUES ('50000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000003', 'Architecture',
        'Conception et architecture logicielle.');

INSERT INTO votes (id, user_id, article_id, vote_value)
VALUES ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002',
        '10000000-0000-0000-0000-000000000001', 1),
       ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003',
        '10000000-0000-0000-0000-000000000001', -1),
       ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001',
        '10000000-0000-0000-0000-000000000002', 1),
       ('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002',
        '10000000-0000-0000-0000-000000000003', 1);

INSERT INTO expertise (id, user_id, domain_id, reputation_score)
VALUES ('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001',
        '50000000-0000-0000-0000-000000000012', 80),
       ('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002',
        '50000000-0000-0000-0000-000000000011', 60),
       ('30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003',
        '50000000-0000-0000-0000-000000000014', 70);
