$(document).ready(function () {
    $.validator.addMethod("validname", function (value) {
        return /^[a-zA-Z\s]+$/.test(value);
    });
    $("#addrow").click(function () {
        $("#basic_form").valid();
    });
    $("#basic_form").validate({
        rules: {
            name: {
                required: true,
                validname: true,
            },
            mobile: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            clgname: {
                required: true,
                validname: true,
            },
            cgpa: {
                required: true,
            },
            zipcode: {
                required: true,
            },
        },

        messages: {
            name: {
                required: "Enter your Name",
                validname: "please enter only characters",
            },
            mobile: {
                required: "Enter your mobile number",
            },
            email: {
                required: "Enter your email",
                email: "Please enter valid email with @",
            },
            clgname: {
                required: "Enter your collage Name",
                validname: "please enter text",
            },
            cgpa: {
                required: "Enter your cgpa",
            },
            brnchname: {
                required: "Enter your branch name ",
            },
        },
    });

    $("#flip").click(function () {
        $("#panel").slideToggle("slow");
    });

    $(function () {
        $('input[name="daterange"]').daterangepicker(
            {
                opens: "left",
            },
            function (start, end, label) {
                console.log(
                    "A new date selection was made: " +
                    start.format("YYYY-MM-DD") +
                    " to " +
                    end.format("YYYY-MM-DD")
                );
            }
        );
    });

    const CityData =
        '{"Citys":[' +
        '{"StateId":"Madhya Pradesh","Id":"Indore","Name":"Indore"},' +
        '{"StateId":"Madhya Pradesh","Id":"Bhopal","Name":"Bhopal"},' +
        '{"StateId":"Rajasthan","Id":"Sirohi","Name":"Sirohi"},' +
        '{"StateId":"Rajasthan","Id":"Udaipur","Name":"Udaipur"},' +
        '{"StateId":"Rajasthan","Id":"Jaisalmer","Name":"Jaisalmer"},' +
        '{"StateId":"Gujarat","Id":"Ahmedabad","Name":"Ahmedabad"},' +
        '{"StateId":"Gujarat","Id":"Vadodara","Name":"Vadodara"},' +
        '{"StateId":"Gujarat","Id":"Surat","Name":"Surat"},' +
        '{"StateId":"Punjab","Id":"Ludhiana","Name":"Ludhiana"},' +
        '{"StateId":"Punjab","Id":"Amritsar","Name":"Amritsar"},' +
        '{"StateId":"Punjab","Id":"Patiala","Name":"Patiala"}]}';

    const StateData =
        '{"States":[' +
        '{"Id":"Madhya Pradesh","Name":"Madhya Pradesh"},' +
        '{"Id":"Rajasthan","Name":"Rajasthan"},' +
        '{"Id":"Gujarat","Name":"Gujarat"},' +
        '{"Id":"Punjab","Name":"Punjab"}]}';

    var StateJsonData = JSON.parse(StateData);
    $.each(StateJsonData.States, function (i, option) {
        $("#State").append($("<option></option>").val(option.Id).html(option.Name));
    });
    $("#State").change(function () {
        var CityJsonData = JSON.parse(CityData);
        $("#City").html("");
        $.each(CityJsonData.Citys, function (i, option) {
            if ($("#State").val() == option.StateId) {
                $("#City").append(
                    $("<option></option>").val(option.Id).html(option.Name)
                );
            }
        });
    });

    $("#addrow").click(function () {
        var studentData = localStorage.getItem("studentData");
        var StudentDetails = {
            dataId: $("#dataId").val(),
            Name: $("#name").val(),
            Mobile: $("#mobile").val(),
            Email: $("#email").val(),
            State: $("#State").val(),
            Collage: $("#clgname").val(),
            City: $("#City").val(),
            Branch: $("#brnchname").val(),
            CGPA: $("#cgpa").val(),
            FromToWhenYouStudied: $("#daterange").val(),
            Zip: $("#zipcode").val(),
        };

        let id = "no";

        if (id === "no") {
            if (studentData != null) {
                var studentJsonData = JSON.parse(studentData);
                if (
                    studentJsonData?.students &&
                    studentJsonData?.students[parseInt(StudentDetails.dataId)]
                ) {
                    studentJsonData.students[parseInt(StudentDetails.dataId)] =
                        StudentDetails;
                    localStorage.setItem("studentData", JSON.stringify(studentJsonData));
                } else {
                    studentJsonData.students.push(StudentDetails);
                    localStorage.setItem("studentData", JSON.stringify(studentJsonData));
                }
            } else {
                var studentData = JSON.parse('{"students": []}');
                studentData.students.push(StudentDetails);
                localStorage.setItem("studentData", JSON.stringify(studentData));
            }
        } else {
            let datal = JSON.parse(localStorage.getItem("studentData"));
            datal[id] = students.Name;
            localStorage.setItem("studentData", JSON.stringify(datal));
        }
        selectData();

        $("#basic_form")[0].reset();





    });

    $("#save").click(function () {

        var studentData = localStorage.getItem("studentData");
        var StudentDetails = {
            dataId: $("#dataId").val(),
            Name: $("#name").val(),
            Mobile: $("#mobile").val(),
            Email: $("#email").val(),
            State: $("#State").val(),
            Collage: $("#clgname").val(),
            City: $("#City").val(),
            Branch: $("#brnchname").val(),
            CGPA: $("#cgpa").val(),
            FromToWhenYouStudied: $("#daterange").val(),
            Zip: $("#zipcode").val(),
        };

        let id = "no";

        if (id === "no") {
            if (studentData != null) {
                var studentJsonData = JSON.parse(studentData);
                if (
                    studentJsonData?.students &&
                    studentJsonData?.students[parseInt(StudentDetails.dataId)]
                ) {
                    studentJsonData.students[parseInt(StudentDetails.dataId)] =
                        StudentDetails;
                    localStorage.setItem("studentData", JSON.stringify(studentJsonData));
                } else {
                    studentJsonData.students.push(StudentDetails);
                    localStorage.setItem("studentData", JSON.stringify(studentJsonData));
                }
            } else {
                var studentData = JSON.parse('{"students": []}');
                studentData.students.push(StudentDetails);
                localStorage.setItem("studentData", JSON.stringify(studentData));
            }
        } else {
            let datal = JSON.parse(localStorage.getItem("studentData"));
            datal[id] = students.Name;
            localStorage.setItem("studentData", JSON.stringify(datal));
        }
        selectData();

        $("#basic_form")[0].reset();
        $("#save").css('display', 'none')
        $("#addrow").css("display", "block");
        $("#export").css("display", "block");

    });

    $(".remCF1 btn btn-warning").on("click", function () {
        $("#save").css("display", "block");
        $("addrow").css("display", "none");
        $("export").css("display", "none");

    });

    $("#export").on("click", function () {
        window.open('data:application/vnd.ms-excel,' + $('.table-responsive').html());
        swal("Downloaded!", "Your Imaginary file has been Downloaded", "success");
    });





});




