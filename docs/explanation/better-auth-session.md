Berikut versi **rapi & siap copas langsung ke file `.md`**
(sudah disesuaikan dengan format Markdown standar).

---

````md
# Session Configuration Explanation

## 1️⃣ `expiresIn`

```ts
expiresIn: 60 * 60 * 24 * 7;
```
````

### Artinya

⏱ **Session berlaku selama 7 hari**

### Perhitungan

- 60 detik
- 60 menit
- 24 jam
- 7 hari
  ➡️ **604.800 detik**

### Perilaku

- Setelah **7 hari**, session **otomatis kadaluarsa**
- User **harus login ulang**
- Berlaku **meskipun user masih aktif**

📌 **Ini adalah batas maksimal umur session**

---

## 2️⃣ `updateAge`

```ts
updateAge: 60 * 60 * 24;
```

### Artinya

🔄 **Session akan diperbarui (extended) setiap 1 hari jika user masih aktif**

### Perhitungan

- 1 hari = **86.400 detik**

### Perilaku

Jika user melakukan request **setelah 1 hari sejak update terakhir**, maka:

- Expiry session **digeser ulang**
- Tetap mengikuti `expiresIn`
  (7 hari dihitung dari **update terakhir**)

📌 Ini disebut **sliding session**

---

## 🔁 Kombinasi Keduanya (Paling Penting)

| Kondisi User         | Hasil                            |
| -------------------- | -------------------------------- |
| Aktif setiap hari    | Session terus diperpanjang       |
| Tidak aktif > 1 hari | Session **tidak diperpanjang**   |
| Tidak aktif > 7 hari | Session **expired**, login ulang |

---

## 🕒 Timeline Session (Sliding Session)

```
Hari 1      Hari 2      Hari 3      Hari 4      Hari 5      Hari 6      Hari 7      Hari 8      Hari 9      Hari 10
│           │           │           │           │           │           │           │           │           │
│ Login     │ Aktif     │ Aktif     │ Tidak     │ Tidak     │ Tidak     │ Tidak     │ Tidak     │ Tidak     │ ❌ Expired
│           │           │           │ aktif     │ aktif     │ aktif     │ aktif     │ aktif     │ aktif     │
│──────────▶│──────────▶│──────────▶│──────────▶│──────────▶│──────────▶│──────────▶│──────────▶│──────────▶│
 Exp: H8       Exp: H9      Exp: H10     Exp: H10     Exp: H10     Exp: H10     Exp: H10     Exp: H10     Exp: H10
```

---

## Ringkasan 1 Kalimat

> Session akan **expired 7 hari setelah aktivitas terakhir user**,
> bukan 7 hari setelah login pertama.

```

---

Kalau mau, saya bisa:
- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}
- atau :contentReference[oaicite:2]{index=2}

Tinggal bilang 👌
```

# Example of Session Expiration

---

```md
# Session Timeline — Token & Cookie (Better Auth)

Konfigurasi:

- expiresIn = 7 hari
- updateAge = 1 hari

---

## Komponen
```

Browser
├─ Cookie (session / token id)
│
Server
├─ Session Store / DB
│ ├─ sessionId
│ ├─ updatedAt
│ └─ expiresAt

```

---

## Timeline Detail

### Hari 1 — Login

```

Browser:
Set-Cookie: session=abc123
Expires: Hari 8

Server (Session DB):
sessionId: abc123
updatedAt: Hari 1
expiresAt: Hari 8

```

---

### Hari 2 — User Aktif

```

Browser → Server:
Cookie: session=abc123

Server:
✔ Session valid
✔ now - updatedAt ≥ updateAge (1 hari)
➜ Refresh session

Server (update):
updatedAt: Hari 2
expiresAt: Hari 9

Response → Browser:
Set-Cookie: session=abc123
Expires: Hari 9

```

---

### Hari 3 — User Aktif Lagi

```

Browser → Server:
Cookie: session=abc123

Server:
✔ Session valid
✔ updateAge terpenuhi
➜ Refresh session

Server (update):
updatedAt: Hari 3
expiresAt: Hari 10

Response → Browser:
Set-Cookie: session=abc123
Expires: Hari 10

```

---

### Hari 4 – Hari 9 — Tidak Ada Aktivitas

```

Browser:
Cookie masih ada (expires Hari 10)

Server:
❌ Tidak ada request
❌ Tidak ada refresh
expiresAt tetap Hari 10

```

---

### Hari 10 — Session Expired

```

Browser → Server:
Cookie: session=abc123

Server:
❌ now ≥ expiresAt
➜ Session invalid / revoked

Response:
401 Unauthorized
Set-Cookie: session=; Max-Age=0

```

---

## Diagram Timeline Ringkas

```

Hari 1 Hari 2 Hari 3 Hari 4-9 Hari 10
│ │ │ │ │
│ Login │ Aktif │ Aktif │ Tidak aktif │ Expired
│ │ │ │ │
│──────────▶│──────────▶│──────────▶│────────────────▶│❌
Exp: H8 Exp: H9 Exp: H10

```

---

## Inti Konsep

- Cookie hanya menyimpan **token / sessionId**
- Session **hanya diperpanjang saat ada request**
- `updateAge` menentukan **kapan refresh boleh terjadi**
- `expiresIn` menentukan **umur maksimal sejak update terakhir**

> Session akan expired **7 hari setelah aktivitas terakhir user**,
> bukan 7 hari setelah login pertama.
```

---

Kalau mau, saya bisa:

- buat versi **diagram Mermaid**
- atau versi **JWT stateless vs DB session**
- atau **ringkasan 1 halaman untuk dokumentasi internal**

Tinggal bilang 👍
