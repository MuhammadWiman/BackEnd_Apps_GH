# 🔐 Backend Authentication Role Admin & User


---

## 📌 Fitur Utama

* Register user (default role: `user`)
* Login menggunakan JWT
* Proteksi endpoint menggunakan token
* Siap diintegrasikan dengan aplikasi mobile

---

## 🧱 Teknologi yang Digunakan

* Node.js
* Express.js
* MongoDB + Mongoose
* JSON Web Token (JWT)
* bcryptjs (hash password)

---

## 📂 Struktur Folder

```
backend/
├─ server.js
├─ config/
│   └─ db.js
├─ models/
│   └─ User.js
├─ routes/
│   └─ auth.js
├─ middleware/
│   └─ authMiddleware.js
└─ .env
```

---

## ⚙️ Konfigurasi Environment (.env)

```env
MONGO_URI=mongodb://127.0.0.1:27017/role_db
JWT_SECRET=rahasia_jwt
```

---

## 🚀 Menjalankan Server

```bash
npm install
node server.js
```

Jika berhasil:

```
MongoDB connected
Server running on port 3000
```

---



## 🧪 Endpoint API

### 🔹 Register

```
POST /api/auth/register
```

Body:

```json
{
  "username": "user1",
  "password": "123456",
  "role" : "user"/"admin"
}
```

---

### 🔹 Login

```
POST /api/auth/login
```

Body:

```json
{
  "username": "user1",
  "password": "123456"
}
```

Response:

```json
{
  "message" : "Welcome {role}"
  "token": "JWT_TOKEN",
  "role": "user"
}
```
