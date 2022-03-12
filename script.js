const searchBar = document.getElementById("search");
const searchCount = document.getElementById("search-count");
const dropDown = document.getElementById("dropdown-list");
const showSelector = document.getElementById("show-selector");

function setup() {
  const allShows = getAllShows();
  selectMenuForShows(allShows);

  searchBar.addEventListener("input", onSearchKeyUp);
  showSelector.addEventListener("change", dropDownShow);
  dropDown.addEventListener("click", dropDownEpisode);
  dropDown.addEventListener("change", episodePage);
}

function onSearchKeyUp(event){
  const searchValue = event.target.value.toLowerCase();
  
  const filteredEpisodes = 
  currentEpisodes.filter((e) => {
    return e.name.toLowerCase().includes(searchValue);
  }); 
  const filteredCount = filteredEpisodes.length;
  const allCount = currentEpisodes.length;
  const countString = `Displaying ${filteredCount} out of ${allCount}`;
  searchCount.innerText = countString;
  makePageForEpisodes(filteredEpisodes);
} 

function dropDownShow (event){
  const showId = event.target.value;
  sendRequest(showId).then((data) => {
    currentEpisodes = data;
    makePageForEpisodes(currentEpisodes);
    dropDownEpisode();
  });
}

function dropDownEpisode (){
  dropDown.innerHTML = "";
    currentEpisodes.forEach((episode) => {
      let optionEl = document.createElement("option");

      optionEl.innerHTML = `S${episode.season
      .toString()
      .padStart(2, '0')
    }E${episode.number
      .toString()
      .padStart(2, '0')} - ${episode.name}`;
      optionEl.value = episode.id;

      dropDown.appendChild(optionEl);
    }); 
}

function episodePage (event){
  let episodeId = event.target.value;
  episodeId = currentEpisodes.filter(e => {
    return e.id == episodeId;
  })
  
  makePageForEpisodes(episodeId);
}

function selectMenuForShows(showNumber){
  showNumber.sort((showA, showB) => {
    const { name: nameA } = showA;
    const { name: nameB } = showB;
    
    if (nameA.toLowerCase() < nameB.toLowerCase()){
      return -1;
    } else if (nameA.toLowerCase() > nameB.toLowerCase()){
      return 1;
    } else {
      return 0;
    }
  })
  console.log(showNumber);
  
  showNumber.forEach((show) => {
    const listOption = document.createElement("option")
    listOption.innerText = show.name;
    listOption.value = show.id;
    showSelector.appendChild(listOption);
  });
}

function makePageForEpisodes(episodeList) {

  let listOfEpisodesContainer = document.getElementById('list-of-episodes');
  listOfEpisodesContainer.innerHTML = "";

  episodeList.forEach((episode) => {
    let divContainer = document.createElement('div');
    let h3Element = document.createElement('h3');
    let episodeImage = document.createElement('img');
    let textParagraph = document.createElement('p');

      h3Element.textContent = `${episode.name} - S${episode.season
      .toString()
      .padStart(2, '0')
    }E${episode.number
      .toString()
      .padStart(2, '0')}`;
    episodeImage.src = episode.image.medium;
    textParagraph.innerHTML = `${episode.summary}`

    divContainer.className = 'divContainer';

    divContainer.appendChild(h3Element);
    divContainer.appendChild(episodeImage);
    divContainer.appendChild(textParagraph);
    listOfEpisodesContainer.appendChild(divContainer);
  })
}

function sendRequest(showId){

return fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
.then((response) => response.json())
.then((data) => {
    return data;
})
.catch((err) => console.log(err)); 
}

window.onload = setup;
