
# Deskripsi singkat

Backend API untuk mengatur dan memonitor tugas harian tugas karyawan dan menyimpannya ke database.

# Langkah menjalankan

1. Pastikan sudah memiliki server database bisa secara lokal atau cloud
2. Copy database dari task-management/db.sql
3. 

# Teknologi yang digunakan

## Backend
- Bahasa Pemrograman = Typescript
- Database = MySQL
- Backend = ExpressJS

# Informasi login dummy

Note. 
1. Sebelum melakukan login pastikan server backend menyala dan terhubung dengan backend
2. Pastikan data email sama persis dengan db.sql 

```
{
    "email":"test123@testing.com",
    "password":"pass1223"
},
{
    "email":"test@testing.com",
    "password":"pass1223"
}
```

# Struktur database

Tabel Users
- user_id int (PK)
- name varchar
- username varchar
- email varchar
- password varchar
- created_at timestamp
- updated_at timestamp

Tabel Tasks
- task_id int (PK)
- user_id int (FK > users.user_id)
- title varchar
- description text NULL
- status enum('todo','in_progress','done')
- deadline date
- created_by varchar
- created_at timestamp
- updated_at timestamp

# Screenshot tampilan utama