document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    selectable: true,
    editable: true,
    eventResourceEditable: true,
    eventClick: function (info) {
      SweetA(info);
    },
  });
  calendar.render();

  calendar.on("dateClick", function (info) {
    $("#myM").modal("toggle");
    $("#name").val("");
    $("#num").val("");
    $("#fcolor").val("");

    document.getElementById("saveData").onclick = function () {
      var inp = document.getElementById("name").value;
      var inp1 = document.getElementById("num").value;
      var inp2 = document.getElementById("fcolor").value;
      var date = info.dateStr;
      var check = date.includes("+");
      var tittle = inp + " " + inp1;

      if (inp != "" && inp1 != "") {
        if (check) {
          calendar.addEvent({
            title: tittle,
            start: date,
            allDay: false,
            color: inp2,
          });
        } else {
          calendar.addEvent({
            title: tittle,
            start: date,
            allDay: true,
            color: inp2,
          });
        }
      }
    };
  });

  calendar.render();
});

function SweetA(info) {
  console.log(info);
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Edit",
    denyButtonText: "Delete",
    customClass: {
      actions: "my-actions",
      cancelButton: "order-1 right-gap",
      confirmButton: "order-2",
      denyButton: "order-3",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      $("#myM").modal("toggle");
      $("#name").val("");
      $("#num").val("");
      $("#fcolor").val("");

      let value = info.event.title;
      const myArray = value.split(" ");

      $("#name").val(myArray[0]);
      $("#num").val(myArray[1]);
      $("#fcolor").val(info.event.backgroundColor);

      document.getElementById("saveData").onclick = function (e) {
        let form = document.getElementsByClassName("needs-validation");
        if (form[0].checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        form[0].classList.add("was-validated");
        if (form[0].checkValidity() === true) {
          e.preventDefault();
          e.stopPropagation();
          var inp = document.getElementById("name").value;
          var contact = document.getElementById("num").value;
          var color = document.getElementById("fcolor").value;
          var tittle = inp + " " + contact;
          info.event.setProp("title", tittle);
          info.event.setProp("color", color);
        }
      };
    } else if (result.isDenied) {
      info.event.remove();
    }
  });
}

function vName(key) {
  var keycode = key.which ? key.which : key.keyCode;

  if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)) {
    return true;
  } else {
    return false;
  }
}
function vNum(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
