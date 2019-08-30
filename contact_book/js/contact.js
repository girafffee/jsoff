
function delTelRow(){

    let is_prev = (this.parentNode.previousSibling
        && this.parentNode.previousSibling.className === "row tels");
    let is_next = (this.parentNode.nextSibling
        && this.parentNode.nextSibling.className === "row tels");


    let previous;
    let nexted;
    if(countRow() === 2) {
        if (is_prev) {
            previous = [
                this.parentNode.previousSibling.firstChild,
                this.parentNode.previousSibling.lastChild,
                this.parentNode.previousSibling.lastChild.previousSibling
            ];
        } else if (is_next) {
            nexted = [
                this.parentNode.nextSibling.firstChild,
                this.parentNode.nextSibling.lastChild,
                this.parentNode.nextSibling.lastChild.previousSibling
            ];
        }
    }

    if(is_next || is_prev){
        this.parentNode.remove();
    }

    if(countRow() === 1){
        if(previous){
            for(let prev of previous)
                prev.remove();
        }else if(nexted){
            for(let next of nexted)
                next.remove();
        }
    }
}

countRow = function(){
    return document.querySelectorAll(".tels").length;
};


addTelNum = function() {
    // Клонируем первую строчку с номером телефона

    let tel_row = document.querySelector('.tels');
    let tel_row_new = tel_row.cloneNode(true);

    // Необходимые настройки
    //tel_row_new.style.border = "2px solid aqua";

    // Удаляем введенные значения из поля
    for (let tag of tel_row_new.childNodes){
        if(tag.nodeName === "INPUT")
            tag.value = "";
    }

    // Вставляем объект в конец
    // к родителю - блоку, содержащий все номера

    let parent_div = document.querySelector(".rows-flex");
    parent_div.appendChild(tel_row_new);



    let tels = document.querySelectorAll('.tels');

    outer:for(let i = 0; i < tels.length; i++){
        // Переменная для связи LABEL & INPUT [TYPE=RADIO]
        let name_id = "main_" + i;

        for(let tag of tels[i].childNodes) {

            if(tag && tag.className === "remove-button"){
                tag.onclick = delTelRow;
            }

            else if (tag.className === 'main'){
                tag.htmlFor = name_id;
            }
            else if (tag.type === "radio") {
                tag.id = name_id;
                continue outer;
            }
        }

        let rm_btn = document.createElement("SPAN");
        rm_btn.onclick = delTelRow;
        rm_btn.className = "remove-button";
        rm_btn.innerText = "X";
        tels[i].prepend(rm_btn);

        let radio = document.createElement("INPUT");
        radio.type = "radio";
        radio.name = "ismain";
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