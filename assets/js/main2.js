var contenido=document.getElementById('contenido');
var i=0;//va contando las listas

function creaarLista() {//funcion qe crea el boton añadir lista
	var lista = document.createElement('div');
		lista.setAttribute('onclick', 'iniciar(this)');
		lista.setAttribute('class', 'empezar');
		lista.innerHTML= 'Añadir una lista...';

	contenido.appendChild(lista);
}

function añadirTarjeta(padre){//funcion que crea el boton añadir tarjeta
	var div= document.createElement('div');
		div.setAttribute('class', 'añadir');
		div.setAttribute('onclick','añadirTarea(this)');
		div.innerHTML= 'Añadir una tarjeta...';
	padre.appendChild(div);
}


creaarLista(); //se llama para iniciar con la lista


//funcion que crea el formulario en donde tiene 4 argumentos
//el argumento padre se refiere al nodo en donde se anexará el formulario
function form(padre, texto, funcion, funcion2) {
	var input = document.createElement('input');
		input.setAttribute('type', 'texto');
		input.setAttribute('placeholder', texto);
		input.setAttribute('autofocus', 'autofocus');
		input.onkeypress=function (e) {//evento enter
			if (e.keyCode==13) {
				funcion(this);
			}
		}
	var button = document.createElement('button');
		button.onclick=function () {//evento click
			funcion(this);
		}
		button.innerHTML='Guardar';
	var borrar=document.createElement('button');
		borrar.setAttribute('class', 'eliminar');
		borrar.innerHTML='X';
		borrar.onclick=function() {
			var father=padre.parentNode;
			father.removeChild(father.lastChild);
			funcion2(father);
		}
	padre.replaceChild(input, padre.firstChild);
	padre.appendChild(button);
	padre.appendChild(borrar);
}

//funciones de los eventos

function iniciar(e) {//funcion para el formulario de añadir lista
	e.removeAttribute('onclick');
	e.className='lista';
	form(e,'Añadir una lista...',agregar, creaarLista);
}


function agregar(e) {//pone el titulo de la lista y el boton añadir tarjeta
	var lista=e.parentNode;
	var titulo=lista.firstChild;
	if(titulo.value==''){//por si no se ingresa nada
		titulo.focus();
	} else{
		var h1=document.createElement('h3');
		h1.innerHTML=titulo.value;
		lista.replaceChild(h1, lista.firstChild);
		lista.removeChild(lista.lastChild);
		lista.removeChild(lista.lastChild);
		añadirTarjeta(lista);
		creaarLista();//se crea otro añadir lista
	}
}

function añadirTarea(e){//formlario de añadir tarjeta
	e.removeAttribute('onclick');
	e.removeAttribute('class');
	form(e,'Añadir una tarjeta...', tarea, añadirTarjeta);
}


function tarea(e) {
	var p= e.parentNode;
	var texto=p.firstChild;
	if(texto.value==''){
		texto.focus();
	} else {
		//toda tarjeta agregada se pone en un div y se agrega adelante
		var div=document.createElement('div');
			div.className='tarea';
			div.innerHTML=texto.value;	
		var padre=p.parentNode;
		console.log(padre);
		padre.insertBefore(div,padre.lastChild);
		p.removeChild(texto);
		p.removeChild(p.lastChild);
		p.removeChild(p.lastChild);
		añadirTarjeta(p);
	}
}
