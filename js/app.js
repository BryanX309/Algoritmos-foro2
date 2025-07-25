document.addEventListener('DOMContentLoaded', () => {
    const btnNew = document.querySelector('#newNote');
    const lista = document.querySelector('#notes');
    const nNotas = localStorage.getItem('nNotas') || 0;

    btnNew.addEventListener('click', ()=> window.location.href = "./pages/note-editor.html");

    //cargar notas guardas
    cargar();
    
    function cargar(){
        //lista.innerHTML = '';

        if(nNotas<=0){
            return;
        }

        for (let i = 1; i <= 10; i++) {
            
            const nota = JSON.parse(localStorage.getItem(`nota-${i}`));

            //se saltan las notas nulas
            if(nota === null){
                continue;
            }

            //console.log(nota);
            
            //Creación de elementos

            const noteCont = document.createElement('section');
            const noteHeader = document.createElement('div');
            const title = document.createElement('h3');
            const contenido = document.createElement('p');
            const mContainer = document.createElement('div');
            const btnOptions = document.createElement('button');
            const menuOptions = document.createElement('div');
            const btnEditar = document.createElement('button');
            const btnEliminar = document.createElement('button');

            //se asignan Clases
            noteCont.classList.add('note-cont');
            noteHeader.classList.add('note-header');
            title.textContent = nota.titulo.trim();
            mContainer.classList.add('menu-container');
            btnOptions.textContent = '⋮';
            btnOptions.classList.add('btnOptions');
            btnOptions.title = 'Opciones';
            menuOptions.classList.add('dropdown', 'hidden');
            menuOptions.id = i;
            btnEditar.textContent = 'Editar';
            btnEliminar.textContent = 'Eliminar';
            contenido.textContent = nota.contenido;

            //se arma el contenido
            noteCont.appendChild(noteHeader);
            noteCont.appendChild(contenido);
            noteHeader.appendChild(title);
            noteHeader.appendChild(mContainer);
            mContainer.appendChild(btnOptions);
            mContainer.appendChild(menuOptions);
            menuOptions.appendChild(btnEditar);
            menuOptions.appendChild(btnEliminar);
            
            lista.appendChild(noteCont);
            
            //asignación de eventos
            btnOptions.addEventListener('click', (e)=>{
                e.stopPropagation();
                menuOptions.classList.toggle('hidden');
            })

            btnEditar.addEventListener('click', (e)=>{
                window.location.href = `./pages/note-editor.html?id=${e.target.parentElement.id}`;
            })

            btnEliminar.addEventListener('click', ()=>{
                
            })
        }
    }

    //al dar click fuera del menuOptions se oculta
    window.addEventListener('click', () => {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.add('hidden');
      });
    });
})
