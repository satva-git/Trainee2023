$(document).ready(function () {
    $(function () {
      $("form[name='registration']").validate({
        rules: {
          email: {
            required: true,
            email: true
          },
          password: {
            required: true,
            minlength: 5
          }
        },
        messages: {
          password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
          },
          email: "Please enter a valid email address"
        },
        submitHandler: function (form) {
          form.submit();
        }
      });
    });
  });
  
  const data = [
    { email: "Ravalsoham17@gmail.com", password: "12345", name: "Raval",Image:"/Badeloft/Assets/3_image.jfif" },
    { email: "soham17@gmail.com", password: "43211", name: "Soham",Image:"/Badeloft/Assets/4_image.jfif" },
    {email:"abc2000@gmail.com",password:"65445",name:"abc",Image:"/Badeloft/Assets/5_image.jfif" },
    {email:"xyx2112@gmail.com",password:"98899",name:"xyz",Image:"/Badeloft/Assets/6_image.jpg" },
  ];
  localStorage.setItem("staticdata",JSON.stringify(data));
  
  function adddata() {
    debugger
  
    if ($("#myform").valid() == true) {
  
       
      
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
    
      var details;
      if (localStorage.getItem("details") == null) {
        details = [];
        debugger
      }
      else {
        details = JSON.parse(localStorage.getItem("details"));
        // console.log("key",details)
  
        if ((email == data[0].email  && password==data[0].password) )
         {
          details.push({
            email: email,
            Name:data[0].name,
            image:data[0].Image
  
          });
  
          window.location.replace("Stock.html");
        }
        else if((email == data[1].email && password==data[1].password ))
        {
          details.push({
            email: email,
            Name:data[1].name,
            image:data[1].Image
  
          });
          localStorage.setItem("details",JSON.stringify(details));
  
          window.location.replace("Stock.html");
        }
  
        else if((email == data[2].email && password==data[2].password ))
        {
          details.push({
            email: email,
            Name:data[2].name,
             image:data[2].Image
  
          });
          localStorage.setItem("details",JSON.stringify(details));
  
          window.location.replace("Stock.html");
        }else if((email == data[3].email && password==data[3].password ))
        {
          details.push({
            email: email,
            Name:data[3].name,
           image:data[3].Image
  
          });
          localStorage.setItem("details",JSON.stringify(details));
          // console.log("person3",email);
  
          window.location.replace("Stock.html");
        }
  
        else {
          if ((email != data[0].email)) {
            document.getElementById("invalid_email").innerHTML = "This  is not login user*"
          }
        }
      }
      localStorage.setItem("details", JSON.stringify(details));
      console.log(details);
      // localStorage.setItem("validdetails", JSON.stringify(details));
  
    }
  }
  