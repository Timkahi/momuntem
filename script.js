const date = new Date()
const options = {weekday: 'long', month: 'long', day: 'numeric'}
const time = document.querySelector('.time')
const dateMonth = document.querySelector('.date')
const langugage = document.querySelector('.langugage')
const greeting = document.querySelector('.greeting')
const userName = document.querySelector('.name') 
const twentyForHours = date.getHours()
const arrayTranslete = ['Музыка', "Погода", "Цитаты", "Календарь", "Приветствие"]
const arrayTransleteEn = ['Music', "Weather", "Qutes", "Calendar", "Greetings"]
const descript = ['Would you like to chenge langugage', 'Would you like to chenge img', 'Would you like to delete any element']
const descriptRu = ['Хотите поменять язык', 'Хотите поменять источник изображений', 'Xотите удалить какой нибудь элемент']
const allButtonsDelete = document.querySelectorAll('.del')
const allDescreptionsSet = document.querySelectorAll('.stroke')
const userNameInSetting= document.querySelector('.user-name')
const playerBlock = document.querySelector('.player')
const weatherBlock = document.querySelector('.weather')
const quoteBlock = document.querySelector('.quoteBlock')
const calendar = document.querySelector('.date')
const greetings = document.querySelector('.greeting-container')
const array = [playerBlock, weatherBlock, quoteBlock, calendar, greetings]
const apiButton = document.querySelectorAll('.api')
const apiText = document.querySelector('.inputApi')
let arrayFlirck = []
let arrayPhotos = []
const inputFlirc = document.querySelector('.inputFlirc')

import greeatings from './greetings.js';
let gret,
    lang
let quetLan = 'qutes.json'
let qu = 'Quote',
    au = 'Author'
function chengeGreetings () {
    if (langugage.className === 'langugage active') {
        gret = greeatings[1]
    } else {
         gret = greeatings[0]
    }
    if (twentyForHours >= 0 && twentyForHours <6 ) {
        return greeting.textContent = gret.night
    }
    if (twentyForHours >= 6 && twentyForHours <12 ) {
        return greeting.textContent = gret.morning
    }
    if (twentyForHours >= 12 && twentyForHours <18 ) {
        return greeting.textContent = gret.afternoon
    } 
    if (twentyForHours >= 18 && twentyForHours >0 ) {
        return greeting.textContent = gret.evening
    }
}
function transletButton (ar) {
    allButtonsDelete.forEach((value,index)=> {
        value.textContent = ar[index]
    })
}
function transletDesript (ar) {
    allDescreptionsSet.forEach((value,index)=> {
        value.textContent = ar[index]
    })
}
function transleter () {
    if (langugage.className === 'langugage active') {
        langugage.classList.remove('active')
        langugage.textContent = 'EN'
        quetLan = 'qutes.json'
        getQuote()
        qu = 'Quote'
        au = 'Author'
        userName.placeholder = '[Entre your name]'
        apiText.placeholder = '[Entre subject]'
        inputFlirc.placeholder = '[Entre subject]'
        lang = 'en'
        getWether(inputCity.value)
        transletButton(arrayTransleteEn)
        transletDesript(descript)

    }else {
        langugage.classList.add('active')
         langugage.textContent = 'RU'
         quetLan = 'qutesRu.json'
         getQuote()
        qu = 'Цитата'
        au = 'Автор'
        userName.placeholder = '[Введите своё имя]'
        apiText.placeholder = '[Введите тему]'
        inputFlirc.placeholder = '[Введите тему]'
        lang = 'ru'
        getWether(inputCity.value)
        transletDesript(descriptRu)
        transletButton(arrayTranslete)
    }
}
langugage.addEventListener('click', transleter)

function showDate () {
    if (langugage.className === 'langugage active') {
        dateMonth.textContent = date.toLocaleDateString('ru-RU', options)
    } else {
        dateMonth.textContent = date.toDateString('en-EN', options)
    }
}

function showTime() {
    time.textContent = new Date().toLocaleTimeString();
    showDate()
    chengeGreetings()
    setTimeout(showTime, 1000)
}
showTime()


