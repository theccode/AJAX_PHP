function setStyleOne(){
    let table = document.getElementById('table');
    let tableHead = document.getElementById('tableHead');
    let tableContentOne = document.getElementById('tableFirstLine');
    let tableContentTwo = document.getElementById('tableSecondLine');

    table.className = 'TableOne';
    tableHead.className = 'TableHeadOne';
    tableContentOne.className = 'TableContentOne';
    tableContentTwo.className = 'TableContentOne';
}

function  setStyleTwo() {
    let table = document.getElementById('table');
    let tableHead = document.getElementById('tableHead');
    let tableContentOne = document.getElementById('tableFirstLine');
    let tableContentTwo = document.getElementById('tableSecondLine');

    table.className = 'TableTwo';
    tableHead.className = 'TableHeadTwo';
    tableContentOne.className = 'TableContentTwo';
    tableContentTwo.className = 'TableContentTwo';
}