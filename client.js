//Loads the correspondig view
function load() {
	if(localStorage.getItem("token") != null)
	{
		document.getElementById("main").innerHTML = document.getElementById("profileView").innerHTML;	
	} else {
    	document.getElementById("main").innerHTML = document.getElementById("welcomeView").innerHTML;
    }
}

//validate LogIn form
function validateLogIn() {

    var correct=true;

    var mail2=document.loginform.email.value;
    if(mail2==null || mail2=="") {
        document.loginform.email.style.borderColor="red";
        correct = false;
    }

    var pass2=document.loginform.password.value;
    if(pass2==null || pass2=="") {
        document.loginform.password.style.borderColor="red";
        correct = false;
    }
    
    if(correct) {
     	if(typeof(Storage)!=="undefined")
	 	{
	 		//Try to log in the user
	 		var user = serverstub.signIn(mail2, pass2);
	 		if(user.success==true)
		 	{
		 		// Store token for the signed-in user
		 		localStorage.setItem("user_token", user.data);
		 		document.getElementById("main").innerHTML = document.getElementById("profileView").innerHTML;
		 		console.log("Signed in correctly");
		 	} else {
		 		//Display error message sent by the server and change the borders to red
			 	document.getElementById("error1label").innerHTML=user.message;
			 	document.loginform.email.style.borderColor="red";
			 	document.loginform.password.style.borderColor="red";
			 	console.log("Error");
		 	}
	  	}
		else
		{
			alert("Your browser does not support some of our features. Update it!")
 		}
    }
}

//validate SignUp form
function validateSignUp() {

    var correct = true;

    var firstName=document.signupform.firstname.value;
    if(firstName==null || firstName=="") {
        document.signupform.firstname.style.borderColor="red";
        correct = false;
    }

    var familyName=document.signupform.familyname.value;
    if(familyName==null || familyName=="") {
        document.signupform.familyname.style.borderColor="red";
        correct = false;
    }

    var city=document.signupform.city.value;
    if(city==null || city=="") {
        document.signupform.city.style.borderColor="red";
        correct = false;
    }

    var country=document.signupform.country.value;
    if(country==null || country=="") {
        document.signupform.country.style.borderColor="red";
        correct = false;
    }

    var mail=document.signupform.email.value;
    if(mail==null || mail=="") {
        document.signupform.email.style.borderColor="red";
        correct = false;
    }

    var pass=document.signupform.password.value;
    if(pass==null || pass=="") {
        document.signupform.password.style.borderColor="red";
        correct = false;
    }
    var rptPassword=document.signupform.rptpassword.value;
    if(rptPassword==null || rptPassword=="") {
        document.signupform.rptpassword.style.borderColor="red";
        correct = false;
    }

    if (pass != rptPassword) {
        document.signupform.password.style.borderColor="red";
        document.signupform.password.value="";
        document.signupform.rptpassword.style.borderColor="red";
        document.signupform.rptpassword.value="";
        document.getElementById("error2label").innerHTML="Passwords do not match";
        correct = false;
    }

    if(correct) {
		var formData = {"email": document.signupform.email.value,
				"password": document.signupform.password.value,
                "firstname": document.signupform.firstname.value,
                "familyname": document.signupform.familyname.value,
                "gender": document.signupform.gender.value,
                "city": document.signupform.city.value,
                "country": document.signupform.country.value};
		var answer = serverstub.signUp(formData);
		if(answer.success==true) {
			var form = document.signupform
			for(i=0;i<form.elements.length;i++)
			{
				if(form.elements[i].tagName == "INPUT") {
					form.elements[i].value = "";
				} else {
					continue;
				}
			}
			document.getElementById("error2label").innerHTML=answer.message;
		} else {
			if(answer.message=="User already exists.") {
				document.signupform.email.style.borderColor="red";
				
			}
			document.getElementById("error2label").innerHTML=answer.message;
		}
    }
}

function changed(name)
{
	var form = name.parentNode;
	var fName = form.name;
	var tag = "";
	
	if(fName=="loginform") {
		tag = "error1label";
	} else if(fName=="signupform") {
		tag = "error2label";
	}
	
	if(document.getElementById(tag).innerHTML=="" || document.getElementById(tag).innerHTML==null) {
	    name.style.borderColor = "black";
	} else {
		for (i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].tagName == "BUTTON" || form.elements[i].tagName == "SELECT")
			{
				continue;
			}
			if(form.elements[i].tagName == "INPUT")
			{
				form.elements[i].style.borderColor = "black";
			}
		}
	}
	document.getElementById(tag).innerHTML="";
}
function select_tab(name)
{
	if(name=="home_tab")
	{
		document.getElementById("home_tab").style.display="block";
		document.getElementById("browse_tab").style.display="none";
		document.getElementById("account_tab").style.display="none";
		document.getElementById("wrapper").innerHTML="<h1>Home</h1>";
		
	}
	else if(name=="browse_tab")
	{
		document.getElementById("home_tab").style.display="none";
		document.getElementById("browse_tab").style.display="block";
		document.getElementById("account_tab").style.display="none";	
	}
	else if(name=="account_tab")
	{
		document.getElementById("home_tab").style.display="none";
		document.getElementById("browse_tab").style.display="none";
		document.getElementById("account_tab").style.display="block";
	}
}
function prueba(name)
{
	var text = "Home";
	document.getElementById("content").innerHTML="<h1>" + text + "</h1>";
	document.getElementById("text1").style.backgroundColor="blue";
}