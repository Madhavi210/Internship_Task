const userDetails = [];
function showDetails() {

    let fnew = document.getElementById("tbody")

    fnew.innerHTML = "";

    let temp = {};

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let dob = document.getElementById("dob").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let gyear = document.getElementById("gradyear").value;

    temp.fname = fname;
    temp.lname = lname;
    temp.dob = dob;
    temp.email = email;
    temp.address = address;
    temp.gyear = gyear;

    userDetails.push(temp);

    // console.log(userDetails);

    for (let obj of userDetails) {
        let structure = `
       <td>${obj.fname}</td>
       <td>${obj.lname}</td>
       <td>${obj.dob}</td>
       <td>${obj.email}</td>
       <td>${obj.address}</td>
       <td>${obj.gyear}</td>
       <td>
        <i class="fa fa-pen-to-square h4 pe-2" onclick="editData(event)"></i> 
        <i class="fa fa-trash h4" onclick="deleteData(event)"></i> 
        </td>
        `;
        const row = "<tr>" + structure + "</tr>";
        $('#tbody').append(row);
    }

    $('form input').val('');

    closeModal();

}

function closeModal() {
    $('#myModal').modal('hide');
}

function deleteData(event) {
    event.preventDefault();
    let trashButton = $(event.target).parent().parent();
    if (confirm("Are you sure?")) {
        trashButton.remove();
    }
    userDetails.pop();

}

function editData(event) {
    event.preventDefault();
    let editButton = $(event.target).parent().parent();
    let rowIndex = editButton.index();
    let userData = userDetails[rowIndex];

    document.getElementById('fname').value = userData.fname;
    document.getElementById('lname').value = userData.lname;
    document.getElementById('dob').value = userData.dob;
    document.getElementById('email').value = userData.email;
    document.getElementById('address').value = userData.address;
    document.getElementById('gradyear').value = userData.gyear;

    let submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = 'Update';
    submitBtn.setAttribute('onclick', `updateData(${rowIndex})`);

    $('#myModal').modal('show');
}


function updateData(rowIndex) {
    let updatedData = {};

    updatedData.fname = document.getElementById('fname').value;
    updatedData.lname = document.getElementById('lname').value;
    updatedData.dob = document.getElementById('dob').value;
    updatedData.email = document.getElementById('email').value;
    updatedData.address = document.getElementById('address').value;
    updatedData.gyear = document.getElementById('gradyear').value;

    userDetails[rowIndex] = updatedData;

    let tableRow = $('#tbody').find('tr').eq(rowIndex);
    tableRow.find('td').eq(0).text(updatedData.fname);
    tableRow.find('td').eq(1).text(updatedData.lname);
    tableRow.find('td').eq(2).text(updatedData.dob);
    tableRow.find('td').eq(3).text(updatedData.email);
    tableRow.find('td').eq(4).text(updatedData.address);
    tableRow.find('td').eq(5).text(updatedData.gyear);

    $('form input').val('');

    closeModal();

}

function validateFirstName() {
    let firstName = document.getElementById('fname').value;
    let firstNameErr = document.getElementById('first-name-err');
    let validFirstName = /^[A-Za-z]+$/;

    if (firstName.trim() === '') {
        firstNameErr.textContent = '* First Name is required';
        return false;
    }
    else if (!validFirstName.test(firstName)) {
        firstNameErr.textContent = "* First Name must be only string without white spaces";
    }
    else {
        firstNameErr.textContent = '';
        return true;
    }
}

function validateLastName() {
    let lastName = document.getElementById('lname').value;
    let lastNameErr = document.getElementById('last-name-err');
    let validLastName = /^[A-Za-z]+$/;
    if (lastName.trim() != '') {
        if (!validLastName.test(lastName)) {
            lastNameErr.textContent = '* Last Name must be only string without white spaces';
            return false;
        } else {
            lastNameErr.textContent = '';
            return true;
        }
    }
}

