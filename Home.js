const key = '68aea65605cb563f92ea833b5dd6c75d';
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`;
const imageUrl = 'https://image.tmdb.org/t/p/w500';
const upComingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`
const popularTV = `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`;
const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`;
const todayTrendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page=1`
const weekTrendingUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US&page=1`
const popularCelebsURL = `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1`
const randomImg = 'https://www.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg';
var clicked = false;


getTrending(todayTrendingUrl);
getPopularCelebs(popularCelebsURL);
getTopRated();
getUpcomingMovies(upComingMovies)

document.getElementById('searchBar').addEventListener("blur", hideSearchList,true);
document.getElementById('searchBar').addEventListener("click", submit(),false);


document.getElementById("today").addEventListener("onclick",()=>{
    document.getElementById("today").className = "select selected"
    document.getElementById("thisWeek").className = "select"
})

document.getElementById("thisWeek").addEventListener("onclick",()=>{
    document.getElementById("thisWeek").className = "select selected"
    document.getElementById("today").className = "select"
})

document.getElementById("closeBtn").addEventListener("click",()=>{
    document.getElementById("modal").style.display = "none"
})


function today() {
    document.getElementById("today").className = "select selected"
    document.getElementById("thisWeek").className = "select"
    document.getElementById("today").style.cssText = `transition: 0.5s ease-in`
    getTrending(todayTrendingUrl)
}

function thisWeek() {
    document.getElementById("today").className = "select"
    document.getElementById("thisWeek").className = "select selected"
    document.getElementById("thisWeek").style.cssText = `transition: 0.5s ease-in`
    getTrending(weekTrendingUrl)
}

function onTV() {
    document.getElementById("onTV").className = "select selected"
    document.getElementById("onTV").style.cssText = `transition: 0.5s ease-in`
    document.getElementById("inTheatres").className = "select"
    document.getElementById("topRated").className = "select"
    getPopularTV(popularTV)
}

function topRated() {
    document.getElementById("topRated").className = "select selected"
    document.getElementById("topRated").style.cssText = `transition: 0.5s ease-in`
    document.getElementById("inTheatres").className = "select"
    document.getElementById("onTV").className = "select"
    getTopRated()
}
    

function inTheatres() {
    document.getElementById("inTheatres").className = "select selected"
    document.getElementById("inTheatres").style.cssText = `transition: 0.5s ease-in`
    document.getElementById("onTV").className = "select"
    document.getElementById("topRated").className = "select"
    getPopular(popularMovies)
}


function getPopularCelebs(url) {
    let celebsList = document.getElementById("popularCelebs")
    celebsList.innerHTML = ""


    for (let index = 0; index < 20; index++) {
        let celeb = document.createElement("div");

        celeb.innerHTML = `
        <a class="castMain">
        <div class="castImageCard">
            <img class="castImage skeleton" alt="">
        </div>  
        <div class="castInfo">
            <div class="castName skeleton nameSkeleton"></div>
        </div>
    </a>`


        celebsList.appendChild(celeb)
    }

    fetch(url)?.then((response)=>response.json())
    .then((data)=>{
        
       setTimeout(() => {
        celebsList.innerHTML = ""
        data?.results?.map((element)=>{
        let celeb = document.createElement("div");

        let poster = `https://image.tmdb.org/t/p/w500${element.profile_path}`
        if (element?.profile_path === null) {
            poster =  `./images/noImage.png`
        }


        celeb.innerHTML = `
        <a href="person.html?id=${element.id}" class="castMain" onclick={onClickCast(${element.id})}>
        <div class="castImageCard">
            <img class="castImage skeleton" src="${poster}" alt="">
        </div>  
        <div class="castInfo">
            <div class="castName">${element?.name?.length>>17? element?.name?.slice(0,1)+"...":element?.name}</div>
        </div>
    </a>`


        celebsList.appendChild(celeb)

        })
       }, 500);
    })
    
}


