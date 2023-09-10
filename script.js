document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', submitForm);
  updatePosts();
});

let currentPostIndex = -1;
let posts = [];

function submitForm() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const image = document.getElementById('image').files[0];
  const video = document.getElementById('video').files[0];

  const post = { title, content, image: null, video: null };

  if (image) {
      post.image = URL.createObjectURL(image);
  }

  if (video) {
      post.video = URL.createObjectURL(video);
  }

  posts.push(post);
  updatePosts();
  clearForm();

  // Show the content display box after submitting
  const dataSection = document.getElementById('dataSection');
  dataSection.style.display = 'block';

  // Scroll to the data container after submitting
  dataSection.scrollIntoView({ behavior: 'smooth' });
}

function updatePosts() {
  currentPostIndex = -1;
  const dataSection = document.getElementById('dataSection');
  dataSection.innerHTML = '';
  posts.forEach((post, index) => {
      let newData = "<div class='card'>" +
          "<div class='card-header'>" +
          "<h3 class='card-title'><b>Title:</b> " + post.title + "</h3>" +
          "</div>" +
          "<div class='card-body'>" +
          "<p><b>Content: </b>" + post.content + "</p>";

      if (post.image) {
          newData += "<p><b>Image:</b></p>";
          newData += "<div class='card-body-image'>" +
              "<img class='image-preview' src='" + post.image + "' alt='Selected Image'>" +
              "</div>";
      }

      if (post.video) {
          newData += "<p><b>Video:</b></p>";
          newData += "<div class='card-body-video'>" +
              "<video class='video-preview' controls autoplay muted>" +
              "<source src='" + post.video + "' type='video/mp4'>" +
              "</video>" +
              "</div>";
      }

      newData += "<div class='card-actions'>" +
          "<button class='edit-button' onclick='editPost(" + (index) + ")'>Edit</button>" +
          "<button class='delete-button' onclick='deletePost(" + (index) + ")'>Delete</button>" +
          "</div>";

      newData += "</div></div>";
      dataSection.innerHTML += newData;
  });
}

function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('image').value = '';
  document.getElementById('video').value = '';
}

function editPost(index) {
  currentPostIndex = index;
  const post = posts[currentPostIndex];
  document.getElementById('title').value = post.title;
  document.getElementById('content').value = post.content;
  document.getElementById('image').value = '';
  document.getElementById('video').value = '';
}

function deletePost(index) {
  const confirmed = confirm('Are you sure you want to delete this post?');
  if (confirmed) {
      posts.splice(index, 1);
      updatePosts();
  }
}
function updatePosts() {
  currentPostIndex = -1;
  const dataSection = document.getElementById('dataSection');
  
  // Create a container for new content and existing content
  const newContentContainer = document.createElement('div');
  
  if (posts.length === 0) {
    // Hide the content display box when there are no content items
    dataSection.style.display = 'none';
  } else {
    dataSection.style.display = 'block'; // Show the content display box
    
    // Loop through the posts in reverse order to prepend new content
    for (let index = posts.length - 1; index >= 0; index--) {
      const post = posts[index];
      
      let newData = "<div class='card'>" +
        "<div class='card-header'>" +
        "<h3 class='card-title'><b>Title:</b> " + post.title + "</h3>" +
        "</div>" +
        "<div class='card-body'>" +
        "<p><b>Content: </b>" + post.content + "</p>";

      if (post.image) {
        newData += "<p><b>Image:</b></p>";
        newData += "<div class='card-body-image'>" +
          "<img class='image-preview' src='" + post.image + "' alt='Selected Image'>" +
          "</div>";
      }

      if (post.video) {
        newData += "<p><b>Video:</b></p>";
        // Set a default aspect ratio of 2.39:1 for video previews
        newData += "<div class='card-body-video' style='position: relative; padding-bottom: 41.8%; height: 0; overflow: hidden;'>" +
          "<video class='video-preview' controls autoplay muted style='position: absolute; top: 0; left: 0; width: 100%; height: 100%;'>" +
          "<source src='" + post.video + "' type='video/mp4'>" +
          "</video>" +
          "</div>";
      }

      newData += "<div class='card-actions'>" +
        "<button class='edit-button' onclick='editPost(" + (index) + ")'>Edit</button>" +
        "<button class='delete-button' onclick='deletePost(" + (index) + ")'>Delete</button>" +
        "</div>";

      newData += "</div></div>";
      
      // Append each post to the new content container
      newContentContainer.innerHTML += newData;
    }
    
    // Replace the content of the dataSection with the new content container
    dataSection.innerHTML = newContentContainer.innerHTML;
  }
}




