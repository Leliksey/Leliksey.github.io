window.onload = function() {
    var title = document.getElementById("title");
    title.addEventListener("click", function() {
        this.innerHTML = "My Awesome Web Page";
    })
}