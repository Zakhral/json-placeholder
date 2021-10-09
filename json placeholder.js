let btnCargar=document.getElementById('btncargar');
btnCargar.addEventListener('click',()=>
    {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) =>
            {
                let select=document.getElementById("Seleccion");
                console.log(json);
                let lista="";
                for(let i=0;i<json.length;i++)
                    {
                        lista+="<option value='"+json[i].id+"'>" + json[i].name + "</option>";
                        select.innerHTML=lista;
                    }
            });
    });

let Select=document.getElementById("Seleccion");
Select.addEventListener('change',()=>
    {
        let userId=document.getElementById("Seleccion").value;
        fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId)
        .then((response)=> response.json())
        .then((json)=> 
            {
                console.log(json)
                let div1=document.getElementById("informacion");
                let informacion="";
                for(let i=0;i<json.length;i++)
                    {
                        informacion+="<h3>" + json[i].title + "</h3>" + 
                        "<p>" + json[i].body + "</p>";
                        div1.innerHTML="";
                        div1.innerHTML=informacion;
                    }
                let boton=document.createElement('button');
                    boton.id="btnmostrar";
                    boton.innerText="MOSTRAR COMENTARIOS";
                    boton.type="button";
                let div2=document.createElement('div');
                    div2.id="coments"+userId;
                    div2.innerHTML="INFORMACION DE COMENTARIOS";
                div1.appendChild(boton);
                div1.appendChild(div2);
            });
    });
