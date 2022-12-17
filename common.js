$(".sns").on("click", (e)=>{
    switch(e.target.id){
        case "github" : open("https://github.com/Jangcccci"); break;
        case "instagram" : open("https://www.instagram.com/jangcccci/"); break;
        case "tistory" : open("https://jangcccci.tistory.com"); break;
    }
})

$(".snsImg").on("click", (e)=>{
    switch(e.target.id){
        case "github" : open("https://github.com/Jangcccci"); break;
        case "instagram" : open("https://www.instagram.com/jangcccci/"); break;
        case "tistory" : open("https://jangcccci.tistory.com"); break;
    }
})

$(".navi").on("click", (e)=>{
    const target = e.target;
    switch(target.id){
        case "aboutMe" : 
        open("index.html", "_self"); 
        break;
        case "interests" :
        open("interests.html", "_self"); 
        break;
        case "projects" : 
        open("projects.html", "_self");
        break;
        case "login" :
        open("login.html", "_self")    
        break;
    }
})
