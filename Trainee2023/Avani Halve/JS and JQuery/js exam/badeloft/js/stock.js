var loginUser = JSON.parse(localStorage.getItem("loginUser"));
var username = loginUser[0].name;
document.getElementById("user").innerHTML = username;

var stockname = document.getElementById("stockname").value;
var eta = document.getElementById("etadate").value;
var partno = document.getElementById("partNumber").value;
var order = document.getElementById("orderNumber").value;
var notes = document.getElementById("notes").value;

function logout() {
   localStorage.removeItem("loginUser");
   location.replace("login.html");
}

function format(d) {
   let childRowHTML = "";
   if (d.itemDetails && d.itemDetails.length > 0) {
      childRowHTML += '<table cellpadding="5" cellspacing="0" border="0" style="width:100%;">';
      childRowHTML += "<thead><tr><th>Part No</th><th>Order No</th><th>Notes</th><th>Action</th></tr></thead>";
      childRowHTML += "<tbody>";
      d.itemDetails.forEach((itemDetail) => {
         childRowHTML +=
            "<tr><td>" +
            itemDetail.partno +
            "</td><td>" +
            itemDetail.order +
            "</td><td>" +
            itemDetail.notes +
            '</td><td><button type="button" class="btn btn-sm btn-delete" id="deletePart">&#x2715;</button></td></tr>';
      });
      childRowHTML += "</tbody></table>";
   }
   return childRowHTML;
}

var stockDetails = JSON.parse(localStorage.getItem("stockDetail"));
$(document).ready(function () {
   var table = $("#stockTable").DataTable({
      data: stockDetails,
      bFilter: false,
      bInfo: true,
      bLengthChange: false,

      language: {
         info: "items _START_ to _END_ of _TOTAL_ entries",
         search: "_INPUT_",
         searchPlaceholder: "Search here...",
         paginate: {
            previous: "<",
            next: ">",
         },
      },
      columns: [
         {
            className: "dt-control",
            orderable: false,
            targets: "_all",
            data: null,
            defaultContent: "",
         },
         { data: "stockName" },
         { data: "etaDate" },
         { data: "status" },
         { data: "createdBy" },
         { data: "createdDate" },
         { data: "notes" },
         {
            data: "null",
            render: function (data, type, row) {
               return (
                  '<button type="button" class="fa fa-pencil edit" style="border: none; color:grey;"></button>' +
                  '<button type="button" class="fa fa-history" style="border: none; color:grey;"></button>'
               );
            },
         },
      ],
      order: [[1, "asc"]],
   });

   $("#stockForm").validate({
      rules: {
         stockname: {
            required: true,
         },
         etadate: {
            required: true,
         },
      },
      messages: {
         stockname: {
            required: "Enter Stock Name",
         },
         etadate: {
            required: "Enter ETA Date",
         },
      },
   });

   //edit
   $("#stockTable tbody").on("click", ".edit", function () {
      console.log(table.row(this).data());
      var data = table.row($(this).parents("tr")).data();
      var index = table.row($(this).parents("tr")).index();
      $("#stockname").val(data.stockName);
      $("#etadate").val(data.etaDate);
      $('input[name="stock_status"][value="' + data.status + '"]').prop("checked", true);
      if (data.itemDetails && data.itemDetails.length > 0) {
         let dynamicTR = "<thead><th>Part Number</th><th>Invoice#</th><th>Ordered</th><th>Notes</th><th></th></thead><tbody>";
         data.itemDetails.forEach(function (PartData) {
            dynamicTR +=
               "<tr>" +
               "<td>" +
               PartData.partno +
               "</td>" +
               "<td>" +
               "<td>" +
               PartData.order +
               "</td>" +
               "<td>" +
               PartData.notes +
               "</td>" +
               "<td class='text-end'><button type='button' class='btn-close btn-delete' aria-label='Close'></button></td></tr>";
         });
         dynamicTR += "</tbody>";
         console.log("row" + dynamicTR);
         $("#parttable").html(dynamicTR);
      }
      itemDetails = data.itemDetails;
      $("#AddStock").modal("show");
      console.log(itemDetails);
      $("#save")
         .unbind()
         .click(function () {
            var StockName = $("#stockname").val();
            var ETADate = $("#etadate").val();
            var StockStatus = $('input[name="stock_status"]:checked').val();
            var createddate = "08/25/2000";

            var StockDataObject = {
               stockName: StockName,
               etaDate: ETADate,
               status: StockStatus,
               createdBy: username,
               createdDate: createddate,
               notes: "Static notes",
               Action: "",
               itemDetails: itemDetails,
            };
            var StockData = JSON.parse(localStorage.getItem("stockDetail")) || [];
            StockData[index] = StockDataObject;
            localStorage.setItem("stockDetail", JSON.stringify(StockData));
            $("#save").modal("hide");
            location.reload(true);
         });

         //delete part from delete
         $("#parttable").on("click", ".btn-delete", function() {
            $(this).closest("tr").remove();
            itemDetails.splice((this),1);
         });
   });

   //delete the row
   // $("#stockTable tbody").on("click", ".fa-history", function () {
      
   // //    debugger;
   // //    var row = table.row($(this).parents("tr"));
   // //    var data = row.data();
   // //    var index = stockDetails.findIndex(function (item) {
   // //       return item.stockName === data.stockName;
   // //    });
   // //    if (index !== -1) {
   // //       stockDetails.splice(index, 1);
   // //       localStorage.setItem("stockDetail", JSON.stringify(stockDetails));
   // //    }
   // //    row.remove().draw();
   // // });

   // // $("#stockTable tbody").on("click", "td.dt-control", function () {
   // //    var tr = $(this).closest("tr");
   // //    var row = table.row(tr);
   // //    if (row.child.isShown()) {
   // //       row.child.hide();
   // //       tr.removeClass("shown");
   // //    } else {
   // //       row.child(format(row.data())).show();
   // //       tr.addClass("shown");
   // //    }
   // });

   //delete part
   //    $("#parttable tbody").on("click", "#deletePart", function () {
   //       debugger;
   //       var row = table.row($(this).parents("tr"));
   //       var data = row.data();
   //       var index = stockDetails.findIndex(function (item) {
   //          return item.partno === data.partno;
   //       });
   //       if (index !== -1) {
   //          stockDetails.splice(index, 1);
   //          localStorage.setItem("stockDetail", JSON.stringify(stockDetails));
   //       }
   //       row.remove().draw();
   //    });
});