async function getTrending(trendingUrl) {
    let skeletonList = document.getElementById("tvList")
    document.getElementById("tvList").innerHTML = "";

    for (let index = 0; index < 20; index++) {
        let li = document.createElement("li");

        li.innerHTML =`
        <a href="" >
            <div class="card" id="">
        
                <div class="cardImage">
                    <img class ="skeleton" id="itemImage" alt="">
                </div>

                <div class="info">
                        <div id="rating" class="skeleton skeleton-text"></div>
                        <div id="itemName" class="skeleton skeleton-text"></div>
                        <div id="releaseDate" class="skeleton skeleton-text"></div>
                    </div>
            </div>
        </a>`

    skeletonList.appendChild(li);
    }
        
    fetch(trendingUrl)?.then((response)=> response.json())
    .then((data)=> {   
    
        setTimeout(() => {
            document.getElementById("tvList").innerHTML = "";
            data?.results?.map(element=>{
                
                var name = element.title;

                let list = document.getElementById("tvList");

                var li = document.createElement('li');

                let poster = `https://image.tmdb.org/t/p/w500${element.poster_path}`
                if (element.poster_path == null) {
                    poster = `./images/noImage.png`
                }

                if (element?.media_type == "tv") {

                    li.innerHTML =`
                        <a href="tv.html?id=${element.id}" >
                            <div class="card" id=${element.id} onclick={onClickItem(${element.id},"tv")} >
                        
                                <div class="cardImage">
                                    <img class ="skeleton" id="itemImage" src="${poster}" alt="">
                                </div>
                        
                                <div class="info">
                                    <div id="rating"><span class="fa fa-star checked"> </span> ${element?.vote_average}</div>
                                    <div id="itemName">${element?.name?.length>22? element?.name?.slice(0,16)+"...":element?.name}</div>
                                    <div id="releaseDate">${element?.first_air_date}</div>
                                </div>
                            </div>
                        </a>`

                    list.appendChild(li);
                }

                else if (element?.media_type == "movie") {
                    li.innerHTML =`
                    <a href="movie.html?id=${element.id}" >
                        <div class="card" id=${element.id} onclick={onClickItem(${element.id},"movie")} >
                    
                            <div class="cardImage">
                                <img id="itemImage" class ="skeleton" src="${poster}" alt="">
                            </div>
                    
                            <div class="info">
                                <div id="rating"><span class="fa fa-star checked"> </span> ${element?.vote_average}</div>
                                <div id="itemName">${name?.length>22? name.slice(0,16)+"...":name}</div>
                                <div id="releaseDate">${element?.release_date}</div>
                            </div>
                        </div>
                    </a>`

                list.appendChild(li);
                    
                }

            })
        }, 500);
        
    });
   
}


