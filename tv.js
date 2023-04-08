const key = '68aea65605cb563f92ea833b5dd6c75d';
const id = sessionStorage.getItem("id");
const type = sessionStorage.getItem("type");

console.log(id);


async function setParameters(id,type) {
    const getTVDetailsUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&language=en-US`;
    fetch(getTVDetailsUrl).then((response) =>(response.json()))
    .then((data) =>{
        console.log(data);

        // Title Bar
        document.getElementById('title').innerHTML = data.original_name;
        document.title = data.original_name;

        document.getElementById('date').innerHTML = data.first_air_date;
        if (data.episode_run_time[0] == null) {
            document.getElementById('duration').innerHTML ="";

        }
        else{
        document.getElementById('duration').innerHTML = data.episode_run_time[0] +" min";
        }
      

        document.getElementById('itemRating').innerHTML = `</span>${data.vote_average} /10`;
        document.getElementById('votes').innerHTML = data.vote_count;
        document.getElementById('popularity').innerHTML = data.popularity;

        console.log(data);
        // Media
        document.getElementById('posterImage').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`
        document.getElementById('main').style.backgroundImage ="url('https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg')|no-repeat";
        getTrailer(id,type);


        // HomePage
        document.getElementById("homePage").setAttribute("href", data.homepage);

        // Status, Tagline ,Language,Country
        document.getElementById("status").innerHTML = data.status; 
        document.getElementById("tagline").innerHTML = data.tagline; 
        document.getElementById("origin_country").innerHTML = data.origin_country; 
        document.getElementById("original_language").innerHTML = data.spoken_languages[0].english_name;

        // Creator, type,networks
        // document.getElementById("networks").innerHTML = data.networks[0].name;
        setNetworks(data);
        document.getElementById("creator").innerHTML = data.created_by[0].name;
        document.getElementById("type").innerHTML = data.type;

        // Episodes ,Seasons
        document.getElementById("episodesNumber").innerHTML = data.number_of_episodes;
        document.getElementById("seasonsNumber").innerHTML = data.number_of_seasons;
       

        // Genres
        getGenres(data);

        // OverView
        document.getElementById('overView').innerHTML = data.overview;
        
        // WatchProviders
        getWatchProviders(id,type);

        // Cast
        getCast(id,type);

        // Production and languages
        getProduction(data);
        getLanguages(data);
        

        // Recommendations and SimilarContent
        getRecommendations(id,type);
        getSimilar(id,type);

        // Carousel
        itemInfo(id,type);

        // Seasons
        getSeasons(data);

        // Reviews
        getReviews(id,type)

        // setKeywords
        setKeywords(id)

    })
    
}


async function getTrailer(id,type) {
    const getTrailerUrl = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${key}&language=en-US`
    
    fetch(getTrailerUrl).then((response)=>response.json())
    .then((data)=>{
        for (let index = 0; index < data.results.length; index++) {
            
            if (data.results[index].type == "Official Trailer"){
                document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data.results[index].key}`
                return
            }
            else if (data.results[index].type == "Trailer") {
                document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data.results[index].key}`
                return
            }
            else if (data.results[index].type == "Series Trailer") {
                document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data.results[index].key}`
                return
            }
            
            
            document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data.results[0].key}`
        }
    })
}


async function getGenres(data) {
    
    data.genres.map(element=>{
        let list = document.getElementById('genresList');
        var li = document.createElement('li');
        li.innerHTML = element.name;

        list.appendChild(li);
    })
}


async function getWatchProviders(id,type) {
    const getWPUrl = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${key}&language=en-US`
}


async function getSeasons(data) {
   
        data.seasons.map(element =>{
            let list = document.getElementById('seasonsList');
            var li = document.createElement('li');

            li.className = "recommendationItem";

            li.innerHTML = `<a href="seasons.html" class="anchor" onclick={onClickSeason(${element.season_number})}>
            <div class="itemCard" >
        
                <div class="cardImage">
                    <img id="itemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
                </div>
        
                <div class="recommendationInfo">
                    <div id="itemName">${element.name}</div>
                    <div id="releaseDate">${element.air_date}</div>
                </div>
             </div>
        </a>`

        list.appendChild(li);
        })
    
}


