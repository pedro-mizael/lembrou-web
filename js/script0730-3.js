var notes = 0;

function replaceurl() {

	if (window.location.hash != "") {
	window.location.replace(window.location.hash = "");
	}
}

function loadNotes(number) {
	
	console.log(notes);

	if (typeof localStorage.allNotes != 'undefined' ) {
		let dbNotes = JSON.parse(localStorage.allNotes);
		let dbLength = dbNotes.length;

		if (dbLength <= 10 & number == '0') {
			number = dbLength;
			notes = dbLength;
		}else{
			number = 10;
			notes = notes + number;
		}

		if (notes > dbLength) {
			notes = dbLength;
			number = dbLength;
		}else{
			number = notes
		}

		document.getElementById("notes").innerHTML = "";


		for (let i = 0; i < number; i++) {
	let title = dbNotes[i].title;
	let note = dbNotes[i].note;
	let color = dbNotes[i].color;
	document.getElementById("notes").innerHTML += 
	'<div class="card" id="'+i+'" name="'+i+'"  style= "border-color: ' +color+ ' ;"  >'
	+ '<div id="title'+i+'" style="text-transform: uppercase;" class="card-title" onclick="fullScreen('+[i]+')">'
	+ '<b id="bTitle'+i+'">' 
	+ dbNotes[i].title 
	+ '</b>'
	+ '<textarea id="textTitle'+i+'" style="display: none">'
	+ '</textarea>'
	+ '</div>'
	+ '<div class="card-options" id="options'+i+'" onclick="dropMenu(cardMenu'+i+')"><b>...</b></div>'
	+ '<div id="note'+i+'" class="card-content" onclick="fullScreen('+[i]+')">'
	+ ' <blockquote class="mb-0" >'
	+ '<p id="content'+i+'">'
	+ dbNotes[i].note
	+ '</p>'
	+ '<textarea id="text'+i+'" disabled style="display: none">' 
	+ '</textarea>'
	+ '</blockquote>'
	+ '</div>'
	+ '<div class="card-menu" id="cardMenu'+i+'">'
	+ '<button onclick="del('+i+')">Excluir</button>'
	+ '<button onclick="edit('+i+'), show(cardEdit'+i+', textTitle'+i+'), hide(cardMenu'+i+', bTitle'+i+')">Editar</button>'
	+ '</div>'
	+ '<div class="card-edit" id="cardEdit'+i+'" style="display: none">'
	+ '<button onclick="saveEdit('+i+')" >Salvar</button>'
	+ '<button onclick="replaceurl(), hide(cardEdit'+i+', cardEdit'+i+')" >Cancelar</button>'
	+ '</div>'
	+ '</div>';
	

		}

		if (dbLength > 10) {
		document.getElementById("notes").innerHTML +=
		'<div id="moreNotes" class="card" style="background-color: #245E31; border-color: lightgray;">'
		+ '<div class="card-content" style="display: flex; flex-direction: column; justify-content: "center";>'
		+ '<img src="./css/loadMore.svg" style="height: 28px" onclick="loadNotes('+notes+')">'
		+ '</div>'
		+ '</div>';

		if (notes >= dbLength) {
			document.getElementById("moreNotes").style= "display: none";
		}
		}



	document.getElementById("mainElement").style.border = "none";
	document.getElementById("mainElement").style = "justify-content= 'space-between' ";
	document.getElementById('notes').style.display = "flex";
	}

};


function hashchange(argument) {
	let note = "new"
	if (window.location.hash !== '#NovoLembrete') {
		document.getElementById(note).style.width = '0px';
	}else{
		document.getElementById(note).style.width = '100%';
	}
}




function show(item1, item2) {

	let item = document.getElementById(item1.id);


	if (item.style.display != 'block' ) {
		document.getElementById(item1.id).style.display = "block";
	}

	if (item2 != '' & item2 != item1) {
		if (document.getElementById(item2.id).style.display != 'block') {
			document.getElementById(item2.id).style.display = "block";
		}
	}
}

function dropMenu(item) {
	let drop = document.getElementById(item.id);

	if (drop.style.height != "10%") {
		drop.style.height = "10%";
	} else{
		drop.style.height = "0%";

	}
}


function hide(item, item2) {
	document.getElementById(item.id).style.display = 'none';
	if (item2 !== "") {
		document.getElementById(item2.id).style.display = 'none';
	}
}

function focus(item) {
	document.getElementById(item.id).focus();
}



function refreshColor(select, toChange) {

	if (select !== undefined) {

	let colorSelect = select.value;
	let colorRefresh = "";

	if (toChange != document.getElementById(colorInput)) {

	colorRefresh = document.getElementById(toChange.id);
	}

	colorRefresh.value = colorSelect;

	document.getElementById('colorBtn').style.background =  document.getElementById('colorInput').value;

	}

}

