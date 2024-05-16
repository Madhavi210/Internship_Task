const foodData = [];
var foodTable = $('#foodTable').DataTable();

function AddData() {
    var cname = document.getElementById('cname').value;
    var cdesc = document.getElementById('cdesc').value;

    var activeElement = document.getElementById('active');
    var active = activeElement.checked ? 'Yes' : 'No';

    var ldate = document.getElementById('ldate').value;
    var curruntDate = new Date();
    var selectedDate = new Date(ldate);
    var diff = curruntDate - selectedDate;
    var diffDay = diff / (1000 * 60 * 60 * 24);
    var categoryStatus = (diffDay <= 7) ? 'New' : 'Old';
    var id = Math.floor(Math.random() * 1000);

    var temp = {
        id: id,
        cname: cname,
        cdesc: cdesc,
        active: active,
        categoryStatus: categoryStatus,
        ldate: ldate,
        items: []
    };

    var rowData = [
        '<button class="btn btn-info btn-sm expandBtn">Expand</button>',
        cname,
        cdesc,
        active,
        categoryStatus,
        '<button class="btn btn-primary btn-sm editBtn me-2" onclick="editData(' + id + ')">Edit</button><button class="btn btn-danger btn-sm deleteBtn" onclick="deleteData(' + id + ')">Delete</button>'
    ];

    $('.itemEntry').each(function () {
        var entryId = $(this).find('[id^="iname"]').attr('id').replace('iname', '');
        var item = {
            iname: $(this).find('#iname' + entryId).val(),
            idesc: $(this).find('#idesc' + entryId).val(),
            foodType: $(this).find('#foodType' + entryId).val(),
            price: $(this).find('#price' + entryId).val(),
            discount: $(this).find('#discount' + entryId).val(),
            gst: $(this).find('#gst' + entryId).val(),
            iactive: $(this).find('#iactive' + entryId).prop('checked') ? 'Yes' : 'No'
        };

        item.id = id;
        temp.items.push(item);
    });


    foodData.push(temp);
    console.log(foodData);
    foodTable.row.add(rowData).draw();

    $('#modalId').modal('hide');
    $('form input').val('');
    $('textarea').val('');
    $('.itemEntry:gt(0)').remove();

}