function isDay () {
    if (twentyForHours >= 0 && twentyForHours <6 ) {
        return greeting.textContent = 'Good night'
    }
    if (twentyForHours >= 6 && twentyForHours <12 ) {
        return greeting.textContent = 'Good morning'
    }
    if (twentyForHours >= 12 && twentyForHours <18 ) {
        return greeting.textContent = 'Good afternoon'
    } 
    if (twentyForHours >= 18 && twentyForHours >0 ) {
        return greeting.textContent = 'Good evening'
    }
}

isDay()

const bodyImg = document.getElementById('body')
function getday() {
    const tweFoHors = isDay()
    return tweFoHors.slice(5)
}
function getRandomeInit () {
   return Math.ceil(Math.random() * 10) + 10
}
function setImg (value) {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getday()}/${value}.jpg`
    img.onload = () => {
        bodyImg.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getday()}/${value}.jpg')`
    } 
}
function setRandomeImg () {
    const randomInit = getRandomeInit()
    setImg(randomInit)
}

const slederPre = document.querySelector('.slide-prev')
const slederNext = document.querySelector('.slide-next')
let timer = getRandomeInit()


function isNextImg () {
    if (timer >19 ) {
        return timer = 9
    }
    timer++
    console.log(timer)
    setImg(timer)
}
function isPreImg () {
    if (timer < 11) {
        return timer = 21
    }
    timer--
    console.log(timer)
    setImg(timer)
} 

const inputCity = document.querySelector('.city')
const iconWeather = document.querySelector('.weather-icon')
const errorWeather = document.querySelector('.weather-error')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')


function getWether (city = "Minsk") {
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=324328e3f2a5e89954d902ef8c226770&units=metric`)
    .then(response => {return response.json()})
    .then(data => {
        errorWeather.textContent = ''
        iconWeather.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${data.main.temp} °C`
        weatherDescription.textContent = data.weather[0].description
        wind.textContent = `${data.wind.speed} m/s`
        humidity.textContent = `${data.main.humidity}%`
        iconWeather.classList.remove('aposity')
    })
    .catch( (error) => {
        iconWeather.classList.add('aposity')
        errorWeather.textContent = 'this city is not defined'
        temperature.textContent = ''
        weatherDescription.textContent = ''
        wind.textContent = ''
        humidity.textContent =''
    })
}
function setLocalStorage () {
    localStorage.setItem('userName', userName.value)
    localStorage.setItem('weather', inputCity.value)
    localStorage.setItem('tr', langugage.className)
    localStorage.setItem('mus', allButtonsDelete[0].className)
    localStorage.setItem('wh', allButtonsDelete[1].className)
    localStorage.setItem('qu', allButtonsDelete[2].className)
    localStorage.setItem('cel', allButtonsDelete[3].className)
    localStorage.setItem('gre', allButtonsDelete[4].className)
    localStorage.setItem('gitHub', apiButton[2].className)
    localStorage.setItem('API', apiButton[0].className)
    localStorage.setItem('flirc', apiButton[1].className)
    localStorage.setItem('APIText', apiText.value)
    localStorage.setItem('Flirctext', inputFlirc.value)
    localStorage.setItem('aler', 1)
}

function getLocalStorage () {
    if(localStorage.getItem('aler')) {
    } else { setRandomeImg()
        apiButton[2].classList.add('delete')}
    if (localStorage.getItem('userName')){
        userName.value = localStorage.getItem('userName')
    }
    if (localStorage.getItem("weather")) {
        let t = inputCity.value = localStorage.getItem('weather')
        getWether(t)
    }
    if (localStorage.getItem('tr') === 'langugage active') {
        transleter()
    } 
    if (localStorage.getItem('gitHub')=== 'api but delete') {
        apiButton[2].classList.add('delete')
        setRandomeImg()
        slederNext.addEventListener('click', isNextImg)
        slederPre.addEventListener('click', isPreImg)
    } else if (localStorage.getItem('API') === 'api but' && localStorage.getItem('flirc') === 'api but') {
        setRandomeImg()
    }
    if (localStorage.getItem('API')=== 'api but delete') {
        apiButton[0].classList.add('delete')
        setApiImg(arrayPhotos[0])
        slederNext.addEventListener('click', next)
        slederPre.addEventListener('click', preve)
    }
    if (localStorage.getItem('flirc')=== 'api but delete') {
        apiButton[1].classList.add('delete')
        setApiImg(arrayFlirck[0])
        slederNext.addEventListener('click', nextF)
        slederPre.addEventListener('click', preveF)
        console.log(arrayPhotos[0],'aa', arrayFlirck[0], 'ff')
    }

    if (localStorage.getItem('mus') ==="del but delete") {
        allButtonsDelete[0].classList.add('delete')
        array[0].classList.add('del-block')
    }if (localStorage.getItem('wh') ==="del but delete") {
        allButtonsDelete[1].classList.add('delete')
        array[1].classList.add('del-block')
    }if (localStorage.getItem('qu') ==="del but delete") {
        allButtonsDelete[2].classList.add('delete')
        array[2].classList.add('del-block')
    }if (localStorage.getItem('cel') ==="del but delete") {
        allButtonsDelete[3].classList.add('delete')
        array[3].classList.add('del-block')
    }if (localStorage.getItem('gre') ==="del but delete") {
        allButtonsDelete[4].classList.add('delete')
        array[4].classList.add('del-block')
    }
}

