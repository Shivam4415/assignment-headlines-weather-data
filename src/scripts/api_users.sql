CREATE TABLE api_users (
	id BigSerial PRIMARY KEY,
    name text NOT NULL,
    "email" text NOT NULL Unique,
    "password" text NOT NULL,
	"hasApiAccess" boolean NOT NULL DEFAULT false
);