
document.addEventListener("DOMContentLoaded", () => {

    const radiobutton = document.querySelectorAll('input[name=engine]')
    const user_question = document.getElementById("searchbox")
    const formdetails = document.getElementById("searchcontainer")
    const searchimg = document.getElementById("searchimg")
    const popupbox = document.getElementById("popupbox")
    const logo = document.getElementById("logo")
    const shortname = document.getElementById("name")
    const url = document.getElementById("url")
    const ok = document.getElementById("ok")
    const changebg = document.getElementById("changebg")
    const settingicon = document.getElementById("settingicon")
    const container = document.getElementById("container")
    const controllbox = document.getElementById("controll")
    const auto = document.getElementById("auto")
    var duration = document.getElementById("duration")
    var bgbrightness = document.getElementById("bgbrightness")
    var fgbrightness = document.getElementById("fgbrightness")
    const bgimg = document.getElementById("bgimg")
    const imgadd = document.getElementById("imgadd")
    const contextmenu = document.getElementById("contextmenu")
    const searchqueri = document.getElementById("hidden")
    const inputs = document.querySelectorAll(".settinginput")
    const engine = document.getElementById("engine")
    const fileInput = document.getElementById("imagechooser")
    const expand = document.getElementById("expand")
    const inputimage = document.getElementById("inputimage")
    const dropdown = document.getElementById("drop")
    const slider = document.querySelector(".slider")
    const ball = document.querySelector(".ball")
    const shortadd = document.getElementById("shortadd")
    const darkmodelabel = document.getElementById("darkmode")
    const toastmsg = document.getElementById("msg")
    const toast = document.getElementById("toast")
    const clearsearchvalue = document.getElementById("clearsearchvalue")
    const close = document.getElementById("close")
    const closesetting = document.getElementById("closesetting")
    const darkfilter = document.getElementById("darkfilter")
    const helpicon = document.getElementById("help")
    const helpwindow = document.getElementById("helpwindow")
    const helpcontent = document.getElementById("helpcontent")
    const exithelp = document.getElementById("exithelp")
    const defaultsettings = document.getElementById("defaultsettings")
    const cloned = helpicon.cloneNode(true)
    const preloader = document.createElement("link")
    const default_setting = {
        darkmode: false,
        ismanual: true,
        bgbrightness: 100,
        fgbrightness: 100,
        bgchangeduration: 10,
    }
    let toasting = false
    let adding = false
    let was = false
    let expanded = false
    let isengine = false
    var called = false
    let shown = false
    let darkmode = false
    let ismanual = true
    let autochangeid
    let randomimg
    let start
    let name


    //---hiding the help menu while clicking x 

    exithelp.addEventListener("click", () => {
        helpwindow.style.display = "none"
    })




    //---checking if user wants to reset the setting or not

    defaultsettings.addEventListener("click", () => {

        ismanual = default_setting.ismanual
        darkmode = default_setting.darkmode
        bgbrightness.value = default_setting.bgbrightness
        fgbrightness.value = default_setting.fgbrightness
        duration.value = default_setting.bgchangeduration

        savesetting()

        defaultsettings.addEventListener("animationend", (event) => {
            if (event.animationName == "rotate") {
                defaultsettings.style.animation = ""
            }
        })
        defaultsettings.style.animation = "rotate 2s ease-in"
    })

    //--showing the help menu 

    window.addEventListener("keydown", (event) => {
        console.log(event.key)
        if (event.key === "/" || event.key === "?" || event.key === "F2") {
            helpwindow.style.display = "block"
        }
    })

    //----adding help icon for help menu access on where needed by apendeing it

    closesetting.appendChild(cloned)

    //-------------for closing setting

    close.addEventListener("click", () => { hidecontrollbox() })

    //-----focussing to  the main search box for easier reach

    setTimeout(() => { user_question.focus() }, 100)

    user_question.addEventListener("focus", () => {
        clearsearchvalue.style.display = "block"
        formdetails.style.borderColor = "rgb(90, 90, 228)"
    })

    user_question.addEventListener("blur", () => {
        formdetails.style.borderColor = "rgb(151, 151, 151)"
        if (user_question.value !== "") {
            return
        }
        clearsearchvalue.style.display = "none"
    })

    //-----clearing the value if clicked

    clearsearchvalue.addEventListener("click", () => {
        user_question.value = ""
        setTimeout(() => { user_question.focus() }, 1)
        setTimeout(() => { user_question.blur() }, 1)
    })

    //===============retriving the settings  

    if (localStorage.getItem("changeduration")) {
        duration.value = localStorage.getItem("changeduration")
    }

    if (localStorage.getItem("bgbrightness")) {
        bgbrightness.value = localStorage.getItem("bgbrightness")
        darkfilter.style.filter = ` brightness(${bgbrightness.value / 100})`
    }


    if (localStorage.getItem("engine")) {
        radiobutton.forEach(radio => {
            if (radio.value == `${localStorage.getItem("engine")}` && localStorage.getItem("engine") !== undefined) {
                engineswitcher(`${localStorage.getItem("engine")}`)
                radio.checked = true
                return
            }
        })
    } else if (!localStorage.getItem("engine")) {
        engineswitcher("google")
    }

    if (`${localStorage.getItem("ismanual")}` === "true") {
        autochangeoff()
    } else if (`${localStorage.getItem("ismanual")}` === "false") {
        autochangeon()
    }

    if (`${localStorage.getItem("darkmode")}` === "true") {
        Dark_mode()
    } else if (`${localStorage.getItem("darkmode")}` === "false") {
        Light_mode()
    }

    //============for stopping the slideshow of bg img if user leaves the page

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden" && !ismanual) {
            autochangeoff()
            was = true
        } else if (document.visibilityState === "visible" && was) {
            autochangeon()
            was = false
        }
    })


    //=============function to create new short cut according to the input

    ok.addEventListener("click", () => { addshortcut() })

    window.addEventListener("keydown", (event) => { event.key == "Enter" && adding == true ? addshortcut() : null })


    function addshortcut() {

        if (shortname.value !== "" && url.value !== "") {

            popupbox.style.display = "none"

        } else {
            if (toasting) return

            toasting = true
            toastmsg.innerText = "Fill in the details"
            toast.style.animation = "show 1s ease-in forwards"
            setTimeout(() => { toast.style.animation = "hide 1s ease-out" }, 3000)
        }

    }

    //-------------checking if the msg is being shown or not

    toast.addEventListener("animationend", (event) => { event.animationName == "hide" ? toasting = false : null })

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

    ///----for toggeling dark mode

    darkmodelabel.addEventListener("click", () => darkmode ? Light_mode() : Dark_mode())

    slider.addEventListener("click", () => {
        // Dark mode toggle
        darkmode ? Light_mode() : Dark_mode()
    });


    //==============function for dark mode turned no

    function Dark_mode() {
        darkmode = true;
        ball.style.float = "right";
        slider.style.backgroundColor = "green";
        document.body.classList.add("dark-mode")
        searchimg.src = "img/light_search.png"
    }

    //==============function for dark mode turned off / light mode

    function Light_mode() {
        darkmode = false;
        slider.style.backgroundColor = "rgb(170, 40, 40)";
        document.body.classList.remove("dark-mode")
        ball.style.float = "left";
        searchimg.src = "img/dark_search.png"
    }

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

    start = darkfilter.style.backgroundImage = `url(img/${images[Math.floor(Math.random() * images.length)]})`
    randomimggenerator()
    //----taking the name of the img to compair 
    name = start.split("/")[1];

    //--------------changing on click----

    changebg.addEventListener("click", () => { bgchanger() })

    //-------------checking if mouse is hovered and calling function

    settingicon.addEventListener("click", () => shown ? hidecontrollbox() : showcontrollbox())

    //-------------checking if mouse is hovered and calling function

    container.addEventListener("mouseleave", () => shown ? hidecontrollbox() : null)

    //-------------checkin if add shortcuts is clicked ?

    shortadd.addEventListener("click", () => { popupbox.style.display = "block"; shortname.value = ""; shortname.focus(); adding = true })

    //---------checking if the popupbox is shown and processing accordingly

    window.addEventListener("click", (event) => { event.target == popupbox ? popupbox.style.display = "none" : null })

    //--------to check if the controll box is shown and processing accordingly

    // window.addEventListener("keydown", (event) => { event.key === "Enter" && shown ? savesetting() : null })
    window.addEventListener("keydown", (event) => { event.key === "Escape" && shown ? hidecontrollbox() : null })
    window.addEventListener("click", (event) => { event.target === controllbox && shown ? hidecontrollbox() : null })

    //---------listening fo auto bg change button change

    auto.addEventListener("change", (event) => { event.target.checked ? autochangeon() : autochangeoff() })

    //------creating a img element to add in the preview box

    const add = document.createElement("img")
    add.src = "img/add.png"
    add.title = "Add your image"
    add.style.backgroundColor = "white"
    add.style.width = "50px"
    add.style.height = "50px"
    add.style.margin = "8% 0"

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

    //-----------controls through custom context menu

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
                user_question.placeholder = "Search through wiki pages..."
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
        riseengine()
        if (engine.length <= 10) {
            localStorage.setItem("engine", `${engine}`)
        }
    }

    //=========random img name picker

    function randomimggenerator() {
        randomimg = images[Math.floor(Math.random() * images.length)]
        randomimg === name ? randomimggenerator() : null
    }

    //===========function to change background image=============

    function bgchanger() {
        document.body.style.transition = "all 1s ease-in-out"
        darkfilter.style.backgroundImage = `url(img/${randomimg})`
        randomimggenerator()
        preloader.rel = "preload"
        preloader.href = `img/${randomimg}`
        preloader.as = "image"
        document.head.appendChild(preloader)
        shown ? hoverin() : null
    }


    //-----to start the entry animation

    function showcontrollbox() {
        container.style.animation = "entry .3s ease-in forwards"
        container.style.pointerEvents = "all"
        container.addEventListener("animationstart", () => { controllbox.style.visibility = "visible"; })
        container.addEventListener("animationend", (event) => { if (event.animationName === "entry" && !called) { load() } })
        shown = true
    }


    //-----to start the leave animation

    function hidecontrollbox() {
        savesetting()
        container.style.pointerEvents = "none"
        container.style.animation = "leave .3s ease-out "
        container.addEventListener("animationend", (event) => { if (event.animationName === 'leave') { controllbox.style.visibility = "hidden"; } })
        shown = false
    }

    //==========function to save the setting=====

    function savesetting() {
        ismanual ? null : setTimeout(() => { autochangeoff(); setTimeout(() => { autochangeon() }, 1) }, 1)
        localStorage.getItem("bgbrightness") !== bgbrightness.value ? darkfilter.style.filter = ` brightness(${bgbrightness.value / 100})` : null
        localStorage.getItem("changeduration") !== duration.value ? localStorage.setItem("changeduration", `${duration.value}`) : null
        localStorage.getItem("ismanual") !== `${ismanual}` ? localStorage.setItem("ismanual", ismanual) : null
        localStorage.getItem("darkmode") !== `${darkmode}` ? localStorage.setItem("darkmode", darkmode) : null
        localStorage.getItem("bgbrightness") !== bgbrightness.value ? localStorage.setItem("bgbrightness", bgbrightness.value) : null
        inputs.forEach(input => input.blur());

    }

    //===========function to change bg preodicaly and control the side effects===

    function autochangeon() {
        auto.checked = true
        ismanual = false
        changebg.disabled = true
        changebg.style.backgroundColor = "gray"
        changebg.style.backgroundImage = "none"
        changebg.style.color = "white"
        changebg.style.cursor = "default"
        autochangeid = setInterval(() => { ismanual ? autochangeoff() : bgchanger() }, duration.value * 1000)
    }

    //=========function to turn of the auto change==

    function autochangeoff() {
        auto.checked = false
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
        bgimg.appendChild(add)
        images.forEach(img => {
            const i = document.createElement("img")
            const a = document.createElement("a")
            bgimg.appendChild(a)
            a.appendChild(i)
            a.title = `click to view the image`
            a.target = "_blank"
            i.loading = "lazy"
            i.src = `img/${img}`
            a.href = i.src
        })

    }



    //==end of dom ====
})