async function getCast(id,type) {
    const getCastUrl = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${key}&language=en-US`
    fetch(getCastUrl).then((response)=>response.json())
    .then((data) =>{
        
        data.cast.map(element =>{
            let list = document.getElementById('castList');
            var li = document.createElement('li');
            li.innerHTML = ` <a href="person.html" class="castMain" onclick={onClickCast(${element.id})}>
            <div class="castImageCard"  >
                <img class="castImage" src="https://image.tmdb.org/t/p/w500${element.profile_path}" alt="${element.original_name}">
            </div>
            <div class="castInfo">
                <div class="castName">${element.original_name}</div>
                <div class="characterName">${element.character}</div>
            </div>
        </a>`
        list.appendChild(li);
        })
    })

}


async function setKeywords(id) {
    const keyWordsUrl = `https://api.themoviedb.org/3/tv/${id}/keywords?api_key=${key}`

    fetch(keyWordsUrl).then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        data.results?.map((element)=>{
            let keywordsList = document.getElementById("keywords");
            let keywordItem = document.createElement("div");

            keywordItem.className = "keywordItem"

            keywordItem.innerHTML = element.name;

            keywordsList.appendChild(keywordItem);
        })
    })
}


async function setNetworks(data) {
    data.networks?.map((element)=>{
        let networksList = document.getElementById("networks");
        let networkItem = document.createElement("div");

        networkItem.className = "networkItem";

        networkItem.innerHTML = `
        <img class="networkImage" src="https://image.tmdb.org/t/p/w500${element.logo_path}"/>
        `
        networksList.appendChild(networkItem)
    })
}


async function getProduction(data) {
    data.production_companies?.map( element =>{
       let list = document.getElementById('company');
       var productionItem = document.createElement('div');

       productionItem.className = "pcItem"

       productionItem.innerHTML = element.name

        list.appendChild(productionItem);
    })

    data.production_countries?.map( element =>{
       let list = document.getElementById('country');
       var productionItem = document.createElement('div');

       productionItem.className = "pcItem"

       productionItem.innerHTML = element.name

        list.appendChild(productionItem);
    })
    
}


async function getLanguages(data) {
    data.spoken_languages.map( element =>{
       let list = document.getElementById('languages');
       var li = document.createElement('li');
        li.className = "keywordItem"
       li.innerHTML = element.english_name;

       list.appendChild(li);
    })
    
}


async function getReviews(id,type) {
    const reviewsUrl = `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${key}`
    fetch(reviewsUrl).then((response  => response.json()))
    .then((data)=>{
        data.results.map((element)=>{
            var reviewsList = document.getElementById("reviewsList");
            var listItem = document.createElement("li");
            var reviewerImage = getReviewerImage(element);
            listItem.className = "reviewItem";

            listItem.innerHTML = `
            <div class="reviewCard">
                <div class="reviewerInfo">
                    <img id="reviewerImage" src="${reviewerImage}" alt="">
                    <span id="reviewerName">${element.author}</span>
                    <span id="reviewRating"> Rating : <span id="reviewRating" class="fa fa-star checked"> ${element.author_details?.rating}</span></span>
                </div>
                <div id="review">${element.content}</div>
            </div>
        `

        reviewsList.appendChild(listItem);
        })
    })

     function getReviewerImage(element) {
        if (element.author_details.avatar_path?.length > 40) {
            return element.author_details.avatar_path?.slice(1,)
        }
        else {
            var string = `https://image.tmdb.org/t/p/w500${element.author_details.avatar_path}`
            return string
        }
    }
    
}


