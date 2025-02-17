const enterFullScreen = () => {
    const elem = document.documentElement; // Makes the whole page full-screen

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Edge
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
};

const exitFullScreen = () => {
    if (!document.fullscreenElement) {
        console.log("Already in normal view mode, cannot exit fullscreen.");
        return;
    }

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Edge
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
};


//Calculate the luminance of a color to set text color that is readable
function getLuminance(hex) {
    // Convert hex to RGB
    let r = parseInt(hex.substr(1, 2), 16) / 255;
    let g = parseInt(hex.substr(3, 2), 16) / 255;
    let b = parseInt(hex.substr(5, 2), 16) / 255;
  
    // Apply the luminance formula
    r = (r <= 0.03928) ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = (g <= 0.03928) ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = (b <= 0.03928) ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
    // Calculate the luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance;
  }
  
// Function to determine text color (black or white) based on background color
function getTextColor(backgroundColor) {
const luminance = getLuminance(backgroundColor);

// If luminance is greater than 0.5, it's a light color (use black text), else use white
return luminance > 0.5 ? 'black' : 'white';
}
const isFullscreen = () => {
    return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Get full minutes
    const remainingSeconds = seconds % 60; // Get remaining seconds
    
    // Pad the minutes and seconds with leading zeros if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    
    return `${formattedMinutes}:${formattedSeconds}`;
  };

export {enterFullScreen, exitFullScreen, getTextColor, isFullscreen, formatTime};