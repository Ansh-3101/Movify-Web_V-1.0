const key = '68aea65605cb563f92ea833b5dd6c75d';
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`;
const imageUrl = 'https://image.tmdb.org/t/p/w500';
const latestMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`
const popularTV = `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`;
const randomImg = 'https://www.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg';
var clicked = false;
getTVSciFi(topRatedUrl);
getLatestMovies(latestMovies);
getPopularTV(popularTV);

document.getElementById('searchBar').addEventListener("blur", hideSearchList,true);
document.getElementById('searchBar').addEventListener("click", submit(),false);

async function getTVSciFi(topRatedUrl) {

    fetch(topRatedUrl)
.then((response)=> response.json())
.then((data)=> {
    // console.log(data);
    
    
    data.results.map(element=>{
        
var name = element.title;

let list = document.getElementById("tvList");
var li = document.createElement('li');


 li.innerHTML =`
 <a href="movie.html" >
     <div class="card" id=${element.id} onclick={onClickItem(${element.id},"movie")} >
 
         <div class="cardImage">
             <img id="itemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
         </div>
 
         <div class="info">
             <div id="rating"><span class="fa fa-star checked"> </span> ${element.vote_average}</div>
             <div id="itemName">${name.length>22? name.slice(0,16)+"...":name}</div>
             <div id="releaseDate">${element.release_date}</div>
         </div>
      </div>
 </a>`

    list.appendChild(li);

})
    
});
}


async function getLatestMovies(latestMovies) {

    fetch(latestMovies)
.then((response)=> response.json())
.then((data)=> {
    // console.log(data);


data.results.map(element=>{

var name = element.title;

let list = document.getElementById("latestMovieItem");
var li = document.createElement('li');

li.innerHTML =`
<a href="movie.html" >
    <div class="card" id=${element.id} onclick={onClickItem(${element.id},"movie")} >

        <div class="cardImage">
            <img id="itemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
        </div>

        <div class="info">
            <div id="rating"><span class="fa fa-star checked"> </span> ${element.vote_average}</div>
            <div id="itemName">${name.length>22? name.slice(0,16)+"...":name}</div>
            <div id="releaseDate">${element.release_date}</div>
        </div>
     </div>
</a>`
    list.appendChild(li);

})
    
});
}


async function getPopularTV(popularTV) {

    fetch(popularTV)
.then((response)=> response.json())
.then((data)=> {
    // console.log(data);


data.results.map(element=>{

var name = element.original_name;

let list = document.getElementById("popularTV");
var li = document.createElement('li');


li.innerHTML =`
<a href="tv.html" >
    <div class="card" id=${element.id} onclick={onClickItem(${element.id},"tv")} >

        <div class="cardImage">
            <img id="itemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
        </div>

        <div class="info">
            <div id="rating"><span class="fa fa-star checked"> </span> ${element.vote_average}</div>
            <div id="itemName">${name.length>22? name.slice(0,16)+"...":name}</div>
            <div id="releaseDate">${element.first_air_date}</div>
        </div>
     </div>
</a>`
    list.appendChild(li);

})
    
});
}


async function submit(e) {
    console.log('submit');
    getSearchResults();
   
}


