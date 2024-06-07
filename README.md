Implementasi API ini menggunakan Node.js dan Express, dengan Postman sebagai alat pengujian. API ini berinteraksi dengan PostgreSQL untuk menangani operasi database dan memberikan tanggapan sesuai dengan status operasi (berhasil atau gagal).

**Setting up API**
Konfigurasi API terdiri dari beberapa file javascript, yaitu server, db, controller, queries, dan routes. Server berfungsi untuk membuat web server menggunakan framework express. File db.js digunakan untuk menyiapkan koneksi ke database PostgreSQL menggunakan modul pg, yang merupakan klien PostgreSQL untuk Node.js. Selanjutnya, controller.js berisi fungsi-fungsi yang akan menentukan behavior masing-masing endpoints API. File queries menyimpan query yang akan dipanggil oleh controller.js. Terakhir, routes.js, digunakan untuk mendefinisikan rute untuk menggunakan database. 

**Penggunaan**
1.	 Menyalakan Server. Jalankan node server.js di terminal.
2.	Endpoint API:
  a.	getCustomer
      •	Metode: GET
      •	URL: localhost:3000/api/v1/GoodReadingBook
  b.	getCustomerById
      •	Metode: GET
      •	URL: localhost:3000/api/v1/GoodReadingBook/{customer_number}
      •	Keterangan: Ganti {customer_number} dengan nomor customer yang diinginkan.
  c.	addCustomer
      •	Metode: POST
      •	URL: localhost:3000/api/v1/GoodReadingBook
      •	Keterangan: Siapkan data customer dalam format JSON.
  d.	removeCustomer
      •	Metode: DELETE
      •	URL: localhost:3000/api/v1/GoodReadingBook/{customer_number}
      •	Keterangan: Ganti {customer_number} dengan nomor customer yang diinginkan.
  e.	updateCustomer
      •	Metode: PUT
      •	URL: localhost:3000/api/v1/GoodReadingBook/{customer_number}
      •	Keterangan: Ganti {customer_number} dengan nomor customer yang diinginkan dan siapkan data customer dalam format JSON.
