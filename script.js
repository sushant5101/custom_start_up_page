
var radiobutton = document.querySelectorAll('input[name=engine]');
var user_question = document.getElementById("searchbox");
var formdetails = document.getElementById("searchcontainer");
var searchqueri = document.getElementById("hidden");
var shortcutscontainer = document.getElementById("shortcuts");
var addshortcuts = document.getElementById("add");
const popupbox = document.getElementById("popupbox");
const popupwindow = document.getElementById("popupwindow");
const logo = document.getElementById("logo");

radiobutton.forEach(radio => {
    radio.addEventListener('change', () => {

        engine_selector(radio.value);
    });
});

document.addEventListener("click", (event) => {
    if (event == '/') user_question.focus = true;
})

// Array of image filenames
const images = [
    'butterflies.webp',
    'colors.jpg',
    'driedtree.webp',
    'headphone.jpg',
    'hotairballon.webp',
    'totoro.webp',
    'water.webp',
    'yourname.webp'
];

function changeBackgroundImage() {
    // Get a random image from the array
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.opacity = "90%";
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.visibility = "50%";
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.visibility = "40%";
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.visibility = "50%";
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.visibility = "90%";
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.visibility = "100%";

    const randomImage = images[Math.floor(Math.random() * images.length)];
    // Set the background image of the body
    document.body.style.backgroundImage = `url(img/${randomImage})`;

}


// Initial background image
changeBackgroundImage();
// Change the background image every 10 seconds
setInterval(changeBackgroundImage, 10000);

function engine_selector(engine) {
    switch (engine) {
        case 'google':
            logo.src = "img/google.png"
            formdetails.action = "https://www.google.com/search";
            user_question.name = "q";
            user_question.placeholder = "Search through google...";
            searchqueri.name = "";
            searchqueri.value = "";
            break;
        case 'wikipedia':
            logo.src = "img/wikipedia.png"
            formdetails.action = "https://en.wikipedia.org/w/index.php";
            user_question.name = "search";
            user_question.placeholder = "search through wikipedia page...";
            searchqueri.name = "title";
            searchqueri.value = "Special:Search";
            break;
        case 'bing':
            logo.src = "img/bing.png"
            formdetails.action = "https://www.bing.com/search";
            user_question.name = "q";
            user_question.placeholder = "Search with Bing...";
            searchqueri.name = "";
            searchqueri.value = "";
            break;
        case 'duckduckgo':
            logo.src = "img/duckduckgo.png"
            formdetails.action = "https://duckduckgo.com/";
            user_question.name = "q";
            user_question.placeholder = "Search with DuckDuckGo...";
            searchqueri.name = "";
            searchqueri.value = "";
            break;
        default:
            console.error("Something went wrong!!");
            break;
    }

    console.log(engine);
}
function add() {
    var s = document.createElement("span");
    shortcutscontainer.appendChild(s);
    popupbox.style.display = "none"

}

window.addEventListener("click", (event) => {
    if (event.target == popupbox) {
        popupbox.style.display = "none"
    }
})

// if (shortcutscontainer.offsetWidth >= 30) {
//     detailsimg.style.display = "none";
// }