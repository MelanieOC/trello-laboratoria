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

creaarLista(i); //se llama para iniciar con la lista0

var toDo = []; //array con las tareas

function iniciar(e) {
	var div = document.createElement('div');
	var input = document.createElement('input');
		input.setAttribute('type', 'texto');
		input.setAttribute('id', 'texto'+i);
		input.setAttribute('placeholder', 'Añadir una lista...')
	var p= document.createElement('p');
	var button = document.createElement('button');
		button.setAttribute('onclick', 'agregar('+i+')');
		button.innerHTML='Guardar';
	p.appendChild(button);
	div.appendChild(input);
	div.appendChild(p);

	e.removeAttribute('onclick');
	e.replaceChild(div, e.firstChild);
	e.className='lista';

	contenido.appendChild(e);
	i++;
	creaarLista(i);
}

function agregar(a) {
	var lista=document.getElementById(a);
	var titulo = document.getElementById('texto'+a).value;
	var div = document.createElement('div');
	var h1=document.createElement('h3');
		h1.innerHTML=titulo;
	var p= document.createElement('p');
		p.setAttribute('id', 'agregar'+a);
		p.setAttribute('onclick','añadirTarea(this,'+a+')');
		p.innerHTML= 'Añadir una tarjeta...';
	div.appendChild(h1);
	div.appendChild(p);
	lista.replaceChild(div, lista.firstChild);

	toDo[a]=[];//se crea un array para cada lista en el array de toDo
}

function añadirTarea(e,a){
	var div=document.createElement('div');
	var input = document.createElement('input');
		input.setAttribute('type', 'texto');
		input.setAttribute('id', 'tarea'+a);
	var p= document.createElement('p');
	var button = document.createElement('button');
		button.setAttribute('onclick', 'tarea('+a+')');
		button.innerHTML='Guardar';
	p.appendChild(button);
	div.appendChild(input);
	div.appendChild(p);
	e.removeAttribute('onclick');
	e.replaceChild(div, e.firstChild);
}

function tarea(b) {
	var texto=document.getElementById('tarea'+b).value;
	var t=toDo[b];
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
	div.appendChild(p);

	var d = document.getElementById('agregar'+b);
	d.replaceChild(div, d.firstChild);
}
