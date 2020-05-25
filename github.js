const form = document.getElementById('github__form');
const errorDisplay = document.getElementById('error'); 
form.addEventListener('submit', findProfile);

const nameDisplay = document.getElementById('name')
const repoCountDisplay = document.getElementById('repo-count')
const repoListDisplay = document.getElementById('repo-list')

function findProfile(event) {

    let avatar, name, repoCount, repos
    let username = document.getElementById('username_input').value

    axios.get(`https://api.github.com/users/${username}` )
    .then((response) => {
        //if the user has repos
        if (response.data.public_repos) { 
            avatar = response.data.avatar_url
            name = response.data.name
            repoCount = response.data.public_repos
            axios.get(`https://api.github.com/users/${username}/repos`)
            .then((response) => {
                repos = response.data
                insertData(name, avatar, repoCount, repos)
            }).catch( err => {
                showError(err, 'something went wrong- try again later')
            })
        //With no repos we tell the user
        } else {
            //if user doesnt have repos
            showError('user has no repos')
        }

    //error handling
    }).catch( err => {
        if (err.response.status === 404) {
            showError('user not found')
        } else {
            showError('Something went wrong - try again later')
        }
    })
    event.preventDefault();
    form.reset();
}

showError = (err) => {
    errorDisplay.textContent = err
    errorDisplay.style.display = "block"
    setTimeout(hideError, 3000)
}

hideError = () => {
    errorDisplay.style.display = "none"
}

insertData = (name, avatar, repoCount, repos) => {
    //adding teh basic data
    nameDisplay.textContent = name
    repoCountDisplay.textContent = repoCount
    repoListDisplay.textContent = repos
    
    //clear the repo dispay
    repoListDisplay.innerHTML = ""

    //looping the repos
    repos.forEach(repo => {
        console.log(repo)
        repoListDisplay.innerHTML += 
        `<div class="github__display__repo">
             <h2>${repo.description}</h2>
             <p>${repo.description}</p>
             <a href=${repo.html_url} target="_blank">${repo.html_url}</a>
        </div>`
    });
}