var SecondPartDetail = [];
var StockDetails = [];
var table;
var index = 1;
function format(d) {
  console.log(d);
  // var showPartDetails = d.SecondPartDetail;
  console.log(SecondPartDetail);

  if(d.StockDetails==null)
  {
    d.StockDetails=SecondPartDetail;
  }

  var childrow = "";
  childrow += '<table cellpadding="2" id="ChildTableStock" cellspacing="0" class="table ChildTableStock">';
  childrow += '<thead><tr><th text-right style="width: 50px">#</th><th style="width: 180px";>Part Number</th><th style="width: 180px;">Ordered</th><th style="width: 180px;">Assigned</th><th style="width: 150px;">Notes</th><th text-left">Action</th></tr></thead>';
  childrow += '<tbody>';
  SecondPartDetail.forEach((e, index) => {
    var index = (index + 1);
    childrow += '<tr><td>' + index + '</td><td>' + e.Partnumber + '</td><td>' + e.Ordered + '</td><td>' + 5 + '</td><td>' + e.Notes + '</td><td><h5><i class="fa fa-times"></i></h5></td></tr>';
  });
  childrow += '</tbody></table>';
  return childrow;
}


function logout() {
  window.location.replace("login.html")
  localStorage.clear();
}

window.onload = (event) => {
  if (localStorage.getItem("Badeloft-Details") == null) {
    window.location.replace("login.html");
  }
  else {
    var par = JSON.parse(localStorage.getItem('Badeloft-Details'));
    var u = par[0].username;
    var uname = document.getElementById("username");
    uname.innerHTML = u;
  }
};

function SecondPartDetails() {
  var Partnumber = document.getElementById('partNo').value;
  var Ordered = document.getElementById('order').value;
  var Notes = document.getElementById('notes').value;
  var invoice = 15000;
  if (SecondPartDetail == null) {
    SecondPartDetail = [];
  }
  SecondPartDetail.push({
    Partnumber: Partnumber,
    invoice: invoice,
    Ordered: Ordered,
    Notes: Notes
  });
  console.log(Notes);
  var html = "";
  SecondPartDetail.forEach(function (element, index) {
    let ind = index + 1;
    html += "<tr>";
    html += "<td>" + element.Partnumber + "</td>";
    html += "<td>" + element.invoice + "</td>";
    html += "<td>" + element.Ordered + "</td>";
    html += "<td>" + element.Notes + "</td>";
    html += "<td>" + '<i class="fa fa-times"></i>' + "</td>";
    html += "<tr>";
    document.getElementById("ModalData").innerHTML = html;

  });
  document.getElementById("partNo").value = "";
  document.getElementById("order").value = "";
  document.getElementById("notes").value = "";
}


function AddNewStock() {

  const CreatedDate = new Date(Date.now()).toLocaleString().split(',')[0];
  console.log("SecondPartDetails", SecondPartDetail);

  var stockName = document.getElementById('StockName').value;
  var EtaDate = document.getElementById('ETADate').value;
  var SelectedRadio = document.forms.AddStockForm.StockStatus.value;
  console.log(SelectedRadio);
  var GetName = JSON.parse(localStorage.getItem('Badeloft-Details'));
  var CreatedBy = GetName[0].username;
  console.log(CreatedBy);
  var Notes = "StockPart Add";

  var stockObj = {
    index: index,
    stockName : stockName,
    EtaDate :EtaDate,
    SelectedRadio :SelectedRadio,
    CreatedBy : CreatedBy,
    CreatedDate: CreatedDate,
    Notes:Notes,
    SecondPartDetail:SecondPartDetail
  }
  index++;
  console.log(index);
  console.log("SecondPartDetail", SecondPartDetail)
  var StockDetail = JSON.parse(localStorage.getItem("StockDetails")) || [];
  StockDetail.push(stockObj);
  localStorage.setItem("StockDetails", JSON.stringify(StockDetail));
  console.log("StockDetails", StockDetail);
  table.row.add(
    {
      "stockName": stockName,
      "EtaDate": EtaDate,
      "SelectedRadio": SelectedRadio,
      "CreatedBy": CreatedBy,
      "CreatedDate": CreatedDate,
      "Notes": Notes,
    }).draw();
    // document.getElementById("StockName").value = "";
    // document.getElementById("ETADate").value = "";
    // document.getElementById("partNo").value = "";
    // document.getElementById("order").value = "";
    // document.getElementById("notes").value = "";
  }
