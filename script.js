console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Superhit Nasheed - Cheetay Ka Jigar Rakhtay Hain", filePath: "songs/1.mp3", coverPath: "covers/1.png"},
    {songName: "Hum Ashab Ke Khadim", filePath: "songs/2.mp3", coverPath: "covers/2.png"},
    {songName: "Shaheen ", filePath: "songs/3.mp3", coverPath: "covers/3.png"},
    {songName: " Hum Ko Maloom Hai Hum Nishane Pe Hain", filePath: "songs/4.mp3", coverPath: "covers/4.png"},
    {songName: "Ay Nojawan - Teri Manzil Hy Yahan", filePath: "songs/5.mp3", coverPath: "covers/5.png"},
    {songName: "Hum Ko Mita Sake Ya Zamane Main Dum Nahi", filePath: "songs/2.mp3", coverPath: "covers/6.png"},
    {songName: "Chalna Para Hai Tanha Koi nahi Kisi Ka", filePath: "songs/2.mp3", coverPath: "covers/7.png"},
    {songName: "Aay Dushman E Deen - Salahuddin Al Maroofi", filePath: "songs/2.mp3", coverPath: "covers/8.png"},
    {songName: "Dil Mein Shahadat Ki Tarap", filePath: "songs/2.mp3", coverPath: "covers/9.png"},
    {songName: "Labaik Ya Aqsa", filePath: "songs/10.mp3", coverPath: "covers/10.png"},
    {songName: "AL Qusu lan labaik ", filePath: "songs/11.mp3", coverPath: "covers/11.png"},
    {songName: " Wo Deen e Muhammad Ke Wafadar Kahan Hain", filePath: "songs/12.mp3", coverPath: "covers/12.png"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})