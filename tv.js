const key = '68aea65605cb563f92ea833b5dd6c75d';
// const id = sessionStorage.getItem("id");
const id = new URL(document.URL).searchParams.get('id');
// const type = sessionStorage.getItem("type");
const type = "tv";
let bgColor ;
let containerColor;
let itemColor;



 function setParameters(id,type) {
    const getTVDetailsUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&language=en-US`;
    fetch(getTVDetailsUrl)?.then((response) =>(response.json()))
    .then((data) =>{


        // Colors
        getBGColor(`https://image.tmdb.org/t/p/w500${data?.poster_path}`);


        validate(data)

        // Title Bar
        document.getElementById('title').innerHTML = data?.original_name;
        document.title = data?.original_name;

        document.getElementById('date').innerHTML = data?.first_air_date;
        if (data?.episode_run_time?.length == 0) {
            document.getElementById('duration').innerHTML ="";

        }
        else{
        document.getElementById('duration').innerHTML = data?.episode_run_time[0] +" min";
        }
      

        document.getElementById('itemRating').innerHTML = `</span>${data?.vote_average} /10`;
        document.getElementById('votes').innerHTML = data?.vote_count;
        document.getElementById('popularity').innerHTML = data?.popularity;
        document.getElementById("rate").innerHTML = data?.vote_average+" /10  "+" |  "+data?.vote_count+" Votes";
        document.getElementById("itemPopularity").innerHTML = data?.popularity;

        // Media
        document.getElementById('posterImage').src = `https://image.tmdb.org/t/p/w500${data?.poster_path}`
        if (data?.poster_path == null) {
            document.getElementById('posterImage').src = `./images/noImage.png`
        }
        getTrailer(id,type);
        
        
        // HomePage
        document.getElementById("homePage").setAttribute("href", data?.homepage);


        // Status, Tagline ,Language,Country
        document.getElementById("status").innerHTML = data?.status; 
        document.getElementById("tagline").innerHTML = data?.tagline; 
        document.getElementById("origin_country").innerHTML = data?.origin_country; 
        document.getElementById("original_language").innerHTML = data?.original_language


        // Creator, type,networks
        // document.getElementById("networks").innerHTML = data.networks[0].name;
        setNetworks(data);
        document.getElementById("creator").innerHTML = data?.created_by[0]?.name;
        document.getElementById("type").innerHTML = data?.type;


        // Episodes ,Seasons
        document.getElementById("episodesNumber").innerHTML = data?.number_of_episodes;
        document.getElementById("seasonsNumber").innerHTML = data?.number_of_seasons;
    

        // OverView
        document.getElementById('overView').innerHTML = data?.overview;
    

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

            // setKeywords
         setKeywords(id)
        
         // Genres
         getGenres(data);
         
         // Reviews
         getReviews(id,type)
       
    })
    
}


async function getTrailer(id,type) {
    const getTrailerUrl = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${key}&language=en-US`
    
    fetch(getTrailerUrl)?.then((response)=>response.json())
    .then((data)=>{
        if (data?.results?.length == 0) {
            document.getElementById("mainTrailer").innerHTML = "No Trailers Found"
        }
        else{
            for (let index = 0; index < data.results.length; index++) {
            
                if (data?.results[index]?.type == "Official Trailer"){
                    document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data?.results[index]?.key}`
                    return
                }
                else if (data?.results[index]?.type == "Trailer") {
                    document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data?.results[index]?.key}`
                    return
                }
                else if (data?.results[index]?.type == "Series Trailer") {
                    document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data?.results[index]?.key}`
                    return
                }
                
                
                document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data?.results[0]?.key}`
            }
        }
       
    })
}


 async function getGenres(data) {
    
    data?.genres?.map(element=>{
        let list = document.getElementById('genresList');
        var li = document.createElement('li');
        li.innerHTML = element?.name;

        list.appendChild(li);
    })
}


async function getSeasons(data) {
   
        data?.seasons?.map(element =>{
            if (data?.seasons?.length == 0) {
                document.getElementById("seasons").style.display = "none"
            }
            let list = document.getElementById('seasonsList');
            var li = document.createElement('li');

            li.className = "recommendationItem";

            let poster = `https://image.tmdb.org/t/p/w500${element?.poster_path}`
            if (element?.poster_path === null) {
                poster =  `./images/noImage.png`
            }

            li.innerHTML = `<a href="seasons.html?id=${id}&sno=${element?.season_number}" class="anchor" onclick={onClickSeason(${element?.season_number})}>
            <div class="itemCard" >
        
                <div class="cardImage">
                    <img id="itemImage" src="${poster}" alt="">
                </div>
        
                <div class="recommendationInfo">
                    <div id="itemName">${element?.name}</div>
                    <div id="releaseDate">${element?.air_date}</div>
                </div>
             </div>
        </a>`

        list.appendChild(li);
        })
    
}