function validateEmail() {
    let email = document.getElementById('email').value;
    let emailErr = document.getElementById('email-err');
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailErr.textContent = '* Invalid Email';
        return false;
    } else {
        emailErr.textContent = '';
        return true;
    }
}

function validateAddress() {
    let address = document.getElementById('address').value;
    let addressErr = document.getElementById('address-err');
    if (address.trim() === '') {
        addressErr.textContent = '* Address is required';
        return false;
    } else {
        addressErr.textContent = '';
        return true;
    }
}

function validateDateOfBirth() {
    let dob = document.getElementById('dob').value;
    let dobErr = document.getElementById('dob-err');
    let dobDate = new Date(dob);
    let currentDate = new Date();
    let minDate = new Date("1960-01-01");
    let maxDate = new Date("2006-02-26");
    if (dob.trim() === '') {
        dobErr.innerHTML = "* Please enter a date of birth.";
        return false;
    }
    else if (dobDate < minDate || dobDate > maxDate) {
        dobErr.textContent = '* Age Must be 18 Years';
        return false;
    } else {
        dobErr.textContent = '';
        return true;
    }
}

function validateGraduationYear() {
    let gradYear = document.getElementById('gradyear').value;
    let gradYearErr = document.getElementById('gradyear-err');
    let gradYearDate = new Date(gradYear);
    let currentDate = new Date();

    if (gradYear.trim() === '') {
        gradYearErr.innerHTML = "* Please enter a graduation year.";
        return false;
    }
    else {
        gradYearErr.textContent = '';
        return true;
    }
}

document.getElementById('fname').addEventListener('blur', validateFirstName);
document.getElementById('lname').addEventListener('blur', validateLastName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('address').addEventListener('blur', validateAddress);
document.getElementById('dob').addEventListener('blur', validateDateOfBirth);
document.getElementById('gradyear').addEventListener('blur', validateGraduationYear);


function validateForm() {
    let isValid = true;
  
    if (!validateFirstName()) {
        isValid = false;
    }
    if (!validateLastName()) {
        isValid = false;
    }
    if (!validateEmail()) {
        isValid = false;
    }
    if (!validateAddress()) {
        isValid = false;
    }
    if (!validateDateOfBirth()) {
        isValid = false;
    }
    if (!validateGraduationYear()) {
        isValid = false;
    }
    if (isValid) {
        showDetails();
    }
    return isValid;
}

let tbody = document.getElementById("myTable").getElementsByTagName("tbody")[0];

// function insertRow() {
//     tbody.innerHTML = tbody.innerHTML +
//         `<tr class="rowdata">
//     <td><input type="text" name="" id=""></td>
//     <td><input type="text" name="" id=""></td>
//     <td><input type="month" name="" id=""></td>
//     <td><input type="month" name="" id=""></td>
//     <td><input type="text" name="" id=""></td>
//     <td><input type="text" name="" id="" ></td>
//     <td><i class="fa fa-minus-circle" style="font-size:36px"></i></td>
//     </tr>`
//     let icons = document.getElementsByClassName("fa-minus-circle");

//     for (let i = 0; i < icons.length; i++) {
//         icons[i].addEventListener("click", removeRow.bind(icons[i]));
//     }
// }

function insertRow() {

    let newRow = document.createElement('tr');
    newRow.classList.add('rowdata');

    newRow.innerHTML = `
        <td><input type="text" name="degree" id="" required></td>
        <td><input type="text" name="school" id="" required></td>
        <td><input type="month" name="startDate" id="" required></td>
        <td><input type="month" name="passYear" id="" required></td>
        <td><input type="number" name="percentage" id="" min="0" max="99.99" required></td>
        <td><input type="number" name="backlog" id="" min="0" max="7" required></td>
        <td><i class="fa fa-minus-circle h4"></i></td>
    `;

    tbody.appendChild(newRow);

    newRow.querySelector('.fa-minus-circle').addEventListener('click', removeRow.bind(newRow.querySelector('.fa-minus-circle')));

}


function removeRow() {
    let row = this.parentElement.parentElement;
    tbody.removeChild(row);
}