window.addEventListener('load', getLocalStorage)
window.addEventListener('beforeunload', setLocalStorage)
inputCity.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        getWether(inputCity.value)
    }
})
const buttonQuote = document.querySelector('.change-quote')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
function getRandomInitArray (arrayLenght) {
    return Math.ceil(Math.random() * arrayLenght)
}
function getQuote () {
    fetch(`./json/${quetLan}`)
      .then(response => {return response.json()})
      .then(data => {
        let quotes = data.quotes
        let quetesObject = quotes[getRandomInitArray(quotes.length)]
        quote.textContent = `${qu}: ${quetesObject.quote}`
        author.textContent = `${au}: ${quetesObject.author}`
      })
}
getQuote()
buttonQuote.addEventListener('click', getQuote)


const buttonAudio = document.querySelector('.play')
const buttonPrev = document.querySelector('.play-prev')
const buttoNext = document.querySelector('.play-next')
const audio = new Audio()
const player = document.querySelector('.play-list')
const volumeInput = document.querySelector('.volume')
const voluem = document.querySelector('.vlume-icon')
const currentTimeTreck = document.querySelector('.current-time-trek')
const endTimeTrecck = document.querySelector('.time-of-end-treck')
const blockBar = document.querySelector('.block-bar')
const lineBar = document.querySelector('.prograss-bar')

import PlayList from './Playlist.js';
let isPlay = false
let treckTimer = 0
let progresAudio

function getProsentToProgressBar (){
    let timeOfHoleOfTreack = Math.floor(audio.duration)
    let prosent = 150/timeOfHoleOfTreack
    return Number(String(prosent).slice(0,3))
}
function getAudioDuration () {
    return  Math.floor(audio.duration)
}
let tr = 0
function setBar () {
    lineBar.addEventListener('click', (event) => {
        const timeLine = window.getComputedStyle(lineBar).width;
        const timeToSeek = event.offsetX / parseInt(timeLine)
        progresAudio = Math.floor(getAudioDuration() * timeToSeek)
        progressBar()
        showCurrentTime()
        audio.currentTime = progresAudio
    })
}
function progressBar () {
    let f =getProsentToProgressBar()
    blockBar.style.width = `${f*progresAudio}px`
}
function getMunute () {
    return Math.floor(progresAudio/60)
}
function getSeconds () {
    let generator = getMunute()
    if (progresAudio <=60) {
        return progresAudio
    } else {
        return Math.floor(progresAudio-(60*generator))
    }
}
function showCurrentTime () {
    let minute = getMunute()
    let seconds = getSeconds()
    currentTimeTreck.textContent =`0${minute}:${seconds}`
}
function terckTime () {
    setTimeout(terckTime,1000)
    progresAudio = Math.floor(audio.currentTime)
    audio.volume = volumeInput.value/100
    showCurrentTime()
    progressBar()
    setBar()
    if (audio.volume === 0) {
        voluem.classList.add('chenge')
    } else {
        voluem.classList.remove('chenge')
    }

} 
function addTimeofEndTreack () {
    endTimeTrecck.textContent = PlayList[treckTimer].duration 
}
terckTime()
function PlayAudio () {
    if (isPlay == true) {PauseAudio()}
    audio.src = PlayList[treckTimer].src;
    audio.currentTime = progresAudio;
    buttonAudio.classList.add('pause')
    buttonAudio.classList.remove('play') 
    audio.play()
    coorfulPlayList()
    addTimeofEndTreack()
    isPlay = true
}