// $(function() {
//   $('input[name="ETADate"]').daterangepicker({
//     singleDatePicker: true,
//     showDropdowns: true,
//     minYear: 1901,
//     maxYear: parseInt(moment().format('YYYY'),10)
//   })
// });

// $("#addRow").click(function () {
 
//       if ($("#txtId").val() == '') {
//           addDataToLocal();
//       } else {
//           updateDataFromLocal();
//       }
//   })
$(document).ready(function () {
  var modal = document.getElementById("AddStock");
  table = $('#Stock_Table').DataTable({

    data: JSON.parse(localStorage.getItem("StockDetails")),
    "dom": '<"toolbar">frtip',
    bFilter: true,
    bInfo: true,
    responsive: true, 
    fnInitComplete: function () {
      $('div.toolbar').html('<h2>Stock</h2>');
      $('#Stock_Table_filter').prepend(modal);
    },
    language: {
      search: "_INPUT_",
      // "search": '<i class="fa fa-search"></i>',
      searchPlaceholder: 'Search...',
      paginate: {
        next: '&#62',
        previous: '&#60'
      },
      "info": "Items _START_ to _END_ of _TOTAL_ total"

    },
    columns: [

    { title: 'Stock Name', orderable: false, className: "text-start dt-control", data: "stockName" },
    { title: 'ETA Date', orderable: false, className: "text-center", data: "EtaDate" },
    { title: 'Stock Location', orderable: false, className: "text-center", data : "SelectedRadio"},
    { title: 'Created By', orderable: false, className: "text-center",data : "CreatedBy" },
    { title: 'Created Date', orderable: false, className: "text-center",data: "CreatedDate" },
    {
      data: null,
      title: 'Action',
      orderable: false,
      defaultContent: '<div class="action-buttons">' +
        '<span  class="editStock" data-id="' + index + '"><i class="fas fa-pen"></i></span> ' +
        '<span class="history">&nbsp;&nbsp;<i class="fas fa-history"></i></span> ' +
        '</div>',
      className: 'row-edit dt-center',
    }
    ],
    
  });

  // Edit Part
  $('#Stock_Table tr').on( 'click', '.editStock', function () {
    
     $("#AddNewStock").modal("show");
     var StockData = table.row( $(this).closest('tr')).data();
  
    document.getElementById("StockName").value = StockData.stockName;
    document.getElementById("ETADate").value = StockData.EtaDate;
    console.log()
    var html = "";
    
    StockData.SecondPartDetail.forEach(function (element, index) {
      html += "<tr>";
      html += "<td>" + element.Partnumber + "</td>";
      html += "<td>" + element.invoice + "</td>";
      html += "<td>" + element.Ordered + "</td>";
      html += "<td>" + element.Notes + "</td>";
      html += "<td>" + '<i class="fa fa-times"></i>' + "</td>";
      html += "</tr>";
      document.getElementById("ModalData").innerHTML = html;
    })
});
$('#SaveStock').on('click', function() {
  debugger
  var updatedStockName = document.getElementById("StockName").value;
  console.log(updatedStockName);
  var updatedETADate = document.getElementById("ETADate").value;
  console.log(updatedETADate);
  var updatedSecondPartDetail = [];
  
  $("#ModalData > tr").each(function() {
    debugger
    var updatedPartnumber = $(this).find("td").eq(0).html();
    var updatedInvoice = $(this).find("td").eq(1).html();
    var updatedOrdered = $(this).find("td").eq(2).html();
    var updatedNotes = $(this).find("td").eq(3).html();
    updatedSecondPartDetail.push({
      "Partnumber": updatedPartnumber,
      "invoice": updatedInvoice,
      "Ordered": updatedOrdered,
      "Notes": updatedNotes
    });
  });
  
  var rowData = {
    "stockName": updatedStockName,
    "EtaDate": updatedETADate,
    "SecondPartDetail": updatedSecondPartDetail
  };
  
  var row = table.row($(this).closest('tr'));
  row.data(rowData).draw();
  
  $("#AddNewStock").modal("hide");
});

  $('#AddPartNumber').click(function () {
    $('#addpartModal').modal('show');
  });

  $('#AddStock').click(function () {
    $('#AddNewStock').modal('show');
  });

  $('#Stock_Table tbody').on('click', 'td.dt-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row(tr);

    if (row.child.isShown()) {
      row.child.hide();
      tr.removeClass('shown');
    } else {
      row.child(format(row.data())).show();
      tr.addClass('shown');
    }
  });
});
