// Frontend JS

// Just filling up the form by taking data form frontend to backend
const form = document.getElementById('confessionForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // without it browser reloads the whole page but in our case we don't want it so JS will handle everything :)

    const text = document.querySelector('[name="titleArea"]').value;
    const top = document.querySelector('[name="topic"]').value;

    const res = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titleArea: text,
            topic: top
        })
    });

    const data = await res.json();

    form.reset();
    await loadConfessions();

    console.log("Submitting...");
});


// Formatting the time
function formatTime(dateString){
    const confessionDate = new Date(dateString);
    const now = new Date();
    const isToday =
        confessionDate.toDateString() === now.toDateString();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
        confessionDate.toDateString() === yesterday.toDateString();
    if (isToday) {
        return 'Today, ' +
            confessionDate.toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'});
    }
    else if (isYesterday) {
        return 'Yesterday, ' +
            confessionDate.toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'});
    }
    else {
        return confessionDate.toLocaleDateString([], {day: 'numeric',month: 'short',year: 'numeric'})
        +', ' +
        confessionDate.toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'});
    }
}


// Making confession cards
function CardLoading(confession){
    const time = formatTime(confession.date);
    return `
        <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div class="flex justify-between">
                <p class="text-zinc-300 text-sm mb-2">
                    ${confession.topic} 
                </p>

                <div class="flex items-center gap-2 text-zinc-300 text-sm mb-2">
                    <img data-id="${confession._id}" class="btnLike w-5 cursor-pointer" src="img/unlike.svg" alt="Like Button">
                    <span class="likeCount">${confession.likes}</span> likes
                </div>

            </div>

            <h2 class="text-lg">
                ${confession.title}
            </h2>

            <p class="text-zinc-500 text-xs mt-2">
                ${time}
            </p>
            
        </div>
    `;
}


// Attaching event listeners to like button
function attachLikeListeners(){

    const likeButtons = document.querySelectorAll('.btnLike');

    likeButtons.forEach((btn) => {

        btn.addEventListener('click', async () => {

            const id = btn.dataset.id;

            if(btn.src.includes('unlike.svg')){
                btn.src = 'img/like.svg';

                const res = await fetch(`/api/likeUpd/${id}`,{
                    method: 'POST'
                });

                const likeText = btn.parentElement.querySelector('.likeCount');
                likeText.textContent = parseInt(likeText.textContent) + 1;

                // await loadConfessions(); this runs the whole thing again thus making the svg unlike again and it refreshes whole UI no need too 
            }

            else{
                btn.src = 'img/unlike.svg';

                const res = await fetch(`/api/likeDwn/${id}`,{
                    method: 'POST'
                });

                const likeText = btn.parentElement.querySelector('.likeCount');
                likeText.textContent = parseInt(likeText.textContent) - 1;

                // await loadConfessions();
            }
        });
    });

}


// Loading the feed 
async function loadConfessions() {

    const res = await fetch('/api/confessions');

    const confessions = await res.json();

    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    confessions.forEach((confession) => {

        feed.innerHTML += CardLoading(confession);

    });

    attachLikeListeners();
}

loadConfessions();


// Now making feed for each topic 
const topicButtons = document.querySelectorAll('[data-topic]');

topicButtons.forEach((btn) => {

    btn.addEventListener('click', async() => {

        const topic = btn.dataset.topic;

        // Making selected topic purple
        topicButtons.forEach((button) => {
            button.classList.remove('bg-violet-600','hover:bg-violet-700');
            button.classList.add('bg-zinc-900','hover:bg-zinc-800');
        });
        btn.classList.remove('bg-zinc-900','hover:bg-zinc-800');
        btn.classList.add('bg-violet-600','hover:bg-violet-700');

        // The real main.js connection :)
        const res = await fetch(`/api/confessions/${topic}`);
        const confessions = await res.json();

        const feed = document.getElementById('feed');
        feed.innerHTML = '';

        confessions.forEach((confession) => {

            feed.innerHTML += CardLoading(confession);

        });

        attachLikeListeners();

        console.log(`${topic}` + " Loading feed");

    });

});


// Search Bar logic 
const searchInput =
    document.getElementById('searchInput');

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value;
        if(query.trim() === ''){
            await loadConfessions();
            return;
        }
        const res = await fetch(`/api/search/${query}`);
        const confessions = await res.json();
        const feed = document.getElementById('feed');
        feed.innerHTML = '';
        confessions.forEach((confession) => {
            feed.innerHTML += CardLoading(confession);
        });
        attachLikeListeners();
});