let draggable = document.getElementsByName( 'draggable' ); 
for (var i = 0; i < draggable.length; i ++) {
  draggable[i].addEventListener( 'dragstart' , (e) => { 
    e.dataTransfer.setData( 'text/plain' , null ); 
    e.target.style.opacity = "0.5" ;
    e.dataTransfer.setData( 'text/plain' , e.target.id); 
  });
  draggable[i].addEventListener('dragend' , (e)=>{
    e.target.style.opacity = "";
  });
}

let dropzones = document.getElementsByName('dropzone');
for (var i = 0; i < dropzones.length; i ++) {
  dropzones[i].addEventListener('dragenter',cancelDefault);
  dropzones[i].addEventListener('dragover',cancelDefault);
  dropzones[i].addEventListener('drop',dropped);
}
function cancelDefault (ev) {
  ev.preventDefault();
  ev.stopPropagation();
  return false;
}
function dropped(ev) {  
  cancelDefault(ev);
  let id = ev.dataTransfer.getData('text/plain');
  if (!(id in dropzones )) {
    $(ev.target).append(document.querySelector('#' + id));  
  }
  $(ev.target).closest("a").get(0).before(document.querySelector('#' + id));
  // $(ev.target).closest("a").get(0).after(document.querySelector('#' + id));
}


