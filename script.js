var radiobutton = document.querySelectorAll('input[name=engine]')
var user_question = document.getElementById("searchbox")
var formdetails = document.getElementById("searchcontainer")
var shortcutscontainer = document.getElementById("shortcuts")
const popupbox = document.getElementById("popupbox")
const popupwindow = document.getElementById("popupwindow")
const logo = document.getElementById("logo")
const shortname = document.getElementById("name")
const url = document.getElementById("url")
const shortlabel = document.getElementById("shortlabel")
const changebg = document.getElementById("changebg")
const auto = document.getElementById("auto")
const settingicon = document.getElementById("settingicon")
const container = document.getElementById("container")
const controllbox = document.getElementById("controll")
const changeduration = document.getElementById("duration");
const bgimg = document.getElementById("bgimg");
const imgpreview = document.getElementById("imgpreview");
const resultpopupbox = document.getElementById("resultpopupbox");
const resultpopupwindow = document.getElementById("resultpopupwindow");

var play = false


radiobutton.forEach(radio => {
    radio.addEventListener('change', () => {

        engine_selector(radio.value)
    })
})



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




var d = document.createElement("img")
d.src = "img/add.png"
d.style.backgroundColor = "#c2c2c2"
d.style.width = "50px"
d.style.height = "50px"
d.style.marginTop = "50px"
bgimg.appendChild(d)


function changeBackgroundImage() {
    document.body.style.transition = "all 1s ease-in-out"
    document.body.style.opacity = "90%"
    document.body.style.transition = "all 1s ease-in-out"
    document.body.style.visibility = "50%"
    document.body.style.transition = "all 1s ease-in-out"
    document.body.style.visibility = "40%"
    document.body.style.transition = "all 1s ease-in-out"
    document.body.style.visibility = "50%"
    document.body.style.transition = "all 1s ease-in-out"
    document.body.style.visibility = "90%"
    document.body.style.transition = "all 1s ease-in-out"
    document.body.style.visibility = "100%"

    const randomImage = images[Math.floor(Math.random() * images.length)]
    document.body.style.backgroundImage = `url(img/${randomImage})`

}


changeBackgroundImage()

auto.addEventListener('change', () => {
    is()
})

changeduration.addEventListener("change", () => {
    is()
})


function is() {
    if (auto.checked) {
        intervalId = setInterval(changeBackgroundImage, changeduration.value * 1000)
        changebg.disabled = true
        changebg.style.backgroundColor = "rgb(153, 152, 152)"
        changebg.style.maxWidth = "30px"
    } else {
        clearInterval(intervalId)
        changebg.disabled = false
        changebg.style.backgroundColor = "rgb(0,0,0)"
        changebg.style.maxWidth = "251px"
    }
}

settingicon.addEventListener("mouseenter", () => showcontrollbox())

function showcontrollbox() {
    console.log("function called")
    container.style.transition = "all .2s ease-in"
    container.style.opacity = "1"
    controllbox.style.zIndex = "5"
    container.style.pointerEvents = "all"
    console.log("hovered")
    play = true
    console.log(play)
    container.addEventListener("mouseleave", () => {
        container.style.transition = "all .2s ease-out"
        container.style.opacity = "0"
        controllbox.style.zIndex = "0"
        container.style.pointerEvents = "none"
        console.log("hovered")
        play = false
    })

    window.addEventListener("keydown", (event) => {
        if (play && event.key === 'Escape') {
            hide()
        }
    })

    window.addEventListener("click", (event) => {
        if (event.target == document.getElementById("main") || event.target == user_question || event.target == changebg || event.target == controllbox) {
            hide()
        }
    })
}

function hide() {
    container.style.transition = "all .5s ease-in"
    container.style.opacity = "0"
    container.style.pointerEvents = "none"
    controllbox.style.zIndex = "0"
}

showavailableimg()

function showavailableimg() {
    images.forEach(img => {
        var i = document.createElement("img")
        i.src = `img/${img}`
        bgimg.appendChild(i)
    })
}


function engine_selector(engine) {
    switch (engine) {
        case 'google':
            logo.src = "img/google.png"
            user_question.name = "q"
            user_question.placeholder = "Search through google..."
            searchqueri.name = ""
            searchqueri.value = ""
            break
        case 'wikipedia':
            logo.src = "img/wikipedia.png"
            user_question.placeholder = "search through wikipedia page..."
            break
        case 'bing':
            logo.src = "img/bing.png"
            user_question.placeholder = "Search with Bing..."
            break
        case 'duckduckgo':
            logo.src = "img/duckduckgo.png"
            user_question.placeholder = "Search with DuckDuckGo..."
            break
        default:
            console.error("Something went wrong!!")
            break
    }

    console.log(engine)
}


window.addEventListener("click", (event) => {
    if (event.target == resultpopupbox) {
        resultpopupbox.style.display = "none"
    }
})


function add() {
    if (shortname.value && url.value) {

        const a = document.createElement("a")
        const s = document.createElement("span")
        const p = document.createElement("p")
        const d = document.createElement("div")

        a.href = url.value
        a.target = "_blank"
        a.innerText = shortname.value[0]
        p.innerText = shortname.value
        a.style.color = "#000000"
        a.style.textDecoration = "none"
        shortcutscontainer.appendChild(d)
        d.appendChild(s)
        s.appendChild(a)
        s.appendChild(p)
    }
    else {
        alert("nothing to add")
    }
    shortname.value = ""
    url.value = ""
    popupbox.style.display = "none"
}

window.addEventListener("click", (event) => {
    if (event.target == popupbox) {
        popupbox.style.display = "none"
    }
})
popupwindow.addEventListener("click", (event) => {
    event.stopPropagation()
})


// function saveData(data) {
//     let dataList = JSON.parse(localStorage.getItem('dataList')) || []
//     dataList.push(data)
//     localStorage.setItem('dataList', JSON.stringify(dataList))
// }

// function displayData() {
//     const dataList = JSON.parse(localStorage.getItem('dataList')) || []
//     const listItems = dataList.map(data => `<li>Name: ${data.name}, Address: ${data.address}</li>`).join('')
//     document.getElementById('dataList').innerHTML = listItems
// }
