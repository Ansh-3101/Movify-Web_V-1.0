const collectionId = sessionStorage.getItem('collectionId');
// console.log(collectionId);
const key = '68aea65605cb563f92ea833b5dd6c75d';


setCarousel(collectionId);
setCollection(collectionId)


async function setCollection(collectionId) {
    const collectionUrl = `https://api.themoviedb.org/3/collection/${collectionId}?api_key=68aea65605cb563f92ea833b5dd6c75d`
    
    fetch(collectionUrl).then((response)=>response.json())
    .then((data)=>{
        // console.log(data);
        document.getElementById('cardImage').src = `https://image.tmdb.org/t/p/original${data.poster_path}`
        document.getElementById('itemName').innerHTML = data.name;
        document.getElementById('title').innerHTML = data.name;
        document.getElementById('overView').innerHTML = data.overview;
        document.getElementById('moviesCount').innerHTML = `Number of Movies: ${data.parts.length}`
        document.getElementById('movieCount').innerHTML = `${data.parts.length} Movies`
        document.title = data.name
        
        //Set Genres and Revenue
        getGenres(data)
        getRevenue(data)

        // Set Featured Cast
        getCast(data)

        // Get collection Movies
        getMovies(data)

    })
}

async function getGenres(collectionData) {
    const getMovieDetailsUrl = `https://api.themoviedb.org/3/movie/${collectionData.parts[0].id}?api_key=${key}&language=en-US`;
    fetch(getMovieDetailsUrl).then((response)=> response.json())
    .then((data)=>{
        data.genres.map(element=>{
                let list = document.getElementById('genresList');
                var li = document.createElement('li');
                li.innerHTML = element.name;
            
                list.appendChild(li);
            })
        })
}

async function getMovies(data) {
    data.parts.map((element)=>{
        let moviesList = document.getElementById("moviesList");
        let movieItem = document.createElement("div");

        movieItem.className = "movieItem";

        movieItem.innerHTML =`
        <div id="movieImage">
        <a href="movie.html" class="anchor" onclick={onClickItem(${element.id},"${element.media_type}")}>
        <img src="https://image.tmdb.org/t/p/original${element.poster_path}" alt="">
        </a>
        </div>
        <div class="movieInfo">
            <a href="movie.html" class="anchor" onclick={onClickItem(${element.id},"${element.media_type}")}>
                 <div id="movieName">${element.original_title}</div>
            </a> 
            <div id="movieDate">${element.release_date}</div>
            <div id="overview">${element.overview.length > 470? element.overview.slice(0,470)+"...":element.overview}</div>
        </div>
        `

        moviesList.appendChild(movieItem);
    })
    
}

async function setCarousel(collectionId){
    const carouselImagesUrl = `https://api.themoviedb.org/3/collection/${collectionId}/images?api_key=68aea65605cb563f92ea833b5dd6c75d`

    fetch(carouselImagesUrl).then((response) => (response.json()))
    .then((data)=>{

        document.getElementById("image1").src = `https://image.tmdb.org/t/p/original${data.backdrops[0].file_path}`
        data.backdrops.map((element)=>{
            let  carouselDiv = document.getElementById('carouselDiv');
            let itemDiv = document.createElement('div');

            itemDiv.className = "carousel-item"
            itemDiv.setAttribute('data-bs-interval',"3000")

            itemDiv.innerHTML = `
            <img id="image2" src="https://image.tmdb.org/t/p/original${element.file_path}" class="d-block w-100 imageSizing" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <p id="p2"></p>
                        </div>
          `

          carouselDiv.appendChild(itemDiv);

        })
    })
}

async function getRevenue(data) {
    let revenue = 0 ;
    let budget = 0 ;
    // console.log(data);
    data.parts.map((element)=>{
        let getMovieDetailsUrl = `https://api.themoviedb.org/3/movie/${element.id}?api_key=${key}&language=en-US`;
        fetch(getMovieDetailsUrl).then((response)=>response.json())
        .then((movieData)=>{
            revenue = movieData.revenue + revenue;
            budget = movieData.budget + revenue;
            document.getElementById("revenue").innerHTML = `Revenue : $${revenue}`
            document.getElementById("budget").innerHTML = `Budget : $${budget}`
        })

    })

}

async function getCast(data) {
    console.log(data);
    var index = data.parts.length-1;
    const castUrl = `https://api.themoviedb.org/3/movie/${data.parts[index].id}/credits?api_key=68aea65605cb563f92ea833b5dd6c75d`;

    fetch(castUrl).then((response)=>response.json())
        .then((data) =>{
            console.log(data);
            data.cast.map((element)=>{
                let list = document.getElementById('castList');
                var li = document.createElement('li');
                li.innerHTML = ` <a href="person.html" class="castMain" onclick={onClickCast("${element.id}")} >
                <div class="castImageCard"  >
                    <img class="castImage" src="https://image.tmdb.org/t/p/w300${element.profile_path}" alt="${element.original_name}">
                </div>
                <div class="castInfo">
                    <div class="castName">${element.original_name.length>>17? element.original_name.slice(0,1)+"...":element.original_name}</div>
                 <div class="characterName">${element.character.length>>17? element.character.slice(0,1)+"...":element.character}</div>
                    
                </div>
            </a>`
            list.appendChild(li);

        })
            
        })
}

async function onClickItem(id,type) {
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("type",type);    
}

async function onClickCast(id) {
    sessionStorage.setItem("castId",id);  
}



