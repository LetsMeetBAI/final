var config = {
    apiKey: "AIzaSyAxteQnfJWDilWg9SoCPX9kpB3RkTutde4",
    authDomain: "letmeet-bai.firebaseapp.com",
    databaseURL: "https://letmeet-bai.firebaseio.com",
    projectId: "letmeet-bai",
    storageBucket: "letmeet-bai.appspot.com",
    messagingSenderId: "688044304067"
  };
  firebase.initializeApp(config);
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("meet_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.displayName;
	  if (email_id!=null){
		  var email_id = user.displayName;
	  }else {
		  email_id = user.email;
	  }
      document.getElementById("user_para").innerHTML = "Welcome " + email_id;

    }

  } else {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
	document.getElementById("meet_div").style.display = "none";
  }
});

function letsmeet(){
	window.location.replace('addmeeting.html');
	
}
function addeventpage(){
	window.location.replace('addevent.html');
	
}
function userinfopage(){
	window.location.replace('editprofile.html');
	//document.getElementById("edituser_div").style.display = "block";
	//document.getElementById("showuser_div").style.display = "none";
}
function edituserinfo(){
	document.getElementById("edituser_div").style.display = "block";
	document.getElementById("showuser_div").style.display = "none";
	document.getElementById("user_div").style.display = "none";
}
function showuserinfo(){
	document.getElementById("edituser_div").style.display = "none";
	document.getElementById("showuser_div").style.display = "block";
	document.getElementById("user_div").style.display = "none";
	var database = firebase.database();
	var userId = firebase.auth().currentUser.uid;
	return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
	var username_profile = (snapshot.val() && snapshot.val().username) || 'Anonymous';
	var hobby_profile = (snapshot.val() && snapshot.val().hobby ) || 'Anonymous';
	var języki_profile = (snapshot.val() && snapshot.val().języki) || 'Anonymous';
	var płeć_profile = (snapshot.val() && snapshot.val().płeć) || 'Anonymous';
	document.getElementById("username_profile").innerHTML=username_profile;
	document.getElementById("hobby_profile").innerHTML=hobby_profile;
	document.getElementById("języki_profile").innerHTML=języki_profile;
	document.getElementById("płeć_profile").innerHTML=płeć_profile;
	});
	
}
function editprofajl(){
	document.getElementById("edituser_div").style.display = "none";
	document.getElementById("showuser_div").style.display = "none";
	document.getElementById("user_div").style.display = "block";
	document.getElementById("show_events").style.display = "none";
}
function showuserevents(){
	document.getElementById("edituser_div").style.display = "none";
	document.getElementById("showuser_div").style.display = "none";
	document.getElementById("user_div").style.display = "none";
	document.getElementById("show_events").style.display = "block";
	
	readevents();
}


function tologinpage(){
	//window.location.replace('login.html');
	document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("meet_div").style.display = "block";
}

