
CREATE TABLE access_tokens (
    name text NOT NULL,
    description text NOT NULL,
    "accessToken" text PRIMARY KEY,
    "userId" BIGSERIAL NOT NULL REFERENCES api_users(id),
    "createdAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);