function selectData() {
    var datal = JSON.parse(localStorage.getItem("studentData"));
    if (datal != null) {
        let html = "";

        for (let i = 0; i < datal.students.length; i++) {
            html =
                html +
                `<tr id = ${i} >
        <td>${i + 1}</td>
        <td>${datal.students[i].Name}</td>
        <td>${datal.students[i].Mobile}</td>
        <td>${datal.students[i].Email}</td>
        <td>${datal.students[i].Collage}</td>
        <td>${datal.students[i].CGPA}</td>
        <td>${datal.students[i].Branch}</td>
        <td>${datal.students[i].State}</td>
        <td>${datal.students[i].City}</td>
        <td>${datal.students[i].Zip}</td>
        <td>${datal.students[i].FromToWhenYouStudied}</td>
        <td nowrap><a href="javascript:void(0);"  onclick="deleteData(${i})" class="remCF1 btn btn-danger border">Delete</a><a href="javascript:void(0);"  onclick="editData(${i})" class="remCF1 btn btn-warning" >Edit</a></td>
        <tr>`;
        }
        document.getElementById("root").innerHTML = html;
    }
}

function deleteData(rid) {
    let datal = JSON.parse(localStorage.getItem("studentData"));
    console.log("index", rid);
    datal.students.splice(rid, 1);
    localStorage.setItem("studentData", JSON.stringify(datal));
    selectData();
    swal("Deleted!", "Your Imaginary file has been deleted", "success");
}

function editData(rid) {
    let datal = JSON.parse(localStorage.getItem("studentData"));
    document.getElementById("dataId").value = rid;
    document.getElementById("name").value = datal.students[rid].Name;
    document.getElementById("mobile").value = datal.students[rid].Mobile;
    document.getElementById("email").value = datal.students[rid].Email;
    document.getElementById("clgname").value = datal.students[rid].Collage;
    document.getElementById("cgpa").value = datal.students[rid].CGPA;
    document.getElementById("brnchname").value = datal.students[rid].Branch;
    document.getElementById("State").value = datal.students[rid].State;
    document.getElementById("City").value = datal.students[rid].City;
    document.getElementById("zipcode").value = datal.students[rid].Zip;
    document.getElementById("daterange").value =
        datal.students[rid].FromToWhenYouStudied;

    document.getElementById("addrow").innerHTML = "addrow";
    $("#save").css('display', 'block')
    $("#addrow").css("display", "none");
    $("#export").css("display", "none");
}





































