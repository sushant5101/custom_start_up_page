
var radiobutton = document.querySelectorAll('input[name=engine]')
var user_question = document.getElementById("searchbox")
var formdetails = document.getElementById("searchcontainer")
var searchqueri = document.getElementById("hidden")
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
var play = false


radiobutton.forEach(radio => {
    radio.addEventListener('change', () => {

        engine_selector(radio.value)
    })
})


document.addEventListener("click", (event) => {
    if (event == '/') user_question.focus = true
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
]

images.forEach(img => {
    var i = document.createElement("img")
    i.src = `img/${img}`
    i.loading = "lazy"
    bgimg.appendChild(i)
})

// .addEventListener("mouseenter",()=>{
//     imgpreview.appendChild(i);
//     imgpreview.style.visibility = "visible"
// })

function changeBackgroundImage() {
    // Get a random image from the array
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.opacity = "90%"
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.visibility = "50%"
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.visibility = "40%"
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.visibility = "50%"
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.visibility = "90%"
    document.body.style.transition = "all 3s ease-in-out"
    document.body.style.visibility = "100%"

    const randomImage = images[Math.floor(Math.random() * images.length)]
    // Set the background image of the body
    document.body.style.backgroundImage = `url(img/${randomImage})`

}


// Initial background image
changeBackgroundImage()
// Change the background image every 10 seconds
auto.addEventListener('change', () => {
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
})



settingicon.addEventListener("mouseenter", () => {
    container.style.animation = "entry .4s ease-in forwards"
    controllbox.style.zIndex = "2"
    play = true
    container.style.pointerEvents = "all"
    container.addEventListener("mouseleave", () => {
        container.style.pointerEvents = "none"
        container.style.animation = "leave .4s ease-out"
        controllbox.style.zIndex = "0"
    })
})

window.addEventListener("keydown", (event) => {
    if (play && event.key === 'Escape') {
        container.style.animation = "leave .4s ease-out"
        controllbox.style.zIndex = "0"
        container.style.pointerEvents = "none"
    }
})

window.addEventListener("click", (event) => {
    if (event.target == document.getElementById("main") || event.target == user_question || event.target == changebg || event.target == controllbox) {
        container.style.animation = "leave .4s ease-in"
        container.style.pointerEvents = "none"
        controllbox.style.zIndex = "0"

    }
})



function engine_selector(engine) {
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
            console.error("Something went wrong!!")
            break
    }

    console.log(engine)
}
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
        // const inputData = {
        //     name: shortname.value,
        //     url: url.value
        // }
        // saveData(inputData)
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

// if (shortcutscontainer.offsetWidth >= 30) {
//     detailsimg.style.display = "none"
// }


function saveData(data) {
    let dataList = JSON.parse(localStorage.getItem('dataList')) || []
    dataList.push(data)
    localStorage.setItem('dataList', JSON.stringify(dataList))
}

function displayData() {
    const dataList = JSON.parse(localStorage.getItem('dataList')) || []
    const listItems = dataList.map(data => `<li>Name: ${data.name}, Address: ${data.address}</li>`).join('')
    document.getElementById('dataList').innerHTML = listItems
}
