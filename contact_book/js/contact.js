
addNum = function() {
    let tel_row = document.querySelector('.tels');
    let tel_row_new = tel_row.cloneNode(true);

    // Settings
    //tel_row_new.style.border = "2px solid aqua";

    let parent_row = document.querySelector(".rows-flex");

    for (let tag of tel_row_new.childNodes){
        if(tag.nodeName === "INPUT")
            tag.value = "";
    }
    // parent_row.insertBefore(tel_row_new, div_row.nextSibling);
    parent_row.appendChild(tel_row_new);

    let tels = document.querySelectorAll('.tels');

    outer:for(let i = 0; i < tels.length; i++){
        let name_id = "main_" + i;
        for(let tag of tels[i].childNodes) {
            if (tag.className === 'main'){
                tag.htmlFor = name_id;
            }
            else if (tag.type === "radio") {
                tag.id = name_id;
                continue outer;
            }
        }
        let radio = document.createElement("INPUT");
        radio.type = "radio";
        radio.name = "radio";
        radio.id = name_id;

        let lab_rad = document.createElement("LABEL");
        lab_rad.innerText = "Основной: ";
        lab_rad.className = "main";
        lab_rad.htmlFor = name_id;

        tels[i].appendChild(lab_rad);
        tels[i].appendChild(radio);
    }

};

setNum = function(){
    let tels = document.querySelectorAll('.tels');

    for(let i = 0; i < tels.length; i++){

        for(let tag of tels[i].childNodes) {
            if (tag.nodeName === "LABEL") {
                tag.htmlFor += i;
            } else if (tag.nodeName === "INPUT" || tag.nodeName === "SELECT") {
                tag.id += i;
                tag.name += i;
            }
        }
    }
};





clear = function(prop){
    if(prop.nodeName === '#text' || prop.nodeName === '#comment')
        return true;
};