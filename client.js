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
        document.logIn.email.style.borderColor="red";
        correct = false;
    }

    var pass2=document.loginform.password.value;
    if(pass2==null || pass2=="") {
        document.logIn.password.style.borderColor="red";
        correct = false;
    }
    
    if(correct) {
     	if(typeof(Storage)!=="undefined")
	 	{
	 		//Try to log in the user
	 		var user = serverstub.signIn(mail2, pass2);
	 		if(user.success=="true")
		 	{
		 		// Store token for the signed-in user
		 		localStorage.setItem("token", user.data);
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
        document.signUp.firstname.style.borderColor="red";
        correct = false;
    }

    var familyName=document.signupform.familyname.value;
    if(familyName==null || familyName=="") {
        document.signUp.familyname.style.borderColor="red";
        correct = false;
    }

    var city=document.signupform.city.value;
    if(city==null || city=="") {
        document.signUp.city.style.borderColor="red";
        correct = false;
    }

    var country=document.signupform.country.value;
    if(country==null || country=="") {
        document.signUp.country.style.borderColor="red";
        correct = false;
    }

    var mail1=document.signupform.email.value;
    if(mail1==null || mail1=="") {
        document.signUp.email.style.borderColor="red";
        correct = false;
    }

    var pass1=document.signupform.password.value;
    if(pass1==null || pass1=="") {
        document.signUp.password.style.borderColor="red";
        correct = false;
    }
    var rptPassword=document.signupform.rptpassword.value;
    if(rptPassword==null || rptPassword=="") {
        document.signUp.rptpassword.style.borderColor="red";
        correct = false;
    }

    if (pass1 != rptPassword) {
        document.signupform.password.style.borderColor="red";
        document.signupform.password.value="";
        document.signupform.rptpassword.style.borderColor="red";
        document.signupform.rptpassword.value="";
        document.getElementById("error2label").innerHTML="Passwords do not match";
        correct = false;
    }

    if(correct) {
		var answer = serverstub.signUp(document.signupform);
		if (answer.success == "true") {
			document.getElementById("error2label").innerHTML=answer.message;
        } else {
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