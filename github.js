//form vals
const form = document.getElementById('github-form'),
      errorDisplay = document.getElementById('error'); 
form.addEventListener('submit', findProfile);

const nameDisplay = document.getElementById('name'),
      repoListDisplay = document.getElementById('repo-list'),
      avatarDisplay = document.getElementById('avatar'),
      repoTitleDisplay = document.getElementById('repo-title'),
      githubDisplay = document.getElementById('github-display')


//other node vals
function findProfile(event) {

    let avatar, name, repoCount, repos
    let username = document.getElementById('username_input').value

    axios.get(`https://api.github.com/users/${username}` )
    .then((response) => {
        githubDisplay.style.display = "none"
        //if the user has repos
        if (response.data.public_repos) { 
            avatar = response.data.avatar_url
            name = response.data.name
            repoCount = response.data.public_repos
            //call next set of data
            axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
            .then((response) => {
                repos = response.data
                insertData(name, avatar, repoCount, repos, username)
            }).catch( err => {
                showError(err, 'Something went wrong- try again later')
            })
        } else {
            showError('user has no repos')
        }

    //error handling from first call
    }).catch( err => {
        if (err.response) {
            if (err.response.status === 404) {
                showError('User not found')
            } else {
                showError('Something went wrong - try again later')
            }
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

insertData = (name, avatar, repoCount, repos, username) => {
    //adding the basic data
    nameDisplay.textContent = name
    repoListDisplay.textContent = repos
    avatarDisplay.innerHTML = `<img src="${avatar}" alt="github avatar for ${name}"/>`
    repoTitleDisplay.textContent = `${repoCount} public repositories`

    //clear the repo dispay
    repoListDisplay.innerHTML = ""
    //looping the repos
    let description;
    repos.forEach(repo => {
        if (!repo.description) {
            description = "no description"
        } else {
            description = repo.description
        }

        console.log(repo)

        repoListDisplay.innerHTML += 
        `<div class="github__display__repo">
             <p>Created on ${formatDate(repo.created_at)}</p>
             <a href="${repo.html_url}" target="_blank"><h3>${repo.name}<span>&#10095;</span></h3></a>
             <h4>${description}</h4>
             <h4>Built with <span>${repo.language}</span></h4>
        </div>`
    });
    githubDisplay.style.display = "block"
}

formatDate = (date) => {
    return date.substring(0, 10).split("-").reverse().join("-")
}
