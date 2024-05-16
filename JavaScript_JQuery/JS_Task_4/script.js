let tbody = document.getElementById("myTable").getElementsByTagName("tbody")[0];
var rowCount = 1;

function insertRow() {
    rowCount++;

    let newRow = document.createElement('tr');
    newRow.classList.add('rowdata');

    newRow.innerHTML = `
        <td><input type="text" name="degree" id="degree${rowCount}" required></td>
        <td><input type="text" name="school" id="school${rowCount}" required></td>
        <td><input type="month" name="startDate" id="startDate${rowCount}" required></td>
        <td><input type="month" name="passYear" id="passyear${rowCount}" required></td>
        <td><input type="number" name="percentage" id="percentage${rowCount}" min="0" max="99.99" required></td>
        <td><input type="number" name="backlog" id="backlog${rowCount}" min="0" max="7" required></td>
        <td><i class="fa fa-minus-circle h4"></i></td>
    `;

    tbody.appendChild(newRow);
    newRow.querySelector('.fa-minus-circle').addEventListener('click', removeRow.bind(newRow.querySelector('.fa-minus-circle')));
}

function removeRow() {
    let row = this.parentElement.parentElement;
    tbody.removeChild(row);
}

$(document).ready(function () {
    var editedRow = null;
    var isEditing = false;
    var table = $('#userDetails').DataTable();

    // function addRowDataToTable(firstName, lastName, dob, email, address, graduation) {
    //     var uniqueId = 'row_' + counter++; 

    //     var degree = $('#degree').val();
    //     var school = $('#school').val();
    //     var passyear = $('#passyear').val();
    //     var startDate = $('#startDate').val();
    //     var percentage = $('#percentage').val();
    //     var backlog = $('#backlog').val();

    //     var degree1 = $('#degree1').val();
    //     var school1 = $('#school1').val();
    //     var passyear1 = $('#passyear1').val();
    //     var startDate1 = $('#startDate1').val();
    //     var percentage1 = $('#percentage1').val();
    //     var backlog1 = $('#backlog1').val();

    //     var educationData = {degree, school, passyear, startDate, percentage, backlog}; 
    //     var educationData1 = {degree1, school1, passyear1, startDate1, percentage1, backlog1}; 
    //     // console.log(educationData);

    //     var rowNode = table.row.add([
    //         '<a href="javascript:void(0)" class="expand-btn" type="button" id="expand-btn"><i class="fa fa-square-caret-down h4 pe-2 text-success"></i></a>',
    //         firstName,
    //         lastName,
    //         dob,
    //         email,
    //         address,
    //         graduation,
    //         '<a href="javascript:void(0)" class="edit-btn" type="button" id="edit-btn"><i class="fa fa-pen-to-square h4 pe-2 text-success"></i></a><a href="javascript:void(0)" class="delete-btn" type="button" id="delete-btn"><i class="fa fa-trash h4 text-danger" ></i></a>',
    //     ]).draw().node();


    //     $(rowNode).data('educationData', educationData);
    //     $(rowNode).data('educationData1', educationData1);

    //     rowNode.id = uniqueId;
    // }
    function addRowDataToTable(firstName, lastName, dob, email, address, graduation) {
        const uniqueId = 'row_' + rowCount++;

        const rowNode = table.row.add([
            '<a href="javascript:void(0)" class="expand-btn" type="button" id="expand-btn"><i class="fa fa-square-caret-down h4 pe-2 text-success"></i></a>',
            firstName,
            lastName,
            dob,
            email,
            address,
            graduation,
            '<a href="javascript:void(0)" class="edit-btn" type="button" id="edit-btn"><i class="fa fa-pen-to-square h4 pe-2 text-success"></i></a><a href="javascript:void(0)" class="delete-btn" type="button" id="delete-btn"><i class="fa fa-trash h4 text-danger" ></i></a>',
        ]).draw().node();

        const educationDataArray = [];

        for (let i = 0; i <= rowCount - 1; i++) {
            const degree = $(`#degree${i}`).val();
            const school = $(`#school${i}`).val();
            const passyear = $(`#passyear${i}`).val();
            const startDate = $(`#startDate${i}`).val();
            const percentage = $(`#percentage${i}`).val();
            const backlog = $(`#backlog${i}`).val();

            const educationData = { degree, school, passyear, startDate, percentage, backlog };
            educationDataArray.push(educationData);

            if(i==2){
                console.log(educationDataArray);
            }
        }

        $(rowNode).data('educationDataArray', educationDataArray);

        rowNode.id = uniqueId;
    }

    function clearEducationFields() {
        for (let i = 0; i <= rowCount; i++) {
            $(`#degree${i}`).val('');
            $(`#school${i}`).val('');
            $(`#passyear${i}`).val('');
            $(`#startDate${i}`).val('');
            $(`#percentage${i}`).val('');
            $(`#backlog${i}`).val('');
        }
    }

    function addRowToEduTable(degree, school, passyear, startDate, percentage, backlog) {
        var newEduRow = `<tr>
        <td>${degree}</td>
        <td>${school}</td>
        <td>${passyear}</td>
        <td>${startDate}</td>
        <td>${percentage}</td>
        <td>${backlog}</td>
        </tr>`;

        $('#tbody1').append(newEduRow);
    }

    $('#add-btn').click(function (e) {
        e.preventDefault();
        isEditing = false;

        $('#myModal').modal('show');

        $('#fname').val('');
        $('#lname').val('');
        $('#dob').val('');
        $('#email').val('');
        $('#address').val('');
        $('#gradyear').val('');

        clearEducationFields();
    });

    $('#submitBtn').click(function (e) {
        e.preventDefault();

        var firstName = $('#fname').val();
        var lastName = $('#lname').val();
        var dobOfBirth = $('#dob').val();
        var emailId = $('#email').val();
        var address = $('#address').val();
        var gradYear = $('#gradyear').val();

        var degree = $('#degree').val();
        var school = $('#school').val();
        var passyear = $('#passyear').val();
        var startDate = $('#startDate').val();
        var percentage = $('#percentage').val();
        var backlog = $('#backlog').val();




        if (firstName && lastName && dobOfBirth && emailId && address && gradYear) {

            if (isEditing && editedRow) {
                editedRow.find('td').eq(0).text(firstName);
                // console.log(firstName);
                editedRow.find('td').eq(1).text(lastName);
                editedRow.find('td').eq(2).text(dobOfBirth);
                editedRow.find('td').eq(3).text(emailId);
                editedRow.find('td').eq(4).text(address);
                editedRow.find('td').eq(5).text(gradYear);


                var rowData = table.row(editedRow).data();
                rowData[0] = firstName;
                rowData[1] = lastName;
                rowData[2] = dobOfBirth;
                rowData[3] = emailId;
                rowData[4] = address;
                rowData[5] = gradYear;


                table.row(editedRow).data(rowData).draw();
            }
            else {
                // var newRow = '<tr><td>' + firstName + '</td><td>' + lastName + '</td><td>' + dobOfBirth + '</td><td>' + emailId + '</td><td>' + address + '</td><td>' + gradYear + '</td><td><i class="fa fa-pen-to-square h4 pe-2 text-success edit-btn"></i> <i class="fa fa-trash h4 delete-btn text-danger"></i></td></tr>';
                // $('#tbody').append(newRow);
                addRowDataToTable(firstName, lastName, dobOfBirth, emailId, address, gradYear);
                addRowToEduTable(degree, school, passyear, startDate, percentage, backlog);

                // table.row(newRowNode).invalidate().draw();
            }

        }

        // $('#myModal').modal('hide');
    }
    );
    $('#userDetails').on('click', '.delete-btn', function () {
        var table = $('#userDetails').DataTable();
        table.row($(this).parents('tr')).remove().draw();
    });

    $(document).on('click', '.edit-btn', function () {
        isEditing = true;
        editedRow = $(this).closest('tr');

        var firstName = editedRow.find('td').eq(0).text();
        var lastName = editedRow.find('td').eq(1).text();
        var dobOfBirth = editedRow.find('td').eq(2).text();
        var emailId = editedRow.find('td').eq(3).text();
        var address = editedRow.find('td').eq(4).text();
        var gradYear = editedRow.find('td').eq(5).text();


        $('#fname').val(firstName);
        $('#lname').val(lastName);
        $('#dob').val(dobOfBirth);
        $('#email').val(emailId);
        $('#address').val(address);
        $('gradyear').val(gradYear);

        $('#myModal').modal('show');
    });

    // $(document).on('click', '.expand-btn', function () {
    //     let $row = $(this).closest('tr');
    //     let educationData = $row.data('educationData');
    //     let educationData1 = $row.data('educationData1');

    //     if ($row.next().hasClass('nested')) {
    //         $row.next().remove();
    //         return;
    //     }

    //     let nestedTable = `
    //         <tr class="nested">
    //             <td colspan="12">
    //                 <table class="nested-table w-100">
    //                     <thead>
    //                         <tr>
    //                             <th>Degree</th>
    //                             <th>School</th>
    //                             <th>Start Date</th>
    //                             <th>Passing Year</th>
    //                             <th>Percentage</th>
    //                             <th>Backlog</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>`;

    //     nestedTable += '<tr>';
    //     nestedTable += '<td>' + educationData.degree + '</td>';
    //     // console.log(educationData.degree);
    //     nestedTable += '<td>' + educationData.school + '</td>';
    //     nestedTable += '<td>' + educationData.startDate + '</td>';
    //     nestedTable += '<td>' + educationData.passyear + '</td>';
    //     nestedTable += '<td>' + educationData.percentage + '</td>';
    //     nestedTable += '<td>' + educationData.backlog + '</td>';
    //     nestedTable += '</tr>';

    //     nestedTable += ` `;

    //     nestedTable += '<tr>';
    //     nestedTable += '<td>' + educationData1.degree1 + '</td>';
    //     // console.log(educationData.degree);
    //     nestedTable += '<td>' + educationData1.school1 + '</td>';
    //     nestedTable += '<td>' + educationData1.startDate1 + '</td>';
    //     nestedTable += '<td>' + educationData1.passyear1 + '</td>';
    //     nestedTable += '<td>' + educationData1.percentage1 + '</td>';
    //     nestedTable += '<td>' + educationData1.backlog1 + '</td>';
    //     nestedTable += '</tr>';

    //     nestedTable += `

    //                     </tbody>
    //                 </table>
    //             </td>
    //         </tr>`;

    //     $row.after(nestedTable);
    // });

    $(document).on('click', '.expand-btn', function () {
        let $row = $(this).closest('tr');
        let educationDataArray = $row.data('educationDataArray');

        if ($row.next().hasClass('nested')) {
            $row.next().remove();
            return;
        }

        let nestedTable = `
            <tr class="nested">
                <td colspan="12">
                    <table class="nested-table w-100 table-striped  ">
                        <thead>
                            <tr>
                                <th>Degree</th>
                                <th>School</th>
                                <th>Start Date</th>
                                <th>Passing Year</th>
                                <th>Percentage</th>
                                <th>Backlog</th>
                            </tr>
                        </thead>
                        <tbody>`;

        educationDataArray.forEach(educationData => {
            nestedTable += `
                <tr>
                    <td>${educationData.degree}</td>
                    <td>${educationData.school}</td>
                    <td>${educationData.startDate}</td>
                    <td>${educationData.passyear}</td>
                    <td>${educationData.percentage}</td>
                    <td>${educationData.backlog}</td>
                </tr>`;

            console.log(educationData);
        });

        nestedTable += `
                        </tbody>
                    </table>
                </td>
            </tr>`;

        $row.after(nestedTable);
    });


    $("#first-name-err").hide();
    let fnameError = true;
    $("#fname").keyup(function () {
        validateFirstname();
    });

    function validateFirstname() {
        let fnameValue = $("#fname").val();
        let validFirstName = /^[A-Za-z]+$/;
        if (fnameValue.length == "") {
            $("#first-name-err").show();
            $("#first-name-err").html(" * First name is missing.");
            fnameError = false;
            return false;
        } else if (!validFirstName.test(fnameValue)) {
            $("#first-name-err").show();
            $("#first-name-err").html(" * Enter valid  characters only.");
            fnameError = false;
            return false;
        }
        else {
            $("#first-name-err").hide();
        }
    }

    $("#last-name-err").hide();
    let lnameError = true;
    $("#lname").keyup(function () {
        validateLastName();
    });

    function validateLastName() {
        let lnameValue = $("#lname").val();
        let validLastName = /^[A-Za-z]+$/;
        if (!validLastName.test(lnameValue)) {
            $("#last-name-err").show();
            $("#last-name-err").html(" * Enter valid  characters only.");
            lnameError = false;
            return false;
        } else {
            $("#last-name-error").hide();
        }
    }

    $("#email-err").hide();
    let emailError = true;
    $("#email").keyup(function () {
        validateEmail();
    });

    function validateEmail() {
        let emailValue = $("#email").val();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue.length == "") {
            $("#email-err").show();
            $("#email-err").html(" * Email is missing");
            emailError = false;
            return false;
        }
        else if (!emailRegex.test(emailValue)) {
            $("#email-err").show();
            $("#email-err").html(" * Enter valid email only.");
            emailError = false;
            return false;
        } else {
            $("#email-err").hide();
        }
    }

    $("#address-err").hide();
    let addressError = true;
    $("#address").keyup(function () {
        validateAddress();
    });

    function validateAddress() {
        let addressValue = $("#address").val();
        if (addressValue.length == "") {
            $("#address-err").show();
            $("#address-err").html(" * Address is missing");
            addressError = false;
            return false;
        }
        else {
            $("#address-err").hide();
        }
    }

    $("#dob-err").hide();
    let dobError = true;
    $("#dob").keyup(function () {
        validateDOB();
    });

    function validateDOB() {
        let dobValue = $("#dob").val();
        let validDOB = /^\d{4}-\d{2}-\d{2}$/;
        if (!validDOB.test(dobValue)) {
            $("#dob-err").show();
            $("#dob-err").html(" * Enter valid date .");
            dobError = false;
            return false;
        } else {
            $("#dob-err").hide();
        }
    }

    $("#gradyear-err").hide();
    let gradYearError = true;
    $("#gradyear").keyup(function () {
        validateGradYear();
    });

    function validateGradYear() {
        let gradYearValue = $("#gradyear").val();
        let validGradYear = /^\d{2}-?\d{4}?$/;
        if (gradYearValue.length == "") {
            $("#gradyear-err").show();
            $("#gradyear-err").html(" * Graduation Year is missing");
            gradYearError = false;
            return false;
        }
        else if (!validGradYear.test(gradYearValue)) {
            $("#gradyear-err").show();
            $("#gradyear-err").html(" * Enter valid year.");
            gradYearError = false;
            return false;
        } else {
            $("#gradyear-err").hide();
        }
    }
});

