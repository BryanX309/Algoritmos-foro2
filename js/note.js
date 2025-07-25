document.addEventListener('DOMContentLoaded', ()=>{
    
    const params = new URLSearchParams(window.location.search); // obtiene variables desde el URL
    const nNotas = parseInt(localStorage.getItem('nNotas')) || 0;
    let noteId = params.get("id") || nNotas+1;// recibe la variable id de la url

    //console.log(noteId);
    let valido;

    const titulo = document.querySelector('#titulo');
    const contenido = document.querySelector('#contenido');

    const btnGuardar = document.querySelector('#guardar');
    const btnCancelar = document.querySelector('#cancelar');

    cargarValores();

    //asignación de eventos
    btnCancelar.addEventListener('click', () => {
        if(window.confirm('Esta Seguro que quiere cancelar la nota?\nRegresara al Menu Principal')){
            window.location.href = "../index.html";
        }
    })

    btnGuardar.addEventListener('click', ()=> {
        validar();
        
        if(!valido){
            return;
        }

        const nota = {
            titulo: titulo.value.trim(),
            contenido: contenido.value.trim()
        }

        localStorage.setItem(`nota-${noteId}`, JSON.stringify(nota));
        localStorage.setItem(`nNotas`, Math.max(nNotas, noteId));

         window.location.href = "../index.html";
    })

    //función Validar
    function validar(){
        valido = true;

        if(titulo.value === ''){
            alert('se necesita ingresar un titulo para agregar la Nota');
            valido = false;
            return;
        }

        if(contenido.value === ''){
            alert('la Nota no puede ir vacía, debe incluir contenido');
            valido = false;
            return;
        }
    }

    function cargarValores(){
        let valores = JSON.parse(localStorage.getItem(`nota-${noteId}`));
        //console.log(valores);

        if(valores != null){
            titulo.value = valores.titulo; 
            contenido.value = valores.contenido; 
        }
    }
})