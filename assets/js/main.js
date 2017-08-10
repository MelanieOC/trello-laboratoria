var contenido=document.getElementById('contenido');
var i=0;//va contando las listas

function creaarLista(i) {
	var lista = document.createElement('div');
		lista.setAttribute('onclick', 'iniciar(this)');
		lista.setAttribute('id', i);
		lista.setAttribute('class', 'empezar');
		lista.innerHTML= 'Añadir una lista...';

	contenido.appendChild(lista);
}

creaarLista(i); //se llama para iniciar con la lista 0

var toDo = []; //array con las tareas

function iniciar(e) {
	form(e,'texto',i,'Añadir una lista...', agregar);
	e.removeAttribute('onclick');
	e.className='lista';
	contenido.appendChild(e);
	i++;
}

function agregar(a) {
	var lista=document.getElementById(a);
	var titulo = document.getElementById('texto'+a).value;
	if(titulo==''){//por si no se ingresa nada
		document.getElementById('texto'+a).focus();
	} else{
		var div = document.createElement('div');
	var h1=document.createElement('h3');
		h1.innerHTML=titulo;
	var p= document.createElement('p');
		p.setAttribute('id', 'agregar'+a);
		p.setAttribute('class', 'añadir');
		p.setAttribute('onclick','añadirTarea(this,'+a+')');
		p.innerHTML= 'Añadir una tarjeta...';
	div.appendChild(h1);
	div.appendChild(p);
	lista.replaceChild(div, lista.firstChild);
	creaarLista(i);//se crea otro añadir lista
	toDo[a]=[];//se crea un array para cada lista en el array de toDo
	}
}

function añadirTarea(e,a){
	form(e, 'tarea',a,'Añadir una tarjeta...',tarea);
	e.removeAttribute('onclick');
	e.removeAttribute('class');
}

function form(padre, id, i,texto, funcion) { //funcion para crear formulario
	var div = document.createElement('div');
	var input = document.createElement('input');
		input.setAttribute('type', 'texto');
		input.setAttribute('id', id+i);
		input.setAttribute('placeholder', texto);
		input.setAttribute('autofocus', 'autofocus');
		input.onkeypress=function (e) {//evento enter
			if (e.keyCode==13) {
				funcion(i);
			}
		}
	var p= document.createElement('p');
	var button = document.createElement('button');
		button.onclick=function () {//evento click
			funcion(i);
		}
		button.innerHTML='Guardar';
	var borrar=document.createElement('button');
		borrar.setAttribute('class', 'eliminar');
		borrar.innerHTML='X';
	p.appendChild(button);
	if(id=='tarea'){
		p.appendChild(borrar);
	}
	div.appendChild(input);
	div.appendChild(p);

	padre.replaceChild(div, padre.firstChild);

	//solo funciona con añadir tarea
	var clase=padre.className;
	var click=padre.getAttribute('onclick');
	var Id=padre.id;
	borrar.addEventListener('click',function() {
		var t=document.createElement('div');
		t.innerHTML=texto;
		t.setAttribute('onclick',click);
		t.setAttribute('id',Id);
		padre.replaceChild(t, padre.firstChild);
		padre.className=clase;
	})
}

function tarea(b) {
	var texto=document.getElementById('tarea'+b).value;
	if(texto==''){
		document.getElementById('tarea'+b).focus();
	} else {
		var t=toDo[b];//corresponde al array del numero de la lista
		t.push(texto);
		var div=document.createElement('div');
		for (var i = 0; i <=t.length; i++) {
			if(t[i]!=undefined){
				var div2=document.createElement('div');
				div2.className='tarea';
				div2.innerHTML=t[i];
				div.appendChild(div2);
			}
		}
		var p= document.createElement('p');
			p.setAttribute('onclick','añadirTarea(this,'+b+')');
			p.innerHTML= 'Añadir una tarjeta...';
			p.setAttribute('class', 'añadir');
		div.appendChild(p);

		var agregar = document.getElementById('agregar'+b);
		agregar.replaceChild(div, agregar.firstChild);
	}
}
