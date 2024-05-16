let tbody = document.getElementById("myTable").getElementsByTagName("tbody")[0];
let tbody2 = document.getElementById("myTable2").getElementsByTagName("tbody")[0];
function insertRow() {
    tbody.innerHTML = tbody.innerHTML +
        `<tr class="rowdata">
    <td><input type="text" name="" id=""></td>
    <td><input type="text" name="" id=""></td>
    <td><input type="month" name="" id=""></td>
    <td><input type="month" name="" id=""></td>
    <td><input type="text" name="" id=""></td>
    <td><input type="text" name="" id=""></td>
    <td><i class="fa fa-minus-circle" style="font-size:36px"></i></td>
    </tr>`
    let icons = document.getElementsByClassName("fa-minus-circle");

    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", removeRow.bind(icons[i]));
    }
}

function removeRow() {
    let row = this.parentElement.parentElement;
    tbody.removeChild(row);
}


function showDetails() {
    var userDetails = [];

    
    if ($('#userDetailsTable thead').children().length === 0) {
        $('form input').each(function () {
            $('#userDetailsTable thead').append('<th>' + $(this).prev('label').text() + '</th>');
        });
    }

    
    $('form input').each(function () {
        userDetails.push($(this).val());
    });

    var newRow = '<tr>';
    for (var i = 0; i < userDetails.length; i++) {
        newRow += '<td>' + userDetails[i] + '</td>';
    }
    newRow += '</tr>';

    $('#userDetailsTable tbody').append(newRow);


    $('form input').val('');
}



let data = []

let tabledata1 = {
    Degree: '10th',
    School: 'N.C.Patel High School',
    Start_Date: 'June 2017',
    Passout_Year: 'May 2018',
    Percentage: '99.99',
    Backlog: '0'
}

data.push(tabledata1);

let tabledata2 = {
    Degree: '12th',
    School: 'Ananya Vidhyalaya',
    Start_Date: 'June 2019',
    Passout_Year: 'May 2020',
    Percentage: '99.99',
    Backlog: '0'
}

data.push(tabledata2);

function submitData() {
    let tRows = document.getElementsByClassName("rowdata");
    for (let i = 0; i < tRows.length; i++) {
        let row = tRows[i];
        let cells = row.getElementsByTagName("td");
        let tabledata = {
            Degree: cells[0].children[0].value,
            School: cells[1].children[0].value,
            Start_Date: cells[2].children[0].value,
            Passout_Year: cells[3].children[0].value,
            Percentage: cells[4].children[0].value,
            Backlog: cells[5].children[0].value
        }
        data.push(tabledata);
    }
    createtable();
}

let newtable = document.getElementById("myTable2");
function createtable() {
    newtable.classList.remove("d-none");
    console.log(data.length);
    for (let count = 2; count < data.length; count++) {
        console.log("inside");
        tbody2.innerHTML = tbody2.innerHTML +
            `<tr>
            <td>${data[count].Degree}</td>
            <td>${data[count].School}</td>
            <td>${data[count].Start_Date}</td>
            <td>${data[count].Passout_Year}</td>
            <td>${data[count].Percentage}</td>
            <td>${data[count].Backlog}</td>
            </tr>`

    }

}