//     var StateJsonData = JSON.parse(StateData);
//     $.each(StateJsonData.States, function (i, option) {
//         $("#State").append($('<option></option>').val(option.Id).html(option.Name));
//     })

//     $("#State").change(function () {
//         var CityJsonData = JSON.parse(CityData);
//         $("#City").html('');
//         $.each(CityJsonData.Citys, function (i, option) {
//             if ($("#State").val() == option.StateId) {
//                 $("#City").append($('<option></option>').val(option.Id).html(option.Name));
//             }
//         })
//     });
//     var counter = -1;
//     $("#addrow").on("click", function () {
//         counter++;
//         var name = $("#name").val();
//         var mobile = $("#mobile").val();
//         var email = $("#email").val();
//         var clgname = $("#clgname").val();
//         var cgpa = $("#cgpa").val();
//         var brnchname = $("#brnchname").val();
//         var State = $("#State").val();
//         var City = $("#City").val();
//         var zipcode = $("#zipcode").val();
//         var daterange = $("#daterange").val();
//         // var count = $("#table tr").length;
//         if (name != "" && mobile != "" && email != "" && clgname != "" && cgpa != "" && brnchname != "" && State != "" && City != "" && zipcode != "" && daterange != "") {
//             $("#table ").append(
//                 '<tr id="' + counter + '" class="child"><td>' +
//                 //  count +
//                 "</td><td>" +
//                 name +
//                 "</td><td>" +
//                 mobile +
//                 "</td><td>" +
//                 email +
//                 "</td><td>" +
//                 clgname +
//                 "</td><td>" +
//                 cgpa +
//                 "</td><td>" +
//                 brnchname +
//                 "</td><td>" +
//                 State +
//                 "</td><td>" +
//                 City +
//                 "</td><td>" +
//                 zipcode +
//                 "</td><td>" +
//                 daterange +
//                 '</td><td><a href="javascript:void(0);" class="remCF1 btn btn-small btn-danger">Delete</a><a href="javascript:void(0);" class="remCF1 btn btn-small btn-warning">Edit</a></td></tr>'
//             )
//         }

//         var StudentDetails = '{ ' +
//             '"Name":' + name + ',"Mobile":' + mobile + ',"Email":' + email + ', ' +
//             '"State":' + State + ',"City":' + City + ',"CollageName":' + clgname + ', ' +
//             '"Branch":' + brnchname + ',"CGPA":' + cgpa + ',"FromToWhenYouStudied":' + daterange + ',"Zip":' + zipcode + ' ' +
//             '}'

//         var studentData = localStorage.getItem("studentData");
//         //var studentData = sessionStorage.getItem("studentData");
//         if (studentData != null) {
//             var studentJsonData = JSON.parse(studentData);
//             studentJsonData.students.push(StudentDetails);
//             localStorage.setItem("studentData", JSON.stringify(studentJsonData));
//             //sessionStorage.setItem("studentData", JSON.stringify(studentData));
//         }
//         else {
//             var studentData = JSON.parse('{"students": []}');
//             studentData.students.push(StudentDetails);
//             localStorage.setItem("studentData", JSON.stringify(studentData));
//             //sessionStorage.setItem("studentData", JSON.stringify(studentData));
//         }
//         $("#basic_form")[0].reset();
//     });

//     $("#table").on('click', '.btn-danger', function () {         //delete
//         var current_row = $(this).closest("tr");
//         var srno = current_row.attr("id");
//         current_row.remove();
//         console.log("srno", srno)   //sr no
//         swal("Deleted!", "Your Imaginary file has been deleted", "success");
//         var studentData = JSON.parse(localStorage.getItem("studentData"));
//         console.log(studentData);
//         //get item index from sr no and delete in array
//         studentData.students[srno]
//         studentData.students.splice(srno, 1)  //deletes last item from array
//         console.log(studentData);
//         localStorage.clear()
//         localStorage.setItem("studentData", JSON.stringify(studentData));

//     });

//     $("#table").on('click', '.btn-warning', function () {       //edit
//         var current_row = $(this).closest("tr");
//         console.log("EDIT")
//         var values = []
//         current_row.find("td").each(function () {
//             values.push($(this).text());
//         });
//         console.log("VALES_ARR", values)

