const redirectButtons = document.querySelectorAll(".redirect-button");
const profilePicture = document.getElementById("profile-picture");


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

function assignProfilePictureRedirect() {
 
}

window.onload = () => {
    assignButtonLinks();
    assignProfilePictureRedirect();    
    setInterval(updateEffectValues, 250)
}