async function getTopRated(){
    const topRatedTV = `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}`
    const topRatedMovie = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`
    
    document.getElementById("latestMovieItem").innerHTML = ""
    let list = document.getElementById("latestMovieItem")

    for (let index = 0; index < 40; index++) {
        let li = document.createElement("li");

        li.innerHTML =`
        <a href="" >
            <div class="card" id="">
        
                <div class="cardImage">
                    <img class ="skeleton" id="itemImage" alt="">
                </div>

                <div class="info">
                        <div id="rating" class="skeleton skeleton-text"></div>
                        <div id="itemName" class="skeleton skeleton-text"></div>
                        <div id="releaseDate" class="skeleton skeleton-text"></div>
                    </div>
            </div>
        </a>`

    list.appendChild(li);
    }

    var topRatedList = new Array;
    let movieCounter = 0 ;
    let tvCounter = 1 ;

    fetch(topRatedTV)?.then((response)=> response.json())
    .then((data)=> {

        for (let index = 0; index < data?.results?.length; index++){
            topRatedList[movieCounter] = data?.results[index]
            topRatedList[movieCounter].media_type = "tv"
            movieCounter += 2;
    }});


    fetch(topRatedMovie)?.then((response)=> response.json())
    .then((data)=> {

        for (let index = 0; index < data.results.length; index++) {
            topRatedList[tvCounter] = data?.results[index]
            topRatedList[tvCounter].media_type = "movie"
            tvCounter += 2;
        }
    
        
       setTimeout(() => {
            list.innerHTML = ""
            topRatedList?.map((element)=>{
                let li = document.createElement('li');

                let poster = `https://image.tmdb.org/t/p/w500${element?.poster_path}`
                if (element.poster_path == null) {
                    poster = `./images/noImage.png`
                }
                

                if (element?.media_type == "tv") {
                
                    li.innerHTML =`
                        <a href="tv.html?id=${element.id}" >
                            <div class="card" id=${element.id} onclick={onClickItem(${element.id},"tv")} >
                        
                                <div class="cardImage">
                                    <img id="itemImage" class="skeleton" src="${poster}" alt="">
                                </div>
                        
                                <div class="info">
                                    <div id="rating"><span class="fa fa-star checked"> </span> ${element?.vote_average}</div>
                                    <div id="itemName">${element?.original_name?.length>22? element?.original_name?.slice(0,16)+"...":element?.original_name}</div>
                                    <div id="releaseDate">${element?.first_air_date}</div>
                                </div>
                            </div>
                        </a>`
                
                    list.appendChild(li);
                }
                
                else{
                    li.innerHTML =`
                    <a href="movie.html?id=${element.id}" >
                        <div class="card" id=${element.id} onclick={onClickItem(${element.id},"movie")} >
                    
                            <div class="cardImage">
                                <img id="itemImage" class="skeleton" src="${poster}" alt="">
                            </div>
                    
                            <div class="info">
                                <div id="rating"><span class="fa fa-star checked"> </span> ${element?.vote_average}</div>
                                <div id="itemName">${element?.title?.length>22? element?.title?.slice(0,16)+"...":element?.title}</div>
                                <div id="releaseDate">${element?.release_date}</div>
                            </div>
                        </div>
                    </a>`
                
                list.appendChild(li);
                }
            })

       }, 500);

});
         
}


async function getPopular(url) {

    let list = document.getElementById("latestMovieItem");
    list.innerHTML = ""
    
    for (let index = 0; index < 20; index++) {
        let li = document.createElement("li");
    
        li.innerHTML =`
        <a href="" >
            <div class="card" id="">
        
                <div class="cardImage">
                    <img class ="skeleton" id="itemImage" alt="">
                </div>
    
                <div class="info">
                        <div id="rating" class="skeleton skeleton-text"></div>
                        <div id="itemName" class="skeleton skeleton-text"></div>
                        <div id="releaseDate" class="skeleton skeleton-text"></div>
                    </div>
            </div>
        </a>`
    
    list.appendChild(li);
    }

    fetch(url)?.then((response)=> response.json())
    .then((data)=> {

        setTimeout(() => {
            list.innerHTML = ""
            data?.results?.map(element=>{

            var name = element?.title;

            var li = document.createElement('li');

            let poster = `https://image.tmdb.org/t/p/w500${element.poster_path}`
            if (element.poster_path == null) {
                poster = `./images/noImage.png`
            }

            li.innerHTML =`
            <a href="movie.html?id=${element.id}" >
                <div class="card" id=${element.id} onclick={onClickItem(${element.id},"movie")} >

                    <div class="cardImage">
                        <img id="itemImage" class="skeleton" src="${poster}" alt="">
                    </div>

                    <div class="info">
                        <div id="rating"><span class="fa fa-star checked"> </span> ${element?.vote_average}</div>
                        <div id="itemName">${name?.length>22? name?.slice(0,16)+"...":name}</div>
                        <div id="releaseDate">${element?.release_date}</div>
                    </div>
                </div>
            </a>`
                list.appendChild(li);

            })
        }, 500);
    
    });
}


