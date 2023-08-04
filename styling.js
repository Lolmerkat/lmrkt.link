var rect = getProfilePictureRect();
var boxCenterX = calculateBoxCenterX();
var boxCenterY = calculateBoxCenterY();
var oneVwUnit = calculateVwUnit();

const defaultShadow = {
    offset: {
        x: 0,
        y: 0
    },
    blurAmount: "10vh",
    padding: "-2.5vh",
    color: "#000"
};

const defaultRotation = {
    x: "0deg",
    y: "0deg"
};

function getProfilePictureRect() {
    return profilePicture.getBoundingClientRect();
}

function calculateBoxCenterX() {
    return rect.left - rect.width / 2;
}

function calculateBoxCenterY() {
    return rect.top - rect.height / 2;
}

function calculateVwUnit() {
    return visualViewport.width / 100;
}

function setBoxShadow(offsetX, offsetY, blurAmount, padding, color, withAnimation) {
    if (withAnimation) {
        profilePicture.style.transition = "all 250ms ease";
    } else {
        profilePicture.style.transition = "all 0ms";
    }

    profilePicture.style.boxShadow = `${offsetX / 10}vw ${offsetY / 10}vw 0 0 #2caa58,
        ${offsetX}vw ${offsetY}vw ${blurAmount} ${padding} ${color}`;
}

function applyCustomStyles(event) {
    var cursorPosition = {
        x: event.clientX,
        y: event.clientY
    };

    const deltaCursorCenter = {
        x: cursorPosition.x - boxCenterX,
        y: cursorPosition.y - boxCenterY
    };

    const deltaCursorCenterPercent = {
        x: deltaCursorCenter.x / oneVwUnit,
        y: deltaCursorCenter.y / oneVwUnit
    };

    const shadowOffset = {
        x: deltaCursorCenterPercent.x - (rect.width / oneVwUnit),
        y: deltaCursorCenterPercent.y - (rect.height / oneVwUnit)
    };

    const rotation = {
        x: (cursorPosition.x - boxCenterX) / 100 * 4,
        y: (cursorPosition.y - boxCenterY) / 100 * 4
    };

    setBoxShadow(`${-shadowOffset.x * 0.5}`, `${-shadowOffset.y * 0.5}`,
     `${defaultShadow.blurAmount}`, `${defaultShadow.padding}`, `${defaultShadow.color}`, false);
    profilePicture.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
}

function resetCustomStyles() {
    profilePicture.style.transitionDelay = "50ms";
    profilePicture.style.transform = `rotateX(0deg) rotateY(0deg)`;
    setBoxShadow(`${defaultShadow.offset.x}`, `${defaultShadow.offset.y}`, 
     `${defaultShadow.blurAmount}`, `${defaultShadow.padding}`, `${defaultShadow.color}`, true);
}

profilePicture.addEventListener("mousemove", (e) => {
    applyCustomStyles(e);
});

profilePicture.addEventListener("mouseleave", () => {
    resetCustomStyles();
});

profilePicture.addEventListener("touchmove", (e) => {
    applyCustomStyles(e);
});

profilePicture.addEventListener("touchend", () => {
    resetCustomStyles();
});

profilePicture.addEventListener("load", () => {
    setBoxShadow(`${defaultShadow.offset.x}`, `${defaultShadow.offset.y}`, 
     `${defaultShadow.blurAmount}`, `${defaultShadow.padding}`, `${defaultShadow.color}`, true);

    const dataAttributes = profilePicture.attributes;
    const redirectLink = dataAttributes.getNamedItem("redirect-link").value;
    profilePicture.addEventListener("click", () => {
        window.open(redirectLink, '_blank')
    });
});

function updateEffectValues() {
    rect = getProfilePictureRect();
    boxCenterX = calculateBoxCenterX();
    boxCenterY = calculateBoxCenterY();
    oneVwUnit = calculateVwUnit();
}