function getSearchResults(){
  
   var searchText =  document.getElementById('searchText').value;
   document.getElementById('searchList').innerHTML = ""
   document.getElementById("movies").style.backgroundColor = "rgb(26, 183, 216)";
   document.getElementById("tv").style.backgroundColor = "black";
   document.getElementById("person").style.backgroundColor = "black";
   if (document.getElementById('searchText').value.length < 1 ) {
       document.getElementById('modal').style.display = "none"
   }
   else{
   document.getElementById('modal').style.display = "block"
   }
   const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
   fetch(searchUrl).then((response)=> response.json())
   .then((data)=>{
      setContentCount(searchText);

    data.results.map((element)=>{
        var searchList = document.getElementById('searchList');
        var li = document.createElement('li');
        if (element.media_type == "movie") {
        
            li.innerHTML = `<a href="movie.html" onclick={onClickItem(${element.id},"movie")}>
            <div class="movieItem" >
            <img id="searchItemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
            <div class="searchItemInfo">
            <span id="searchItemName">${element.original_title}</span>
            <span id="searchItemRating"><span class="fa fa-star checked"></span> ${element.vote_average}</span>
            <span id="searchItemType"><span id="searchItemDate">${element.release_date}</span> </span>
            <div id="overView">${element.overview.length > 470? element.overview.slice(0,470)+"...":element.overview}</div>
            </div>
            </div>
            </a>`
            searchList.appendChild(li);
        }

    })
   })

}


async function showSearchList() {
    // if (document.getElementById('searchText').value == null) {
        //     document.getElementById('modal').setAttribute("display","block")
    // }
    // else{
    //     console.log("list empty");
    //     document.getElementById('modal').setAttribute("display","block")
    // }
}


async function onclickMovies(){
    var searchText =  document.getElementById('searchText').value;
    document.getElementById('searchList').innerHTML = ""
    document.getElementById("movies").style.backgroundColor = "rgb(26, 183, 216)";
    document.getElementById("tv").style.backgroundColor = "black"
    document.getElementById("person").style.backgroundColor = "black"
    document.getElementById("collection").style.backgroundColor = "black"
    
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
    
    fetch(searchUrl).then((response)=> response.json())
    .then((data)=>{
       
     data.results.map((element)=>{
         var searchList = document.getElementById('searchList');
         var li = document.createElement('li');
         
  
             li.innerHTML = `<a href="movie.html" onclick={onClickItem(${element.id},"movie")}>
             <div class="movieItem" >
             <img id="searchItemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
             <div class="searchItemInfo">
             <span id="searchItemName">${element.original_title}</span>
             <span id="searchItemRating"><span class="fa fa-star checked"></span> ${element.vote_average}</span>
             <span id="searchItemType"><span id="searchItemDate">${element.release_date}</span> </span>
             <div id="overView">${element.overview.length > 470? element.overview.slice(0,470)+"...":element.overview}</div>
             </div>
             </div>
             </a>`
             searchList.appendChild(li);
         
 
     })
    })
}


async function onclickTV(){
    var searchText =  document.getElementById('searchText').value;
    document.getElementById('searchList').innerHTML = ""
    const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
    document.getElementById("movies").style.backgroundColor = "black";
    document.getElementById("tv").style.backgroundColor = "rgb(26, 183, 216)"
    document.getElementById("person").style.backgroundColor = "black"
    document.getElementById("collection").style.backgroundColor = "black"
    fetch(searchUrl).then((response)=> response.json())
    .then((data)=>{
 
        data.results.map((element)=>{
         var searchList = document.getElementById('searchList');
         
         var li = document.createElement('li');
         li.innerHTML = `<a href="tv.html" onclick={onClickItem(${element.id},"tv")}>
             <div class="movieItem" >
             <img id="searchItemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
             <div class="searchItemInfo">
             <span id="searchItemName">${element.original_name}</span>
             <span id="searchItemRating"><span class="fa fa-star checked"></span> ${element.vote_average}</span>
             <span id="searchItemType"><span id="searchItemDate">${element.first_air_date}</span> </span>
             <div id="overView">${element.overview.length > 470? element.overview.slice(0,470)+"...":element.overview}</div>
             </div>
             </div>
             </a>`
             searchList.appendChild(li);
 
     })
    })
}


