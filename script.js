// Ambil data pengumuman yang tersimpan di localStorage, atau buat array kosong jika tidak ada
let pengumumanList = JSON.parse(localStorage.getItem('pengumumanList')) || [];

// Fungsi untuk menambah pengumuman
function tambahPengumuman(event) {
    event.preventDefault();

    // Ambil nilai inputan
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;
    const tanggal = new Date().toLocaleDateString();

    // Buat objek pengumuman
    const pengumuman = {
        id: Date.now(),
        judul,
        isi,
        tanggal
    };

    // Tambahkan pengumuman ke dalam array
    pengumumanList.push(pengumuman);

    // Simpan pengumuman ke localStorage
    localStorage.setItem('pengumumanList', JSON.stringify(pengumumanList));

    // Update tampilan daftar pengumuman
    renderPengumumanList();

    // Reset form
    document.getElementById('form-tambah').reset();
}

// Fungsi untuk menghapus pengumuman
function hapusPengumuman(id) {
    pengumumanList = pengumumanList.filter(pengumuman => pengumuman.id !== id);

    // Simpan perubahan ke localStorage
    localStorage.setItem('pengumumanList', JSON.stringify(pengumumanList));

    // Update tampilan daftar pengumuman
    renderPengumumanList();
}

// Fungsi untuk mengedit pengumuman
function editPengumuman(id) {
    const pengumuman = pengumumanList.find(p => p.id === id);
    if (pengumuman) {
        document.getElementById('judul').value = pengumuman.judul;
        document.getElementById('isi').value = pengumuman.isi;
        hapusPengumuman(id); // Hapus pengumuman lama
    }
}

// Fungsi untuk merender daftar pengumuman
function renderPengumumanList() {
    const listElement = document.getElementById('pengumuman-list');
    listElement.innerHTML = ''; // Reset isi daftar

    // Render setiap pengumuman
    pengumumanList.forEach(pengumuman => {
        const li = document.createElement('li');

        li.innerHTML = `
            <h3>${pengumuman.judul}</h3>
            <p>${pengumuman.isi}</p>
            <small>Tanggal: ${pengumuman.tanggal}</small><br>
            <button onclick="editPengumuman(${pengumuman.id})">Edit</button>
            <button onclick="hapusPengumuman(${pengumuman.id})">Hapus</button>
        `;

        listElement.appendChild(li);
    });
}

// Panggil fungsi untuk merender daftar pengumuman saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderPengumumanList);



// Fungsi untuk memuat data guru dari localStorage
function loadGuru() {
    const guruList = document.getElementById('guru-list');
    const guru = JSON.parse(localStorage.getItem('guru')) || []; // Ambil data guru dari localStorage
    
    guruList.innerHTML = ''; // Kosongkan daftar guru
    guru.forEach((guruItem, index) => {
        const guruDiv = document.createElement('div');
        guruDiv.classList.add('guru-item');
        guruDiv.innerHTML = `
            <p>${guruItem}</p>
            <button onclick="hapusGuru(${index})">Hapus</button>
        `;
        guruList.appendChild(guruDiv);
    });
}

// Fungsi untuk menambahkan guru (menampilkan form input)
function tambahGuru() {
    document.getElementById('form-guru').style.display = 'block'; // Tampilkan form
}

// Fungsi untuk menyimpan guru baru ke localStorage
function simpanGuru() {
    const namaGuru = document.getElementById('nama-guru').value;
    
    if (namaGuru) {
        let guru = JSON.parse(localStorage.getItem('guru')) || []; // Ambil data guru dari localStorage
        guru.push(namaGuru); // Tambahkan nama guru ke array
        localStorage.setItem('guru', JSON.stringify(guru)); // Simpan data guru ke localStorage
        
        document.getElementById('nama-guru').value = ''; // Kosongkan input nama guru
        document.getElementById('form-guru').style.display = 'none'; // Sembunyikan form input
        loadGuru(); // Muat ulang daftar guru
    } else {
        alert('Nama guru tidak boleh kosong!');
    }
}

// Fungsi untuk membatalkan penambahan guru
function batalTambah() {
    document.getElementById('nama-guru').value = ''; // Kosongkan input nama guru
    document.getElementById('form-guru').style.display = 'none'; // Sembunyikan form input
}

// Fungsi untuk menghapus guru dari localStorage
function hapusGuru(index) {
    let guru = JSON.parse(localStorage.getItem('guru')) || []; // Ambil data guru dari localStorage
    
    // Hapus guru berdasarkan index
    guru.splice(index, 1);
    
    // Simpan perubahan ke localStorage
    localStorage.setItem('guru', JSON.stringify(guru));
    
    loadGuru(); // Muat ulang daftar guru setelah penghapusan
}

// Panggil loadGuru() ketika halaman dimuat
window.onload = loadGuru;



