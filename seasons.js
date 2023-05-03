const key = '68aea65605cb563f92ea833b5dd6c75d';
const season_number = new URL(document.URL).searchParams.get("sno")
const id = new URL(document.URL).searchParams.get("id")
let bgColor ;
let containerColor;
let itemColor;



async function setParameters(id) {
    const getSeasonDetailsUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${key}&language=en-US`;
    fetch(getSeasonDetailsUrl)?.then((response) =>(response.json()))
    .then((data) =>{
        document.getElementById('title').innerHTML = data?.name;
        document.title = data?.name;

        document.getElementById('date').innerHTML = data?.air_date;
        
        document.getElementById('episodeCount').innerHTML = data?.episodes.length +" Episodes"

        // validate Data
        validate(data)
        
        // Media
        let poster =  `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        if (data.poster_path == null) {
            poster = `./images/noImage.png`
        }

        document.getElementById('posterImage').src = poster
    
        getTrailer(id);
       
        // OverView
        document.getElementById('overView').innerHTML = data?.overview;
    

        // Cast
        getCast(id);

        // Episodes
        getEpisodes(data);


        // Set Color
        getBGColor(`https://image.tmdb.org/t/p/w500${data?.poster_path}`)

    })
    
}


async function getCast(id) {
    const getCastUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/credits?api_key=${key}&language=en-US`
    fetch(getCastUrl)?.then((response)=>response.json())
    .then((data) =>{
        if (data?.cast?.length > 0) {
            
            data?.cast?.map(element =>{
                let list = document.getElementById('castList');
                var li = document.createElement('li');
    
                let poster = `https://image.tmdb.org/t/p/w500${element.profile_path}`
                if (element.profile_path === null) {
                    poster =  `./images/noImage.png`
                }
    
                li.innerHTML = ` <a href="person.html?id=${element.id}" class="castMain" onclick={onClickCast(${element.id})}>
                <div class="castImageCard"  >
                    <img class="castImage" src="${poster}" alt="${element?.original_name}">
                </div>
                <div class="castInfo">
                    <div class="castName">${element?.original_name}</div>
                    <div class="characterName">${element?.character}</div>
                </div>
            </a>`
            list.appendChild(li);
            })
        }
        else{
            document.getElementById("castDiv").style.display = "none"
        }
    })

}

async function getTrailer(id) {
    const getTrailerUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/videos?api_key=${key}`
    
    fetch(getTrailerUrl)?.then((response)=>response.json())
    .then((data)=>{
        for (let index = 0; index < data.results.length; index++) {
            
            if (data.results[index].type == "Official Trailer"){
                document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data?.results[index].key}`
                return
            }
            else if (data.results[index].type == "Trailer") {
                document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data?.results[index].key}`
                return
            }
            else if (data.results[index].type == "Series Trailer") {
                document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data?.results[index].key}`
                return
            }
            
            
            document.getElementById('itemTrailer').src = `https://www.youtube.com/embed/${data?.results[0].key}`
        }
    })
}


async function getEpisodes(data) {
   
    if (data?.episodes?.length > 0 ) {
        
        data.episodes.map(element =>{
            let list = document.getElementById('episodesList');
            var li = document.createElement('li');
    
            li.className = "episodeItem";
    
            let poster = `https://image.tmdb.org/t/p/w500${element?.still_path}`
                        if (element?.still_path === null) {
                            poster =  `./images/noEpisode.png`
                        }
    
            li.innerHTML = `<a href="episode.html?id=${id}&sno=${element?.season_number}&eno=${element?.episode_number}" class="anchor" onclick={onClickEpisode(${element.episode_number})}>
            <div class="episodeCard" >
        
                <div class="episodeImage">
                    <img id="episodePoster" src="${poster}" alt="">
                </div>
        
                    <div class="episodeInfo">
                                <div class="nameRating">
                                    <div id="episodeName">${element?.episode_number}. ${element?.name}</div>
                                    <span id="ratingSpan">
                                        <span class="fa fa-star checked"> </span>
                                        <span id="episodeRating"> ${element?.vote_average} (${element?.vote_count})</span>
                                    </span>
                                </div>
                                    <div class="dateDuration">
                                    <div id="episodeDuration">Duration : ${element?.runtime} min</div>
                                    <span id="episodeAirDate">Air Date: ${element?.air_date}</span> 
                                </div>
                            
                    </div>
            </div>
            </a>`
                        //  <div id="episodeOverview"><p>${element.overview}</p></div>
    
        list.appendChild(li);
        })
    }
    else{
        document.getElementById("episodes").style.display = "none"
    }

}

async function onClickEpisode(episode_number) {
    sessionStorage.setItem("episode_number",episode_number)
}

async function onClickCast(id) {
    sessionStorage.setItem("castId",id);  
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


async function setColors(hex) {

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

    else if(newShade(hex,0).toString().length === 7){
        bgColor = newShade(hex,0)
        containerColor = newShade(hex,20);
        itemColor = newShade(hex,40);
    }

    else{
        bgColor = newShade(hex,0)
        containerColor = newShade(hex,20);
        itemColor = newShade(hex,40);
    }

    
    
    document.body.style.backgroundColor = bgColor;

    
    document.getElementById("info").style.backgroundColor = itemColor;
    document.getElementById("episodes").style.backgroundColor = itemColor;
    document.getElementById("castDiv").style.backgroundColor = itemColor;

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
    if (data?.overview == "") {
        document.getElementById("info").style.display = "none"
    }
    if (data?.air_date == "") {
        document.getElementById("dateTime").style.display = "none";
    }
}


setParameters(id)