const api_Key = "7cd7e7e461ce858980199e59708a6ddf";
const access_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2Q3ZTdlNDYxY2U4NTg5ODAxOTllNTk3MDhhNmRkZiIsInN1YiI6IjY1NThhYzU0ZWE4NGM3MTA5NTlmMGRhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-xZzNvkz40yhHbF5ZgtwIMo7oA4H3edIHByCGNcfmzk";
const base_Url = "https://api.themoviedb.org/3";
const base_Image = "https://image.tmdb.org/t/p/w500";
const get_Movie = "/discover/movie";
// OPTION
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${access_token}`,
  },
};

async function fetchMovies(api) {
  const res = await fetch(api);
  const data = await res.json();
  setCarousel(data.results);
  getMovieDetails(data.results);
}
const url = `${base_Url}/${get_Movie}?api_key=${api_Key}`;
fetchMovies(url);

// MOVIE DETAILLES
function getMovieDetails(movie) {
  let movies_urls = [];
  const lastest_episodes = document.querySelector(".Lastest-episodes");
  const Trending_episodes = document.querySelector(".Trending_episodes");
  const production_companies = document.querySelector(".production_companies");

  movie.map((movie) => {
    const Url = `${base_Url}/movie/${movie.id}`;
    movies_urls.push(Url);
  });

  const movies_urls_to_fetch = movies_urls.slice(4, 8);
  const movies_urls_to_fetch1 = movies_urls.slice(0, 3);
  const movies_urls_to_fetch2 = movies_urls.slice(4, 10);
  const handelClick = () => {
    console.log("clicked");
  };

  movies_urls_to_fetch.forEach((url) => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        lastest_episodes.innerHTML += `
        <div class="col-lg-6 col-12 mr-2 ml-2 mt-2 mb-lg-0">
                            <div class="custom-block d-flex">
                                <div class="">
                                    <div class="custom-block-icon-wrap">
                                        <div class="section-overlay"></div>
                                        <a href="detail-page.html" class="custom-block-image-wrap">
                                            <img src="${base_Image}${json.poster_path}" class="custom-block-image img-fluid" alt="">

                                            <a href="#" class="custom-block-icon">
                                                <i class="bi-play-fill"></i>
                                            </a>
                                        </a>
                                    </div>

                                    <div class="mt-4">
                                        <a href="./Trending-episodes.html" class="btn custom-btn">
                                            more
                                        </a>
                                    </div>
                                </div>

                                <div class="custom-block-info">
                                    <div class="custom-block-top d-flex mb-1">
                                        <small class="me-4">
                                            <i class="bi-clock-fill custom-icon"></i>
                                            ${json.release_date}
                                        </small>

                                        <small>Average <span class="badge">${json.vote_average}</span></small>
                                    </div>

                                    <h5 class="mb-2">
                                        <a href="detail-page.html">
                                            ${json.original_title}
                                        </a>
                                    </h5>

                                    <div class="profile-block d-flex">
                                        <img src="${base_Image}${json.production_companies[0].logo_path}" class="profile-block-image img-fluid" alt="">

                                        <p>${json.production_companies[0].name}
                                            <strong>Origine: ${json.production_companies[0].origin_country}</strong></p>
                                    </div>

                                    <p class="mb-0">${json.overview}</p>

                                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" class="bi-gear-fill me-1">
                                            <span>${json.runtime}</span>
                                        </a>

                                        <a href="#" class="bi-currency-dollar me-1">
                                            <span>${json.budget}</span>
                                        </a>

                                        <a href="#" class="bi-hand-thumbs-up me-1">
                                            <span>${json.popularity}</span>
                                        </a>
                                    </div>
                                </div>

                                <div class="d-flex flex-column ms-auto">
                                    <a href="#" class="badge ms-auto">
                                        <i class="bi-heart"></i>
                                    </a>

                                    <a href="#" class="badge ms-auto">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
        `;
      })
      .catch((err) => console.error("error:" + err));
  });

  movies_urls_to_fetch1.forEach((url) => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        Trending_episodes.innerHTML += `
        <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-full">
                                <div class="custom-block-image-wrap">
                                    <a href="detail-page.html">
                                        <img src="${base_Image}${json.poster_path}" class="custom-block-image img-fluid" alt="">
                                    </a>
                                </div>

                                <div class="custom-block-info">
                                    <h5 class="mb-2">
                                        <a href="detail-page.html">
                                            ${json.original_title}
                                        </a>
                                    </h5>

                                    <div class="profile-block d-flex">
                                        <img src="${base_Image}${json.production_companies[0].logo_path}" class="profile-block-image img-fluid" alt="">

                                        <p>Elsa
                                            <strong>${json.production_companies[0].origin_country}</strong></p>
                                    </div>

                                    <p class="mb-0">
                                      <ul>
                                        <li>${json.genres[0].name}</li>
                                        <li>${json.genres[1].name}</li>
                                        </ul>
                                    </p>

                                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" class="bi-gear-fill me-1">
                                            <span>${json.runtime}</span>
                                        </a>

                                        <a href="#" class="bi-currency-dollar me-1">
                                            <span>${json.budget}</span>
                                        </a>

                                        <a href="#" class="bi-hand-thumbs-up me-1">
                                            <span>${json.popularity}</span>
                                        </a>
                                    </div>
                                </div>

                                <div class="social-share d-flex flex-column ms-auto">
                                    <a href="#" class="badge ms-auto">
                                        <i class="bi-heart"></i>
                                    </a>

                                    <a href="#" class="badge ms-auto">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
        
        `;
      })
      .catch((err) => console.error("error:" + err));
  });

  movies_urls_to_fetch2.forEach((url) => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        production_companies.innerHTML += `
                         <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-overlay">
                                <a href="./Lastest-episodes.html" class="custom-block-image-wrap">
                                    <img src="${base_Image}${json.production_companies[0].logo_path}" class="custom-block-image img-fluid" alt="">
                                </a>

                                <div class="custom-block-info custom-block-overlay-info">
                                    <h5 class="mb-1">
                                        <a href="listing-page.html">
                                            ${json.production_companies[0].name}
                                        </a>
                                    </h5>

                                    <p class="badge mb-0">${json.production_companies[0].origin_country}</p>
                                </div>
                             </div>
                          </div>
        
        `;
      })
      .catch((err) => console.error("error:" + err));
  });
}
// https://api.themoviedb.org/3/movie/{movie_id}

// FUNCTION OF CURSOL
async function setCarousel(movies) {
  const carousel = document.querySelector(".owl-carousel");
  // console.log(movies);
  await movies.map((movie) => {
    const movie_title = movie.original_title.split(" ").slice(0, 3).join(" ");
    carousel.innerHTML += `
            <div class="owl-carousel-info-wrap item">
                <img src=${base_Image}${
      movie.poster_path
    } class="owl-carousel-image img-fluid" alt="">
                <img src="images/${
                  movie.adult ? "icon_18" : "verified"
                }.png" class="owl-carousel-verified-image img-fluid" alt="">
                <div class="owl-carousel-info">
                    <h4 class="mb-2">
                        ${movie_title}
                    </h4>

                    <span class="badge"> LG :${movie.original_language}</span>

                    <span class="badge">time: ${movie.release_date}</span>
                </div>

                <div class="social-share">
                    <ul class="social-icon">
                        <li class="social-icon-item">
                            <a href="#" class="social-icon-link bi-twitter"></a>
                        </li>

                        <li class="social-icon-item">
                            <a href="#" class="social-icon-link bi-facebook"></a>
                        </li>
                    </ul>
                </div>
            </div>

  `;
  });

  $(".owl-carousel").owlCarousel({
    center: true,
    loop: true,
    margin: 30,
    autoplay: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
      },
      767: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });
}

const search1 = document.getElementById("ffff");
search1.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(this.search.value);
});
const handelClick = document.getElementById("handelClick");
search1.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("this.search.value");
});
