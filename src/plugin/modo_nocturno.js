export function modo (){
    const nocturno = document.getElementById("toggleSwitch");
    const mainElement = document.querySelector("main"); // Selecciona el elemento <main>
    /*const seccion = document.getElementById("seccion_titulo");*/

    nocturno.addEventListener("change", function(){
        if(nocturno.checked){
            mainElement.style.backgroundColor="black";
            mainElement.style.color="white";
        }
        else{
            mainElement.style.backgroundColor="white";
            mainElement.style.color="black";
        }
    });
}