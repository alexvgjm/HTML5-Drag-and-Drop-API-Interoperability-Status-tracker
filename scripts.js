document.addEventListener("DOMContentLoaded", ()=>{
    let selectedLi = null;
    let list = null;

    document.addEventListener('dragstart', function(event) {
        event.target.classList.add('dragging');
        selectedLi = event.target;         // Store reference of dragging li
        list = event.target.parentElement // and the container list.
        list.classList.add('dragging')
        event.dataTransfer.setData("text/plain", "");
        event.dataTransfer.effectAllowed = "move";
    })

    document.addEventListener('dragover', function(event) {
        // Only check if dragging over another li element.
        if(event.target.tagName != 'LI') { return; }

        // Return if dragging to other list (change this for shared lists)
        if(selectedLi.parentElement != event.target.parentElement) { return; }

        // Place the dragging li before or after based on distance to vertical 
        // center of the target li.
        const rect = event.target.getBoundingClientRect()
        const draggingOverUpperHalfOfLiElement = event.offsetY < rect.height/2;
        list.insertBefore(selectedLi, draggingOverUpperHalfOfLiElement ? 
                                    event.target : 
                                    event.target.nextSibling);

    })

    document.addEventListener('dragend', function(event) {
        selectedLi.classList.remove('dragging');
        list.classList.remove('dragging')
    })
});