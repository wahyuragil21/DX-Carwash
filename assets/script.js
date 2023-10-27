let database = []

function getData() {
    let nama = document.getElementById('nama').value;
    let kontak = document.getElementById('kontak').value;
    let kendaraan = document.querySelector('input[name="kendaraan"]:checked');
    let jam = document.getElementById('jam').value;
    let totalHarga = 0;

    for (const data of database) {
        if (jam === data.waktu) {
            Swal.fire({
                title: 'Maaf:(!',
                text: 'Waktu yang anda pilih tidak tersedia',
                icon: 'warning',
            });

            return
        }
    }

    if (!nama || !kontak || !kendaraan || !jam) {
        Swal.fire({
            title: 'Halo',
            text: 'Silahkan lengkapi semua kolom',
            icon: 'warning',
        });
        return
    }


    if (kendaraan) {
        if (kendaraan.value === 'SUV' || kendaraan.value === 'Sedan') {
            totalHarga += 50000;
        } else if (kendaraan.value === 'Sport') {
            totalHarga += 150000;
        } else {
            totalHarga += 100000;
        }
    }
    let id = 1

    if (database.length >= 1) {
        id = database[database.length - 1].id + 1
    }
    let newObj = {
        id: id,
        nama: nama,
        kontak: kontak,
        kendaraan: kendaraan ? kendaraan.value : 'Unknown',
        waktu: jam,
        totalHarga: totalHarga,
    };

    database.push(newObj);

    // Kosongkan input
    document.getElementById('nama').value = '';
    document.getElementById('kontak').value = '';
    document.querySelector('input[name="kendaraan"]:checked').checked = false;
    document.getElementById('jam').value = '';

    render();
    if (database.length === 1 || database.length > 1) {
        Swal.fire({
            title: 'Kata Dedix!',
            text: 'Terima kasih orang baik',
            icon: 'success',
        });
        return
    }
}

function render() {
    const tableBody = document.getElementById('data-table');

    // Hapus semua baris yang ada di dalam tabel sebelum merender ulang
    tableBody.innerHTML = '';

    if (database.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" align="center">Jadwal Booking Kosong</td></tr>';
        return;
    }

    // Isi tabel dengan data dari database
    database.forEach(dataItem => {
        const row = document.createElement('tr');
        console.log(dataItem)
        row.innerHTML = `
                <td>${dataItem.nama}</td>
                <td>${dataItem.kontak}</td>
                <td>${dataItem.kendaraan}</td>
                <td>${dataItem.waktu}</td>
                <td>${dataItem.totalHarga}</td>
                <button type="button" class="btn btn-danger" onclick="delData(${dataItem.id})" id="del-btn">Cancel</button>
            `;
        tableBody.appendChild(row);

    });


}
render()


// function delData(id) {

//     let res = [];
//     let found = false;
//     for (let i = 0; i < database.length; i++) {
//         if (database[i].id !== id) {
//             res.push(database[i]);
//         } else {
//             found = true;
//         }
//     }
//     if (!found) {
//         return "id tidak ditemukan"
//     }
//     database = res;
//     render()
// }

function delData(id) {
    Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin cancel?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
    }).then((result) => {
        if (result.isConfirmed) {
            let res = [];
            let found = false;
            for (let i = 0; i < database.length; i++) {
                if (database[i].id !== id) {
                    res.push(database[i]);
                } else {
                    found = true;
                }
            }
            if (!found) {
                Swal.fire({
                    title: 'Error',
                    text: 'ID tidak ditemukan',
                    icon: 'error',
                });
            } else {
                database = res;
                render();
            }
        }
    });
}


