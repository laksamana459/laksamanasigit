// Mengambil elemen form dan tabel
const form = document.getElementById("transaksi-form");
const tbody = document.querySelector("#daftar-transaksi tbody");

// Fungsi untuk menyimpan data ke Local Storage
function simpanTransaksi(transaksi) {
    let dataTransaksi = JSON.parse(localStorage.getItem("dataTransaksi")) || [];
    dataTransaksi.push(transaksi);
    localStorage.setItem("dataTransaksi", JSON.stringify(dataTransaksi));
}

// Fungsi untuk mendapatkan data dari Local Storage
function ambilTransaksi() {
    return JSON.parse(localStorage.getItem("dataTransaksi")) || [];
}

// Fungsi untuk menampilkan data transaksi di tabel
function tampilkanTransaksi() {
    const dataTransaksi = ambilTransaksi();
    tbody.innerHTML = ""; // Bersihkan tabel sebelum menambahkan data baru

    dataTransaksi.forEach((transaksi, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${transaksi.nama}</td>
            <td>${transaksi.jumlah}</td>
            <td>${transaksi.kategori}</td>
            <td>${transaksi.waktu}</td>
        `;
        tbody.appendChild(row);
    });
}

// Event listener untuk menyimpan transaksi saat form disubmit
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah halaman reload

    const nama = form.nama.value.trim();
    const jumlah = form.jumlah.value.trim();
    const kategori = form.kategori.value;
    const waktu = new Date().toLocaleString();

    if (!nama || !jumlah) {
        alert("Nama dan jumlah harus diisi!");
        return;
    }

    const transaksi = {
        nama,
        jumlah,
        kategori,
        waktu
    };

    simpanTransaksi(transaksi); // Simpan ke Local Storage
    tampilkanTransaksi(); // Update tabel

    form.reset(); // Reset form setelah submit
});

// Tampilkan data transaksi saat halaman pertama kali dimuat
tampilkanTransaksi();
