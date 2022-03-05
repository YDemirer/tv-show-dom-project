//You can edit ALL of the code here

const searchBar = document.getElementById("search");
const searchCount = document.getElementById("search-count");
const dropDown = document.getElementById("dropdown-list");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  searchBar.addEventListener("input", onSearchKeyUp);

  dropDown.addEventListener("click", dropDownMenu);
}

function onSearchKeyUp(event){
  const searchValue = event.target.value.toLowerCase();
  
  const filteredEpisodes = 
  getAllEpisodes().filter((e) => {
    return e.name.toLowerCase().includes(searchValue);
  }); 
  const filteredCount = filteredEpisodes.length;
  const allCount = getAllEpisodes().length;
  const countString = `Displaying ${filteredCount} out of ${allCount}`;
  searchCount.innerText = countString;
  makePageForEpisodes(filteredEpisodes);
} 

function dropDownMenu (){
    getAllEpisodes().forEach((episode) => {
      let optionEl = document.createElement("option");

      optionEl.innerHTML = `S${episode.season
      .toString()
      .padStart(2, '0')
    }E${episode.number
      .toString()
      .padStart(2, '0')} - ${episode.name}`;

      dropDown.appendChild(optionEl);
    }); 
}

dropDown.addEventListener("change", episodePage);
function episodePage (event){
  let episodeChoice = event.target.value;
  // console.log(`you clicked ${event.target.value}`);
  let showEpisode = document.createElement('h3');
    let listOfEpisodesContainer = document.getElementById('list-of-episodes');
    listOfEpisodesContainer.innerHTML = "";
    showEpisode.innerHTML =
    episodePage.textContent = `${episode.name} - S${episode.season
      .toString()
      .padStart(2, '0')
    }E${episode.number
      .toString()
      .padStart(2, '0')}`;
dropDown.appendChild(episodeChoice);
    console.log(showEpisode);
}

function makePageForEpisodes(episodeList) {

  let listOfEpisodesContainer = document.getElementById('list-of-episodes');
  listOfEpisodesContainer.innerHTML = "";

  episodeList.forEach((episode) => {
    let divContainer = document.createElement('div');
    let h3Element = document.createElement('h3');
    let textParagraph = document.createElement('p');
    let episodeImage = document.createElement('img');

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
    divContainer.appendChild(textParagraph);
    divContainer.appendChild(episodeImage);
    listOfEpisodesContainer.appendChild(divContainer);
  })
}

window.onload = setup;