async function getRecommendations(id,type) {
    const getRecommendationsUrl = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${key}&language=en-US`
    fetch(getRecommendationsUrl).then((response) => response.json())
    .then((data) =>{
        data.results.map(element =>{
            let list = document.getElementById('recommendationsList');
            var li = document.createElement('li');

            li.className = "recommendationItem";

            li.innerHTML = `<a href="tv.html" class="anchor" onclick={onClickItem(${element.id},"${type}")}>
            <div class="itemCard" >
        
                <div class="cardImage">
                    <img id="itemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
                </div>
        
                <div class="recommendationInfo">
                    <div id="rating"><span class="fa fa-star checked"></span> ${element.vote_average}</div>
                    <div id="itemName">${element.original_name}</div>
                    <div id="releaseDate">${element.first_air_date}</div>
                </div>
             </div>
        </a>`

        list.appendChild(li);
        })
    })
}


async function getSimilar(id,type) {
    const getRecommendationsUrl = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${key}&language=en-US`
    fetch(getRecommendationsUrl).then((response) => response.json())
    .then((data) =>{
        data.results.map(element =>{
          
            let list = document.getElementById('similarList');
            var li = document.createElement('li');

            li.className = "recommendationItem";

            li.innerHTML = `<a href="tv.html" class="anchor" onclick={onClickItem(${element.id},"${type}")}>
            <div class="itemCard" >
        
                <div class="cardImage">
                    <img id="itemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="">
                </div>
        
                <div class="recommendationInfo">
                    <div id="rating"><span class="fa fa-star checked"></span> ${element.vote_average}</div>
                    <div id="itemName">${element.original_name}</div>
                    <div id="releaseDate">${element.first_air_date}</div>
                </div>
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


async function onClickSeason(season_number) {
    sessionStorage.setItem("season_number",season_number);
}

async function onClickCast(id) {
    sessionStorage.setItem("castId",id);  
}


async function itemInfo(id,type) {
    

    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en-US`;
    console.log(id);
    fetch(url).then((response)=> response.json()).then((data) =>{
        
        document.getElementById('cardImage').src = `https://image.tmdb.org/t/p/w300/${data.poster_path}`;
        
            document.title = data.original_name;
            document.getElementById('itemName').innerHTML = data.original_name
            document.getElementById('itemDate').innerHTML = data.first_air_date;
    
    
            const imageUrl = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=68aea65605cb563f92ea833b5dd6c75d`;
            
            fetch(imageUrl).then((response)=> response.json()).then((data) =>{
                setImages(data);
            })
        
        })
        
}
    

async function setImages(data) {


    var random1 = Math.floor(Math.random()*data.backdrops.length);
    var random2 = Math.floor(Math.random()*data.backdrops.length);
    var random3 = Math.floor(Math.random()*data.backdrops.length);
    var random4 = Math.floor(Math.random()*data.backdrops.length);
    var random5 = Math.floor(Math.random()*data.backdrops.length);
    var random6 = Math.floor(Math.random()*data.backdrops.length);
    var random7 = Math.floor(Math.random()*data.backdrops.length);
    var random8 = Math.floor(Math.random()*data.backdrops.length);
    var random9 = Math.floor(Math.random()*data.backdrops.length);
    var random10 = Math.floor(Math.random()*data.backdrops.length);

    


    document.getElementById("image1").src = `https://image.tmdb.org/t/p/original${data.backdrops[1].file_path}`;
    document.getElementById("image2").src = `https://image.tmdb.org/t/p/original${data.backdrops[2].file_path}`;
    document.getElementById("image3").src = `https://image.tmdb.org/t/p/original${data.backdrops[3].file_path}`;
    document.getElementById("image4").src = `https://image.tmdb.org/t/p/original${data.backdrops[4].file_path}`;
    document.getElementById("image5").src = `https://image.tmdb.org/t/p/original${data.backdrops[5].file_path}`;
    document.getElementById("image6").src = `https://image.tmdb.org/t/p/original${data.backdrops[6].file_path}`;
    document.getElementById("image7").src = `https://image.tmdb.org/t/p/original${data.backdrops[7].file_path}`;
    document.getElementById("image8").src = `https://image.tmdb.org/t/p/original${data.backdrops[8].file_path}`;
    document.getElementById("image9").src = `https://image.tmdb.org/t/p/original${data.backdrops[9].file_path}`;
    document.getElementById("image10").src = `https://image.tmdb.org/t/p/original${data.backdrops[10].file_path}`;

    // document.getElementById("p1").innerHTML = data.items[random1].title
    // document.getElementById("p2").innerHTML = data.items[random2].title
    // document.getElementById("p3").innerHTML = data.items[random3].title
    // document.getElementById("p4").innerHTML = data.items[random4].title
    // document.getElementById("p5").innerHTML = data.items[random5].title
    // document.getElementById("p6").innerHTML = data.items[random6].title
    // document.getElementById("p7").innerHTML = data.items[random7].title
    // document.getElementById("p8").innerHTML = data.items[random8].title
    // document.getElementById("p9").innerHTML = data.items[random9].title
    // document.getElementById("p10").innerHTML = data.items[random10].title


}

setParameters(id,type)