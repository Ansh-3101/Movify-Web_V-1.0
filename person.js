const key = '68aea65605cb563f92ea833b5dd6c75d';
// const castId = sessionStorage.getItem("castId");
const castId = new URL(document.URL).searchParams.get('id');

getCastInfo(castId);

getCredits(castId)

getImages(castId);


async function getCastInfo(castId) {
    const castInfoUrl = `https://api.themoviedb.org/3/person/${castId}?api_key=${key}`
    fetch(castInfoUrl)?.then((response)=>response.json())
    .then((data)=>{


        validate(data)
        
        document.title = data?.name
        
        let profile = `https://image.tmdb.org/t/p/original${data?.profile_path}`;
        if (data?.profile_path == null) {
            profile = `./images/noImage.png`
        }
        document.getElementById("personImage").src = profile
        document.getElementById("castName").innerHTML = data?.name;
        document.getElementById("castName1").innerHTML = data?.name;
        document.getElementById("biography").innerHTML = data?.biography;
        document.getElementById("knownFor").innerHTML = data?.known_for_department

        if (data.gender == 1) {
            document.getElementById("gender").innerHTML = "Female"
        }
        else if (data.gender == 2) {
            document.getElementById("gender").innerHTML = "Male"
        }

        // setBirthday
        document.getElementById("birthday").innerHTML = data?.birthday;

        // Set birthPlace
        document.getElementById("birthPlace").innerHTML = data?.place_of_birth;

        // Popularity
        document.getElementById("popularity").innerHTML = data?.popularity

        // Set other names list
        setOtherNames(data);

        // set Color
        getBGColor(`https://image.tmdb.org/t/p/original${data.profile_path}`);
    })
}


async function getCredits(castId) { 
    getCreditsUrl = `https://api.themoviedb.org/3/person/${castId}/combined_credits?api_key=${key}`
    fetch(getCreditsUrl).then((response)=>response.json())
    .then((data)=>{
        if (data?.cast?.length > 0) {
            
            document.getElementById("creditsCount").innerHTML = data.cast.length
           
    
            data.cast.map((element)=>{
                let filmograpyhList = document.getElementById("creditList")
                let filmographyItem = document.createElement("div");
                filmographyItem.className = "recommendationItem"
    
                let poster = `https://image.tmdb.org/t/p/w500${element.poster_path}`
                    if (element.poster_path === null) {
                        poster =  `./images/noImage.png`
                    }
    
                let name;
                if (element.media_type == "movie") {
                    name = element.original_title
                    filmographyItem.innerHTML = `
                    <a href="movie.html?id=${element.id}" class="anchor" onclick={onClickItem(${element.id},"${element.media_type}")}>
                        <div class="itemCard" >
                    
                            <div class="cardImage itemSkeleton">
                                <img id="itemImage" src="${poster}" alt="./images/noImage.png">
                            </div>
                    
                            <div class="recommendationInfo">
                                <div id="rating"><span class="fa fa-star checked"></span> ${element.vote_average}</div>
                                <div id="creditItemName">${name.length > 20 ? name.slice(0,20)+".." : name}</div>
                                <div id="releaseDate">${element.release_date}</div>
                                <div id="type">Content : ${element.media_type.toUpperCase()}</div>
                            </div>
                        </div>
                     </a>`
        
                     filmograpyhList.appendChild(filmographyItem);
                }
                else{
                    name = element.original_name
                    filmographyItem.innerHTML = `
                    <a href="tv.html?id=${element.id}" class="anchor" onclick={onClickItem(${element.id},"${element.media_type}")}>
                        <div class="itemCard" >
                    
                            <div class="cardImage">
                                <img id="itemImage" src="${poster}" alt="./images/noImage.png">
                            </div>
                    
                            <div class="recommendationInfo">
                                <div id="rating"><span class="fa fa-star checked"></span> ${element.vote_average}</div>
                                <div id="creditItemName">${name.length > 20 ? name.slice(0,20)+".." : name}</div>
                                <div id="releaseDate">${element.first_air_date}</div>
                                <div id="type">Content : ${element.media_type.toUpperCase()}</div>
                            </div>
                        </div>
                     </a>`
        
                     filmograpyhList.appendChild(filmographyItem);
                }
               
            })
        }
        else{
            document.getElementById("filmography").style.display = "none"
            document.getElementById("creditsCount").style.display = "none"
            document.getElementById("creditsCountHeading").style.display = "none"

        }
    })
}


async function setOtherNames(data) {
    data?.also_known_as?.map((element)=>{
        let namesList = document.getElementById("otherNamesList");
        let nameItem = document.createElement("div");
        nameItem.className = "personInfo";

        nameItem.innerHTML = element;

        namesList.appendChild(nameItem)
    })
}


async function onClickItem(id,type) {
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("type",type);    
}


async  function getImages(castId) {
    const castImagesUrl = `https://api.themoviedb.org/3/person/${castId}/images?api_key=${key}`
    fetch(castImagesUrl).then((response)=>response.json())
    .then((data)=>{

        if (data?.profiles?.length > 0) {
            
            data.profiles.map((element)=>{
                let photosList = document.getElementById("photoList");
                let photoItem = document.createElement("div");
    
                let poster = `https://image.tmdb.org/t/p/w500${element.file_path}`
                    if (element.file_path === null) {
                        poster =  `./images/noImage.png`
                    }
    
                photoItem.innerHTML = ` 
                    <img id="castProfile" src="${poster}" alt="./images/noImage.png">
                
            `
    
            photosList.appendChild(photoItem)
            })
        }
        else{
            document.getElementById("photoList").style.display = "none"
            document.getElementById("photosHeading").style.display = "none"
        }
    })

    
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
    
    document.body.style.backgroundColor = bgColor;

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
    if (data?.biography == "") {
        document.getElementById("biography").style.display = "none"
        document.getElementById("biographyHeading").style.display = "none"
    } 

    if (data?.known_for_department == "") {
        document.getElementById("knownFor").style.display = "none"
        document.getElementById("knownForHeading").style.display = "none"
    } 

    if (data?.popularity == "") {
        document.getElementById("popularity").style.display = "none"
        document.getElementById("popularityHeading").style.display = "none"
    } 

    if (data?.birthday == null) {
        document.getElementById("birthday").style.display = "none"
        document.getElementById("birthdayHeading").style.display = "none"
    } 

    if (data?.place_of_birth == null) {
        document.getElementById("birthPlace").style.display = "none"
        document.getElementById("birthPlaceHeading").style.display = "none"
    } 

    if (data?.also_known_as.length == 0) {
        document.getElementById("otherNamesList").style.display = "none"
        document.getElementById("otherNamesListHeading").style.display = "none"
    } 

    if (data?.gender == 0) {
        document.getElementById("gender").style.display = "none"
        document.getElementById("genderHeading").style.display = "none"
    }



    
}


