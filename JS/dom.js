let listsContainer = document.querySelector('.lists');

document.querySelector('.tombolRakBuku').addEventListener('click', function() {
    let inputTitleBook = document.getElementById('judul').value;
    let inputAuthorBook = document.getElementById('penulis').value;
    let inputYearBook = document.getElementById('tahun').value;

    let inputCheckboxSelesai = document.querySelector('input[type="checkbox"]#selesai');

    if(inputTitleBook !== "" && inputAuthorBook !== "" && inputYearBook !== "") {
        if (inputCheckboxSelesai.checked) {
            arrayDataBuku.push({
                id: +new Date(),
                title: inputTitleBook,
                author: inputAuthorBook,
                year: inputYearBook,
                isComplete: true
            });
            saveData();
            alert('Data buku berhasil ditambahkan');
            window.location.reload();
        } else {
            arrayDataBuku.push({
                id: +new Date(),
                title: inputTitleBook,
                author: inputAuthorBook,
                year: inputYearBook,
                isComplete: false
            });
            saveData();
            alert('Data buku berhasil ditambahkan');
            window.location.reload();
        }
    } else {
        alert('Masukkan Judul, Penulis dan Tahun!');
        return false;
    }
});

document.querySelector('.tombolBelumSelesai').addEventListener('click', function() {
    let inputTitleBook = document.getElementById('judul').value;
    let inputAuthorBook = document.getElementById('penulis').value;
    let inputYearBook = document.getElementById('tahun').value;

    let inputCheckboxSelesai = document.querySelector('input[type="checkbox"]#selesai');

    if(inputTitleBook !== "" && inputAuthorBook !== "" && inputYearBook !== "") {
        if (!inputCheckboxSelesai.checked) {
            arrayDataBuku.push({
                id: +new Date(),
                title: inputTitleBook,
                author: inputAuthorBook,
                year: inputYearBook,
                isComplete: false
            });
            saveData();
            alert('Data buku berhasil ditambahkan');
            window.location.reload();
        } else {
            alert('Tombol ini hanya untuk belum selesai dibaca!');
            return false;
        }
    } else {
        alert('Masukkan Judul, Penulis dan Tahun!');
        return false;
    }    
});

function render() {
    let data = JSON.parse(localStorage.getItem(keyStorage));
    if ( data !== null) {
        arrayDataBuku = data;
        arrayDataBuku.forEach((data) => {
            let notFinishContainer = document.querySelector('#notFinish .lists');
            let finishContainer = document.querySelector('#finish .lists');
            let listContainer = document.createElement('div');
            listContainer.classList.add('list');
            let h3Judul = document.createElement('h3');
            h3Judul.innerText = data.title;
            listContainer.appendChild(h3Judul);
            let pPenulis = document.createElement('p');
            pPenulis.innerText = `Penulis : ${data.author}`;
            listContainer.appendChild(pPenulis);
            let pTahun = document.createElement('p');
            pTahun.innerText = `Tahun : ${data.year}`;
            listContainer.appendChild(pTahun);
            let containerButton = document.createElement('div');
            containerButton.classList.add('buttons');
            let finishButton = document.createElement('button');
            finishButton.classList.add('selesai-dibaca');
            finishButton.innerText = 'Selesai dibaca';
            let notFinishButton = document.createElement('button');
            notFinishButton.classList.add('belum-dibaca');
            notFinishButton.innerText = 'Belum dibaca';
            let editButton = document.createElement('button');
            editButton.classList.add('ubah');
            editButton.innerText = 'Ubah';
            editButton.addEventListener('click', function() {
                EditList(data.id);
            });
            let removeButton = document.createElement('button');
            removeButton.classList.add('hapus');
            removeButton.innerText = 'Hapus';
            finishButton.addEventListener('click', function(event) {
                MoveDataToComplete(data.id);
            });
            notFinishButton.addEventListener('click', function(event) {
                MoveDataToUnComplete(data.id);
            });
            removeButton.addEventListener('click', function(event) {
                RemoveItemFromList(data.id);
            });

            if(data.isComplete === true) {
                finishContainer.appendChild(listContainer);
                containerButton.appendChild(notFinishButton);
                containerButton.appendChild(editButton);
                containerButton.appendChild(removeButton);
                listContainer.appendChild(containerButton);

            } else {
                notFinishContainer.appendChild(listContainer);
                containerButton.appendChild(finishButton);
                containerButton.appendChild(editButton);
                containerButton.appendChild(removeButton);
                listContainer.appendChild(containerButton);
            }

        });
    }
}

