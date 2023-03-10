$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    var StockDetails = new Array();

    
    var AssignedStockData = JSON.parse(localStorage.getItem("Assigned"));

    $("#navigation").load("Navbar.html");
    //Display name in Navbar
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));

    var table;
    function format(d, ParentRowid) {
      debugger
      var AssignedStockData = JSON.parse(localStorage.getItem("Assigned"));
     console.log(AssignedStockData)
      let assignedValue = 0;
      if(AssignedStockData!=null || AssignedStockData!=undefined){
      console.log(ParentRowid)
      rowdata = STOCKS[ParentRowid];

      console.log("cc", rowdata.parts);
     
      for (let i = 0; i < AssignedStockData.length; i++) {
        for (let j = 0; j < AssignedStockData[i].AssignedParts.length; j++) {
          if (
            rowdata.stockname ==
            AssignedStockData[i].AssignedParts[j].selectedStock
          ) {
            // //debugger;
            for (let k = 0; k < rowdata.parts.length; k++) {
              for (
                let l = 0;
                l < AssignedStockData[i].AssignedParts[j].selectedStock.length;
                l++
              ) {
                if (
                  rowdata.parts[k].partsnumber ==
                  AssignedStockData[i].AssignedParts[j].selectedparts[l]
                )
                  assignedValue++;
              }
            }
          }
        }
      }}
      let list = "";
      if (d.parts && d.parts.length > 0) {
        list +=
          '<table id="childTable" cellpadding="5" cellspacing="0" border="0">';
        list +=
          "<thead><tr><th>#</th><th>Part Number</th><th>Ordered</th><th>Assigned</th><th>Action</th></tr></thead>";
        list += "<tbody>";
        d.parts.forEach((partdetail, index) => {
          list +=
            "<tr id=" +
            [index + 1] +
            "><td>" +
            [index + 1] +
            "</td><td>" +
            partdetail.partsnumber +
            "</td><td>" +
            partdetail.Order +
            "</td><td><button type='button' data-val=" +
            [index + 1] +
            " data-parentrowid=" +
            [ParentRowid] +
            ` class='btn showAssignedUser' data-bs-toggle='popover' data-bs-html='true' title="<div class='row'>
            <div class='col-sm-9 ps-0 pe-0'>
              <span>Assigned to </span>
            </div>
            <div class='col-sm-2 '>
              <a href='javascript:void(0)' class='d-flex justify-content-end close-popover' aria-label='Close'><div class='icon icon-16 icon-lg-16 mb-2 closePopoverbtn'>X</div></a>
            </div>
          </div>"  data-bs-content='<small>ekfjk</small>'>` +
            assignedValue +
            "</button></td><td class='deleteparts' data-val=" +
            [index + 1] +
            " data-parentrowid=" +
            [ParentRowid] +
            ">" +
            "<i class='bi bi-x-lg'></i> " +
            "</td>" +
            "</tr>";
        });
        list += "</tbody></table>";
      }
      return list;
    }

    var STOCKS = JSON.parse(localStorage.getItem("stock"));
    table = $("#tableStocks").DataTable({

      order: [],
      deferRender: true,
      language: {
        info: "Items _START_ to _END_ of _TOTAL_ total",
        paginate: {
          next: '<i class="bi bi-chevron-right"></i>',
          previous: '<i class="bi bi-chevron-left"></i>',
        },
      },
      // "dom": 'rtip',
      columnDefs: [
        { className: "dt-left", targets: [0, 2, 6] },
        { className: "dt-center", targets: [1, 3, 4, 6] },
        // { width: "10px", targets: [0] },
        { width: "15%", targets: [0] },
        { width: "15%", targets: [5] },
        { width: "20%", targets: [2] },
      ],
      data: STOCKS,
      bInfo: true,
      columns: [
        {
          data: "stockname",
          title: "Stock Name",
          className: "dt-control ShowChildrow",
          orderable: false,
        },
        {
          data: "Etadate",
          title: "ETA Date",
          orderable: false,
          className: "ShowChildrow",
        },
        {
          data: "status",
          title: "Stock Location",
          orderable: false,
          render: function (data, type, row) {
            if (type === "display") {
              // console.log(data)
              // console.log(type)
              // console.log(row)
              let changebtn = `
                <td>
                <div class="row">
                <div class="col-md-4 ">
                      <div class="dropdown">
                        <a class="btn btn-outline-primary dropdown-toggle dropdownbtn" role="button" id="Stock_loc${row.stockname}" data-bs-toggle="dropdown" aria-expanded="false">
                        change
                         </a>
          
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li class="dropdown-item">
                          <input type="radio" class="from-check-input Stock_location" name="Stock-Location${row.stockname}" value="On Warehouse">
                          <label for="Stock-Location${row.stockname}">OnWareHouse</label>
                        </li>
                        <li class="dropdown-item">
                          <input type="radio" class="from-check-input Stock_location" name="Stock-Location${row.stockname}" value="On Water" >
                          <label for="Stock-Location${row.stockname}">OnWater</label>
                        </li>
                        <li class="dropdown-item">
                          <input type="radio" class="from-check-input Stock_location" name="Stock-Location${row.stockname}" value="On Production">
                          <label for="Stock-Location${row.stockname}">OnProduction</label>
                        </li>
                           
                       </ul>
                       
                       </div>
                  </div>
                  <div class="col-md-6 ">
                  <div id="status">
                    ${data}
                  </div>
                </div>
                </td>`;
              // console.log(data)
              return changebtn;
            }
            return data;
          },
        },
        {
          data: "createdBy",
          title: "Created By",
          orderable: false,
          className: "ShowChildrow",
        },
        {
          data: "createdDate",
          title: "Created Date",
          orderable: false,
          className: "ShowChildrow",
        },
        {
          data: "parts[0].notes",
          title: "Notes",
          orderable: false,
          className: "ShowChildrow",
        },

        {
          data: "null",
          title: "Action",
          orderable: false,
          // className: "editStock",
          defaultContent:
            "<button type='button' class='btn EditStock'><i class='bi bi-pencil-fill  '>&nbsp&nbsp</i></button><button type='button' class='btn Audit'><i class='bi bi-clock-history .historyStock'></i></button>",
        },
      ],
    });

    $("#tableStocks tbody").on("click", ".Stock_location", function () {
      var stocks = JSON.parse(localStorage.getItem("stock"));
      var rowData = table.row($(this).closest("tr")).data();
      console.log(rowData);
      rowData.status = $(this).val();
      for (let i = 0; i < stocks.length; i++) {
        if (rowData.stockname == stocks[i].stockname) {
          stocks[i] = rowData;
          table.row(i).data(rowData).draw();
          break;
        }
      }
      // STOCKS.push(rowData)
      localStorage.setItem("stock", JSON.stringify(stocks));
    });

    // Add event listener for opening and closing details
    $("#tableStocks tbody").on("click", "td.ShowChildrow", function () {
      var tr = $(this).closest("tr");
      var row = table.row(tr);

      if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass("shown");
      } else {
        // Open this row
        row.child(format(row.data(), table.row(this).index())).show();
        tr.addClass("shown");
      }
    });
    //DateRange Picker
    $("#etaDate").daterangepicker(
      {
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2000,
        maxYear: 2030,
        placeholder: "MM/DD/YYYY",
      },
      function (start, end, label) {
        var years = moment().diff(start, "years");
      }
    );

    $("#addStock").click(function () {
      $("#addStockModal").modal("show");
      PartsTableDIsplay();
    });
    $(".closemodalStock").click(function () {
      PARTS = [];
      document.getElementById("addStocks").reset();
      $(".save").attr("id", "savestock");
      // $("#stockName").removeAttr("disabled");

      $(".error").html("");

      $("#addStockModal").modal("hide");
    });

    //Open AddParts Modal
    $(document).on("click", "#addParts", function () {
      // //console.log(StockDetails)

      // localStorage.setItem("stocks",JSON.stringify(StockDetails))
      $("#addPartsModal").modal("show");
    });
    //Validate Parts
    $.validator.addMethod("Numbers", function (value) {
      return /^\d+$/.test(value);
    });
    $("#AddParts").validate({
      rules: {
        PartNumber: {
          required: true,
        },
        Ordered: {
          required: true,
          Numbers: true,
        },
      },
      messages: {
        name: {
          required: "Please Enter Partnumber",
        },
        Ordered: {
          required: "Please Enter Order",
          Numbers: "Please Enter Numbers",
        },
        Notes: {
          required: "Please Enter Notes",
        },
      },
      submitHandler: function (form) {
        form.submit();
      },
    });
    var form = $("#AddParts");
    form.validate();

    //Add Parts
    var PARTS = new Array();
    $(document).on("click", "#saveparts", function () {
      var resultaddparts = form.valid();
      if (resultaddparts == true) {
        let PartNumber = $("#PartNumber").val();
        let Ordered = $("#Ordered").val();
        let Notes = $("#Notes").val();
        let d = new Date();
        let Invoice =
          "" +
          d.getDate() +
          d.getHours() +
          d.getMinutes() +
          d.getMilliseconds();

        var check = true;
        for (let i = 0; i < PARTS.length; i++) {
          if (PARTS[i].partsnumber == PartNumber) {
            check = false;
            Swal.fire("PArt is Already present");
          }
        }
        if (check == true) {
          var obj = {
            partsnumber: PartNumber,
            Order: Ordered,
            notes: Notes,
            Invoice: Invoice,
          };
        }

        PARTS.push(obj);
        //console.log(PARTS);
        $("#addPartsModal").modal("hide");
        document.getElementById("AddParts").reset();
        PartsTableDIsplay();
      }
    });
    //Validate Parts
    $("#addStocks").validate({
      rules: {
        stockName: {
          required: true,
        },
        etaDate: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Please Enter Stock Name",
        },
        Ordered: {
          required: "Please Enter ETADate",
        },
      },
      submitHandler: function (form1) {
        form1.submit();
      },
    });
    var form1 = $("#addStocks");
    form1.validate();

    $(document).on("click", "#savestock", function () {
      let AddStockResult = form1.valid();
      if (AddStockResult == true) {
        if (PARTS.length != 0) {
          var StockName = $("#stockName").val();
          var ETADate = $("#etaDate").val();
          let ele = document.getElementsByName("status");
          var Status = "";
          for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
              Status = ele[i].value;
            }
          }
          createddate = new Date();
          createddate = createddate.toLocaleDateString();

          StockDetails = JSON.parse(localStorage.getItem("stock"));

          if (StockDetails == null) {
            StockDetails = [];
            var newObj = {
              stockname: StockName,
              Etadate: ETADate,
              status: Status,
              createdBy: logedinUser[0].Name,
              createdDate: createddate,
              parts: PARTS,
            };
          } else {
            var Value = true;
            for (let i = 0; i < StockDetails.length; i++) {
              if (StockDetails[i].stockname.toLowerCase() == StockName.toLowerCase()) {
                Value = false;
                Swal.fire("Stock Number is already Present");
              }
            }
            if (Value == true) {
              var newObj = {
                stockname: StockName,
                Etadate: ETADate,
                status: Status,
                createdBy: logedinUser[0].Name,
                createdDate: createddate,
                parts: PARTS,
              };
            }
            // //console.log(StockDetails)
          }
          StockDetails.push(newObj);
          table.row.add(newObj).draw();
          localStorage.setItem("stock", JSON.stringify(StockDetails));
          document.getElementById("addStocks").reset();

          PARTS = [];
          $("#addStockModal").modal("hide");
        } else {
          Swal.fire("Please Enter At Least 1 Part");
        }
      }
    });

    $(document).on("click", ".closemodalParts", function () {
      $("#addPartsModal").modal("hide");
      document.getElementById("AddParts").reset();
    });

    //Display Parts in Addstack modal
    function PartsTableDIsplay() {
      list = "";
      //   "<thead class='thead-dark rounded'><tr><th>Part Number</th><th>Invoice #</th><th>Orered</th><th>Notes</th><th></th></tr></thead><tbody>";
      for (let i = 0; i < PARTS.length; i++) {
        if (i == 0) {
          list =
            "<thead class='thead-dark'><tr><th>Part Number</th><th>Invoice #</th><th>Ordered</th><th>Notes</th><th></th></tr></thead><tbody>";
        }
        list +=
          "<tr id=" +
          [i + 1] +
          "><td>" +
          PARTS[i].partsnumber +
          "</td><td>" +
          PARTS[i].Invoice +
          "</td><td>" +
          PARTS[i].Order +
          "</td><td>" +
          PARTS[i].notes +
          "</td><td><button type='button' data-val=" +
          [i + 1] +
          " class='cancel  btn'><i class='bi bi-x-lg'></button></td></tr>";
        if (i == PARTS.length - 1) {
          list += "</tbody>";
        }
      }

      $("#PartsTable").html(list);
    }

    //Delete Parts in AddstockModal
    $(document).on("click", ".cancel", function () {
      if(PARTS.length==1){
        Swal.fire("Atleast 1 part is required")
      }
      else{
      let index = parseInt($(this).data("val"));
      PARTS.splice(index - 1, 1);
      PartsTableDIsplay();
      }
    });

    //Search Table
    table = $("#tableStocks").DataTable();
    $("#search").on("keyup", function () {
      table.search(this.value).draw();
    });

    //Edit Stock
    $(document).on("click", ".EditStock", function () {
      let Index = table.row($(this).parents("tr")).index();
      let SelectedRowData = table.row(Index).data();
      $("#addStockModal").modal("show");
      $(".error").html("");
      $(".save").attr("id", "editstock");
      $("#stockName").val(SelectedRowData.stockname);
      $("#etaDate").val(SelectedRowData.Etadate);
      $('input[name="status"][value="' + SelectedRowData.status + '"]').prop(
        "checked",
        true
      );
      $("#hidden").val(Index);
      PARTS = SelectedRowData.parts;
      // $("#stockName").attr("disabled", "disabled");
      PartsTableDIsplay();
    });

    $(document).on("click", "#editstock", function () {
      let EditStockResult = form1.valid();
      if (EditStockResult == true) {
        if (PARTS.length != 0) {
          let Index = $("#hidden").val();
          var StockName = $("#stockName").val();
          var ETADate = $("#etaDate").val();
          let ele = document.getElementsByName("status");
          var Status = "";
          for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
              Status = ele[i].value;
            }
          }
          createddate = new Date();
          createddate = createddate.toLocaleDateString();
          StockDetails = JSON.parse(localStorage.getItem("stock"));
           
          let checknameisalreadypreset=false
          debugger
          for(let i=0;i<StockDetails.length;i++){
            if(StockName.toLowerCase() ==StockDetails[i].stockname.toLowerCase()){
              if(i==Index){
                continue
              }
              
              checknameisalreadypreset=true
            }
          }
          if(checknameisalreadypreset==false){
          var newObj = {
            stockname: StockName,
            Etadate: ETADate,
            status: Status,
            createdBy: logedinUser[0].Name,
            createdDate: createddate,
            parts: PARTS,
          };

          StockDetails[Index] = newObj;
          localStorage.setItem("stock", JSON.stringify(StockDetails));
          table.row(Index).data(newObj).draw();
        }
        else{
          Swal.fire("Stock is already Present")
        }
          $(".save").attr("id", "savestock");
          document.getElementById("addStocks").reset();
          PARTS=[]
          $("#addStockModal").modal("hide");
        } else {
          Swal.fire("Please enter at least 1 part");
        }
      }
    });

    //Delete from chidtable
    $(document).on("click", ".deleteparts", function () {
      let indexofChildRow = $(this).data("val");
      let indexofParent = $(this).data("parentrowid");
      if (STOCKS[indexofParent].parts.length == 1) {
        Swal.fire("Atleast 1 Part Required");
      } else {
        Swal.fire({
          title: "Do you want to Delete the Part?",
          showDenyButton: true,
          confirmButtonText: "Delete",
          denyButtonText: `Cancel`,
        }).then((result) => {
          if (result.isConfirmed) {
            for (let i = 0; i < STOCKS.length; i++) {
              for (let j = 0; j < STOCKS[i].parts.length; j++) {
                if (STOCKS[i].parts.length == 1) {
                  break;
                }
                if (j == indexofChildRow - 1 && i == indexofParent) {
                  STOCKS[i].parts.splice(indexofChildRow - 1, 1);
                  var tr = $(this).closest("tr");
                  tr.remove();
                  table.row(indexofParent).data(STOCKS[i]).draw();
                }
              }
            }
            localStorage.setItem("stock", JSON.stringify(STOCKS));

            // //console.log(STOCKS)
          }
        });
      }
    });

    $(document).on("click", ".Audit", function () {
      $("#AuditModal").modal("show");
    });

    //Search
    const input = document.querySelector('input[type="search"]');
    input.addEventListener("search", () => {
      table.search(input.value).draw();
    });

    $(document).on("click", ".showAssignedUser", function () {
      let indexofChildRow = $(this).data("val");
      let indexofParent = $(this).data("parentrowid");
      console.log(indexofChildRow);
      console.log(indexofParent);
      let rowdata=table.row(indexofParent).data()
      list = " ";
      for (let i = 0; i < AssignedStockData.length; i++) {
        for (let j = 0; j < AssignedStockData[i].AssignedParts.length; j++) {
          if (rowdata.stockname ==AssignedStockData[i].AssignedParts[j].selectedStock) {
            // //debugger;
            for (let k = 0; k < rowdata.parts.length; k++) {
              for (let l = 0;l < AssignedStockData[i].AssignedParts[j].selectedStock.length;l++) {
                if (rowdata.parts[k].partsnumber ==AssignedStockData[i].AssignedParts[j].selectedparts[l])
                  list+=' <i class="bi bi-person-fill user"></i><span class="AssignedName">'+AssignedStockData[i].customer+'</span> <br>'
              }
            }
          }
        }
      }

      $(this).attr("data-bs-content", list);

      var popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
      );

      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl, { html: true });
      });
      $(document).on("click", ".popover .close-popover" , function(){
        $(this).closest(".popover").hide();
    });

    });
    // })
  } else {
    window.location.href = "index.html";
  }
});
