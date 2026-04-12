# Better Auth Database Schema (Prisma) – Explanation

## 🧠 Overview (Big Picture)

This schema is designed to support a modern authentication system using **Better Auth + Prisma ORM**, covering:

- Email & password authentication
- OAuth (Google, GitHub, etc.)
- Session management (multi-device login)
- Email verification & password reset

### Main Relationships

- User (1) --- (N) Session
- User (1) --- (N) Account
- Verification (standalone)

### Key Concept

- One user can have multiple sessions (multi-device login)
- One user can have multiple accounts (e.g., Google + credentials)
- Verification is used for temporary tokens (OTP, reset password, etc.)

---

## 📊 1. User Table

### General Function

Stores the main user identity data.

### Fields

| Field           | Type        | Description                |
| --------------- | ----------- | -------------------------- |
| `id`            | String (PK) | Primary key (usually UUID) |
| `name`          | String      | User's name                |
| `email`         | String      | Unique email               |
| `emailVerified` | Boolean     | Email verification status  |
| `image`         | String?     | Profile image URL          |
| `createdAt`     | DateTime    | Record creation timestamp  |
| `updatedAt`     | DateTime    | Last update timestamp      |

### Relationships

- `sessions` → List of user sessions
- `accounts` → List of login methods

### Notes

- `@@unique([email])` → No duplicate emails allowed
- `@@map("user")` → Table name in DB is `user`

---

## 🔑 2. Session Table

### General Function

Manages user login sessions:

- Tracks login activity
- Supports multi-device login
- Controls session expiration

### Fields

| Field       | Type        | Description          |
| ----------- | ----------- | -------------------- |
| `id`        | String (PK) | Session ID           |
| `expiresAt` | DateTime    | Expiration timestamp |
| `token`     | String      | Unique session token |
| `createdAt` | DateTime    | Created time         |
| `updatedAt` | DateTime    | Last updated time    |
| `ipAddress` | String?     | User IP address      |
| `userAgent` | String?     | Device/browser info  |
| `userId`    | String (FK) | Reference to User    |

### Relationships

- Many-to-One → `User`
- `onDelete: Cascade` → Session deleted if user is deleted

### Notes

- `@@unique([token])` → Token must be unique
- `@@index([userId])` → Optimized query per user

---

## 🔗 3. Account Table

### General Function

Stores authentication methods:

- OAuth (Google, GitHub, etc.)
- Email/password login

### Fields

| Field                   | Type        | Description                            |
| ----------------------- | ----------- | -------------------------------------- |
| `id`                    | String (PK) | Account ID                             |
| `accountId`             | String      | Provider-specific ID                   |
| `providerId`            | String      | Provider name (google, github, etc.)   |
| `userId`                | String (FK) | Reference to User                      |
| `accessToken`           | String?     | API access token                       |
| `refreshToken`          | String?     | Refresh token                          |
| `idToken`               | String?     | Identity token (OIDC)                  |
| `accessTokenExpiresAt`  | DateTime?   | Access token expiry                    |
| `refreshTokenExpiresAt` | DateTime?   | Refresh token expiry                   |
| `scope`                 | String?     | Access scope                           |
| `password`              | String?     | Hashed password (for credential login) |
| `createdAt`             | DateTime    | Created time                           |
| `updatedAt`             | DateTime    | Last updated time                      |

### Relationships

- Many-to-One → `User`

### Notes

- Supports multiple login methods per user
- Password is stored here (not in User table)

---

## 🧾 4. Verification Table

### General Function

Handles temporary tokens for:

- Email verification
- Password reset
- Magic link login
- OTP (One-Time Password)

### Fields

| Field        | Type        | Description                      |
| ------------ | ----------- | -------------------------------- |
| `id`         | String (PK) | Token ID                         |
| `identifier` | String      | Usually email or user identifier |
| `value`      | String      | Token value                      |
| `expiresAt`  | DateTime    | Expiration time                  |
| `createdAt`  | DateTime    | Created time                     |
| `updatedAt`  | DateTime    | Last updated time                |

### Notes

- No direct relation to User → more flexible
- `@@index([identifier])` → Fast lookup by email

---

## 🔄 End-to-End Flow

### 1. Sign Up

- Insert into `User`
- Insert into `Account` (password or OAuth)
- Insert into `Verification` (email verification)

### 2. Login

- Validate `Account`
- Create `Session`

### 3. Authenticated Request

- Validate `Session.token`

### 4. Logout

- Delete `Session`

### 5. Reset Password

- Insert into `Verification`
- Validate token → update `Account.password`

---

## ⚖️ Design Principles

| Concern               | Table          |
| --------------------- | -------------- |
| User identity         | `User`         |
| Login state           | `Session`      |
| Authentication method | `Account`      |
| Temporary tokens      | `Verification` |

### Why This Design?

- Separation of concerns
- Scalable architecture
- Supports multi-provider authentication
- Secure token handling

---

## 💡 Conclusion

This schema follows **modern authentication best practices**:

- ✅ Multi-provider login (OAuth + credentials)
- ✅ Secure (token-based with expiration)
- ✅ Scalable (multi-session support)
- ✅ Flexible (independent verification system)

---

## 🚀 Optional Next Steps

You can extend this with:

- Prisma query examples (sign-up, login, session validation)
- Integration with Next.js App Router
- ERD diagram for documentation or presentation
