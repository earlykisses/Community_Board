

window.onload = function() {
  const sections = ["announcement-list", "event-list", "market-list"];
  sections.forEach(section => {
    const savedPosts = JSON.parse(localStorage.getItem(section)) || [];
    savedPosts.forEach(post => addCard(section, post));
  });
};

const form = document.getElementById('postForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const section = document.getElementById('section').value;
  const message = document.getElementById('message').value;


  addCard(section, message);

  let savedPosts = JSON.parse(localStorage.getItem(section)) || [];
  savedPosts.push(message);
  localStorage.setItem(section, JSON.stringify(savedPosts));

  form.reset();
  alert("Post added successfully!");
});

function addCard(section, message) {
  const card = document.createElement('div');
  card.classList.add('card');

  // Create message span
  const msgSpan = document.createElement('span');
  msgSpan.textContent = message;
  card.appendChild(msgSpan);

  // Create delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'btn delete-btn';
  delBtn.style.marginLeft = '16px';
  delBtn.onclick = function() {
    card.remove();
    let savedPosts = JSON.parse(localStorage.getItem(section)) || [];
    savedPosts = savedPosts.filter(post => post !== message);
    localStorage.setItem(section, JSON.stringify(savedPosts));
  };
  card.appendChild(delBtn);

  document.getElementById(section).appendChild(card);
}