$('#foodTable tbody').on('click', '.expandBtn', function () {
    let $row = $(this).closest('tr');
    let rowData = foodTable.row($row).data();
    let id = rowData[0];
    let rowIndex = foodTable.row($row).index();

    if ($row.next().hasClass('nested')) {
        $row.next().remove();
        return;
    }

    let index = 1;
    let totalPrice = 0;
    let totalDiscount = 0;

    let nestedTable = `
        <tr class="nested">
            <td colspan="12">
                <table class="table nested-table w-100">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Item Name</th>
                            <th>Food Type</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Discounted Price</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    let items = foodData[rowIndex].items;

    items.forEach(function (item) {
        let discountedPrice = item.price - (item.price * (item.discount / 100));
        totalPrice += parseFloat(item.price);
        totalDiscount += parseFloat((discountedPrice));

        nestedTable += '<tr>'
        nestedTable += '<td>' + index++ + '</td>'
        nestedTable += '<td>' + item.iname + '</td>'
        nestedTable += '<td>' + item.foodType + '</td>'
        nestedTable += '<td>' + item.price + '</td>'
        nestedTable += '<td>' + item.discount + '</td>'
        nestedTable += '<td>' + discountedPrice.toFixed(2) + '</td>'
        nestedTable += '</tr>'
    });

    nestedTable += `<tr>
    <td colspan="3">Total</td>
    <td class="text-center">${totalPrice.toFixed(2)}</td>
    <td ></td>
    <td class="text-center">${totalDiscount.toFixed(2)}</td>
     <td></td>
    </tr>`;;

    nestedTable += `
                    </tbody>
                </table>
            </td>
        </tr>
    `;

    $row.after(nestedTable);
});

var itemCount = 1;
function addRow() {
    if ($(".itemEntry").length >= 10) {
        alert("You can add a maximum of 10 items.");
        return;
    }

    var container = document.getElementById('itemForm');
    var form = `
    <div class="itemEntry" >
        <form action="" class="row">
            <div class="col col-lg-3 form-floating mb-3">
                <input type="text" class="form-control" placeholder="Item Name" id="iname${itemCount}" required>
                <label>Item Name</label>
                <p id="inameErr${itemCount}" style="color: red;"></p>
            </div>
            <div class="col col-lg-3 form-floating mb-3">
                <input type="text" class="form-control" placeholder="Description" id="idesc${itemCount}" required>
                <label>Description</label>
                <p id="idescErr${itemCount}" style="color: red;"></p>
            </div>
            <div class="col col-lg-3 form-floating mb-3">
                <select class="form-select" id="foodType${itemCount}" required>
                    <option value="dairyfood">Dairy Food</option>
                    <option value="seafood">Seafood</option>
                    <option value="vegan">Vegan</option>
                    <option value="veg" selected>Veg</option>
                    <option value="nonveg">Non-Veg</option>
                </select>
                <label>Food Type</label>
                <p id="foodTypeErr${itemCount}" style="color: red;"></p>
            </div>
            <div class="col col-lg-3 form-floating mb-3">
                <input type="number" class="form-control" placeholder="Price" id="price${itemCount}" required>
                <label>Price</label>
                <p id="priceErr${itemCount}" style="color: red;"></p>
            </div>
            <div class="col col-lg-3 form-floating mb-3">
                <input type="number" class="form-control" placeholder="Discount" id="discount${itemCount}" required>
                <label>Discount</label>
                <p id="discountErr${itemCount}" style="color: red;"></p>
            </div>
            <div class="col col-lg-3 form-floating mb-3">
                <input type="number" class="form-control" placeholder="GST" id="gst${itemCount}" required>
                <label>GST</label>
                <p id="gstErr${itemCount}" style="color: red;"></p>
            </div>
            <div class="col col-lg-3 mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="iactive${itemCount}" checked>
                    <label class="form-check-label" for="iactive${itemCount}">
                        Active
                    </label>
                </div>
                <p id="iactiveErr${itemCount}" style="color: red;"></p>
            </div>
            <div class="col col-lg-3 mb-3">
                <button class="btn btn-danger delete-btn" onclick="removeRow(${itemCount})">- Remove</button>
            </div>
        </form>
    </div>`;

    $(container).append(form);
    itemCount++;

}

function removeRow(id) {
    $(`#iname${id}`).closest('.itemEntry').remove();
    itemCount--;
}

function deleteData(id) {
    var index = foodData.findIndex(item => item.id === id);
    foodData.splice(index, 1);
    var row = foodTable.rows().nodes().to$().find('button[onclick="deleteData(' + id + ')"]').closest('tr');
    foodTable.row(row).remove().draw();
    console.log(foodData);

}


function editData(id) {
    var index = foodData.findIndex(item => item.id === id);
    console.log(index);

    let items = foodData[index].items;
    console.log(items);

    var cname = foodData[index].cname;
    var cdesc = foodData[index].cdesc;
    var active = foodData[index].active;
    var ldate = foodData[index].ldate;

    // Populate input fields with existing data
    document.getElementById('cname').value = cname;
    document.getElementById('cdesc').value = cdesc;
    document.getElementById('active').checked = active === 'Yes';
    document.getElementById('ldate').value = ldate;

    // Clear existing item forms
    $('.itemEntry').not(':first').remove();

    items.forEach(function (item, idx) {
        if (idx === 0) {
            document.getElementById('iname').value = item.iname;
            document.getElementById('idesc').value = item.idesc;
            document.getElementById('foodType').value = item.foodType;
            document.getElementById('price').value = item.price;
            document.getElementById('discount').value = item.discount;
            document.getElementById('gst').value = item.gst;
            document.getElementById('iactive').checked = item.iactive === 'Yes';
        } else {
            addRow();
            // console.log("inside > 0 " + idx);
            document.getElementById('iname' + (itemCount - 1)).value = item.iname;
            document.getElementById('idesc' + (itemCount - 1)).value = item.idesc;
            document.getElementById('foodType' + (itemCount - 1)).value = item.foodType;
            document.getElementById('price' + (itemCount - 1)).value = item.price;
            document.getElementById('discount' + (itemCount - 1)).value = item.discount;
            document.getElementById('gst' + (itemCount - 1)).value = item.gst;
            document.getElementById('iactive' + (itemCount - 1)).checked = item.iactive === 'Yes';
        }
    });

    let SubmitBtn = document.getElementById('sBtn');
    SubmitBtn.setAttribute('onclick', 'updateData(' + index + ')');

    $('#modalId').modal('show');
}


function updateData(index) {

    var cname = document.getElementById('cname').value;
    var cdesc = document.getElementById('cdesc').value;
    var activeElement = document.getElementById('active');
    var active = activeElement.checked ? 'Yes' : 'No';

    var ldate = document.getElementById('ldate').value;
    var curruntDate = new Date();
    var selectedDate = new Date(ldate);
    var diff = curruntDate - selectedDate;
    var diffDay = diff / (1000 * 60 * 60 * 24);
    var categoryStatus = (diffDay <= 7) ? 'New' : 'Old';

    foodData[index].cname = cname;
    foodData[index].cdesc = cdesc;
    foodData[index].active = active;
    foodData[index].categoryStatus = categoryStatus;


    var items = [];

    $('.itemEntry').each(function (idx) {
        var idx = $(this).find('[id^="iname"]').attr('id').replace('iname', '');

        if (idx == 0) {
            var item = {
                iname: $(this).find('#iname').val(),
                idesc: $(this).find('#idesc').val(),
                foodType: $(this).find('#foodType').val(),
                price: $(this).find('#price').val(),
                discount: $(this).find('#discount').val(),
                gst: $(this).find('#gst').val(),
                iactive: $(this).find('#iactive').prop('checked') ? 'Yes' : 'No'
            };
        }
        else {
            var item = {
                iname: $(this).find('#iname' + idx).val(),
                idesc: $(this).find('#idesc' + idx).val(),
                foodType: $(this).find('#foodType' + idx).val(),
                price: $(this).find('#price' + idx).val(),
                discount: $(this).find('#discount' + idx).val(),
                gst: $(this).find('#gst' + idx).val(),
                iactive: $(this).find('#iactive' + idx).prop('checked') ? 'Yes' : 'No'
            };
        }
        items.push(item);
    });

 
    foodData[index].items = items;



    var rowData = [
        '<button class="btn btn-info btn-sm expandBtn">Expand</button>',
        cname,
        cdesc,
        active,
        categoryStatus,
        '<button class="btn btn-primary btn-sm editBtn me-2" onclick="editData(' + foodData[index].id + ')">Edit</button><button class="btn btn-danger btn-sm deleteBtn" onclick="deleteData(' + foodData[index].id + ')">Delete</button>'
    ];

    foodTable.row(index).data(rowData).draw();
    console.log(foodData)
    let SubmitBtn = document.getElementById('sBtn');
    SubmitBtn.setAttribute('onclick', 'AddData()');
    $('form input').val('');
    $('textarea').val('');
    $('#modalId').modal('hide');

}


