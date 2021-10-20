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
        fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
        .then((response)=> response.json())
        .then((json)=> 
            {
                console.log(json)
                let div1=document.getElementById("informacion");
                let informacion="";
                informacion+=`
                                <br>
                                <button class="data" type="button" id="datosusuario" onclick="UploadData(${userId})" >VER DATOS</button>
                                <br>
                                <div id="datos"></div>
                            `;

                for(let i=0;i<json.length;i++)
                    {
                        informacion+=`
                                        <div class="post${json[i].userId}">
                                            <h3>${json[i].title}</h3>
                                            <p>${json[i].body}</p>
                                        </div>
                                        <br>
                                        <button class="comments" type="button" id="btncomments" onclick="Comments(${json[i].id})" >VER COMENTARIOS</button>
                                        <br>
                                        <div id="comm${json[i].id}"></div>
                                    `;
                        div1.innerHTML="";
                        div1.innerHTML=informacion;
                    }
            });
    });

let Comments = (postid) =>
    {
        let comm=document.getElementById("comm" + postid);
        fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postid)
        .then((response) => response.json())
        .then((json) =>
                {
                    let lista='<br>' + '<button class="dangers" type="button" onclick="BorrarComments(' + postid + ')">QUITAR</button>';
                    for(let i=0;i<json.length;i++)
                    {
                        lista+=`
                                <div class="comment">
                                    <div id="idcomm${json[i].id}">
                                    <h3> Name: ${json[i].name} </h3>
                                    <h4> Email: ${json[i].email} </4>
                                    <p> ${json[i].body} </p>
                                    </div>
                                </div>
                            `;
                    }
                    comm.innerHTML=lista;
                });
    };

let BorrarComments = (postid) =>
    {
        let comm=document.getElementById(`comm${postid}`);
        comm.innerHTML="";
    };

let UploadData = (UserId) =>
    {
        let Usuario=document.getElementById('datos');
        Usuario.innerHTML="";
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) =>
                {
                    let Datos="";
                    for(let i=0;i<json.length;i++)
                    {
                        if(json[i].id===UserId)
                            {
                                Datos=`
                                        <div class="datauser">
                                            <div id="idcomm${json[i].id}">
                                            <h3> Username: ${json[i].username} </h3>
                                            <h4> Street: ${json[i].address.street} </h4>
                                            <h4> Suite: ${json[i].address.suite} </h4>
                                            <h4> City: ${json[i].address.city} </h4>
                                            <h4> Zipcode: ${json[i].address.zipcode} </h4>
                                            <p> Phone: ${json[i].phone} </p>
                                            <button class="dangers" type="button" onclick="Cerrardatos()">CERRAR</button>
                                            </div>
                                        </div>
                                    `;
                            }
                    }
                    Usuario.innerHTML=Datos;
                });
    };

let Cerrardatos = () =>
    {
        let Data=document.getElementById('datos');
        Data.innerHTML="";
    };