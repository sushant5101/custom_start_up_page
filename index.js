
document.addEventListener("DOMContentLoaded", () => {

    const radiobutton = document.querySelectorAll('input[name=engine]')
    const user_question = document.getElementById("searchbox")
    const formdetails = document.getElementById("searchcontainer")
    const shortcutscontainer = document.getElementById("shortcuts")
    const popupbox = document.getElementById("popupbox")
    const popupwindow = document.getElementById("popupwindow")
    const logo = document.getElementById("logo")
    const shortname = document.getElementById("name")
    const url = document.getElementById("url")
    const shortlabel = document.getElementById("shortlabel")
    const changebg = document.getElementById("changebg")
    const settingicon = document.getElementById("settingicon")
    const container = document.getElementById("container")
    const controllbox = document.getElementById("controll")
    const auto = document.getElementById("auto")
    var duration = document.getElementById("duration")
    var brightness = document.getElementById("brightness")
    const bgimg = document.getElementById("bgimg")
    const imgpreview = document.getElementById("imgpreview")
    const resultpopupbox = document.getElementById("resultpopupbox")
    const resultpopupwindow = document.getElementById("resultpopupwindow")
    const searchqueri = document.getElementById("hidden")
    const inputs = document.querySelectorAll(".settinginput")
    const engine = document.getElementById("engine")
    const enginep = document.getElementById("enginep")
    var loadingid
    var called = false
    let shown = false
    var changeduration = duration.value * 1000
    var changebrightness = brightness.value
    let ismanual = true
    let autochangeid
    let randomimg
    let start
    let name

    //====checking if new input and setting it

    duration.addEventListener("change", () => { changeduration = duration.value * 1000 })

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


    //======checking if the btn is hovered? and is not automatic  

    changebg.addEventListener("mouseover", () => { ismanual ? hoverin() : null })
    changebg.addEventListener("mouseout", () => { ismanual ? hoverout() : null })

    //====checking all the radio button for change====

    radiobutton.forEach(radio => {
        radio.addEventListener("change", () => { engineswitcher(radio.value) })
    })

    //--------initial bg change-------

    start = document.body.style.backgroundImage = `url(img/${images[Math.floor(Math.random() * images.length)]})`
    randomimggenerator()
    //----taking the name of the img to compair 
    name = start.split("/")[1];

    //--------------changing on click----

    changebg.addEventListener("click", () => { bgchanger() })

    //-------------checking if mouse is hovered and calling function

    settingicon.addEventListener("mouseenter", () => shown ? null : showcontrollbox())

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
    }


    //-----to start the entry animation

    function showcontrollbox() {
        container.style.animation = "entry .5s ease-in forwards"
        container.style.pointerEvents = "all"
        container.addEventListener("animationstart", () => controllbox.style.zIndex = "3")
        container.addEventListener("animationend", (event) => { if (event.animationName === "entry" && !called) { load() } })
        shown = true
    }


    //-----to start the leave animation

    function hidecontrollbox() {
        container.style.pointerEvents = "none"
        container.style.animation = "leave .5s ease-in "
        container.addEventListener("animationend", (event) => { if (event.animationName === 'leave') { controllbox.style.zIndex = "1" } })
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
        changebg.style.cursor = "pointer"
        changebg.style.backgroundImage = `url(img/${randomimg})`
    }

    //==========function to handel hover out of change btn

    function hoverout() {
        changebg.style.color = "white"
        changebg.style.cursor = "pointer"
        changebg.style.backgroundColor = "black"
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
                a.title = "click to view the image"
                a.target = "_blank"
                a.appendChild(i)
                bgimg.appendChild(a)
            }), 1000)

            clearInterval(loadingid)

        })

    }


    //---for responsiveness

    if (window.matchMedia("(max-width: 1000px)").matches) {
        enginep.innerText = ">"
    }

    //==end of dom ====
})

