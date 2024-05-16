// sidebar 
const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});


// Notification 
function notifyMe() {
  const img1 = document.getElementsByClassName('notify');
  const alrtmsg = document.getElementById('notfy');
  alrtmsg.style.display  = "block";
}


// read more java script section3

document.addEventListener('DOMContentLoaded', function() {
  const readMoreBtn = document.getElementById('read-more');
  const extraRows = document.querySelectorAll('.extra-row');
  let isOpen = false;

  readMoreBtn.addEventListener('click', function() {
    isOpen = !isOpen;
    extraRows.forEach(row => {
      row.style.display = isOpen ? 'table-row' : 'none';
    });
    readMoreBtn.textContent = isOpen ? 'Read Less' : 'Read More';
  });
});

// tabs section 5 

function onchange1() {
  var i;
  var btn1 = document.getElementsByClassName("tab-prod1");
  var btn2 = document.getElementsByClassName("tab-prod2");
 btn1[0].style.backgroundColor = "#5D5FEF";
 btn1[0].style.color = 'white'
 btn2[0].style.backgroundColor = "white";
 btn2[0].style.color = 'Black'
  let col1 = document.getElementsByClassName("lowcard1");
  let col2 = document.getElementsByClassName("lowcard2");

  for (i = 0; i < col1.length; i++) {
      col1[i].style.display = "block";
      col2[i].style.display = "none";
    }
    

}
function onchange2() {
  var i;
  var btn1 = document.getElementsByClassName("tab-prod1");
  var btn2 = document.getElementsByClassName("tab-prod2");
  btn1[0].style.backgroundColor = "white";
  btn2[0].style.backgroundColor = "#5D5FEF";
  btn2[0].style.color = 'white'
  btn1[0].style.color = 'black'
  let col1 = document.getElementsByClassName("lowcard1");
  let col2 = document.getElementsByClassName("lowcard2");

  for (i = 0; i < col1.length; i++) {
      col1[i].style.display = "none";
      col2[i].style.display = "block";
    }
    

}

