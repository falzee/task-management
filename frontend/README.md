
# Deskripsi singkat

Aplikasi web untuk membantu karyawana mengatur dan memonitor tugas harian mereka. Aplikasi merupakan fullstack dari sisi frontend UI sampai logika pengolahan data task di backend dan database. Setiap karyawan hanya bisa mengakses datanya sendiri saja.

# Langkah menjalankan

## Prerequisites (yang harus diinstall sebelum mencoba)
1. node js
2. npm 
3. MySQL
4. git
3. DB server (bisa cloud atau lokal)

## Backend

1. Klon repository dari github atau ekstrak file .zip
```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
2. Di terminal pindah ke folder backend
```
cd backend
```
3. Masih di terminal install menggunakan npm
```
npm install
```
4. Cek folder root /backend dan buat file env sesuai konfigurasi database kalian (template ada di .env.exampkle)
```
<!-- sesuaikan dengan database -->
DB_HOST=x.x.x.x
DB_PORT=<change to your db port>
DB_DATABASE=<change to your db name>
DB_USERNAME=<change to your db username>
DB_PASSWORD=<change to your db password>

<!-- sesuaikan dengan backend -->
PORT=<change to your backend port>
JWT_SECRET=<add your own jwt>
```
5. Di server database kalian import database dari file db.sql di folder root atau folder diluar backend
6. Jalankan server Backend di terminal dengan perintah
```
npm run dev
```

## Frontend

1. Klon repository dari github atau ekstrak file .zip (hanya jika belum melakukannya)
```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
2. Di terminal pindah ke folder frontend
```
cd frontend
```
3. Masih di terminal install menggunakan npm
```
npm install
```
4. Cek folder root /frontend dan buat file env sesuai konfigurasi database kalian (template ada di .env.exampkle)
```
<!-- sesuaikan dengan backend -->
VITE_API_BASE_URL=http://localhost:3000/v1 //sesuaikan url endpoint server backend
```
5. Jalankan server Frontend di terminal dengan perintah
```
npm run dev
```



# Teknologi yang digunakan

Note. lebih spesifiknya bisa dilihat di file package.json untuk dependencies

## Frontend
- Bahasa Pemrograman = Typescript
- Library/Frameworks = React

## Backend
- Bahasa Pemrograman = Typescript
- Database = MySQL
- Backend = ExpressJS
- ORM = TypeORM


# Informasi login dummy

Note. 
1. Sebelum melakukan login pastikan server backend menyala dan terhubung dengan backend
2. Pastikan data user sama dengan db.sql yang diimport

```
<!-- Terdapat 3 user dari db.sql -->
{
    "email":"test123@testing.com",
    "password":"pass1223"
},
{
    "email":"test@testing.com",
    "password":"pass1223"
}
{
    "email":"naufal@mail.com",
    "password":"pass12345"
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

1. Halaman login
<p align="center">
  <img src="/screenshots/login.png" alt="login-img" />
</p>

2. Halaman dashboard
<p align="center">
  <img src="/screenshots/dashboard.png" alt="dashboard-img" />
</p>

3. Halaman CRUD task
<p align="center">
  <img src="/screenshots/task_crud.png" alt="crud-task-img" />
</p>