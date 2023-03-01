// Jquery
$(document).ready(function () {
  // Dynamic adding of name
  var user = JSON.parse(localStorage.getItem("user"));
  var jName = user[0].Admin;
  console.log(jName);
  $(".dynamicN").html(jName);

  // Dynamic adding image
  var jImg = user[0].Image;
  console.log(jImg);
  $(".adminImg").attr("src", user[0].Image);
});

// window.load(onD());
window.onload = (event) => {
  if (localStorage.getItem("user") == null) {
    window.location.replace("Login.html");
  }
};

var $navItems = $(".navbar-collapse li").removeClass("active");

$navItems
  .filter(function () {
    return $(this).find("a").prop("href") === location.href;
  })
  .addClass("active");

//Logout
function logout() {
  localStorage.removeItem("user");
  window.location.replace("Login.html");
}

// test
var r = JSON.parse(localStorage.getItem("newStock"));
console.log(r);

function format(d) {
  let dynamicChildRow = "";
  if (d.Part && d.Part.length > 0) {
    dynamicChildRow +=
      '<table cellpadding="5" class="table  table-border " cellspacing="0"  style="padding-left:50px;width:95%; margin-left:4%">';
    dynamicChildRow +=
      '<thead class ="table border text-center"><tr style= "background-color:#ebebeb" ><th style="color:black"><b> # </b></th><th style="color:black"><b>Part Number</b></th><th style="color:black"><b> Ordered </b></th><th style="color:black"><b>Assigned</b></th></tr></thead>';
    dynamicChildRow += "<tbody  class ='table '  >";
    d.Part.forEach((e, index) => {
      let indx = index + 1;
      dynamicChildRow +=
        "<tr><td>" +
        indx +
        "</td><td>" +
        e.PartN +
        "</td><td>" +
        e.Order +
        "</td><td>" +
        e.Comments +
        "</td></tr>";
    });
    dynamicChildRow += "</tbody></table>";
  }
  return dynamicChildRow;
}

// parts new

function modal() {
  $("#StockModal").modal("show");
  parts = [];
}

// to get todays date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = dd + "/" + mm + "/" + yyyy;
// document.write(today);

// global variable
var table;
$(document).ready(function () {
  var datin = JSON.parse(localStorage.getItem("newStock"));
  console.log(datin);

  table = $("#stock_table").DataTable({
    data: datin,
    language: {
      info: "Items _START_ to _END_ of _TOTAL_ total",
      paginate: {
        next: "&#62",
        previous: "&#60",
      },
    },

    order: [],
    dom: "rtip",
    columnDefs: [
      {
        defaultContent: "-",
        targets: "_all",
      },
    ],
    bInfo: true,
    columns: [
      {
        data: "stock",
        title: "Stock Name",
        className: "dt-control",
        orderable: false,
      },
      {
        data: "date",
        title: "ETA Date",
        orderable: false,
        class: "text-center",
      },
      {
        data: "stock_S",
        title: "Stock Location",
        orderable: false,
        class: "text-center",
      },
      {
        data: "user[0].Admin",
        title: "Created By",
        orderable: false,
        class: "text-center",
      },
      {
        data: "CreatedDate",
        title: "Created Date",
        orderable: false,
        class: "text-center",
      },
      {
        data: "Part[0].Comments",
        title: "Notes",
        orderable: false,
        class: "text-center",
      },
      {
        data: "null",
        title: "Action",
        orderable: false,
        className: "dt-center editor-edit",
        defaultContent:
          '<i class="bi bi-pencil-fill text-secondary fw-bolder fs-6" on-click="editdata()"/> <i class="bi bi-clock-history text-secondary fw-bolder fs-6"/>',
      },
    ],
  });

  // Add event listener for opening and closing details
  $("#stock_table tbody").on("click", "td.dt-control", function () {
    var tr = $(this).closest("tr");
    var row = table.row(tr);

    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass("shown");
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass("shown");
    }
  });
});

// Array creation
var parts = new Array();

function getM() {
  var partN = document.getElementById("pNum").value;
  var order = document.getElementById("order").value;
  var comments = document.getElementById("floatingTextarea").value;

  if (partN == "" && order == "") {
    Swal.fire({
      title: "Error!",
      text: "Add part Name",
      icon: "error",
    });
  } else {
    parts.push({
      PartN: partN,
      Order: order,
      Comments: comments,
    });
  }
}

// add
var r1 = document.getElementById("btnradio1").checked;
var r2 = document.getElementById("btnradio1").checked;
var r3 = document.getElementById("btnradio1").checked;
var user = JSON.parse(localStorage.getItem("user"));
console.log(user);

var newStock = [];
var rv1;