function EditList(id) {
    let inputTitleBook = document.getElementById('judulEdit');
    let inputAuthorBook = document.getElementById('penulisEdit');
    let inputYearBook = document.getElementById('tahunEdit');

    arrayDataBuku.forEach((data) => {
        if (data.id === id) {
            document.querySelector('.editContainer').style.display = 'block';
            document.querySelector('main').style.zIndex = '-999';
            document.querySelector('main').style.opacity = '.5';
            document.querySelector('.editContainer').style.zIndex = '999';
            inputTitleBook.value = data.title;
            inputAuthorBook.value = data.author;
            inputYearBook.value = data.year;
            
            document.querySelector('.buttonEdit button').addEventListener('click', function() {
                data.title = inputTitleBook.value;
                data.author = inputAuthorBook.value;
                data.year = inputYearBook.value;
                document.querySelector('.editContainer').style.display = 'none';
                saveData();

                location.reload();
                alert('Data Buku berhasil diubah');
            });
        }
    });
}

function removeMessage() {
    document.querySelector('.deleteConfirmContainer').style.display = 'flex';
    document.querySelector('.deleteConfirmContainer').style.zIndex = '999';
    document.querySelector('main').style.zIndex = '-999';
    document.querySelector('main').style.opacity = '.3';
}

function RemoveItemFromList(elementId) {
    removeMessage();
    let deleteConfirmButton = document.querySelectorAll('.deleteConfirmButton');
    deleteConfirmButton.forEach((data) => {
        data.addEventListener('click', function(e) {
            if(e.target.classList.contains('okConfirm')) {
                const bookPosition = findIndexBook(elementId);
                arrayDataBuku.splice(bookPosition, 1);
                saveData();
                location.reload();
                document.querySelector('.deleteConfirmContainer').style.display = 'none';
                document.querySelector('.deleteConfirmContainer').style.zIndex = '0';
                document.querySelector('main').style.zIndex = '0';
                document.querySelector('main').style.opacity = '1';
            } else if(e.target.classList.contains('cnclConfirm')) {
                document.querySelector('.deleteConfirmContainer').style.display = 'none';
                document.querySelector('.deleteConfirmContainer').style.zIndex = '0';
                document.querySelector('main').style.zIndex = '0';
                document.querySelector('main').style.opacity = '1';
            }
        });
    });
}

getData();
render();

document.querySelector('.notFinishdDown').addEventListener('click', function() {
    document.querySelector('#notFinish div').classList.toggle('dropDown');
});

document.querySelector('.FinishdDown').addEventListener('click', function() {
    document.querySelector('#finish div').classList.toggle('dropDown');
});

function searchBook() {
    let textSearch = document.querySelector('input[type="search"]').value.toLowerCase();
    let list = document.querySelectorAll('.list');
    let h3titleName = document.getElementsByTagName('h3');

    for(let i = 0; i < h3titleName.length; i++) {
        let titleName = list[i].getElementsByTagName('h3')[0];

        if(titleName) {
            let textValue = titleName.textContent || titleName.innerHTML;

            if(textValue.toLowerCase().indexOf(textSearch) > -1) {
                list[i].style.display = '';
            } else {
                list[i].style.display = 'none';
            }
        }
    }
}
document.querySelector('input[type="search"]').addEventListener('keyup', searchBook);