//         var obj = {
//             name: values[1],
//             mobile: values[2],
//             email: values[3],
//             clgname: values[4],
//             cgpa: values[5],
//             brnchname: values[6],
//             State: values[7],
//             City: values[8],
//             zipcode: values[9],
//             daterange: values[10],
//         }
//         console.log("OBJ", obj);

//         var current_row = $(this).closest("tr");
//         var srno = current_row.attr("id");
//         current_row.remove();

//         var studentData = JSON.parse(localStorage.getItem("studentData"));
//         console.log(studentData);
//         //get item index from sr no and delete in array
//         studentData.students[srno]
//         studentData.students.splice(srno, 1)  //deletes last item from array
//         console.log(studentData);
//         localStorage.clear()
//         localStorage.setItem("studentData", JSON.stringify(studentData));

//         $("#save").css('display', 'block')
//         $("#addrow").css("display", "none");
//         $("#export").css("display", "none");

//         $("#name").val(obj['name'])
//         $("#mobile").val(obj['mobile'])
//         $("#email").val(obj['email'])
//         $("#clgname").val(obj['clgname'])
//         $("#cgpa").val(obj['cgpa'])
//         $("#brnchname").val(obj['brnchname'])
//         $("#state").val(obj['state'])
//         $("#city").val(obj['city'])
//         $("#zipcode").val(obj['zipcode'])
//         $("#daterange").val(obj['daterange'])

//     });

//     $('#save').click(function () {

//         var name = $("#name").val();
//         var mobile = $("#mobile").val();
//         var email = $("#email").val();
//         var clgname = $("#clgname").val();
//         var cgpa = $("#cgpa").val();
//         var brnchname = $("#brnchname").val();
//         var State = $("#State").val();
//         var City = $("#City").val();
//         var zipcode = $("#zipcode").val();
//         var daterange = $("#daterange").val();

//         // alert('Save button clicked');
//         if (name != "" && mobile != "" && email != "" && clgname != "" && cgpa != "" && brnchname != "" && State != "" && City != "" && zipcode != "" && daterange != "") {
//             $("#table ").append(
//                 '<tr id="' + counter + '" class="child"><td>' +
//                 //  count +
//                 "</td><td>" +
//                 name +
//                 "</td><td>" +
//                 mobile +
//                 "</td><td>" +
//                 email +
//                 "</td><td>" +
//                 clgname +
//                 "</td><td>" +
//                 cgpa +
//                 "</td><td>" +
//                 brnchname +
//                 "</td><td>" +
//                 State +
//                 "</td><td>" +
//                 City +
//                 "</td><td>" +
//                 zipcode +
//                 "</td><td>" +
//                 daterange +
//                 '</td><td><a href="javascript:void(0);" class="remCF1 btn btn-small btn-danger">Delete</a><a href="javascript:void(0);" class="remCF1 btn btn-small btn-warning">Edit</a></td></tr>'
//             )
//         }

//         var StudentDetails = '{ ' +
//             '"Name":' + name + ',"Mobile":' + mobile + ',"Email":' + email + ', ' +
//             '"State":' + State + ',"City":' + City + ',"CollageName":' + clgname + ', ' +
//             '"Branch":' + brnchname + ',"CGPA":' + cgpa + ',"FromToWhenYouStudied":' + daterange + ',"Zip":' + zipcode + ' ' +
//             '}'

//         var studentData = localStorage.getItem("studentData");
//         //var studentData = sessionStorage.getItem("studentData");
//         if (studentData != null) {
//             var studentJsonData = JSON.parse(studentData);
//             studentJsonData.students.push(StudentDetails);
//             localStorage.setItem("studentData", JSON.stringify(studentJsonData));
//             //sessionStorage.setItem("studentData", JSON.stringify(studentData));
//         }
//         else {
//             var studentData = JSON.parse('{"students": []}');
//             studentData.students.push(StudentDetails);
//             localStorage.setItem("studentData", JSON.stringify(studentData));
//             //sessionStorage.setItem("studentData", JSON.stringify(studentData));
//         }

//         $("#basic_form")[0].reset();
//         $("#save").css('display', 'none')
//         $("#addrow").css("display", "block");
//         $("#export").css("display", "block");

//     });

//     $("#export").on("click", function () {
//         window.open('data:application/vnd.ms-excel,' + $('.table-responsive').html());
//         swal("Downloaded!", "Your Imaginary file has been Downloaded", "success");
//     });

// });
