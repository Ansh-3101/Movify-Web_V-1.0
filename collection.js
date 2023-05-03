// const collectionId = sessionStorage.getItem('collectionId');
const collectionId = new URL(document.URL).searchParams.get("id")
// console.log(collectionId);
const key = '68aea65605cb563f92ea833b5dd6c75d';


setCollection(collectionId)


async function setCollection(collectionId) {
    const collectionUrl = `https://api.themoviedb.org/3/collection/${collectionId}?api_key=68aea65605cb563f92ea833b5dd6c75d`
    
    fetch(collectionUrl)?.then((response)=>response.json())
    .then((data)=>{

        // validate(data)
        console.log(data);
        let poster = `https://image.tmdb.org/t/p/original${data?.poster_path}`
        if (data?.poster_path == null) {
            poster = `./images/noImage.png`
        }
        document.getElementById('cardImage').src = poster;
        document.getElementById('itemName').innerHTML = data?.name;
        document.getElementById('title').innerHTML = data?.name;
        document.getElementById('overView').innerHTML = data?.overview;
        document.getElementById('moviesCount').innerHTML = `Number of Movies: ${data?.parts?.length}`
        document.getElementById('movieCount').innerHTML = `${data?.parts?.length} Movies`
        document.title = data.name
        
        //Set Genres and Revenue
        getGenres(data)
        getRevenue(data)

        // Set Featured Cast
        getCast(data)
        
        // Get collection Movies
        getMovies(data)


        // Carousel
        setCarousel(collectionId,data?.backdrop_path);

        // Set Colors
        getBGColor(`https://image.tmdb.org/t/p/original${data?.poster_path}`)

    })
}


async function getGenres(collectionData) {
    const getMovieDetailsUrl = `https://api.themoviedb.org/3/movie/${collectionData.parts[0].id}?api_key=${key}&language=en-US`;
    fetch(getMovieDetailsUrl)?.then((response)=> response.json())
    .then((data)=>{
        if (data?.genres?.length >= 1) {
           
            data?.genres?.map(element=>{
                let list = document.getElementById('genresList');
                var li = document.createElement('li');
                li.innerHTML = element.name;
                
                list.appendChild(li);
            })
        }
        else{
            document.getElementById("genresList").style.display = "none"
        }
        })
}


async function getMovies(data) {

    if (data?.parts?.length >= 1) {
        
        data?.parts?.map((element)=>{
            let moviesList = document.getElementById("moviesList");
            let movieItem = document.createElement("div");
            
            movieItem.className = "movieItem";
            
        let poster = `https://image.tmdb.org/t/p/w500${element.poster_path}`
            if (element?.poster_path === null) {
                poster =  `./images/noImage.png`
            }
            
            movieItem.innerHTML =`
            <div id="movieImage">
            <a href="movie.html?id=${element?.id}" class="anchor" onclick={onClickItem(${element.id},"${element?.media_type}")}>
            <img src="${poster}" alt="">
            </a>
            </div>
        <div class="movieInfo">
            <a href="movie.html?id=${element.id}" class="anchor" onclick={onClickItem(${element.id},"${element?.media_type}")}>
                 <div id="movieName">${element?.original_title}</div>
            </a> 
            <div id="movieDate">${element?.release_date}</div>
            <div id="overview">${element?.overview?.length > 470? element?.overview?.slice(0,470)+"...":element?.overview}</div>
        </div>
        `

        moviesList.appendChild(movieItem);
    })
    }
    else{
        document.getElementById("moviesCount").style.display = "none"
        document.getElementById("moviesList").style.display = "none"
    }
    
}


async function setCarousel(collectionId ,path){
    const carouselImagesUrl = `https://api.themoviedb.org/3/collection/${collectionId}/images?api_key=68aea65605cb563f92ea833b5dd6c75d`

    fetch(carouselImagesUrl)?.then((response) => (response.json()))
    .then((data)=>{
        
        if (data?.backdrops?.length == 0) {
            document.getElementById("image1").className = "carousel-item"
            document.getElementById("image1").src = `https://image.tmdb.org/t/p/original${path}`
            
        }
        else{
            document.getElementById("image1").src = `https://image.tmdb.org/t/p/original${data?.backdrops[0]?.file_path}`
        for (let i = 1; i < Math.min(data?.backdrops?.length,20); i++) {

            let  carouselDiv = document.getElementById('carouselDiv');
            let itemDiv = document.createElement('div');

            itemDiv.className = "carousel-item"
            itemDiv.setAttribute('data-bs-interval',"3000")

            itemDiv.innerHTML = `
            <img id="image2" src="https://image.tmdb.org/t/p/original${data?.backdrops[i]?.file_path}" class="d-block w-100 imageSizing" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <p id="p2"></p>
                        </div>
          `

          carouselDiv.appendChild(itemDiv);

        }
    }
    })
}


async function getRevenue(data) {
    let revenue = 0 ;
    let budget = 0 ;
    if (data?.parts?.length >= 1) {
        
    
    data?.parts?.map((element)=>{
        let getMovieDetailsUrl = `https://api.themoviedb.org/3/movie/${element.id}?api_key=${key}&language=en-US`;
        fetch(getMovieDetailsUrl)?.then((response)=>response.json())
        .then((movieData)=>{
            revenue = movieData?.revenue + revenue;
            budget = movieData?.budget + revenue;
            document.getElementById("revenue").innerHTML = `Revenue : $${revenue}`
            document.getElementById("budget").innerHTML = `Budget : $${budget}`
        })

    })
    }   
    else{
        document.getElementById("revenue").style.display = "none"
        document.getElementById("budget").style.display = "none"
    }

}


async function getCast(data) {
    var index = data.parts.length-1;
    const castUrl = `https://api.themoviedb.org/3/movie/${data.parts[index].id}/credits?api_key=68aea65605cb563f92ea833b5dd6c75d`;

    fetch(castUrl)?.then((response)=>response.json())
        .then((data) =>{
           
            if (data?.cast?.length >= 1) {
                
            
            data?.cast?.map((element)=>{
                let list = document.getElementById('castList');
                var li = document.createElement('li');

                let poster = `https://image.tmdb.org/t/p/w500${element.profile_path}`
                    if (element?.profile_path === null) {
                        poster =  `./images/noImage.png`
                    }

                li.innerHTML = ` <a href="person.html?id=${element?.id}" class="castMain" onclick={onClickCast("${element.id}")} >
                <div class="castImageCard"  >
                    <img class="castImage" src="${poster}" alt="${element?.original_name}">
                </div>
                <div class="castInfo">
                    <div class="castName">${element?.original_name?.length>>17? element?.original_name?.slice(0,1)+"...":element?.original_name}</div>
                 <div class="characterName">${element?.character?.length>>17? element?.character?.slice(0,1)+"...":element?.character}</div>
                    
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


async function onClickItem(id,type) {
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("type",type);    
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
    let bgColor ;
    let containerColor;
    let itemColor;

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
   
    
    document.body.style.backgroundColor = bgColor?.toString();

    document.getElementById("info").style.backgroundColor = containerColor;
    document.getElementById("castDiv").style.backgroundColor = containerColor;
    document.getElementById("overviewBar").style.backgroundColor = containerColor;

    let scrollHover = newShade(itemColor,20)

    document.querySelector(":root").style.setProperty('--scrollTrack',bgColor)
    document.querySelector(":root").style.setProperty('--scrollThumb',itemColor)
    document.querySelector(":root").style.setProperty('--scrollHover',scrollHover)
    document.querySelector(":root").style.setProperty('--item',containerColor)
    
    
}


const newShade = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor?.length === 6) {
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