$("#save").click(function () {
   let stockName = $("#stockname").val();
   let eta = $("#etadate").val();
   let status = $('input[name="stock_status"]:checked').val();

   let stockDetails = {
      stockName: stockName,
      etaDate: eta,
      status: status,
      createdBy: username,
      createdDate: eta,
      notes: "Static notes",
      Action: "",
      itemDetails: stockItemDetails,
   };

   var stockDetailsArray = JSON.parse(localStorage.getItem("stockDetail"));
   if (!stockDetailsArray) {
      stockDetailsArray = [];
   }
   stockDetailsArray.push(stockDetails);
   localStorage.setItem("stockDetail", JSON.stringify(stockDetailsArray));

   $("#stockname").val("");
   $("#etadate").val("");
   stockItemDetails = [];
   table.row.add(stockDetails).draw();
});

$("#newBtn").click(function () {
   $("#stockname").val("");
   $("#etadate").val("");
});

$("#addpart").click(function(){
   $("#partNumber").val("");
   $("#orderNumber").val("");
   $("#notes").val("");
})

var stockItemDetails = [];
function addItemDetails() {
   let partNo = document.getElementById("partNumber").value;
   let order = document.getElementById("orderNumber").value;
   let notes = document.getElementById("notes").value;
   let invoice = 15001;

   let stockDetail11 = {
      partno: partNo,
      order: order,
      notes: notes,
   };

   stockItemDetails.push(stockDetail11);

   let dtr = "<tr>";
   dtr = dtr + "<td class='txtpartno' data-id='" + stockDetail11.partno + "' >" + stockDetail11.partno + "</td>";
   dtr = dtr + "<td class='txtinvoice' >" + invoice++ + "</td>";
   dtr = dtr + "<td class='txtorder' >" + stockDetail11.order + "</td>";
   dtr = dtr + "<td class='txtnotes' >" + stockDetail11.notes + "</td>";
   dtr = dtr + "<td class='tdAction'><button type='button' class='btn btn-sm btn-delete'>&#x2715;</button></td>";
   dtr = dtr + "</tr>";
   $("#parttable tbody").append(dtr);

}

// $("#parttable tbody").on("click", ".btn-delete", function () {
//    debugger;
//    if (stockItemDetails.length == 1) {
//       alert("can't delete last part");
//    } else {
//       $(this).closest("tr").remove();
//    }
// });

$("#search").on("keyup", function () {
   var value = $(this).val().toLowerCase();
   $("#stockTable tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
   });
});