async function getPopularTV(url) {

    let list = document.getElementById("latestMovieItem");
    list.innerHTML = ""

    for (let index = 0; index < 20; index++) {
        let li = document.createElement("li");

        li.innerHTML =`
        <a href="" >
            <div class="card" id="">
        
                <div class="cardImage">
                    <img class ="skeleton" id="itemImage" alt="">
                </div>

                <div class="info">
                        <div id="rating" class="skeleton skeleton-text"></div>
                        <div id="itemName" class="skeleton skeleton-text"></div>
                        <div id="releaseDate" class="skeleton skeleton-text"></div>
                    </div>
            </div>
        </a>`

    list.appendChild(li);
    }

    fetch(url)
    .then((response)=> response.json())
    .then((data)=> {

        setTimeout(() => {
            list.innerHTML = ""
            data?.results?.map(element=>{

                var name = element?.original_name;
                
                var li = document.createElement('li');
                
                
                let poster = `https://image.tmdb.org/t/p/w500${element.poster_path}`
                if (element.poster_path == null) {
                    poster = `./images/noImage.png`
                    
                }
                
                
                li.innerHTML =`
                <a href="tv.html?id=${element.id}" >
                    <div class="card" id=${element.id} onclick={onClickItem(${element.id},"tv")} >
                
                        <div class="cardImage">
                            <img id="itemImage" class="skeleton" src="${poster}" alt="">
                        </div>
                
                        <div class="info">
                            <div id="rating"><span class="fa fa-star checked"> </span> ${element?.vote_average}</div>
                            <div id="itemName">${name?.length>22? name?.slice(0,16)+"...":name}</div>
                            <div id="releaseDate">${element?.first_air_date}</div>
                        </div>
                    </div>
                </a>`
                    list.appendChild(li);
                
                })
        }, 500);
        
    });
}


async function getUpcomingMovies(url) {

    let list = document.getElementById("popularTV")
    list.innerHTML = ""

    for (let index = 0; index < 20; index++) {
        let li = document.createElement("li");

        li.innerHTML =`
        <a href="" >
            <div class="card" id="">
        
                <div class="cardImage">
                    <img class ="skeleton" id="itemImage" alt="">
                </div>

                <div class="info">
                        <div id="rating" class="skeleton skeleton-text"></div>
                        <div id="itemName" class="skeleton skeleton-text"></div>
                        <div id="releaseDate" class="skeleton skeleton-text"></div>
                    </div>
            </div>
        </a>`

    list.appendChild(li);
    }

    fetch(url)?.then((response)=> response.json())
    .then((data)=> {

    setTimeout(() => {
        list.innerHTML = ""
        data?.results?.map(element=>{

            var name = element?.original_title;
        
            var li = document.createElement('li');

            let poster = `https://image.tmdb.org/t/p/w500${element.poster_path}`
            if (element.poster_path == null) {
                poster = `./images/noImage.png`
            }
            
            
            li.innerHTML =`
            <a href="movie.html?id=${element.id}" >
                <div class="card" id=${element.id} onclick={onClickItem(${element.id},"tv")} >
            
                    <div class="cardImage">
                        <img id="itemImage" class="skeleton" src="${poster}" alt="">
                    </div>
            
                    <div class="info">
                        <div id="rating"><span class="fa fa-star checked"> </span> ${element?.vote_average}</div>
                        <div id="itemName">${name?.length>22? name?.slice(0,16)+"...":name}</div>
                        <div id="releaseDate">${element?.release_date}</div>
                    </div>
                </div>
            </a>`
                list.appendChild(li);
            
            })
    }, 500);
        
});
}


async function submit(e) {
    getSearchResults();
   
}


