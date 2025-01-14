
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
    var loadingid
    var called = false
    let shown = false
    var changeduration = duration.value
    var changebrightness = brightness.value


    //====checking all the radio button for change====

    radiobutton.forEach(radio => {
        radio.addEventListener("change", () => { engineswitcher(radio.value) })
    })
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
        console.log(engine)
    }

    //=============images to choose from===============

    const images = [
        'butterflies.webp',
        'colors.jpg',
        'driedtree.webp',
        'headphone.jpg',
        'hotairballon.webp',
        'totoro.webp',
        'water.webp',
        'yourname.webp'
    ]

    //===========bg changer func=============

    function backgroundImagechanger() {
        const randomImage = images[Math.floor(Math.random() * images.length)]
        document.body.style.backgroundImage = `url(img/${randomImage})`
    }
    //--------initial bg change-------
    backgroundImagechanger()

    //--------------changing on click----

    changebg.addEventListener("click", () => { backgroundImagechanger(); })

    //-------------checking if mouse is hovered and calling function

    settingicon.addEventListener("mouseenter", () => showcontrollbox())

    //-----to start the entry animation

    function showcontrollbox() {
        container.style.animation = "entry .5s ease-in forwards"
        container.style.pointerEvents = "all"
        container.addEventListener("animationstart", () => controllbox.style.zIndex = "3")
        container.addEventListener("animationend", (event) => { if (event.animationName === "entry" && !called) { load() } })
        shown = true
    }

    //-------------checking if mouse is hovered and calling function

    container.addEventListener("mouseleave", () => hidecontrollbox())

    //-----to start the leave animation

    function hidecontrollbox() {
        container.style.pointerEvents = "none"
        container.style.animation = "leave .5s ease-in "
        container.addEventListener("animationend", (event) => { if (event.animationName === 'leave') { controllbox.style.zIndex = "1" } })
        shown = false
    }

    //--------to check if the controll box is shown and processing accordingly

    window.addEventListener("keydown", (event) => { event.key === "Enter" && shown ? savesetting() : null})
    window.addEventListener("keydown", (event) => { event.key === "Escape" && shown ? hidecontrollbox() : null})

    //==========function to save the setting=====

    function savesetting() {
        console.log("Comming on future")
        hidecontrollbox()
        //=====up comming !
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

    //==end of dom ====
})

