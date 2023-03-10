$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    $("#navigation").load("Navbar.html");
    var AssignedStocks = new Array();
    // $('.js-example-basic-single').select2();
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
    const input = document.querySelector('input[type="search"]');
    input.addEventListener("search", () => {
      table.search(input.value).draw();
    });
    var AssignedData = JSON.parse(localStorage.getItem("Assigned"));
    console.log(AssignedData);
  
   //AssignmentTable Child row table

    function format(d, ParentRowid) {
      console.log(d);
      let list = "";
      if (d.AssignedParts && d.AssignedParts.length) {
        list +=
          '<table id="childTableofAssigned" cellpadding="5" cellspacing="0" border="0">';
        list +=
          "<thead><tr><th>#</th><th>Stock</th><th>Part</th><th>Action</th></tr></thead>";
        list += "<tbody>";
        d.AssignedParts.forEach((element, index) => {
          list +=
            "<tr id=" +
            [index + 1] +
            "><td>" +
            [index + 1] +
            "</td><td>" +
            element.selectedStock +
            "</td><td>" +
            element.selectedparts +
            "</td><td>" +"<button type='button' data-val=" +
            [index + 1] +" data-parentrowid=" +
            [ParentRowid] + " class='btn DeleteChildrow'><i class='bi bi-x-lg'></i></button>"+
            "</td>" +
            "</tr>";
        });
      }
      return list;
    }
   
    //AssignmentTable
    StockDetails = JSON.parse(localStorage.getItem("stock"));

    // console.log(StockDetails);
    var table = $("#table_assignment").DataTable({
      data: AssignedData,
      ordering: false,
      language: {
        info: "Items _START_ to _END_ of _TOTAL_ total",
        paginate: {
          next: '<i class="bi bi-chevron-right"></i>',
          previous: '<i class="bi bi-chevron-left"></i>',
        },
      },
      columnDefs: [
        { orderable: true, className: "reorder", targets: 0 },
        { orderable: false, targets: "_all" },
      ],
      columns: [
        {
          className: "dt-control",
          data: "quickbooksinvoice",
          title: "QB Invoice #",
          className: "dt-left dt-control",
          defaultContent: "",
        },
        { data: "customer", title: "Name" },
        { data: "createdby", title: "Created By" },
        { data: "createdDate", title: "Created Date" },
        // { title: "Created Date" },
        {
          data: "null",
          title: "Action",
          orderable: false,
          className: "editStock",
          defaultContent:
            "<button type='button' class='btn Edit'><i class='bi bi-pencil-fill  '>&nbsp&nbsp</i></button><button type='button' class='btn Delete'><i class='bi bi-trash3-fill'></i></button>",
        },
      ],
      order: [[1, "asc"]],
    });

    // Add event listener for opening and closing details
    $("#table_assignment tbody").on("click", "td.dt-control", function () {
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

    // Dependent Dropdown for customer
    var customerInvoice = [
      { customer: "Keneth", invoiceNumber: "15000" },
      { customer: "Keneth", invoiceNumber: "15001" },
      { customer: "Keneth", invoiceNumber: "15002" },
      { customer: "Keneth", invoiceNumber: "15003" },
      { customer: "John", invoiceNumber: "16001" },
      { customer: "John", invoiceNumber: "16002" },
      { customer: "John", invoiceNumber: "16003" },
      { customer: "John", invoiceNumber: "16004" },
      { customer: "Frances", invoiceNumber: "17001" },
      { customer: "Frances", invoiceNumber: "17002" },
      { customer: "Kelly", invoiceNumber: "18001" },
      { customer: "Kelly", invoiceNumber: "18002" },
    ];
    $("#customer").change(function () {
      $("#QuickBooksInvoice").html(
        "<option selected disabled>Choose Invoice</option>"
      );
      const invoice = customerInvoice.filter(
        (m) => m.customer == $("#customer").val()
      );
      invoice.forEach((element) => {
        const option =
          "<option val='" +
          element.invoiceNumber +
          "'>" +
          element.invoiceNumber +
          "</option>";
        $("#QuickBooksInvoice").append(option);
      });
    });
//  Table Search 
    table = $("#table_assignment").DataTable();
    $("#search").on("keyup", function () {
      table.search(this.value).draw();
    });

    $(".js-example-basic-multiple").select2({
      placeholder: "Select a Part",
    });

    var StockOptions = "";

    for (let i = 0; i < StockDetails.length; i++) {
      StockOptions +=
        "<option value='" +
        StockDetails[i].stockname +
        "'>" +
        StockDetails[i].stockname +
        "</option>";
    }
    $("#Selectstock").append(StockOptions);
    $("#Selectstock").change(function () {
      var SelectedStock = $(this).find("option:Selected").val();

      let option = "<option disabled value='0'>Choose Parts</option>";
      for (let i = 0; i < StockDetails.length; i++) {
        // debugger
        if (StockDetails[i].stockname == SelectedStock) {
          console.log(StockDetails[i].parts);
          for (let j = 0; j < StockDetails[i].parts.length; j++) {
            option +=
              "<option>" + StockDetails[i].parts[j].partsnumber + "</option>";
          }
        }
      }
      $("#SelectParts").html(option);
      // $("#SelectParts").append(option);
    });

    //Add Assignment
    var SelectedPartsStock = new Array();

    $(addSelectedParts).click(function () {
      let SelectedParts = $("#SelectParts").val();
      let SelectedStock = $("#Selectstock").val();
      //  console.log(SelectedParts)
      console.log(SelectedParts.length);
      if (SelectedParts.length == 0) {
        Swal.fire("Please select Stock and Parts");
      } else {
        let AddToModalTable = {
          selectedStock: SelectedStock,
          selectedparts: SelectedParts,
        };
        console.log(AddToModalTable);
        SelectedPartsStock.push(AddToModalTable);
        displaySelectedStockParts();
      }
    });
    function displaySelectedStockParts() {
      // console.log(SelectedPartsStock, "S");

      list = "";
      for (let i = 0; i < SelectedPartsStock.length; i++) {
        if (i == 0) {
          list +=
            "<thead class='thead-dark rounded'><tr><th>#</th><th>Stock</th><th>Part</th><th>Action</th></tr></thead><tbody>";
        }
        list +=
          "<tr id=" +
          [i + 1] +
          "><td>" +
          [i + 1] +
          "</td><td>" +
          SelectedPartsStock[i].selectedStock +
          "</td><td>" +
          SelectedPartsStock[i].selectedparts +
          "</td><td><button type='button' data-val=" +
          [i + 1] +
          " class='cancel  btn'><i class='bi bi-x-lg'></button></td></tr>";
        (" class='cancel  btn'><i class='bi bi-x-lg'></button></td></tr>");
        if (i == SelectedPartsStock.length - 1) {
          list += "</tbody>";
        }
      }
      $("#AssignedPartTable").html(list);
    }
    $("#saveAssigment").click(function () {
      if(SelectedPartsStock.length==0){
        Swal.fire("please Enter Stock and Parts")
      }else{
      // debugger
      if($(".save").attr('id')!='editAssignment'){
      
     
      // //alert($("#QuickBooksInvoice").val())
      if ($("#QuickBooksInvoice").val() == null) {
        Swal.fire("Please selecet customer and Invoice");
      } else {
        var Data = JSON.parse(localStorage.getItem("Assigned"));
        let Customer = $("#customer").val();
        // //alert(Customer);
        let QuickBooksInvoice = $("#QuickBooksInvoice").val();
         

        createddate=new Date()
        createddate=createddate.toLocaleDateString()+" at "+ createddate.toLocaleTimeString();

        if (Data == null) {
          Data = [];
          var newObj = {
            customer: Customer,
            quickbooksinvoice: QuickBooksInvoice,
            AssignedParts: SelectedPartsStock,
            createdby: logedinUser[0].Name,
            createdDate: createddate
          };
        } else {
          var newObj = {
            customer: Customer,
            quickbooksinvoice: QuickBooksInvoice,
            AssignedParts: SelectedPartsStock,
            createdby: logedinUser[0].Name,
            createdDate: createddate,
          };
        }
        Data.push(newObj);
        // console.log(SelectedPartsStock,"DFF")
        table.row.add(newObj).draw();
        localStorage.setItem("Assigned", JSON.stringify(Data));
        SelectedPartsStock = [];
        displaySelectedStockParts();
        document.getElementById("assignmentform").reset();
        // $("#SelectParts option:selected").removeAttr("selected");
        $("#assignmentModal").modal("hide");
        //  $("#SelectParts").val()=""
        // console.log(newObj)
      }
    }
  }
    });
    //Delete Parts in Modal
    $(document).on("click", ".cancel", function () {

      if(SelectedPartsStock.length==1){
        Swal.fire("atleast 1 part is requiered")
      }
      else{
      let index = parseInt($(this).data("val"));
      // var index=parseInt( $(this).data('val'))-1
      //////alert(index)
      SelectedPartsStock.splice(index - 1, 1);
      displaySelectedStockParts();
      }
    });

    $("#newAssignment").click(function () {
      $("#assignmentModal").modal("show");
    });

    $(".closemodal").click(function () {
      $("#assignmentModal").modal("hide");
      $(".save").attr("id", "saveAssigment");
      SelectedPartsStock=[]
      displaySelectedStockParts()
      document.getElementById("assignmentform").reset();
    });
    $(document).on("click", ".Edit", function () {
      
    
     let Index=table.row($(this).parents('tr')).index();
      SelectedRowData=table.row($(this).parents('tr')).data()
      $("#assignmentModal").modal("show");

      $(".save").attr("id", "editAssignment");
      $("#customer").val(SelectedRowData.customer);
      $("#QuickBooksInvoice").val(SelectedRowData.quickbooksinvoice);
      $("#hidden").val(Index);
     
      SelectedPartsStock = SelectedRowData.AssignedParts;
      // $("#stockName").attr("disabled", "disabled");
      displaySelectedStockParts();
    });
    $(document).on("click", "#editAssignment", function () {
      if ($("#QuickBooksInvoice").val() == null) {
        Swal.fire("Please selecet customer and Invoice");
      }else  if(SelectedPartsStock.length==0){
        Swal.fire("please Enter Stock and Parts")
      }else{
      var AssignedDataParts= JSON.parse(localStorage.getItem("Assigned"));
      let Customer = $("#customer").val();
      let Index = $("#hidden").val();
      // //alert(Index)
        // //alert(Customer);
        let QuickBooksInvoice = $("#QuickBooksInvoice").val();
         
        createddate=new Date()
        createddate=createddate.toLocaleDateString()+" at "+ createddate.toLocaleTimeString();

        var newObj = {
          customer: Customer,
          quickbooksinvoice: QuickBooksInvoice,
          AssignedParts: SelectedPartsStock,
          createdby: logedinUser[0].Name,
          createdDate: createddate,
        };
        AssignedDataParts[Index]=newObj


        table.row(Index).data(newObj).draw();
      localStorage.setItem("Assigned", JSON.stringify(AssignedDataParts));
      //  delete  newObj.parts
     
      SelectedPartsStock = [];
      displaySelectedStockParts();
      $("#assignmentModal").modal("hide");
      $(".save").attr("id", "saveAssigment");
      document.getElementById("assignmentform").reset();
      }
    })


    $(document).on("click", ".Delete", function () {
      var AssignedData= JSON.parse(localStorage.getItem("Assigned"));
      //alert(table.row($(this).parents('tr')).index())
      let Index=table.row($(this).parents('tr')).index();
      table.row(Index).remove().draw()
      AssignedData.splice(Index,1)
      localStorage.setItem("Assigned", JSON.stringify(AssignedData));
      
    });

    $(document).on("click", ".DeleteChildrow", function () {
      let indexofChildRow = $(this).data("val");
      // //alert(indexofChildRow)
      let indexofParentrow= $(this).data("parentrowid")
      // //alert(indexofParentrow)
      var AssignedData= JSON.parse(localStorage.getItem("Assigned"));
      if(AssignedData[indexofParentrow].AssignedParts.length==1){
        Swal.fire("Atleast 1 part is required")
      }
      else{
        Swal.fire({
          title: "Do you want to Delete the Part?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Delete",
          denyButtonText: `Cancel`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            for (let i = 0; i < AssignedData.length; i++) {
              for (let j = 0; j < AssignedData[i].AssignedParts.length; j++) {
                if (AssignedData[i].AssignedParts == 1) {
                  // Swal.fire("Atleast 1 part required")
                  break;
                }
                if (j == indexofChildRow - 1 && i == indexofParentrow) {
                  AssignedData[i].AssignedParts.splice(indexofChildRow - 1, 1);
                  var tr = $(this).closest("tr");
                  tr.remove();
                  table.row(indexofParentrow).data(AssignedData[i]).draw();
                }
              }
            }
            localStorage.setItem("Assigned", JSON.stringify(AssignedData));

          }

        })
      }
    });

  } else {
    window.location.href = "index.html";
  }
});
