function format(d) {
    // `d` is the original data object for the row
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<thead>'+
        '<tr>' +
            '<th>'+
            '#'+
            '</th>'+
            '<th>'+
            'Part Number'+
            '</th>'+
            '<th>'+
            'Stock Location'+
            '</th>'+
        '</tr>' +
        '<thead>'+
        '<tbody>'+
        '<tr>' +
            '<td>'+
            '1'+
            '</td>'+
            '<td>'+
            'BW-01-S-M'+
            '</td>'+
            '<td>'+
            'Warehouse'+
            '</td>'+
        '</tr>' +
        '<tr>' +
            '<td>'+
            '2'+
            '</td>'+
            '<td>'+
            'AT-01-BLK'+
            '</td>'+
            '<td>'+
            'C-101'+
            '</td>'+
        '</tr>' +
        '<tr>' +
            '<td>'+
            '3'+
            '</td>'+
            '<td>'+
            'BW-03-XL-G'+
            '</td>'+
            '<td>'+
            'E-S01'+
            '</td>'+
    '</tr>' +
        '</tbody>'+
        '</table>'
    );
}
 
$(document).ready(function () {
    var table = $('#StatusTable').DataTable({
      "ordering": true,
      "dom": '<"toolbar">frtip',
            bFilter: true, bInfo: true,
            fnInitComplete: function(){
                $('div.toolbar').html('<h2>Status</h2>');
              },
        data:details,
        columns: [
            {
                className: 'toHide',
                data: null,
                defaultContent: '',
            },
            {title: 'QB Invoice#', className:"text-start dt-control",orderable:true},
            {title: 'Name',orderable:true, className:"text-start"},
            {title: 'QB Ship Date',orderable:true, className:"text-start"},
            {title: 'QB Payment Status',oradable:false, className:"text-start"},
            {title: 'QB Status',oradable:false, className:"text-start"},
            {title: 'QB Delivery Phone',oradable:false, className:"text-start"},
            {title: 'Called',oradable:false, render: function(){
                return '<input type = "checkbox">'
            }},
            {title: 'QB Tracking',oradable:false, className:"text-start"},
        ],
        select:{
            style: 'os',
            selector: 'td:first-child'
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
      
        
        order: [[1, 'asc']],
    });
 
    // Add event listener for opening and closing details
    $('#StatusTable tbody').on('click', 'td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
 
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
    
});
var details = [
    ["","150000","Kenneth Woondard","12/08/2021", '<span class="alert alert-primary px-2 p-1" style="background-color:#2871CC opacity:25%; border-color:rgb(219, 241, 223); color:#2871CC"><i class="fa fa-check"></i>Paid</span>',"Shipped","617-235-7647","","WBC-123"],

    ["","150001","James Fenske","10/08/2021",'<span class="alert alert-primary px-2 p-1" style="background-color:rgb(219, 241, 223); border-color:rgb(219, 241, 223); color:green"><i class="fa fa-check"></i>Paid</span>',"Shipped","618-234-6400","","WBC-124"],

    ["","150002","Kelly McCrory","08/08/2021",'<span class="alert alert-primary px-2 p-1" style="background-color:rgb(219, 241, 223); border-color:rgb(219, 241, 223); color:green"><i class="fa fa-check"></i>Paid</span>',"STD","630-367-8448","",""],

    ["","150003","Linda Englund","05/08/2021",'<span class="alert alert-danger px-2 p-1" style="background-color:#DD4B39 opacity:25%; border-color:rgb(219, 241, 223); color:#DD4B39"><i class="fa-solid fa-xmark"></i>&nbsp;Unpaid</span>',"Shipped","203-963-9428","","WBC-125"],

    ["","150004","Frances Badger","03/08/2021",'<span class="alert alert-primary px-2 p-1" style="background-color:rgb(219, 241, 223); border-color:rgb(219, 241, 223); color:green"><i class="fa fa-check"></i>Paid</span>',"STD","508-206-0722","",""],

    ["","150005","Tasha Tapia","02/08/2021",'<span class="alert alert-warning px-2 p-1" style="background-color:#F19100 opacity:25%; border-color:rgb(219, 241, 223); color:#F19100"><i class="fa-solid fa-circle-exclamation"></i>&nbsp;Pending Approval</span>',"Shipped","201-905-4664","","WBC-127"],

    ["","150006","Samantha Southard","01/08/2021",'<span class="alert alert-primary px-2 p-1" style="background-color:rgb(219, 241, 223); border-color:rgb(219, 241, 223); color:green"><i class="fa fa-check"></i>Paid</span>',"Shipped","707-271-9412","","WBC-128"],

    ["","150007","James Fenske","10/08/2021",'<span class="alert alert-primary px-2 p-1" style="background-color:rgb(219, 241, 223); border-color:rgb(219, 241, 223); color:green"><i class="fa fa-check"></i>Paid</span>',"Shipped","618-234-6400","","WBC-124"],

    ["","150008","Kelly McCrory","08/08/2021",'<span class="alert alert-primary px-2 p-1" style="background-color:rgb(219, 241, 223); border-color:rgb(219, 241, 223); color:green"><i class="fa fa-check"></i>Paid</span>',"STD","630-367-8448","",""],

    ["","150009","Linda Englund","05/08/2021",'<span class="alert alert-danger px-2 p-1" style="background-color:#DD4B39 opacity:25%; border-color:rgb(219, 241, 223); color:#DD4B39"><i class="fa-solid fa-xmark"></i>&nbsp;Unpaid</span>',"Shipped","203-963-9428","","WBC-125"],

    ["","150010","Frances Badger","03/08/2021",'<span class="alert alert-primary px-2 p-1" style="background-color:rgb(219, 241, 223); border-color:rgb(219, 241, 223); color:green"><i class="fa fa-check"></i>Paid</span>',"STD","508-206-0722","",""],

    ["","150011","Tasha Tapia","02/08/2021",'<span class="alert alert-warning px-2 p-1" style="background-color:#F19100 opacity:25%; border-color:rgb(219, 241, 223); color:#F19100"><i class="fa-solid fa-circle-exclamation"></i>&nbsp;Pending Approval</span>',"Shipped","201-905-4664","","WBC-127"],

    ["","150012","Samantha Southard","01/08/2021",'<span class="alert alert-primary px-2 p-1" style="background-color:rgb(219, 241, 223); border-color:rgb(219, 241, 223); color:green"><i class="fa fa-check"></i>Paid</span>',"Shipped","707-271-9412","","WBC-128"],


];
function logout(){
    window.location.replace("login.html")
    localStorage.clear();
  }

 

window.onload = (event) => {
  if (localStorage.getItem("Badeloft-Details") == null) {
    window.location.replace("login.html");
  }
  else{
    var par = JSON.parse(localStorage.getItem('Badeloft-Details'));
    var u = par[0].username;
    var uname = document.getElementById("username");
    uname.innerHTML = u;
  }
};