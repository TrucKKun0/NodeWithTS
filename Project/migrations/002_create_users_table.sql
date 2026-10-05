CREATE TABLE uses(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT,
    google_id VARCHAR(255) UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT "USER"
      CHECK (role in ("USER", "ADMIN"))
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
)