function PauseAudio () {
    audio.pause()
    buttonAudio.classList.add('play')
    buttonAudio.classList.remove('pause')
}
function buttonPreTreck () {
    treckTimer--
    if (treckTimer < 0) {
        return treckTimer = PlayList.length
    }
    isPlay = true
    progresAudio = 0
    PlayAudio()
   // console.log(terckTime)
}
function buttonNextTreck () {
    treckTimer++
    if (treckTimer === PlayList.length) {
        treckTimer = 0
    }
    progresAudio = 0 
    PlayAudio()
    isPlay = true
    //console.log(treckTimer)
}
buttonAudio.addEventListener('click', ()=> {
    if (isPlay === false) {
        PlayAudio()
        isPlay = true
    } else { 
        PauseAudio();
        isPlay = false
    }
})
buttoNext.addEventListener('click', buttonNextTreck)
buttonPrev.addEventListener('click', buttonPreTreck)
PlayList.forEach((value,index) => {
    const li = document.createElement('li')
    li.textContent = PlayList[index].tittle
    li.classList.add('play-item')
    player.append(li)
})
const blockPlayList = document.querySelectorAll('.play-item')
function coorfulPlayList () {
    blockPlayList.forEach((value,index)=> {
        blockPlayList[treckTimer].classList.add('item-active')
        if (index != treckTimer) {
            blockPlayList[index].classList.remove('item-active')
        }
    })
}
function tapOnthePlayList () {
    blockPlayList.forEach((value,index)=>{
        value.addEventListener('click', ()=> {
            treckTimer = index
            progresAudio = 0
            PlayAudio()
            coorfulPlayList()
        })
    })
}
tapOnthePlayList()
audio.onended = function (){
    buttonNextTreck()
    progresAudio = 0
}
let chengeVolume = 0
function Isvoluem () {
    if (chengeVolume == 0 ){
        volumeInput.classList.add('active')
        chengeVolume = 1
    } else {
        volumeInput.classList.remove('active')
        chengeVolume = 0
    }
}
voluem.addEventListener('click', Isvoluem)
const settingsVraper = document.querySelector('.ru-setting ')
const settingBlock = document.querySelector('.setting-block')
const settingWeel = document.querySelector('.setting')
function openSettings () {
    settingBlock.classList.toggle('open')
    settingsVraper.classList.toggle('open')
}
function closeSettings (){
    settingBlock.classList.remove('open')
    settingsVraper.classList.remove('open')
}
/*window.addEventListener('click', (e)=> {
    const r = e.srcElement.className
    if (r === 'setting-block open') {
        closeSettings()
        console.log(1)
    }
})*/
settingWeel.addEventListener('click', ()=> {
    if (settingWeel.className === 'setting reotete') {
        settingWeel.classList.remove('reotete')
        settingWeel.classList.add('reoteteRevers')
    } else {
        settingWeel.classList.remove('reoteteRevers')
        settingWeel.classList.add('reotete')
    }
    openSettings()
})

function delElements () {
    allButtonsDelete.forEach((value, index)=> {
        value.addEventListener('click', ()=> {
            array[index].classList.toggle('del-block')
            value.classList.toggle('delete')
            if (index === 0) {
                PauseAudio()
                isPlay= false
            }
        })
    })
}
function addUserNameToTheSettings () {
    if (localStorage.getItem('userName')){
        let r = userName.value = localStorage.getItem('userName')
        userNameInSetting.textContent = r
    }
}
addUserNameToTheSettings()

