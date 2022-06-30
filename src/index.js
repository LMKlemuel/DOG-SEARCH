

function dogRender(dog){
    const dogBreed = document.querySelector('#dog');
    const dogImage = document.querySelector('#dog-image_url');
    const dogHistory = document.querySelector('#dog-history');
    const dogPurchasePrice = document.querySelector('#dog-purchasePrice');
    const dogMaintenanceCost = document.querySelector('#dog-maintenanceCost');
    
    dogBreed.textContent = dog.breed,             
    dogImage.src = dog.image_url,                    
    dogHistory.textContent = dog.history,     
    dogPurchasePrice.textContent = dog.purchasePrice, 
    dogMaintenanceCost.textContent = dog.maintenanceCost;
};

    
function patchdog(dog){
    console.log(dog, dog.id)
    fetch(`http://localhost:3000/dog/${dog.id}`,
        {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dog)
        })
        .then(response => response.json())
        .then(data => dogRender(data))
        .catch(err => console.log(`Error: ${err}`))
};

function postDog(dog){
    fetch('http://localhost:3000/dog', {
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(dog)
    })
    .then(reponse => response.json())
    .then(data => dogRender(data))
    .catch(err => console.log(`Error: ${err}`))
}

function fetchData(dog=null){
    let baseURL = 'http://localhost:3000/dog/'
    return new Promise((resolve, reject) => {
        let url = dog == null ? baseURL : `${baseURL + dog}`
        fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => console.log(`Error: ${err}`));
        })
    };


function navRender(dog){
    // Navigation Dog List
    const navDogList = document.querySelector('#dog-list');
    while (navDogList.firstElementChild){
        navDogList.removeChild(navDogList.lastElementChild)
    };

    dog.forEach(dog => {
        const navElement = document.createElement('li');
        navElement.textContent = dog.name;
        navElement.setAttribute('index', dog.id);
        navDogList.append(navElement)

        navElement.addEventListener('click', (env)=> {
            // env.stopPropagation();
            console.log("EventPhase: " + env.eventPhase)
            // console.log(env.composedPath()) 
            fetchData(env.target.getAttribute('index'))
            .then(dog => {
                console.log("from fetch-> dog id " + dog.id);
                dogRender(dog);
            });
        }, );
    });

};

//initialization fn
function init(){
    fetchData()
    .then(dog => navRender(dog))

    fetchData(1)
    .then(dog => dogRender(dog))
    
};
init()