async function getSearchResults(){
  
   var searchText =  document.getElementById('searchText').value;
   document.getElementById('searchList').innerHTML = ""
   document.getElementById("movies").style.backgroundColor = "rgb(26, 183, 216)";
   document.getElementById("tv").style.backgroundColor = "black";
   document.getElementById("person").style.backgroundColor = "black";
   document.getElementById("collection").style.backgroundColor = "black";



   if (document.getElementById('searchText').value.length < 1 ) {
       document.getElementById('modal').style.display = "none"
   }

   else{
   document.getElementById('modal').style.display = "block"
   }

   var searchList = document.getElementById('searchList');

   for (let index = 0; index < 20; index++) {
    let li = document.createElement("li");

    li.innerHTML =  `<a href="" >
    <div class="movieItem" >
    <img id="searchItemImage" class="skeleton"  alt="">
    <div class="searchItemInfo">
    <span id="searchItemName" class="skeletonSearchText skeleton"></span>
    <span id="searchItemRating" class="skeletonSearchText skeleton"></span>
    <span id="searchItemType" class="skeletonSearchText skeleton"></span>
    <div id="overView" class="skeletonSearchText skeleton"></div>
    </div>
    </div>
    </a>`
    searchList.appendChild(li);
   }

   const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
   fetch(searchUrl)?.then((response)=> response.json())
   .then((data)=>{
      setContentCount(searchText);

     setTimeout(() => {
        searchList.innerHTML = ""
        data?.results?.map((element)=>{
            var li = document.createElement('li');
            let poster = `https://image.tmdb.org/t/p/w500${element.poster_path}`
            if (element.poster_path == null) {
                poster = `./images/noImage.png`
            }
            if (element?.media_type == "movie") {
            
                li.innerHTML = `<a href="movie.html?id=${element.id}" onclick={onClickItem(${element.id},"movie")}>
                <div class="movieItem" >
                <img id="searchItemImage" class="skeleton" src="${poster}" alt="">
                <div class="searchItemInfo">
                <span id="searchItemName">${element?.original_title}</span>
                <span id="searchItemRating"><span class="fa fa-star checked"></span> ${element.vote_average}</span>
                <span id="searchItemType"><span id="searchItemDate">${element.release_date}</span> </span>
                <div id="overView">${element?.overview?.length > 450? element?.overview.slice(0,410)+"...":element?.overview}</div>
                </div>
                </div>
                </a>`
                searchList.appendChild(li);
            }
    
        })
     }, 500);

   
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
    
    var searchList = document.getElementById('searchList');
   
   for (let index = 0; index < 20; index++) {
    let li = document.createElement("li");

    li.innerHTML =  `<a href="" >
    <div class="movieItem" >
    <img id="searchItemImage" class="skeleton"  alt="">
    <div class="searchItemInfo">
    <span id="searchItemName" class="skeletonSearchText skeleton"></span>
    <span id="searchItemRating" class="skeletonSearchText skeleton"></span>
    <span id="searchItemType" class="skeletonSearchText skeleton"></span>
    <div id="overView" class="skeletonSearchText skeleton"></div>
    </div>
    </div>
    </a>`
    searchList.appendChild(li);
   }
    fetch(searchUrl)?.then((response)=> response.json())
    .then((data)=>{
       
    setTimeout(() => {
        searchList.innerHTML = ""
        data?.results?.map((element)=>{
        
            var li = document.createElement('li');

                let poster = `https://image.tmdb.org/t/p/w500${element.poster_path}`
                if (element.poster_path == null) {
                    poster = `./images/noImage.png`
                }
            
     
                li.innerHTML = `<a href="movie.html?id=${element.id}" onclick={onClickItem(${element.id},"movie")}>
                <div class="movieItem" >
                <img id="searchItemImage" class="skeleton" src="${poster}" alt="">
                <div class="searchItemInfo">
                <span id="searchItemName">${element?.original_title}</span>
                <span id="searchItemRating"><span class="fa fa-star checked"></span> ${element?.vote_average}</span>
                <span id="searchItemType"><span id="searchItemDate">${element?.release_date}</span> </span>
                <div id="overView">${element?.overview?.length > 470? element?.overview?.slice(0,470)+"...":element?.overview}</div>
                </div>
                </div>
                </a>`
                searchList.appendChild(li);
            
    
        })
    }, 500);
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

    var searchList = document.getElementById('searchList');
   
   for (let index = 0; index < 20; index++) {
    let li = document.createElement("li");

    li.innerHTML =  `<a href="" >
    <div class="movieItem" >
    <img id="searchItemImage" class="skeleton"  alt="">
    <div class="searchItemInfo">
    <span id="searchItemName" class="skeletonSearchText skeleton"></span>
    <span id="searchItemRating" class="skeletonSearchText skeleton"></span>
    <span id="searchItemType" class="skeletonSearchText skeleton"></span>
    <div id="overView" class="skeletonSearchText skeleton"></div>
    </div>
    </div>
    </a>`
    searchList.appendChild(li);
   }

    fetch(searchUrl)?.then((response)=> response.json())
    .then((data)=>{
 
       setTimeout(() => {
        searchList.innerHTML = ""
        data?.results?.map((element)=>{

            let poster = `https://image.tmdb.org/t/p/w500${element.poster_path}`
            if (element.poster_path === null) {
                poster = `./images/noImage.png`
            }
         
            var li = document.createElement('li');
            li.innerHTML = `<a href="tv.html?id=${element.id}" onclick={onClickItem(${element.id},"tv")}>
                <div class="movieItem" >
                <img id="searchItemImage" class="skeleton" src="${poster}" alt="">
                <div class="searchItemInfo">
                <span id="searchItemName">${element?.original_name}</span>
                <span id="searchItemRating"><span class="fa fa-star checked"></span> ${element?.vote_average}</span>
                <span id="searchItemType"><span id="searchItemDate">${element?.first_air_date}</span> </span>
                <div id="overView">${element?.overview.length > 470? element?.overview.slice(0,470)+"...":element?.overview}</div>
                </div>
                </div>
                </a>`
                searchList.appendChild(li);
    
        })
       }, 500);
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

    var searchList = document.getElementById('searchList');
   
   for (let index = 0; index < 20; index++) {
    let li = document.createElement("li");

    li.innerHTML =  `<a href="" >
    <div class="movieItem" >
    <img id="searchItemImage" class="skeleton"  alt="">
    <div class="searchItemInfo">
    <span id="searchItemType" class="skeletonPerson skeleton"></span>
    <span id="searchItemName" class="skeletonPerson skeleton"></span>
    <span id="searchItemRating" class="skeletonPerson skeleton"></span>
    <span id="searchItemRating" class="skeletonPerson skeleton"></span>
    </div>
    </div>
    </a>`
    searchList.appendChild(li);
   }

    fetch(searchUrl)?.then((response)=> response.json())
    .then((data)=>{

     setTimeout(() => {
        searchList.innerHTML = ""
        
            data?.results?.reverse().map((element)=>{
            
             let gender = ""
             if (element?.gender == "2"){ gender = "Male" }
    
             else if (element?.gender == "1"){ gender = "Female" }

             let profile = `https://image.tmdb.org/t/p/w500${element.profile_path}`
             if (element?.profile_path === null) {
                profile = `./images/noImage.png`
             }
    
             var li = document.createElement('li');
             li.innerHTML = `<a href="person.html?id=${element.id}" onclick={onClickPersonItem(${element.id})}>
                 <div class="movieItem" >
                 <img id="searchItemImag" class="skeleton" src="${profile}" alt="">
                 <div class="searchItemInfo">
                 <span id="searchItemName">${element?.original_name}</span>
                 <span id="searchItemType"><span id="searchItemDate">Popularity : ${element?.popularity}</span> </span>
                 <div id="overView">${gender}</div>
                 <span id="searchItemRating">Known For : ${element?.known_for_department}</span>
                 </div>
                 </div>
                 </a>`
                 searchList.appendChild(li);
     
         })
     }, 500);

    })
}


async function onclickCollections(){
    var searchText =  document.getElementById('searchText').value;
    document.getElementById('searchList').innerHTML = ""

    var searchList = document.getElementById('searchList');
   
    const searchUrl = `https://api.themoviedb.org/3/search/collection?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
    document.getElementById("movies").style.backgroundColor = "black";
    document.getElementById("tv").style.backgroundColor = "black"
    document.getElementById("person").style.backgroundColor = "black"
    document.getElementById("collection").style.backgroundColor = "rgb(26, 183, 216)"

    var searchList = document.getElementById('searchList');
   
   for (let index = 0; index < 20; index++) {
    let li = document.createElement("li");

    li.innerHTML =  `<a href="" >
    <div class="movieItem" >
    <img id="searchItemImage" class="skeleton"  alt="">
    <div class="searchItemInfo">
    <span id="searchItemType" class="skeletonCollection skeleton"></span>
    <span id="searchItemName" class="skeletonCollection skeleton"></span>
    <span id="searchItemRating" class="skeletonCollection skeleton"></span>
    </div>
    </div>
    </a>`
    searchList.appendChild(li);
   }

    fetch(searchUrl)?.then((response)=> response.json())
    .then((data)=>{
        
        setTimeout(() => {
            searchList.innerHTML = ""
        data?.results?.map((element)=>{
         var li = document.createElement('li');
         let poster = `https://image.tmdb.org/t/p/w500${element?.poster_path}`
         if (element.poster_path == null) {
            poster = `./images/noImage.png`
         }
    
            
             li.innerHTML = `<a href="collection.html?id=${element.id}" onclick={onClickCollectionItem(${element?.id})}>
             <div class="movieItem" >
             <img id="searchItemImage" class="skeleton" src="${poster}" alt="">
             <div class="searchItemInfo">
             <span id="searchItemName">${element?.original_name}</span>
             <span id="searchItemType"><span id="searchItemDate">Language : ${element?.original_language}</span> </span>
               <div id="overView">${element?.overview}</div>
               </div>
             </div>
             </a>`
             searchList.appendChild(li);
         
             
        })
        }, 500);
    })
}


