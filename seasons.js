const key = '68aea65605cb563f92ea833b5dd6c75d';
const season_number = sessionStorage.getItem("season_number");
const id = sessionStorage.getItem("id");


async function setParameters(id) {
    const getSeasonDetailsUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${key}&language=en-US`;
    fetch(getSeasonDetailsUrl).then((response) =>(response.json()))
    .then((data) =>{
     
        document.getElementById('title').innerHTML = data.name;
        document.title = data.name;

        document.getElementById('date').innerHTML = data.air_date;
        
        document.getElementById('episodeCount').innerHTML = data.episodes.length +" Episodes"
        console.log(data);
        // Media
        document.getElementById('posterImage').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`
        document.getElementById('mainSeason').style.backgroundImage ="url('https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg')|no-repeat";
        getTrailer(id);
       
        // OverView
        document.getElementById('overView').innerHTML = data.overview;
    

        // Cast
        getCast(id);

        // Episodes
        getEpisodes(data);

        // Reviews
        // getReviews(id,type)

    })
    
}


async function itemInfo(id,season_number) {
    

    const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${key}&language=en-US`;
    console.log(id);
    fetch(url).then((response)=> response.json()).then((data) =>{
        
        document.getElementById('cardImage').src = `https://image.tmdb.org/t/p/w300/${data.poster_path}`;
        
            document.title = data.name;
            document.getElementById('itemName').innerHTML = data.name
            document.getElementById('itemDate').innerHTML = data.air_date;
    
    
            const imageUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/images?api_key=68aea65605cb563f92ea833b5dd6c75d`;
            
            fetch(imageUrl).then((response)=> response.json()).then((data) =>{
                setImages(data);
                console.log(data);
            })
        
        })
        
}
    
async function setImages(data) {


    // var random1 = Math.floor(Math.random()*data.backdrops.length);
    // var random2 = Math.floor(Math.random()*data.backdrops.length);
    // var random3 = Math.floor(Math.random()*data.backdrops.length);
    // var random4 = Math.floor(Math.random()*data.backdrops.length);
    // var random5 = Math.floor(Math.random()*data.backdrops.length);
    // var random6 = Math.floor(Math.random()*data.backdrops.length);
    // var random7 = Math.floor(Math.random()*data.backdrops.length);
    // var random8 = Math.floor(Math.random()*data.backdrops.length);
    // var random9 = Math.floor(Math.random()*data.backdrops.length);
    // var random10 = Math.floor(Math.random()*data.backdrops.length);

    


    document.getElementById("image1").src = `https://image.tmdb.org/t/p/original${data.posters[1].file_path}`;
    document.getElementById("image2").src = `https://image.tmdb.org/t/p/original${data.posters[2].file_path}`;
    document.getElementById("image3").src = `https://image.tmdb.org/t/p/original${data.posters[3].file_path}`;
    document.getElementById("image4").src = `https://image.tmdb.org/t/p/original${data.posters[4].file_path}`;
    document.getElementById("image5").src = `https://image.tmdb.org/t/p/original${data.posters[5].file_path}`;
    document.getElementById("image6").src = `https://image.tmdb.org/t/p/original${data.posters[6].file_path}`;
    document.getElementById("image7").src = `https://image.tmdb.org/t/p/original${data.posters[7].file_path}`;
    document.getElementById("image8").src = `https://image.tmdb.org/t/p/original${data.posters[8].file_path}`;
    document.getElementById("image9").src = `https://image.tmdb.org/t/p/original${data.posters[9].file_path}`;
    document.getElementById("image10").src = `https://image.tmdb.org/t/p/original${data.posters[10].file_path}`;

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

async function getCast(id) {
    const getCastUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/credits?api_key=${key}&language=en-US`
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

async function getTrailer(id) {
    const getTrailerUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/videos?api_key=${key}`
    
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

async function getEpisodes(data) {
   
    data.episodes.map(element =>{
        let list = document.getElementById('episodesList');
        var li = document.createElement('li');

        li.className = "episodeItem";

        li.innerHTML = `<a href="episode.html" class="anchor" onclick={onClickEpisode(${element.episode_number})}>
        <div class="episodeCard" >
    
            <div class="episodeImage">
                <img id="itemImage" src="https://image.tmdb.org/t/p/w500${element.still_path}" alt="">
            </div>
    
            <div class="episodeInfo">
                    <div class="nameTime">
                        <div id="episodeName">${element.episode_number}. ${element.name}</div>
                        <div id="episodeDuration">${element.runtime} min</div>
                    </div>
                    <div id="episodeMetrics">
                        <span>
                            <span class="fa fa-star checked"> </span>
                            <span id="episodeRating"> ${element.vote_average} (${element.vote_count})</span>
                        </span>
                        <span id="episodeAirDate">${element.air_date}</span> 
                     </div>

                    <div id="episodeOverview"><p>${element.overview}</p></div>
                   
                </div>
         </div>
    </a>`

    list.appendChild(li);
    })

}

async function onClickEpisode(episode_number) {
    sessionStorage.setItem("episode_number",episode_number)
}

async function onClickCast(id) {
    sessionStorage.setItem("castId",id);  
}


setParameters(id)