function addData() {
  //login user

  // parts
  var stockN = document.getElementById("stock").value;
  var dateM = document.getElementById("date").value;

  // radio btn val
  // if (r1 == true) {
  //   r1V = "On Production";
  // } else if (r2 == true) {
  //   r1V = "On Water";
  // } else if (r3 == true) {
  //   r1V = "In Warehouse";
  // }

  r1V = display();

  console.log(parts.length);
  if (stockN != null && parts.length > 0) {
    if (localStorage.getItem("newStock") == null) {
      newStock = [];
      var newObj = {
        stock: stockN,
        date: dateM,
        stock_S: r1V,
        CreatedDate: today,
        Part: parts,
        user: user,
      };
      newStock.push(newObj);
    } else {
      newStock = JSON.parse(localStorage.getItem("newStock"));
      var newObj = {
        stock: stockN,
        date: dateM,
        stock_S: r1V,
        CreatedDate: today,
        Part: parts,
        user: user,
      };
      newStock.push(newObj);
    }

    table.row.add(newObj).draw();
    localStorage.setItem("newStock", JSON.stringify(newStock));
    $("#StockModal").modal("hide");
    resetSVal();
  } else {
    if (stockN == "") {
      Swal.fire({
        title: "Error!",
        text: "Add Stock Name",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please add part",
        icon: "error",
      });
    }
  }

  parts = [];
}

// loading the documnet to show data in table
// document.onload = showMt2();

// show data
function showMt2() {
  var html = "";
  html =
    "<thead><th class=text-start>Part Number</th><th class=text-start>Invoice#</th><th class=text-start>Ordered</th><th class=text-start>Notes</th><th class=text-center></th></thead><tbody id='root'>";
  parts.forEach(function (element, index) {
    html += "<tr>";
    html += "<td class=text-start>" + parts[index].PartN + "</td>";
    html += "<td class=text-start>" + Date.now() + "</td>";
    html += "<td class=text-start>" + parts[index].Order + "</td>";
    html += "<td class=text-start>" + parts[index].Comments + "</td>";
    html +=
      "<td class=text-center><i class= 'fa-solid fa-x' onclick='deleteData( " +
      index +
      " )'></i> </td>";
    html += "</tr>";
    html += "</tbody>";

    $("#partTable").html(html);

    $("#PartModal").modal("hide");
  });
}

//reset
function resetSVal() {
  document.getElementById("stock").value = "";
  document.getElementById("pNum").value = "";
  document.getElementById("order").value = "";
  document.getElementById("floatingTextarea").value = "";
}

function resetPartModal() {
  document.getElementById("pNum").value = "";
  document.getElementById("order").value = "";
  document.getElementById("floatingTextarea").value = "";
}
// for search bar
$("#stock_search").on("keyup", function () {
  table.search(this.value).draw();
});

// daterangepicker
$(function () {
  $('input[name="ETA"]').daterangepicker(
    {
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      maxYear: parseInt(moment().format("YYYY"), 10),
    },
    function (start, end, label) {
      var years = moment().diff(start, "years");
    }
  );
});

$("#stock_table").on("click", "td.editor-edit", function (e) {
  e.preventDefault();
  $("#StockModal").modal("show");

  var indexRow = table.row(this).index();
  console.log(indexRow);

  var tabledata = table.row(this).data();
  console.log(tabledata);

  var newStockModal = JSON.parse(localStorage.getItem("newStock"));
  console.log(newStockModal[indexRow].Part[0]);

  document.getElementById("stock").value = newStockModal[indexRow].stock;
  document.getElementById("date").value = newStockModal[indexRow].date;
  // document.getElementById("pNum").value = newStockModal[indexRow].Part[0].PartN;
  // document.getElementById("order").value =  newStockModal[indexRow].Part[0].Order;
  // document.getElementById("floatingTextarea").value =  newStockModal[indexRow].Part[0].Comments;

  document.querySelector("#myMod").onclick = function () {
    var ustock = (newStockModal[indexRow].stock =
      document.getElementById("stock").value);
    var udate = (newStockModal[indexRow].date =
      document.getElementById("date").value);

    if (r1 == true) {
      r1V = "On Production";
    } else if (r2 == true) {
      r1V = "On Water";
    } else if (r3 == true) {
      r1V = "In Warehouse";
    }

    var newObj = {
      stock: ustock,
      date: udate,
      stock_S: r1V,
      CreatedDate: today,
      Part: parts,
      user: user,
    };

    newStock[indexRow] = newObj;
    localStorage.setItem("newStock", JSON.stringify(newStock));
    $("#StockModal").modal("hide");
  };
});

function display() {
  var r;
  if (document.getElementById("btnradio1").checked) {
    r = document.getElementById("btnradio1").value;
  } else if (document.getElementById("btnradio2").checked) {
    r = document.getElementById("btnradio2").value;
  } else if (document.getElementById("btnradio3").checked) {
    r = document.getElementById("btnradio3").value;
  }
  return r;
}
