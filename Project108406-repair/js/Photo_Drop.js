let photo_drop = document.getElementsByName('photo-drop');
for (var i = 0; i < photo_drop.length; i++) {
  photo_drop[i].addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('image/jpeg', null);
        e.target.style.opacity = "0.5";
        e.dataTransfer.setData('image/jpeg', e.target.id);
    });
    photo_drop[i].addEventListener('dragend', (e) => {
        e.target.style.opacity = "";
    });
}
let photo_save = document.getElementsByName('photo-save');
for (var i = 0; i < photo_save.length; i++) {
  photo_save[i].addEventListener('dragenter', cancelDefault);
  photo_save[i].addEventListener('dragover', cancelDefault);
  photo_save[i].addEventListener('drop', dropped);
}
function cancelDefault (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    return false;
  }
  function dropped(ev) {  
    cancelDefault(ev);
    let id = ev.dataTransfer.getData('image/jpeg');
    if (!(id in photo_save )) {
      $(ev.target).append(document.querySelector('#' + id));  
    }
    $(ev.target).closest("img").get(0).before(document.querySelector('#' + id));
    // $(ev.target).closest("a").get(0).after(document.querySelector('#' + id));
  }