async function getCast(id,type) {
    const getCastUrl = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${key}&language=en-US`
    fetch(getCastUrl)?.then((response)=>response.json())
    .then((data) =>{
        if (data?.cast?.length == 0) {
            document.getElementById("castDiv").style.display = "none"
        }
        
        data?.cast?.map(element =>{
            let list = document.getElementById('castList');
            var li = document.createElement('li');
            let poster = `https://image.tmdb.org/t/p/w500${element.profile_path}`

            if (element?.profile_path === null) {
                poster =  `./images/noImage.png`
            }

            li.innerHTML = ` <a href="person.html?id=${element.id}" class="castMain" onclick={onClickCast(${element.id})}>
            <div class="castImageCard"  >
                <img class="castImage castImageSkeleton" src="${poster}" alt="${element?.original_name}">
            </div>
            <div class="castInfo">
                <div class="castName">${element?.original_name}</div>
                <div class="characterName">${element?.character}</div>
            </div>
        </a>`
        list.appendChild(li);
        })
    })

}


async function setKeywords(id) {
    const keyWordsUrl = `https://api.themoviedb.org/3/tv/${id}/keywords?api_key=${key}`

    fetch(keyWordsUrl)?.then((response)=>response.json())
    .then((data)=>{
        
        data?.results?.map((element)=>{
            let keywordsList = document.getElementById("keywords");
            let keywordItem = document.createElement("div");
            keywordItem.className = "keywordItem"

            keywordItem.innerHTML = element?.name;

            keywordsList.appendChild(keywordItem);
        })
    })
}


async function setNetworks(data) {
    data?.networks?.map((element)=>{
        let networksList = document.getElementById("networks");
        let networkItem = document.createElement("div");

        networkItem.className = "networkItem";

        networkItem.innerHTML = `
        <img class="networkImage" src="https://image.tmdb.org/t/p/w500${element?.logo_path}"/>
        `
        networksList.appendChild(networkItem)
    })
}


async function getProduction(data) {
    data?.production_companies?.map( element =>{
       let list = document.getElementById('company');
       var productionItem = document.createElement('div');

       productionItem.className = "pcItem"

       productionItem.innerHTML = element?.name

        list.appendChild(productionItem);
    })

    data?.production_countries?.map( element =>{
       let list = document.getElementById('country');
       var productionItem = document.createElement('div');

       productionItem.className = "pcItem"

       productionItem.innerHTML = element?.name

        list.appendChild(productionItem);
    })
    
}


async function getLanguages(data) {
    data?.spoken_languages?.map( element =>{
       let list = document.getElementById('languages');
       var li = document.createElement('li');
        li.className = "keywordItem"
    
       li.innerHTML = element?.english_name;

       list.appendChild(li);
    })
    
    
}


async function getReviews(id,type) {
    const reviewsUrl = `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${key}`
    fetch(reviewsUrl)?.then((response  => response.json()))
    .then((data)=>{
        console.log(data);
        if (data?.results?.length == 0) {
            document.getElementById("reviewDiv").style.display = "none"
        }
        data?.results?.map((element)=>{
            var reviewsList = document.getElementById("reviewsList");
            var listItem = document.createElement("li");
            var reviewerImage = getReviewerImage(element);
            listItem.className = "reviewItem";
            // listItem.style.backgroundColor = itemColor

            listItem.innerHTML = `
            <div class="reviewCard">
                <div class="reviewerInfo">
                    <img id="reviewerImage" src="${reviewerImage}" alt="">
                    <span id="reviewerName">${element?.author}</span>
                    <span id="reviewRating"> Rating : <span id="reviewRating" class="fa fa-star checked"> ${element?.author_details?.rating}</span></span>
                </div>
                <div id="review">${element?.content}</div>
            </div>
        `

        reviewsList.appendChild(listItem);
        
        })
    })

     function getReviewerImage(element) {
        if (element?.author_details.avatar_path?.length > 40) {
            return element?.author_details.avatar_path?.slice(1,)
        }
        else {
            var string = `https://image.tmdb.org/t/p/w500${element?.author_details.avatar_path}`
            return string
        }
    }
    
}


