let slideIndex = 1;
showSlides(slideIndex);

//Will pass in 1 or -1
function changeSlide(n) {
    showSlides(slideIndex += n);
  };

//Passes in the index of active slide
function showSlides(index) {
  let i;
  let slides = document.getElementsByClassName('carousel__slide');

  //keeps the carousel going in a loop
  if (index > slides.length) { slideIndex = 1 };   
  if (index < 1) { slideIndex = slides.length };

  //hides all images
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  };
  //reveals the actve image by adding class block
  slides[slideIndex-1].style.display = "block";  
}