function showeventpage(){
	var test =1;
	window.location.replace('showevent.html');
	if (test !=null){
	showevents1();
	}
}
function Doindex2(){
	window.location.replace('index2.html');
}
function toindexpage(){
	window.location.replace('index.html');
}
function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
   });
}
function register(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });

}function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function Googlelogin() {
    firebase.auth().onAuthStateChanged( function(user){
        if(user) {
            login(user);
        } else {
            var provider = new  firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    });
}

function Facebooklogin() {
    firebase.auth().onAuthStateChanged( function(user){
        if(user) {
            login(user);
        } else {
            var provider = new  firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    });
}

function facetoken(){
	window.fbAsyncInit = function() {
    FB.init({
      appId      : '1583806705075141',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/pl_PL/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

 
FB.getLoginStatus(function(response) {
statusChangeCallback(response);
});
//FB.api('/me?fields=id,name,email', function(response) {
  //console.log(response);
//});
FB.login(function(response) {
  if (response.status === 'connected') {
    console.log('Logged into your app and Facebook.');
	window.alert("zalogowano");
  } else {
    console.log('The person is not logged into this app or we are unable to tell.'); 
  }
});
//var credential = firebase.auth.FacebookAuthProvider.credential(accessToken);



}

function Googlelogintest() {
	gapi.load('auth2', function() {
        gapi.auth2.init();
      });
	gapi.auth2.init();
	const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
	const profile = googleUser.getBasicProfile();
console.log('googleUser');
console.log('profile');
}


function logout(){
  firebase.auth().signOut();
}

function showmeet(){
	var leadsRef = database.ref('meetings');
leadsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
    });
});
}
function showevent(){
	var leadsRef = database.ref('events');
	leadsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
    });
});
}
function userinfo(){
	firebase.auth().onAuthStateChanged((user) => {
	if (user) {
	var ref = firebase.database().ref();
	var database = firebase.database();
	var UserName = document.getElementById("UserName").value;
	var plec = document.getElementById("sex").value;
	var hobby = document.getElementById("hobby");
	var jezyki = document.getElementById("languages");
    var selected1 = [];
	var selected2 = [];
    for (var i = 0; i < jezyki.length; i++) {
        if (jezyki.options[i].selected) selected1.push(jezyki.options[i].value);
    }
	for (var i = 0; i < hobby.length; i++) {
        if (hobby.options[i].selected) selected2.push(hobby.options[i].value);
    }
	firebase.database().ref('users/' + user.uid).update({
    username: UserName,
    płeć:plec,
	hobby:selected2,
	języki:selected1	
  });
  
};
		if (UserName !=null) {
            window.location.replace('editprofile.html');
            }
			else{
			window.alert("kupa");
             return
			}
})
            
}

function readevents(){

	var database = firebase.database();
	var userId = firebase.auth().currentUser.uid;
	ref = firebase.database().ref('/users/' + userId);

var database = firebase.database();
var eventRef = database.ref('users/' + userId);
i=0;
var meeti=[];
var eventi=[];
eventRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
	var elo=snapshot.numChildren();
	   meeti[i] = childData.Meetings;
	   eventi[i] = childData.Events;
	   
	     
	   //console.log(meeti);
	//   console.log(eventi);
	//   console.log(elo);
	   
	  // $("#tabelmeet").append(meeti);
	   
	 //  $("#tabelev").append(eventi);
	   i++;
	   });
	   test(meeti,eventi);
});


}

function test(meeti,eventi){
	
	var a=meeti;
	var b=a.filter(Boolean);
	console.log(b)
	var c=eventi;
	var d=c.filter(Boolean);
	console.log(d)	
	findevent(d)
	findmeeting(b)
}

function addevent(title,loc,link,zuser,date,datetime,email,phone){
	
	var ref = firebase.database().ref();
    var user = firebase.auth().currentUser;
    
    var titletemp = document.getElementById(title).value;
    var loctemp = document.getElementById(loc).value;
    var eventLink = document.getElementById(link).value;

    var userName = document.getElementById(zuser).value;
	var eventStartDate = document.getElementById(date).value;
    var eventEndDate = document.getElementById(datetime).value;
    var userMail = document.getElementById(email).value;
    var userPhone = document.getElementById(phone).value;

    var myRef = ref.child("events");

    var newData={
        Title: titletemp,
        Location: loctemp,
        Link: eventLink,
        Date: eventStartDate,
        DateTime: eventEndDate,
        UserName: userName,
        Email : userMail,
        Phone : userPhone
    }
    
    myRef.push(newData);
	alert("Wydarzenie utworzone!");
			
	
}
function addmeetings(title1,loc1,link1,zuser1,date1,datetime1,email1,phone1){
	
	var ref = firebase.database().ref();
    var user = firebase.auth().currentUser;
    
    var titletemp = document.getElementById(title1).value;
    var loctemp = document.getElementById(loc1).value;
    var eventLink = document.getElementById(link1).value;

    var userName = document.getElementById(zuser1).value;
	var eventStartDate = document.getElementById(date1).value;
    var eventEndDate = document.getElementById(datetime1).value;
    var userMail = document.getElementById(email1).value;
    var userPhone = document.getElementById(phone1).value;

    var myRef = ref.child("meetings");

    var newData={
        Title: titletemp,
        Location: loctemp,
        Link: eventLink,
        Date: eventStartDate,
        DateTime: eventEndDate,
        UserName: userName,
        Email : userMail,
        Phone : userPhone
    }
    
    myRef.push(newData);
	alert("Spotkanie dodane!");
			
}
var ref = firebase.database().ref();
var myRef = ref.child("meetings");
function showmeetings(){
var database = firebase.database();
var eventRef = database.ref('events');
var meetRef = database.ref('meetings');


var kluczme=[];
	  var meettitle = [];
	  var meetemail = [];
	  var meetUserName = [];
	  var meetDate = [];
	  var meetDateTime = [];
	  var meetLocation = [];
	  var meetPhone = [];
var kluczev=[];
	  var eventtitle = [];
	  var eventemail = [];
	  var eventUserName = [];
	  var eventDate = [];
	  var eventDateTime = [];
	  var eventLocation = [];
	  var eventPhone = [];
var i=0;
eventRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
	  kluczev[i] = childSnapshot.key;

	   eventtitle[i] = childData.Title
	   eventemail[i] = childData.Email
	   eventUserName[i] = childData.UserName
	   eventDate[i] = childData.Date
	   eventDateTime[i] = childData.DateTime
	   eventLocation[i] = childData.Location
	   eventPhone[i] = childData.Phone
i++;
    });
	zmienne(kluczev,eventtitle,eventemail,eventUserName,eventDate,eventDateTime,eventLocation,eventPhone);
});

