var isinpassword = 1;
var isinloading = 1;
var selectedobj = window;
var isinnotonj = 0;
var con = new SimpleConsole({
	handleCommand: handle_command,
	placeholder: "Enter command or script",
	storageID: "simple-console demo"
});document.body.appendChild(con.element);con.element.classList.add("dark");
//Password
var Password;
var PasswordHint;

if (localStorage.getItem('password') === null) {
Password = 'password'}
else { Password = localStorage.getItem('password')}
if (localStorage.getItem('passwordHint') === null) {
PasswordHint = 'not found'}
else { PasswordHint = localStorage.getItem('passwordHint')}
//time
window.d = new Date(); window.months = ["January", "February", "March", "April", "May", "June", "July", "August",
		"September", "October", "November", "December"]; window.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
		"Saturday"];
//Location.search

var locsearch = location.search;
locsearch = locsearch.replace('?', '');
locsearch = locsearch.split('&');
for (let i = 0; i < locsearch.length; i++) {
if (locsearch[i] === "alwayscommands=true") {
	isinpassword = 0;
    isinloading = 0;
	
}
if (locsearch[i] === "debug=true") {
con.logHTML(`<input id='alwayscommandsbtn' type = 'button' value='alwayscommands' onclick= 'isinpassword = 0;isinloading = 0;'>`)
}
if (locsearch[i] === "noconsolehistory=true") {
setInterval(function() { localStorage.setItem('simple-console demo command history', []) },10000)
}
}
//loding
con.logHTML('loding kernal<progress id= "lod1" max= 40 value= 0></progress>')
var lod1el = document.getElementById('lod1');
var lod1loader = setInterval(function() {
	lod1el.value = lod1el.value + 1;
	
	if (lod1el.max === lod1el.value) {
	clearTimeout(lod1loader);
		
	}
}, 50)
setTimeout(function() {
	con.logHTML('loding main libraries<progress id= "lod2" max= 45 value= 0></progress>')
var lod2el = document.getElementById('lod2');
var lod2loader = setInterval(function() {
	lod2el.value = lod2el.value + 1;
	
	if (lod2el.max === lod2el.value) {
	clearTimeout(lod2loader);
		
	}
}, 50)
}, 2000)

setTimeout(function() {
con.logHTML('loding drivers <span id ="lod3span">1</span><progress id= "lod3" max= 20 value= 0></progress>')
var lod3el = document.getElementById('lod3');
var lod3elspan = document.getElementById('lod3span');
var lod3loader = setInterval(function() {
	lod3el.value = lod3el.value + 1;
	lod3elspan.innerText = new Number(lod3elspan.innerText) + 1;
	
	if (lod3el.max === lod3el.value) {
	clearTimeout(lod3loader);
	
	}
}, 100)
}, 4500);

setTimeout(function() {
	con.logHTML('loding shell<progress id= "lod4" max= 20 value= 0></progress>')
var lod4el = document.getElementById('lod4');
var lod4loader = setInterval(function() {
	lod4el.value = lod4el.value + 1;
	
	if (lod4el.max === lod4el.value) {
	clearTimeout(lod4loader);
	isinloading = 0;
	setTimeout(function () {con.log('enter password') }, 1500);
	setTimeout(function () {con.log('loaded') }, 500);
	}
}, 50)
}, 7000)
var collection = {
setting: {
	main: `<div onclick='collection.setting.security.main()'>security</div>`,
	security: {
		main: function() {con.logHTML(`<div>stg security changePassword (value)</div><div>stg security changePasswordHint (value)</div>`)}
	}
}
};
function handle_command(command){
	if (isinloading === 1) {
		
	con.log('wait');
	} else { 
	if (isinpassword === 1) {
	if (command === 'hint') {con.log(PasswordHint)} else
	if (command === Password) {
	isinpassword = 0;
	con.log('correct');
	} else { 
	con.log('uncorrect');
	}}
	else{
		if (command === 'hallo') {con.log('hallo')} else  
        if (command === 'clrscr') {con.clear()} else  
		if (command === 'date') { con.log(`${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`)} else 
		if (command === 'time')	{ con.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)}	else 
		if (command === 'fullDate')	{ con.log(`${new Date()}`)} else { 
		window.cmdWord = command.split(' ');
		window.cmdFirst = command.split(' ', 1)[0];
		if (cmdFirst === 'HTML') { con.logHTML(command.replace('HTML ', ''))} else
		if (cmdFirst === 'stg') { 
		if (cmdWord[1] === 'security') {
		if (cmdWord[2] === 'changePassword') {
		localStorage.setItem('password', command.replace('stg security changePassword ', ''))
		} else if (cmdWord[2] === 'changePasswordHint') {localStorage.setItem('passwordHint', command.replace('stg security changePasswordHint ', ''))} 
		else {collection.setting.security.main()}
		} else {con.logHTML(collection.setting.main)}
		} else if (cmdFirst === 'so') { if (selectedobj[cmdWord[1]] instanceof Object) {isinnotonj = 0;window.selectedobj = selectedobj[cmdWord[1]];
		con.logHTML(`selected `)} else {con.log('not an object')}}
		else if (cmdFirst === 'lo') { window.selectedobjkeys = Object.getOwnPropertyNames(selectedobj);
		if (selectedobjkeys.length < 100) {selectedobjkeys.forEach(function (key) {con.log(key)})
	    if (selectedobj.length === 0 ) {con.log('there is no thing')}} else {con.log('more than the limit')} ;}
		else if (cmdFirst === 'co') { selectedobj[cmdWord[1]] = {}; con.log('created')}
		else if (cmdFirst === 'sw') {selectedobj = window; con.log('selected');}
		else if (cmdFirst === 'si') {con.log(selectedobj[cmdWord[1]]); isinnotonj = 1; window.item = cmdWord[1]}
		else if (isinnotonj === 1) {
		if (command === 'type') {con.log(typeof selectedobj[window.item])}
		if (cmdFirst === 'edit') {eval(`window.selectedobj[item] = ${command.replace('edit ', '')};`);con.log(selectedobj[item])}
		if (cmdFirst === 'copy') {navigator.clipboard.writeText(selectedobj[item].toString());con.log('copied')}
		if (cmdFirst === 'delete') {delete selectedobj[item]; con.log('deleted')}
		}
		else if (cmdFirst === 'type') {con.log(typeof selectedobj[cmdWord[1]])}
		else if (cmdFirst === 'go') {location.href = command.replace('go ', '')}
		else if (cmdFirst === 'delete') {delete selectedobj[cmdWord[1]]; con.log('deleted')}
		else if (cmdFirst === 'help') {con.log(`hallo : log hallo
		clrscr : clear the screan
		Date : display the date
		time : display the time
		fullDate : display date + time
		HTML (value) : log the value as html content
		stg : change the setting (for more help type it)
		so (value) : select an Object
		lo : list the properties of the selected object
		co (value) : create an object inside the selected object
		sw : select the window object
		si (value) : select and log a property from the selected object	
		type (value) : log the type of a property inside the selected object if value is defined else log the type of the selected item
		edit (value) : edit the value of the selected item
		copy : copy the value of the selected object
		delete (value) : delete a property from the selected object of value is defined else delete the selected item
		go (value) : change the url`)}
		else { var err;
		try{
			var result = eval(command);
		}catch(error){
			err = error;
		}
		if(err){
			con.error(err);
		}else{
			con.log(result).classList.add("result");
		}
	}}}}
};
