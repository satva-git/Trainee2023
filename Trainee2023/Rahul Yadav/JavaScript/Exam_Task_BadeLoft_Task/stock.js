if (localStorage.getItem('LogedinUser') !== null) {
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
    $("#username").html(logedinUser[0].Name);

    function format(d) {
        let dynamicChildRow = '';
        if (d.partiteam && d.partiteam.length > 0) {
            dynamicChildRow += '<table class:"table  p-0 m-0 w-100 h-100"  id="childpartTable " style="width:100%">';
            dynamicChildRow += '<thead class=" fw-normal bg-light childtable rounded"><tr><th>#</th><th>Part Number</th><th>Ordered</th><th>Assigned</th><th>Action</th></tr></thead>';
            dynamicChildRow += '<tbody>';
            d.partiteam.forEach((partiteam, index) => {
                dynamicChildRow += '<tr><td>' + (1 + index) + '</td><td>' + partiteam.partno + '</td><td>' + partiteam.order + '</td><td>' + partiteam.order + `</td><td> <button type="button" data-stock="${d.stockname}" class="btn-close deleteparts" aria-label="Close"></button></td></tr>`;
            });
            dynamicChildRow += '</tbody></table>';
        }
        return dynamicChildRow;
    }

    var isEdit = false;
    $(document).ready(function () {
        var stockdataset = JSON.parse(localStorage.getItem("stockdata"));
        var table = $('#table_div1').DataTable({
            data: stockdataset,
            language: {
                info: "Items _START_ to _END_ of _TOTAL_ total",
                paginate: {
                    next: '&#62',
                    previous: '&#60'
                }
            },
            columnDefs: [
                { orderable: true, className: "reorder", targets: 0 },
                { orderable: false, targets: "_all" },
                {
                    className: "dt-left",
                    targets: [0],
                },
                { width: "15%", targets: [0] },
                { width: "25%", targets: [5] },
            ],
            columns: [
                { data: 'stockname', title: ' Stock Name', className: 'dt-left dt-control', orderable: false, },
                { data: 'date', title: 'ETA Date', orderable: false, className: 'TextCenter' },
                {
                    data: 'stockstatus', title: 'Stock Location', orderable: false, className: 'TextCenter', render: function (data, type, row) {
                        // create a select element with options
                        var select = '<select class="statusdropdown"><option value="Change">Change </option><option value="In Warehouse">In Warehouse</option><option value="On Water">On Water</option><option value="On Production">On Production</option></select>';
                        // return the select element as the cell content
                        return select + "  " + data;
                    }
                },
                { data: 'username', title: 'Created By', orderable: false, className: 'TextCenter' },
                { data: 'createddate', title: 'Created Date', orderable: false, className: 'TextCenter' },
                { data: 'partiteam[0].notes', title: 'Notes', orderable: false, className: 'TextCenter' },
                { data: null, title: 'Action', orderable: false, className: 'editauditmodel', defaultContent: '<i class="bi bi-pencil-fill editmodel"  style="font-size: 1rem; color: gray;"></i> &nbsp; <i class="bi bi-clock-history  historymodel" style="font-size: 1rem; color: gray;"></i>' },
            ],
            order: [[1, 'asc']],
        });

        $('#table_div1 tbody').on('click', '.historymodel', function () {
            $("#History_Modal").modal('show');
        });


        $('#table_div1 tbody').on('change', 'select', function () {

            var rowData = table.row($(this).closest('tr')).data(); // get the data for the current row
            var newValue = $(this).val(); // get the new value from the dropdown
            rowData.stockstatus = newValue; // update the data object
            table.row($(this).closest('tr')).data(rowData); // update the table

            // update the local storage
            var data = JSON.parse(localStorage.getItem('stockdata'));
            var index = data.findIndex(function (item) {
                return item.stockname === rowData.stockname;
            });
            if (index !== -1) {
                data[index].stockstatus = newValue;
                localStorage.setItem('stockdata', JSON.stringify(data));
            }
            // location.reload(true)
        });

        var table = $("#table_div1").DataTable();
        $("#datatablesearch").on("keyup", function () {
            table.search(this.value).draw();
        });

        $('#table_div1 tbody').on('click', 'td.dt-control', function () {
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

        $('#table_div1 tbody').on('click', '.editmodel', function () {
            isEdit = true;
            var heading = document.getElementById('modaltitle');
            heading.textContent = 'Edit Stock';
            var rowdata = table.row($(this).parents('tr')).data();
            var index = table.row($(this).parents('tr')).index();
            $("#stockname").val(rowdata.stockname);
            $("#date").val(rowdata.date);
            $('input[name="btnradio"][value="' + rowdata.stockstatus + '"]').prop('checked', true);
            if (rowdata.partiteam && rowdata.partiteam.length > 0) {
                rowdata.partiteam.forEach(function (partiteam) {
                    $("#root").append('<tr><td>' + partiteam.partno + '</td><td>' + partiteam.order + '</td><td>' + partiteam.notes + '</td><td>' + '<button type="button" class="btn-close" aria-label="Close"></button>' + '</td></tr>');
                });
            }
            partiteam = rowdata.partiteam;
            $('#stockModal').modal('show');
            $("#savestock").click(function () {
                var stockdData = JSON.parse(localStorage.getItem("stockdata"));
                var stockname = document.getElementById("stockname").value;
                var etadate = document.getElementById("date").value;
                var stockstatus = document.querySelector('input[name="btnradio"]:checked').value;
                var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
                var useridname = logedinUser[0].Name;
                var date = new Date().toLocaleDateString();
                if (partiteam.length === 0) {
                    swal("InComplete Detail!", "You Have to Add Atlest One Part!", "warning");
                    return;
                }
                var objnew = {
                    stockname: stockname,
                    date: etadate,
                    stockstatus: stockstatus,
                    username: useridname,
                    createddate: date,
                    partiteam: partiteam
                }
                stockdData[index] = objnew;
                localStorage.setItem("stockdata", JSON.stringify(stockdData));
                $('#stockModal').modal('hide');
                location.reload(true);
            });
        });
        $("#root").on("click", ".btn-close", function () {
            $(this).closest("tr").remove();
            partiteam.splice(this, 1)
        });


        $("#partform").validate({
            rules: {
                partnumber: {
                    required: true,
                },
                ordered: {
                    required: true,
                },
            },
            messages: {
                partnumber: {
                    required: "This field is required",
                },
                ordered: {
                    required: "This field is required",
                },
            },
            submitHandler: function (partform) {
                partform.submit();
            },
        });
        var partform = $("#partform");
        partform.validate();
        var partiteam = new Array;
        document.getElementById("savepart").onclick = function () {
            var result = partform.valid();
            if (result == true) {
                var partno = document.getElementById("partno").value;
                var order = document.getElementById("order").value;
                var notes = document.getElementById("notes").value;
                var obj = {
                    partno: partno,
                    order: order,
                    notes: notes
                }
                partiteam.push(obj)
                var html = "";
                partiteam.forEach(function (element) {
                    html += "<tr>";
                    html += "<td>" + element.partno + "</td>";
                    html += "<td>" + element.order + "</td>";
                    html += "<td>" + element.notes + "</td>";
                    // html += "<td>" + '<i class="bi bi-x"></i>' + "</td>";
                    html += "<td class='tdAction'><button type='button' class='btn btn-sm btn-delete'>&#x2715;</button></td>";
                    html += "</tr>"
                });
                document.getElementById("root").innerHTML = html;
                document.getElementById("partform").reset();
                $('#partModal').modal('hide');
            }
        };

        $("#root").on("click", ".btn-delete", function () {
            $(this).closest("tr").remove();
            partiteam.splice(this, 1)
        });

        $("#stockform").validate({
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
                    required: "This field is required",
                },
                etadate: {
                    required: "This field is required",
                },
            },
            submitHandler: function (stockform) {
                stockform.submit();
            },
        });
        var stockform = $("#stockform");
        stockform.validate();
        var stockdata = new Array;
        document.getElementById("savestock").onclick = function () {
            if (!isEdit) {
                var result = stockform.valid();
                if (result == true) {
                    var stockname = document.getElementById("stockname").value;
                    var etadate = document.getElementById("date").value;
                    var stockstatus = document.querySelector('input[name="btnradio"]:checked').value;
                    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
                    var useridname = logedinUser[0].Name;
                    var date = new Date().toLocaleDateString();
                    var stockData = JSON.parse(localStorage.getItem('stockdata'));
                    for (var i = 0; i < stockData.length; i++) {
                        if (stockData[i].stockname === stockname) {
                            swal("Invalid Detail!", "Enter Different Stock Name , This stock all ready Exist!", "warning");
                            return;
                        }
                    }
                    if (partiteam.length === 0) {
                        swal("InComplete Detail!", "You Have to Add Atlest One Part!", "warning");
                        return;
                    }
                    var obj1 = {
                        stockname: stockname,
                        date: etadate,
                        stockstatus: stockstatus,
                        username: useridname,
                        createddate: date,
                        partiteam: partiteam
                    }
                    if (localStorage.getItem("stockdata") == null) {
                        stockdata = [];
                    } else {
                        stockdata = JSON.parse(localStorage.getItem("stockdata"));
                    }
                    stockdata.push(obj1);
                    localStorage.setItem("stockdata", JSON.stringify(stockdata));
                    document.getElementById("stockform").reset();
                    $('#stockModal').modal('hide');
                    location.reload(true);
                }
            }
        };

        $(document).on("click", ".deleteparts", function () {
            var index;
            var StockName = $(this).attr("data-stock");
            debugger
            // Remove the corresponding data from local storage
            var StockData = JSON.parse(localStorage.getItem("stockdata")) || [];
            var stockindex = StockData.findIndex(x => x.stockname == StockName);
            if (StockData[stockindex].partiteam && StockData[stockindex].partiteam.length > 0) {
                StockData[stockindex].partiteam.splice(index, 1);
                localStorage.setItem("stockdata", JSON.stringify(StockData));
            } +
                partiteam.splice(index, 1);
            $(this).closest("tr").remove();
            location.reload(true);
        });

        $(function () {
            $('input[name="etadate"]').daterangepicker({

                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: 3030
            }, function (start, end, label) {
                var years = moment().diff(start, 'years');

            });
            $('input[name="etadate"]').val('');
            $('input[name="etadate"]').attr("placeholder", "MM/DD/YYYY");
        });

        $("#logout").click(function () {
            localStorage.removeItem("LogedinUser");
            window.location.replace("logic.html");
        });

        $('.sorting').removeClass('sorting')

    });
} else {
    window.location.href = "logic.html"
}
