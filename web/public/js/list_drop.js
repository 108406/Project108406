// alert('aaa')
// let list_drop = document.getElementsByName( 'list_drop' ); 
// for (var i = 0; i < list_drop.length; i ++) {
//     list_drop[i].addEventListener( 'dragstart' , (e) => { 
//       e.dataTransfer.setData( 'text/plain' , null ); 
//       e.target.style.opacity = "0.5" ;
//       e.dataTransfer.setData( 'text/plain' , e.target.id); 
//     });
//     list_drop[i].addEventListener('dragend' , (e)=>{
//       e.target.style.opacity = "";
//     });
//   }
// let list_total = document.getElementsByName('list_total');
// for (var i = 0; i < list_drop_here.length; i ++) {
//     list_total[i].addEventListener('dragenter',cancelDefault);
//     list_total[i].addEventListener('dragover',cancelDefault);
//     list_total[i].addEventListener('drop',dropped);
// }
// function cancelDefault (ev) {
//   ev.preventDefault();
//   ev.stopPropagation();
//   return false;
// }
// function dropped(ev) {  
//   cancelDefault(ev);
//   let id = ev.dataTransfer.getData('text/plain');
//   if (!(id in list_total )) {
//     $(ev.target).append(document.querySelector('#' + id));  
//   }
//   $(ev.target).closest("div").get(0).before(document.querySelector('#' + id));
// }