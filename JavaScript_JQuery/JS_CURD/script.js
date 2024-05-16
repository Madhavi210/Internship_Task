const userdata = [];

let table;

$(document).ready(function() {
    table = $('#dataTable').DataTable();
});
function addData() {
    var row = document.createElement('tr');
    var formFeild = ['fname', 'lname', 'age'];
    var temp = {};

    var id = Math.floor(Math.random() * 100);
    temp.id = id;

    formFeild.forEach(field => {
        var cell = document.createElement('td');
        cell.innerHTML = document.getElementById(field).value;
        row.appendChild(cell);

        temp[field] = document.getElementById(field).value
    });
    // console.log(temp)

    userdata.push(temp);
    console.log(userdata)

    // var fname = document.createElement('td');
    // var lname = document.createElement('td');
    // var age = document.createElement('td');
    var action = document.createElement('td');

    // fname.innerHTML = document.getElementById('fname').value;
    // lname.innerHTML = document.getElementById('lname').value;
    // age.innerHTML = document.getElementById('age').value;

    // let temp = {};
    // temp.fname = fname.innerHTML;
    // temp.lname = lname.innerHTML;
    // temp.age = age.innerHTML;

    // userdata.push(temp);

    var editbBtn = document.createElement('button');
    editbBtn.innerHTML = 'Edit';
    editbBtn.className = 'btn btn-primary';
    editbBtn.onclick = function () {
        console.log('edit button clicked');
        var index = userdata.findIndex(item => item.id === id);
        edit(index);
        console.log(userdata);
        // edit(userdata.length - 1);
    }
    editbBtn.style.marginRight = '5px';

    var deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.onclick = function (event) {
        console.log('Delete button clicked');
        event.preventDefault();
        var index = userdata.findIndex(item => item.id === id);
        if (index !== -1) {
            userdata.splice(index, 1);
            row.remove();
            console.log(userdata);
        }
    }
    action.appendChild(editbBtn);
    action.appendChild(deleteBtn);
    row.appendChild(action);

    // row.appendChild(fname);
    // row.appendChild(lname);
    // row.appendChild(age);

    // $('#tbody').append(row);
    document.getElementById('tbody').appendChild(row);

    // $('form input').val('');
    document.querySelectorAll('form input').forEach(input => {
        input.value = '';
    });
    
    // $('#tableDiv').css('display', 'block');
    document.getElementById('tableDiv').style.display = 'block';

    $('#dataTable').DataTable();
}

function edit(index) {
    var fname = userdata[index].fname;
    var lname = userdata[index].lname;
    var age = userdata[index].age;

    document.querySelector('input#fname').value = fname;
    document.querySelector('input#lname').value = lname;
    document.querySelector('input#age').value = age;
    
    // $('input#fname').val(fname);
    // $('input#lname').val(lname);
    // $('input#age').val(age);

    let submitBtn = document.getElementById('submit');
    submitBtn.innerHTML = 'Save Changes';
    submitBtn.setAttribute('onclick', 'saveChanges(' + index + ")");

    // $('#submit').html('Save Changes');
    // $('#submit').attr('onclick', "saveChanges(" + index + ")");
}

function saveChanges(index) {
    // var fname = $('input#fname').val();
    // var lname = $('input#lname').val();
    // var age = $('input#age').val();

    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var age = document.getElementById('age').value;

    userdata[index].fname = fname;
    userdata[index].lname = lname;
    userdata[index].age = age;

    // var row = $('#tbody tr').eq(index + 1);
    // row.find('td:eq(0)').text(fname);
    // row.find('td:eq(1)').text(lname);
    // row.find('td:eq(2)').text(age);

    var row = document.querySelectorAll('#tbody tr')[index + 1];
    row.querySelectorAll('td')[0].innerHTML = fname;
    row.querySelectorAll('td')[1].innerHTML = lname;
    row.querySelectorAll('td')[2].innerHTML = age;

    var submitBtn = document.getElementById('submit');
    submitBtn.innerHTML = 'Submit';
    // $('#submit').html('Add Data');
    // $('#submit').attr('onclick', "addData()");
    submitBtn.setAttribute('onclick', 'addData()')

    // $('form input').val('');
    document.querySelectorAll('form input').forEach(input => {
        input.value = '';
    });

}