delElements()
function fetchImg (img) {
   fetch(`https://api.unsplash.com/search/collections?page=3&orientation=squarish&&query=${img}&client_id=W0dd5XImAGnt48X6CfmqfUQcgqmJ_9ONOqhPh3ibixY`)
   .then(response => {return response.json()})
   .then (data => {
      data.results.forEach((value)=>{
       value.preview_photos.forEach((value1)=> {
           arrayPhotos.push(value1.urls.regular)
       })
       return arrayPhotos
      })
   })
   .catch ((error)=> {
    alert('Please inter new API name')
   })
}
function fetchFlirc (img) {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6108abd0225797e77595148e43e7898a&tags=${img}&extras=url_l&format=json&nojsoncallback=1`)
    .then(re=> {return re.json()})
    .then (data1 => {
        data1.photos.photo.forEach((value)=> {
            arrayFlirck.push(value.url_l)
        })
        return arrayFlirck
    })
}
let timerApi=0
function setApiImg (imgSrc) {
    const img = new Image();
    img.src = `${imgSrc}`
    img.onload = () => {
        bodyImg.style.backgroundImage = `url('${imgSrc}')`
    } 
}
function apiNextBut (array) {
    timerApi++
    if (timerApi === array.length) {
        return timerApi = 0
    }
    let calc = array[timerApi]
    setApiImg(calc)
}
function apiPrevBut (array) {
    timerApi--
    if (timerApi < 0) {
        return timerApi = array.length
    }
    let calc = array[timerApi]
    setApiImg(calc)
}
function next () {
    return apiNextBut(arrayPhotos)
}
function preve () {
    return apiPrevBut(arrayPhotos)
}
function nextF () {
    return apiNextBut(arrayFlirck)
}
function preveF () {
    return apiPrevBut(arrayFlirck)
}

if (localStorage.getItem('APIText')) {
       let t = apiText.value = localStorage.getItem('APIText')
       fetchImg(t)
}
function fl () {
    if (localStorage.getItem('Flirctext')) {
        let y = inputFlirc.value = localStorage.getItem('Flirctext')
        fetchFlirc(y)
    }
}
fl()

apiButton.forEach((value,index)=> {
    value.addEventListener('click', ()=> {
        value.classList.add('delete')
        if (apiButton[index] ===  apiButton[0]) {
            apiButton[1].classList.remove('delete')
            apiButton[2].classList.remove('delete')
            slederNext.addEventListener('click', next)
            slederPre.addEventListener('click', preve)
            slederNext.removeEventListener('click', isNextImg, false)
            slederPre.removeEventListener('click', isPreImg, false)
            slederNext.removeEventListener('click', nextF, false)
            slederPre.removeEventListener('click', preveF, false)
            timerApi = 0
            setApiImg(arrayPhotos[timerApi])
        } else if (apiButton[index] ===  apiButton[1]) {
            apiButton[0].classList.remove('delete')
            apiButton[2].classList.remove('delete')
            slederNext.addEventListener('click', nextF)
            slederPre.addEventListener('click', preveF)
            slederNext.removeEventListener('click', next, false)
            slederPre.removeEventListener('click', preve, false)
            slederNext.removeEventListener('click', isNextImg, false)
            slederPre.removeEventListener('click', isPreImg, false)
            setApiImg(arrayFlirck[timerApi])
            timerApi = 0
        } else  {
            apiButton[1].classList.remove('delete')
            apiButton[0].classList.remove('delete')
            setRandomeImg()
            slederNext.removeEventListener('click', next, false)
            slederPre.removeEventListener('click', preve, false)
            slederNext.addEventListener('click', isNextImg)
            slederPre.addEventListener('click', isPreImg)
            slederNext.removeEventListener('click', nextF, false)
            slederPre.removeEventListener('click', preveF, false)
        }
    })
})

function flirck () {
    if (inputFlirc.value === '') {
        let y = inputFlirc.value = getday()
        fetchFlirc(y)
        inputFlirc.value = ''
    } 
}
flirck()
setTimeout(()=> {
    if (localStorage.getItem('API') === 'api but' && localStorage.getItem('gitHub') === 'api but') {
        flirck();
        fl();
        setApiImg(arrayFlirck[0])
    }
}, 1000)
function api () {
    if (apiText.value === '') {
        let y = apiText.value = getday()
        fetchImg(y)
        apiText.value = ''
    }
}
api()

apiText.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        if (apiText.value === '') {
            api()
        }
        arrayPhotos = []
        timerApi = 0
        let t = apiText.value
        fetchImg(t)
        setTimeout(()=>{setApiImg(arrayPhotos[0])},1000)
    }
})
inputFlirc.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        if (inputFlirc.value === '') {
            flirck()
        }
        arrayFlirck = []
        timerApi = 0
        let t = inputFlirc.value
        fetchFlirc(t)
        setTimeout(()=>{setApiImg(arrayFlirck[0])},1000)
    }
})


