let keyStorage = "BOOKSHELF_STORAGE";
let arrayDataBuku = [];
function LoadDataFromStorage() {
    let data = JSON.parse(localStorage.getItem(keyStorage));
    if ( data !== null) {
        arrayDataBuku = data;
    } else {
        let value = [];
        localStorage.setItem(keyStorage, JSON.stringify(value));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    LoadDataFromStorage();
});

function saveData() {
    localStorage.setItem(keyStorage, JSON.stringify(arrayDataBuku));
    document.dispatchEvent(new Event("ondatasaved"));
}

function getData() {
    return JSON.parse(localStorage.getItem(keyStorage));
}

function MoveDataToComplete(id) {
    arrayDataBuku.filter((data) => {
        if(data.id === id) {
            data.isComplete = true;
            saveData();
            location.reload();
        }
    });
}

function MoveDataToUnComplete(id) {
    arrayDataBuku.filter((data) => {
        if(data.id === id) {
            data.isComplete = false;
            saveData();
            location.reload();
        }
    });
}

function findIndexBook(id) {
    let index = 0;
    for(let data of arrayDataBuku) {
        if(data.id === id) {
            return index;
        }
        index++;
    }
}