async function setContentCount(searchText) {

const searchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
const searchTV = `https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
const searchPerson = `https://api.themoviedb.org/3/search/person?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
const searchCollection = `https://api.themoviedb.org/3/search/collection?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`

   fetch(searchMovie)?.then((response)=>response.json())
   .then((data)=>{
       document.getElementById("movieCount").innerHTML = data?.results?.length;
   })
   fetch(searchTV)?.then((response)=>response.json())
   .then((data)=>{
       document.getElementById("TVCount").innerHTML = data?.results?.length;
   })
   fetch(searchPerson)?.then((response)=>response.json())
   .then((data)=>{
       document.getElementById("personCount").innerHTML = data?.results?.length;
   })
   fetch(searchCollection)?.then((response)=>response.json())
   .then((data)=>{
       document.getElementById("collectionCount").innerHTML = data?.results?.length;
   })

    
}


function onClickCollectionItem(id){
        sessionStorage.setItem("collectionId",id);
        document.getElementById("searchText").value = ""
}
    
    
function onClickItem(id,type){
        console.log(id,type);
        clicked = true
        sessionStorage.setItem("id",id);
        sessionStorage.setItem("type",type);
        document.getElementById("searchText").value = ""

}
    
    
async function onClickPersonItem(id){
        sessionStorage.setItem("castId",id);
        document.getElementById("searchText").value = ""

}
    
    
async function hideSearchList() {
        // setTimeout(() => {
            
        //     if (clicked == false) {
        //         document.getElementById('modal').style.display = "none";
        //     }
        //     console.log("hide");
        // }, 300);
}