var j=0;
meetRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
	  kluczme[j] = childSnapshot.key;
	   meettitle[j] = childData.Title
	   meetemail[j] = childData.Email
	   meetUserName[j] = childData.UserName
	   meetDate[j] = childData.Date
	   meetDateTime[j] = childData.DateTime
	   meetLocation[j] = childData.Location
	   meetPhone[j] = childData.Phone
			j++;
    });
	zmienne1(kluczme,meettitle,meetemail,meetUserName,meetDate,meetDateTime,meetLocation,meetPhone);
});
}

function zmienne1(kluczev,eventtitle,eventemail,eventUserName,eventDate,eventDateTime,eventLocation,eventPhone){
	eventtable(kluczev,eventtitle,eventemail,eventUserName,eventDate,eventDateTime,eventLocation,eventPhone);
}
function zmienne(kluczme,meettitle,meetemail,meetUserName,meetDate,meetDateTime,meetLocation,meetPhone){
	meettable1(kluczme,meettitle,meetemail,meetUserName,meetDate,meetDateTime,meetLocation,meetPhone);
}
function eventtable(kluczev,eventtitle,eventemail,eventUserName,eventDate,eventDateTime,eventLocation,eventPhone){
var ref = firebase.database().ref();
ref.child("meetings").on("value", function(snapshot) {

var elo=snapshot.numChildren();
console.log(elo+" meetings");
	for(var i=0; i<elo;i++){
			$("#tabelkaevent").append("<div id='test12'>Nazwa wydarzenia:<p>" + eventtitle[i] + "</p>Email:<p>" + eventemail[i] + "</p>Uzytkownik:<p>" + eventUserName[i] +"</p>Data<p>" 
			+ eventDate[i] +"</p><p>" + eventDateTime[i] +"</p>Lokalizacja:<p>" + eventLocation[i] + "</p>Telefon:<p>" + eventPhone[i] + '</p><p class="klucz" hidden>' + kluczev[i]
		+'</p><p><button class="btn" >Dołącz</button></p></div>');
	}
})
}
function meettable1(kluczme,meettitle,meetemail,meetUserName,meetDate,meetDateTime,meetLocation,meetPhone){
var ref = firebase.database().ref();
ref.child("events").on("value", function(snapshot) {

var elo=snapshot.numChildren();
console.log(elo+" events");
	for(var i=0; i<elo;i++){
			$("#tabelkam").append("<div id='test12'>Nazwa spotkania:<p>" + meettitle[i] + "</p>Email:<p>" + meetemail[i] + "</p>Uzytkownik:<p>" + meetUserName[i] +"</p>Data<p>" 
			+ meetDate[i] +"</p><p>" + meetDateTime[i] +"</p>Lokalizacja:<p>" + meetLocation[i] + "</p>Telefon:<p>" + meetPhone[i] + '</p><p value="heh" class="klucz" hidden>' + kluczme[i]
		+'</p><p><button class="btn" >Dołącz</button></p></div>');
		//document.getElementById("mattednbtn").value = kluczme[i];
	}
})
}
function attendevent(data){
	
	var database = firebase.database();
	var meetuser = database.ref('meetings');
	var ref = firebase.database().ref();
	
	var database = firebase.database();
	var userId = firebase.auth().currentUser.uid;
	var user = firebase.auth().currentUser;
	var refer=firebase.database().ref('/users/' + userId )
    
	var eventkey =data;	
    var newData={
	Events: eventkey
	}
    console.log("event dodany");
	alert("Dołączono do wydarzenia!");
    refer.push(newData);
	
	
}
	