async function onclickPersons(){
    var searchText =  document.getElementById('searchText').value;
    document.getElementById('searchList').innerHTML = ""
    const searchUrl = `https://api.themoviedb.org/3/search/person?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
    document.getElementById("movies").style.backgroundColor = "black";
    document.getElementById("tv").style.backgroundColor = "black"
    document.getElementById("person").style.backgroundColor = "rgb(26, 183, 216)"
    document.getElementById("collection").style.backgroundColor = "black"
    fetch(searchUrl).then((response)=> response.json())
    .then((data)=>{
        console.log(data);
    const results = data.results.reverse();
        results.map((element)=>{
            
         var searchList = document.getElementById('searchList');
         let gender = ""
         if (element.gender == "2"){ gender = "Male" }

         else if (element.gender == "1"){ gender = "Female" }

         var li = document.createElement('li');
         li.innerHTML = `<a href="person.html" onclick={onClickPersonItem(${element.id})}>
             <div class="movieItem" >
             <img id="searchItemImage" src="https://image.tmdb.org/t/p/w500${element.profile_path}" alt="">
             <div class="searchItemInfo">
             <span id="searchItemName">${element.original_name}</span>
             <span id="searchItemType"><span id="searchItemDate">Popularity : ${element.popularity}</span> </span>
             <div id="overView">${gender}</div>
             <span id="searchItemRating">Known For : ${element.known_for_department}</span>
             </div>
             </div>
             </a>`
             searchList.appendChild(li);
 
     })
    })
}


async function onclickCollections(){
    var searchText =  document.getElementById('searchText').value;
    document.getElementById('searchList').innerHTML = ""
   
    const searchUrl = `https://api.themoviedb.org/3/search/collection?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
    document.getElementById("movies").style.backgroundColor = "black";
    document.getElementById("tv").style.backgroundColor = "black"
    document.getElementById("person").style.backgroundColor = "black"
    document.getElementById("collection").style.backgroundColor = "rgb(26, 183, 216)"
    fetch(searchUrl).then((response)=> response.json())
    .then((data)=>{
    console.log(data);
    data.results.map((element)=>{
        var searchList = document.getElementById('searchList');
         var li = document.createElement('li');
    
            
             li.innerHTML = `<a href="collection.html" onclick={onClickCollectionItem(${element?.id})}>
             <div class="movieItem" >
             <img id="searchItemImage" src="https://image.tmdb.org/t/p/w500${element?.poster_path}" alt="">
             <div class="searchItemInfo">
             <span id="searchItemName">${element?.original_name}</span>
             <span id="searchItemType"><span id="searchItemDate">Language : ${element.original_language}</span> </span>
               <div id="overView">${element.overview}</div>
               </div>
             </div>
             </a>`
             searchList.appendChild(li);
         
             
            })
    })
}


async function setContentCount(searchText) {

const searchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
const searchTV = `https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
const searchPerson = `https://api.themoviedb.org/3/search/person?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
const searchCollection = `https://api.themoviedb.org/3/search/collection?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`

   fetch(searchMovie).then((response)=>response.json())
   .then((data)=>{
       document.getElementById("movieCount").innerHTML = data.results.length;
   })
   fetch(searchTV).then((response)=>response.json())
   .then((data)=>{
       document.getElementById("TVCount").innerHTML = data.results.length;
   })
   fetch(searchPerson).then((response)=>response.json())
   .then((data)=>{
       document.getElementById("personCount").innerHTML = data.results.length;
   })
   fetch(searchCollection).then((response)=>response.json())
   .then((data)=>{
       document.getElementById("collectionCount").innerHTML = data.results.length;
   })

    
}


function onClickCollectionItem(id){
        sessionStorage.setItem("collectionId",id);
}
    
    
function onClickItem(id,type){
        console.log(id,type);
        clicked = true
        sessionStorage.setItem("id",id);
        sessionStorage.setItem("type",type);
}
    
    
async function onClickPersonItem(id){
        sessionStorage.setItem("castId",id);
}
    
    
async function hideSearchList() {
        // setTimeout(() => {
            
        //     if (clicked == false) {
        //         document.getElementById('modal').style.display = "none";
        //     }
        //     console.log("hide");
        // }, 300);
}