async function getRecommendations(id,type) {
    const getRecommendationsUrl = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${key}&language=en-US`
    fetch(getRecommendationsUrl).then((response) => response.json())
    .then((data) =>{
        if (data?.results?.length == 0) {
            document.getElementById("recommendations").style.display = "none"
        }
        data?.results?.map(element =>{
            let list = document.getElementById('recommendationsList');
            var li = document.createElement('li');

            let poster = `https://image.tmdb.org/t/p/w500${element?.poster_path}`
            if (element?.poster_path === null) {
                poster =  `./images/noImage.png`
            }

            li.className = "recommendationItem";

            li.innerHTML = `<a href="tv.html?id=${element.id}" class="anchor" onclick={onClickItem(${element.id},"${type}")}>
            <div class="itemCard" >
        
                <div class="cardImage">
                    <img id="itemImage" src="${poster}" alt="">
                </div>
        
                <div class="recommendationInfo">
                    <div id="rating"><span class="fa fa-star checked"></span> ${element?.vote_average}</div>
                    <div id="itemName1">${element?.original_name}</div>
                    <div id="releaseDate">${element?.first_air_date}</div>
                </div>
             </div>
        </a>`

        list.appendChild(li);
        })
    })
}


async function getSimilar(id,type) {
    const getRecommendationsUrl = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${key}&language=en-US`
    fetch(getRecommendationsUrl)?.then((response) => response.json())
    .then((data) =>{
        if (data?.results?.length == 0) {
            document.getElementById("similarDiv").style.display = "none"
        }
        data?.results?.map(element =>{
          
            let list = document.getElementById('similarList');
            var li = document.createElement('li');

            let poster = `https://image.tmdb.org/t/p/w500${element?.poster_path}`
            if (element?.poster_path === null) {
                poster =  `./images/noImage.png`
            }

            li.className = "recommendationItem";

            li.innerHTML = `<a href="tv.html?id=${element.id}" class="anchor" onclick={onClickItem(${element.id},"${type}")}>
            <div class="itemCard" >
        
                <div class="cardImage">
                    <img id="itemImage" src="${poster}" alt="">
                </div>
        
                <div class="recommendationInfo">
                    <div id="rating"><span class="fa fa-star checked"></span> ${element?.vote_average}</div>
                    <div id="itemName1">${element?.original_name}</div>
                    <div id="releaseDate">${element?.first_air_date}</div>
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


async function itemInfo(id ,type) {

    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en-US`;
    
    fetch(url)?.then((response)=> response.json()).then((data) =>{

        let poster =`https://image.tmdb.org/t/p/original/${data.poster_path}`;
        if (data.poster_path == null) {
            poster = `./images/noImage.png`
        }
        
        document.getElementById('cardImage').src = poster
        const backdropPath = `https://image.tmdb.org/t/p/original/${data.backdrop_path}`

        
       
       
            document.title = data.original_name;
            document.getElementById('itemName').innerHTML = data?.original_name
            document.getElementById('itemDate').innerHTML = data?.first_air_date;
    
    
            const imageUrl = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=68aea65605cb563f92ea833b5dd6c75d`;
            
            fetch(imageUrl)?.then((response)=> response.json()).then((data) =>{
                if (data?.backdrops?.length > 5) {
                    
                    setImages(data);
                }
                else{
                    document.getElementById("mainCarousel").innerHTML = ""
                    document.getElementById("mainCarousel").innerHTML = `
                    <div class="carousel-item active">
                            <img id="image1" src="${backdropPath}"  class="d-block w-100 imageSizing " alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <p id="p1"></p>
                            </div>
                    </div>
                    `
                }
                
            })
        
        })
        
}
    

function setImages(data) {

    const backdropPath = `https://image.tmdb.org/t/p/original/${data.backdrops[0].file_path}`

    document.getElementById("mainCarousel").innerHTML = `
    
                    <div class="carousel-item active data-bs-interval="4000">
                            <img id="image1" src="${backdropPath}"  class="d-block w-100 imageSizing " alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <p id="p1"></p>
                            </div>
                    </div>
                    `
        let carousel = document.getElementById("mainCarousel");
    for (let i = 1; i < Math.min(data?.backdrops?.length,); i++) {
        let path =`https://image.tmdb.org/t/p/original${data?.backdrops[i]?.file_path}`
        let carouselItem = document.createElement("div")

        carouselItem.className = "carousel-item"
        carouselItem.setAttribute("data-bs-interval","3000")
        carouselItem.innerHTML = `
       
                <img id="image" src="${path}"  class="d-block w-100 imageSizing " alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <p id="p1"></p>
                </div>
        
        `
        carousel.appendChild(carouselItem)
    }


}


const decimalToHex = (num) =>{
    let val = num.toString(16);
    if (val.length == 1) {
        val = "0" + val;
    }
    return val;
};


const getBGColor = (url) =>{
    return new Promise(function(resolve,reject) {
        const image = new Image();
        image.setAttribute("crossOrigin","")

        image.setAttribute("Access-Control-Allow-Origin","*");

        image.onerror = image.onabort = () =>{
            reject("error");
        };

        image.onload = () =>{
            const context = document.createElement("canvas").getContext("2d");
            context.imageSmoothingEnabled = true;
            context.drawImage(image,0,0,1,1);
            const value = context.getImageData(0,0,2,2).data.slice(0,3);
            
            const hex = `#${decimalToHex(value[0])}${decimalToHex(value[1])}${decimalToHex(value[2])}`;

            resolve(hex);

            setColors(hex);

        };

        image.src = url;
    });
};


 function setColors(hex) {
   

    if(newShade(hex,-150).toString().length === 7) {
        bgColor = newShade(hex,-150)
        containerColor = newShade(hex,-130);
        itemColor = newShade(hex,-110);
    }

    else if(newShade(hex,-140).toString().length === 7) {
        bgColor = newShade(hex,-140)
        containerColor = newShade(hex,-120);
        itemColor = newShade(hex,-100);
    }

    else if(newShade(hex,-130).toString().length === 7) {
        bgColor = newShade(hex,-130)
        containerColor = newShade(hex,-110);
        itemColor = newShade(hex,-90);
    }

    else if(newShade(hex,-120).toString().length === 7) {
        bgColor = newShade(hex,-120)
        containerColor = newShade(hex,-100);
        itemColor = newShade(hex,-80);
    }

    else if(newShade(hex,-110).toString().length === 7) {
        bgColor = newShade(hex,-110)
        containerColor = newShade(hex,-90);
        itemColor = newShade(hex,-70);
    }

    else if(newShade(hex,-100).toString().length === 7) {
        bgColor = newShade(hex,-100)
        containerColor = newShade(hex,-80);
        itemColor = newShade(hex,-60);
    }

    else if(newShade(hex,-90).toString().length === 7) {
        bgColor = newShade(hex,-90)
        containerColor = newShade(hex,-70);
        itemColor = newShade(hex,-50);
    }

    else if(newShade(hex,-80).toString().length === 7) {
        bgColor = newShade(hex,-80)
        containerColor = newShade(hex,-60);
        itemColor = newShade(hex,-40);
    }

    else if(newShade(hex,-70).toString().length === 7) {
        bgColor = newShade(hex,-70)
        containerColor = newShade(hex,-50);
        itemColor = newShade(hex,-30);
    }
    else if(newShade(hex,-60).toString().length === 7){
        bgColor = newShade(hex,-60)
        containerColor = newShade(hex,-40);
        itemColor = newShade(hex,-20);
    }
    else if(newShade(hex,-50).toString().length === 7){
        bgColor = newShade(hex,-50)
        containerColor = newShade(hex,-30);
        itemColor = newShade(hex,-10);
    }
    else if(newShade(hex,-40).toString().length === 7){
        bgColor = newShade(hex,-40)
        containerColor = newShade(hex,-20);
        itemColor = newShade(hex,0);
    }
    else if(newShade(hex,-30).toString().length === 7){
        bgColor = newShade(hex,-30)
        containerColor = newShade(hex,-10);
        itemColor = newShade(hex,10);
    }
    else if(newShade(hex,-20).toString().length === 7){
        bgColor = newShade(hex,-20)
        containerColor = newShade(hex,0);
        itemColor = newShade(hex,20);
    }
    else if(newShade(hex,-10).toString().length === 7){
        bgColor = newShade(hex,-10)
        containerColor = newShade(hex,10);
        itemColor = newShade(hex,30);
    }

    else{
        bgColor = newShade(hex,0)
        containerColor = newShade(hex,20);
        itemColor = newShade(hex,40);
    }

    
    
    document.body.style.backgroundColor = bgColor;
    document.getElementById("homePageButton").style.backgroundColor = bgColor;
    
    document.getElementById("info").style.backgroundColor = containerColor;
    document.getElementById("seasons").style.backgroundColor = containerColor;
    document.getElementById("recommendations").style.backgroundColor = containerColor;
    document.getElementById("similarDiv").style.backgroundColor = containerColor;
    document.getElementById("castDiv").style.backgroundColor = containerColor;
    document.getElementById("reviewDiv").style.backgroundColor = containerColor;
    document.getElementById("rightCol").style.backgroundColor = containerColor;
    document.getElementById("homePageButton").style.border = `2px solid ${hex}`;


    let scrollHover = newShade(itemColor,20)

    document.querySelector(":root").style.setProperty('--scrollTrack',bgColor)
    document.querySelector(":root").style.setProperty('--scrollThumb',itemColor)
    document.querySelector(":root").style.setProperty('--scrollHover',scrollHover)
    document.querySelector(":root").style.setProperty('--item',itemColor)
    
    
}


const newShade = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};


function validate(data) {
    if (data?.vote_count == "") {
        document.getElementById("ratingBar").style.display = "none";
    }
    if (data?.popularity == "") {
        document.getElementById("popularityBar").style.display = "none";
    }
    if (data.release_date == "") {
        document.getElementById("dateTime").style.display = "none";
    }
    if (data?.episode_run_time?.length == 0 ) {
        document.getElementById("duration").style.display = "none";
    }
    if (data?.genres?.length == 0) {
        document.getElementById("genresList").style.display = "none";
    }
    if (data?.overview == "") {
        document.getElementById("metaData").style.display = "none";
    }
    if (data?.seasons?.length == 0) {
        document.getElementById("seasons").style.display = "none";
    }
    if (data?.homepage == "") {
        document.getElementById("homePageButton").style.display = "none";
    }
    if (data?.tagline == "") {
        document.getElementById("tagline").style.display = "none";
        document.getElementById("taglineHeading").style.display = "none";
    }
    if (data?.vote_average == "") {
        document.getElementById("rate").style.display = "none";
        document.getElementById("ratingHeading").style.display = "none";
    }
    if (data?.popularity == "") {
        document.getElementById("itemPopularity").style.display = "none";
        document.getElementById("popularityHeading").style.display = "none";
    }
    if (data?.status == "") {
        document.getElementById("status").style.display = "none";
        document.getElementById("statusHeading").style.display = "none";
    }
    if (data?.original_language == "") {
        document.getElementById("original_language").style.display = "none";
        document.getElementById("languageHeading").style.display = "none";
    }
    if (data?.type == "0") {
        document.getElementById("type").style.display = "none";
        document.getElementById("typeHeading").style.display = "none";
    }
    if (data?.number_of_episodes?.length == "0") {
        document.getElementById("episodesNumber").style.display = "none";
        document.getElementById("episodesNumberHeading").style.display = "none";
    }
    if (data?.keywords?.length == 0) {
        document.getElementById("keywords").style.display = "none";
        document.getElementById("keywordHeading").style.display = "none";
    }
    if (data?.spoken_languages?.length == 0) {
        document.getElementById("languages").style.display = "none";
        document.getElementById("languageTitle").style.display = "none";
    }
    if (data?.origin_country == "") {
        document.getElementById("origin_country").style.display = "none";
        document.getElementById("countryHeading").style.display = "none";
    }
    if (data?.production_companies == null) {
        document.getElementById("company").style.display = "none";
        document.getElementById("company").style.display = "none";
    }
    if (data?.production_countries == null) {
        document.getElementById("country").style.display = "none";
        document.getElementById("country").style.display = "none";
    }
    if (data?.created_by?.length == 0) {
        document.getElementById("creator").style.display = "none";
        document.getElementById("creatorHeading").style.display = "none";
    }
  
}

setParameters(id,type)