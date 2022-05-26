function copyAll() {
    let data = document.getElementById("input").value;
    navigator.clipboard.writeText(data);
    new Notification('Success', { body: 'Copied content to clipboard' });
}
  
 $(document).ready(function(){
    $(".wmd-input").bind('keydown', function(e){
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            this.value += "    ";
            if(e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }
    }); 
});
