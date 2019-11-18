function myFunction() {
  //複製
  var copyText = document.getElementById("project_id");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  }