function attendmeeting(data){
	var database = firebase.database();
	var userId = firebase.auth().currentUser.uid;
	
	var refer=firebase.database().ref('/users/' + userId)
	
    var user = firebase.auth().currentUser;
	var eventkey =data;
	//var eventkey = document.getElementById("mattednbtn").value
    var newData={
	Meetings: eventkey
	}
    console.log("meeting dodany");
	alert("Dołączono do spotkania!");
    refer.push(newData);
	
}
function showstart(){
	showevents1();
	showmeetings();
}
function showevents1(){
	var ref = firebase.database().ref();
	ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    // ...
  });
});
	console.log(childKey);
	console.log(childData);
}
function writetabelkam(hejo,meettitle,meetemail,meetUserName,meetDate,meetDateTime,meetLocation,meetPhone){
			$("#tabelkam").append("<tr><td>" + meettitle + "</td><td>" + meetemail + "</td><td>" + meetUserName +"</td><td>" 
			+ meetDate +"</td><td>" + meetDateTime +"</td><td>" + meetLocation + "</td><td>" + meetPhone 
			+"</td><td>" + hejo + "</td></tr>");
		}

function findevent(klucz){
	var rootRef = firebase.database().ref('meetings');
	var heh=[];
	var meh=[];
	for (var i=0;i<klucz.length;i++){
		var hehe=klucz[i];
        
			rootRef.child(hehe).once('value',function(snapshot){
				var j=0;
            snapshot.forEach(function(childSnapshot) {
				meh[j]=childSnapshot.val();
				j++;
            })
			writetabelmeet(heh,meh);
        });
	}
}
function writetabelmeet(heh,meh){
	$("#tabelmeet").append('<div id="test12">Nazwa spotkania:<p>' + meh[6] + "</p>Email:<p>" + meh[2] + "</p>Uzytkownik:<p>" + meh[7] +"</p>Data<p>" 
			+ meh[0] +"</p><p>" + meh[1] +"</p>Lokalizacja:<p>" + meh[4] + "</p>Telefon:<p>" + meh[5]+'</p></div>');
}
function findmeeting(klucz){
	var rootRef = firebase.database().ref('events');
	var heh=[];
	var meh=[];
	for (var i=0;i<klucz.length;i++){
		var hehe=klucz[i];
        
			rootRef.child(hehe).once('value',function(snapshot){
				var j=0;
            snapshot.forEach(function(childSnapshot) {
				meh[j]=childSnapshot.val();
				j++;
            })
			writetabelev(heh,meh);
        });
	}
}
function writetabelev(heh,meh){

	$("#tabelev").append('<div id="test12">Nazwa Wydarzenia:<p>' + meh[6] + "</p>Email:<p>" + meh[2] + "</p>Uzytkownik:<p>" + meh[7] +"</p>Data<p>" 
			+ meh[0] +"</p><p>" + meh[1] +"</p>Lokalizacja:<p>" + meh[4] + "</p>Telefon:<p>" + meh[5]+'</p></div>');

}

