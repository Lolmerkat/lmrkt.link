const redirectButtons = document.querySelectorAll(".redirect-button");

function assignButtonLinks() {
    redirectButtons.forEach(element => {
        const dataAttributes = element.attributes;
        const redirectLink = dataAttributes.getNamedItem("redirect-link").value;

        if (redirectLink != "") {
            element.addEventListener("click", () => { 
                window.open(redirectLink, '_blank');
            });
        }
    });
}

window.onload = () => {
    assignButtonLinks();
}
