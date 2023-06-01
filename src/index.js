function init(){
    const URL="http://localhost:3000/games"
    fetch(URL)
    .then(response=>response.json())
    .then(games=>{
        games.forEach(game=>renderGame(game))
        displayGameDetails(games[0])
    })
    .catch(e=>alert(e.message))
    document.querySelector("#high-score-form").addEventListener("submit",updateHighScore)
    let selectedGame

    function renderGame(game){
        const gameList=document.querySelector(".game-list")
        const nameElement=document.createElement("h5")
        nameElement.textContent=game.name+" ("+game.manufacturer_name+")"
        gameList.append(nameElement)
        nameElement.addEventListener("click",()=>displayGameDetails(game))
    }

    function displayGameDetails(game){
        document.querySelector("#detail-image").src=game.image
        document.querySelector("#detail-title").textContent=game.name
        document.querySelector("#detail-high-score").textContent=game.high_score
        selectedGame=game
        console.log(selectedGame)
    }

    function updateHighScore(event){
        event.preventDefault()
        //using query selector method
        //const highScore=document.querySelector("#score-input").value
        //using event.target
        const high_score=parseInt(event.target["score-input"].value)
        const updatedScore={high_score}
        fetch(`${URL}/${selectedGame.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(updatedScore)
        })
        .then(response=>response.json())
        .then(updatedGame=>{
            selectedGame.high_score=updatedGame.high_score
            document.querySelector("#detail-high-score").textContent=selectedGame.high_score
            event.target.reset()
        })
        .catch(e=>alert(e.message))
    }
}

init()