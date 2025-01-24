
document.addEventListener("DOMContentLoaded", () => {

    const radiobutton = document.querySelectorAll('input[name=engine]')
    const user_question = document.getElementById("searchbox")
    const formdetails = document.getElementById("searchcontainer")
    // const shortcutscontainer = document.getElementById("shortcuts")
    const popupbox = document.getElementById("popupbox")
    // const popupwindow = document.getElementById("popupwindow")
    const logo = document.getElementById("logo")
    // const shortname = document.getElementById("name")
    // const url = document.getElementById("url")
    // const shortlabel = document.getElementById("shortlabel")
    const changebg = document.getElementById("changebg")
    const settingicon = document.getElementById("settingicon")
    const container = document.getElementById("container")
    const controllbox = document.getElementById("controll")
    const auto = document.getElementById("auto")
    var duration = document.getElementById("duration")
    // var brightness = document.getElementById("brightness")
    const bgimg = document.getElementById("bgimg")
    const imgadd = document.getElementById("imgadd")
    const contextmenu = document.getElementById("contextmenu")
    const searchqueri = document.getElementById("hidden")
    const inputs = document.querySelectorAll(".settinginput")
    const engine = document.getElementById("engine")
    // const enginep = document.getElementById("enginep")
    const fileInput = document.getElementById("imagechooser")
    const expand = document.getElementById("expand")
    const inputimage = document.getElementById("inputimage")
    const dropdown = document.getElementById("drop")
    const slider = document.querySelector(".slider")
    const ball = document.querySelector(".ball")
    const toastmsg = document.getElementById("msg")
    const toast = document.getElementById("toast")
    let toasting = false
    let expanded = false
    var loadingid
    let isengine = false
    var called = false
    let shown = false
    let darkmode = false
    var changeduration = duration.value * 1000
    // var changebrightness = brightness.value
    let ismanual = true
    let autochangeid
    let randomimg
    let start
    let name


    //====checking if new input and setting it

    duration.addEventListener("change", () => { ismanual ? null : ismanual = true; ismanual = false })

    //=============images to choose from===============

    const images = [
        'butterflies.webp',
        'colors.jpg',
        'driedtree.webp',
        'headphone.jpg',
        'hotairballon.webp',
        'totoro.webp',
        'water.webp',
        'yourname.webp',
        'larntin.webp',
    ]

    ///----
    slider.addEventListener("click", () => {
        if (toasting) return;

        toastmsg.innerText = "Feature coming soon!!";
        toast.style.animation = "show 1s ease-in forwards";
        toasting = true;

        toast.addEventListener(
            "animationend",
            (event) => {
                if (event.animationName === "show") {
                    setTimeout(() => {
                        toast.style.animation = "hide 1s ease-in";
                    }, 2000);
                } else if (event.animationName === "hide") {
                    toasting = false;
                }
            }
        );

        // Dark mode toggle
        if (!darkmode) {
            darkmode = true;
            ball.style.float = "right";
            slider.style.backgroundColor = "green";
        } else if (darkmode) {
            darkmode = false;
            slider.style.backgroundColor = "rgb(197, 53, 53)";
            ball.style.float = "left";
        }
    });



    //======checking if the btn is hovered? and is not automatic  

    changebg.addEventListener("mouseover", () => { ismanual ? hoverin() : null })
    changebg.addEventListener("mouseout", () => { ismanual ? hoverout() : null })

    //====checking all the radio button for change====

    radiobutton.forEach(radio => {
        radio.addEventListener("change", () => { engineswitcher(radio.value) })
    })

    //----------------for the engine drop down

    engine.addEventListener("click", () => { isengine ? riseengine() : dropengine() })

    //--------initial bg change-------

    start = document.body.style.backgroundImage = `url(img/${images[Math.floor(Math.random() * images.length)]})`
    randomimggenerator()
    //----taking the name of the img to compair 
    name = start.split("/")[1];

    //--------------changing on click----

    changebg.addEventListener("click", () => { bgchanger() })

    //-------------checking if mouse is hovered and calling function

    settingicon.addEventListener("click", () => shown ? hidecontrollbox() : showcontrollbox())

    //-------------checking if mouse is hovered and calling function

    container.addEventListener("mouseleave", () => shown ? hidecontrollbox() : null)

    //---------checking if the popupbox is shown and processing accordingly

    window.addEventListener("click", (event) => { event.target == popupbox ? popupbox.style.display = "none" : null })

    //--------to check if the controll box is shown and processing accordingly

    window.addEventListener("keydown", (event) => { event.key === "Enter" && shown ? savesetting() : null })
    window.addEventListener("keydown", (event) => { event.key === "Escape" && shown ? hidecontrollbox() : null })
    window.addEventListener("click", (event) => { event.target === controllbox && shown ? hidecontrollbox() : null })

    //---------listening fo auto bg change button change

    auto.addEventListener("change", (event) => { event.target.checked ? autochangeon() : autochangeoff() })

    //------creating a img element to add in the preview box

    const add = document.createElement("img")
    add.src = "img/add.png"
    add.title = "Click to add your image"
    add.style.backgroundColor = "white"
    add.style.width = "50px"
    add.style.height = "50px"
    add.style.margin = "15% 0% 0% 1%"

    //---------------listening if the img is clicked

    add.addEventListener("click", () => { imgadd.style.visibility = "visible"; hidecontrollbox() })
    window.addEventListener("click", (event) => { event.target == imgadd ? imgadd.style.visibility = "hidden" : null })

    //----- custom context menu--

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        contextmenu.style.left = event.pageX + "px";
        contextmenu.style.top = event.pageY + "px";
        contextmenu.style.display = "block"
    })
    document.addEventListener("click", () => { contextmenu.style.display = "none" })

    //-----------controls through custom sontext menu

    document.getElementById("menu1").addEventListener("click", () => { ismanual ? bgchanger() : null })
    document.getElementById("menu2").addEventListener("click", () => { if (shown) { hidecontrollbox(); imgadd.style.visibility = "visible" } else { imgadd.style.visibility = "visible" } })
    document.getElementById("menu3").addEventListener("click", () => shown ? hidecontrollbox() : showcontrollbox())

    //-------------handeling image upload
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0]; // Get the first uploaded file
        if (file) {
            const reader = new FileReader(); // Create a FileReader instance

            reader.onload = function (e) {
                const v = document.createElement("img")
                v.src = e.target.result
                bgimg.appendChild(v)
                inputimage.style.backgroundImage = `url(${e.target.result})`; // Set the preview image source
            };


            reader.readAsDataURL(file); // Read the file as a data URL
        }

    }
    )

    //----------listening for expand click
    expand.addEventListener("click", () => expanded ? shrinker() : expander())


    //========function to show engine drop down

    function dropengine() {
        engine.style.animation = "drop .3s ease-out forwards";
        dropdown.style.transition = " all .5s ease-in"
        dropdown.style.transform = " rotate(180deg)";
        isengine = true
    }

    //==========function to hide engine drop down

    function riseengine() {
        engine.style.animation = "rise .3s ease-out forwards";
        isengine = false;
        dropdown.style.transition = " all .5s ease-in"
        dropdown.style.transform = " rotate(0deg)"
    }

    //===============function to make the image chooser fullscreen

    function expander() {
        inputimage.style.transition = "all .6s ease-in-out"
        inputimage.style.width = "100vw"
        inputimage.style.height = "100vh"
        expand.src = "img/shrink.png"
        expand.title = "Shrink"
        expanded = true
    }

    //==================function to srink the image chooser to default

    function shrinker() {
        inputimage.style.transition = "all .6s ease-in-out"
        inputimage.style.width = "70%"
        inputimage.style.height = "70%"
        expand.src = "img/expand.png"
        expand.title = "Expand"
        expanded = false
    }

    //===============function to change the search engine according to the  radiobutton change=======

    function engineswitcher(engine) {
        logo.loading = "lazy"
        switch (engine) {
            case 'google':
                logo.src = "img/google.png"
                formdetails.action = "https://www.google.com/search"
                user_question.name = "q"
                user_question.placeholder = "Search through google..."
                searchqueri.name = ""
                searchqueri.value = ""
                break

            case 'wikipedia':
                logo.src = "img/wikipedia.png"
                formdetails.action = "https://en.wikipedia.org/w/index.php"
                user_question.name = "search"
                user_question.placeholder = "search through wikipedia page..."
                searchqueri.name = "title"
                searchqueri.value = "Special:Search"
                break

            case 'bing':
                logo.src = "img/bing.png"
                formdetails.action = "https://www.bing.com/search"
                user_question.name = "q"
                user_question.placeholder = "Search with Bing..."
                searchqueri.name = ""
                searchqueri.value = ""
                break

            case 'duckduckgo':
                logo.src = "img/duckduckgo.png"
                formdetails.action = "https://duckduckgo.com/"
                user_question.name = "q"
                user_question.placeholder = "Search with DuckDuckGo..."
                searchqueri.name = ""
                searchqueri.value = ""
                break

            default:
                console.log("something might have gone wrong")
                break;
        }
    }

    //=========random img name picker

    function randomimggenerator() {
        randomimg = images[Math.floor(Math.random() * images.length)]
        randomimg === name ? randomimggenerator() : null
    }

    //===========function to change background image=============

    function bgchanger() {
        document.body.style.backgroundImage = `url(img/${randomimg})`
        randomimggenerator()
        shown ? hoverin() : null
    }


    //-----to start the entry animation

    function showcontrollbox() {
        container.style.animation = "entry .5s ease-in forwards"
        container.style.pointerEvents = "all"
        container.addEventListener("animationstart", () => { controllbox.style.visibility = "visible"; controllbox.style.zIndex = "3"; settingicon.style.zIndex = "5"; })
        container.addEventListener("animationend", (event) => { if (event.animationName === "entry" && !called) { load() } })
        shown = true
    }


    //-----to start the leave animation

    function hidecontrollbox() {
        container.style.pointerEvents = "none"
        container.style.animation = "leave .5s ease-in "
        container.addEventListener("animationend", (event) => { if (event.animationName === 'leave') { controllbox.style.visibility = "hidden"; controllbox.style.zIndex = "0"; settingicon.style.zIndex = "0"; } })
        shown = false
    }

    //==========function to save the setting=====

    function savesetting() {
        console.log("Comming on future")
        inputs.forEach(input => input.blur());
        //=====up comming !
    }

    //===========function to change bg preodicaly and control the side effects===

    function autochangeon() {
        ismanual = false
        changebg.disabled = true
        changebg.style.backgroundColor = "gray"
        changebg.style.backgroundImage = "none"
        changebg.style.color = "white"
        changebg.style.cursor = "default"
        autochangeid = setInterval(bgchanger, changeduration)
    }

    //=========function to turn of the auto change==

    function autochangeoff() {
        ismanual = true
        changebg.disabled = false
        changebg.style.backgroundImage = `url(img/${randomimg})`
        changebg.style.background = "black"
        changebg.style.color = "white"
        clearInterval(autochangeid)
    }

    //======function to handel hover of bg change btn===

    function hoverin() {
        //setting style for the button
        changebg.style.backgroundPosition = "center"
        changebg.style.backgroundSize = "cover"
        changebg.style.backgroundColor = " black"
        changebg.style.backgroundImage = "none"
        changebg.style.color = "transparent"
        ismanual ? changebg.style.cursor = "pointer" : changebg.style.cursor = "default"
        changebg.style.backgroundImage = `url(img/${randomimg})`
    }

    //==========function to handel hover out of change btn

    function hoverout() {
        changebg.style.color = "white"
        changebg.style.cursor = "pointer"
        changebg.style.backgroundColor = "#5a3aa3"
        changebg.style.backgroundImage = "none"
    }

    //====function to load img to the container

    function load() {
        called = true
        images.forEach(img => {
            const i = document.createElement("img")
            const a = document.createElement("a")
            i.src = `img/${img}`
            loadingid = setInterval(i.addEventListener("load", () => {
                i.loading = "lazy"
                a.href = i.src
                a.title = `click to view the image`
                a.target = "_blank"
                a.appendChild(i)
                bgimg.appendChild(a)
            }), 1000)

            clearInterval(loadingid)
        })
        bgimg.appendChild(add)

    }



    //==end of dom ====
})