function customColor(input, toChange) {
	let colorSelect = input.value;
	let colorRefresh = document.getElementById(toChange.id);

	colorRefresh.options[7].value = colorSelect;
	colorRefresh.options[7].selected = "true";

	document.getElementById('colorBtn').style.background =  document.getElementById('colorInput').value;

}



function save(newtitle, newnote, newcolor) {
	let notecheck = newnote.value;
	notecheck = notecheck.replace(/ /g, "");
	notecheck = notecheck.replace(/\n/g, "");
	if (newnote.value != "" &&  notecheck != "") {
		let toSave = [];
		let title = newtitle.value;
		let autoTitle = [];
		let note = document.getElementById(newnote.id).value.replace(/\n/g, "<br>");

		let titlecheck = newtitle.value;
		titlecheck = titlecheck.replace(/ /g, "");
		titlecheck = titlecheck.replace(/\n/g, "");

		if (titlecheck == "") {
			autoTitle = newnote.value.slice(0,18);
		if (autoTitle.length >= 10){
			autoTitle += "...";
		}
		} else {
			autoTitle = title;
		}
		toSave.push({"title":autoTitle,"note":note,"color":newcolor.value})
		
		let notes = [];

		if (typeof localStorage.allNotes != 'undefined') {
			notes = JSON.parse(localStorage.allNotes);
		}
		notes.push(toSave);
		notes = notes.flat();


		localStorage.setItem("allNotes", JSON.stringify(notes));

		document.getElementById(newtitle.id).value = "";
		document.getElementById(newnote.id).value = "";
		document.getElementById('colorSelect').options[0].selected = "true";
		document.getElementById('colorInput').value = document.getElementById('colorSelect').options[0].value;
		document.getElementById('colorBtn').style.background = "#ffffff"

		replaceurl();
		alert("Lembrete Salvo");


	} else{
		alert("Campo 'Lembrete' em branco")
	}
};

function del(item) {

	if (confirm("Selecione Ok para excluir o lembrete, ou Cancelar para voltar") == true) {
	
		let dbNotes = JSON.parse(localStorage.allNotes);
		let toDel = dbNotes[item];

		let all = dbNotes.filter(note => {
			return note != toDel;
		})
		localStorage.setItem("allNotes", JSON.stringify(all));
		document.getElementById("notes").innerHTML = "";
		alert("Lembrete Excluido");
		replaceurl();

		
	}
}

function edit(item) {
	let element = document.getElementById(item);
	let dbNotes = JSON.parse(localStorage.allNotes);
	let titleDiv = document.getElementById("title"+item);
	let title = document.getElementById("title"+item).textContent;
	let textTitle = document.getElementById("textTitle"+item);
	let noteDiv= document.getElementById("note"+item)
	let note = document.getElementById("content"+item);
	let text = document.getElementById("text"+item);
	let color = dbNotes[item].color;

	textTitle.value = title;
	text.value = note.textContent;
	text.style = "display: block"

	note.style = "display: none"

	titleDiv.onclick = "";

	text.disabled = "";
	noteDiv.onclick = "";

	text.focus();
}

function saveEdit(item) {
	
	if (confirm("Selecione Ok para excluir o lembrete, ou Cancelar para voltar") == true) {
	
		let dbNotes = JSON.parse(localStorage.allNotes);
		let toEdit = dbNotes[item];

		let title = document.getElementById("textTitle"+item).value;
		let text = document.getElementById("text"+item).value;


		toEdit = {"title":title,"note":text,"color":toEdit.color};
		dbNotes[item] = toEdit;


		localStorage.setItem("allNotes", JSON.stringify(dbNotes));
		document.getElementById("notes").innerHTML = "";
		alert("Lembrete Editado");
		replaceurl();
		
	}else{
	}
}


function fullScreen(element) {

	let toFocus = document.getElementById(element);
	let note = document.getElementById("note"+element);
	let options = document.getElementById("options"+element);
	let menu = document.getElementById("cardMenu" +element);

	if (window.location.hash == "#" + element) {
		toFocus.style.width = "";
		toFocus.style.height = "";
		toFocus.style.padding = "";
		toFocus.style.maxHeight = "30%";
		note.style.overflow = "";
		options.style.display = "";
		menu.style.height = "";

		window.location.hash = "";
	}else{


		toFocus.style.maxHeight = "100%";
		toFocus.style.width = "100%";
		toFocus.style.height = "85%";
		note.style.overflow = "auto";
		options.style.display = "flex"

		window.location.replace(window.location.hash ="#"+ element);
	}
}