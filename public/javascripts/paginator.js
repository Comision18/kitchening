const $ = (el) => document.querySelector(el);
const btnPrev = $("#btn-prev");
const btnNext = $("#btn-next");
const containerItemsPage = $("#container-items-page");
const containerCoursesCard = $("#container-courses-card");

let pageActive = 1;
const apiGetCourses = "http://localhost:3000/api/courses";


const getCourses = ({ page = 1 } = {}) =>
  fetch(`${apiGetCourses}?page=${page}`).then((res) => res.json());

const paintCourses = (courses) => {
  containerCoursesCard.innerHTML = "";
  courses.forEach(({ id, images, title, free, discount }) => {
    const imgPrimary = images.find(({ primary }) => true);
    const template = `
      <article class="home__main__section__article animate__animated">
      <div class="home__main__section__article--imagen">
        <a href="/courses/detail/${id}">      
          <div style="background-image: url('${
            imgPrimary?.urlImage || `/images/courses/not-image.png`
          }');" class="home__main__section__article--imagen-product">
        </div>
        </a>
        <img class="home__main__section__article--imagen-sticker" src="/images/${
          free ? "img-gratis.png" : discount !== 0 ? "img-descuento.png" : null
        }" alt="">
      </div>
      <div class="home__main__section__article--title">
        <h4>${title}</h4>
      </div>
  </article>    
      `;
    containerCoursesCard.innerHTML += template;
  });
};

const getPage = async (page) => {
  pageActive = page;
  const {
    data: { pages, currentPage, courses },
  } = await getCourses({ page });
  paintCourses(courses);
  paintItemsPage({ numberPages: pages, itemActive: currentPage });
  statusPrevAndNext({ currentPage, pages });
};

const paintItemsPage = ({ numberPages, itemActive }) => {
  containerItemsPage.innerHTML = "";
  for (let i = 1; i <= numberPages; i++) {
    containerItemsPage.innerHTML += `
    <li class="page-item ${
      itemActive === i && "active"
    }"><button class="page-link" onclick="getPage(${i})">${i}</button></li>
    `;
  }
};

const statusPrevAndNext = ({ currentPage, pages }) => {
  if (currentPage === pages) {
    btnNext.hidden = true;
  } else {
    btnNext.hidden = false;
  }

  if (currentPage === 1) {
    btnPrev.hidden = true;
  } else {
    btnPrev.hidden = false;
  }
};

window.addEventListener("load", async () => {
  try {
    const {
      data: { pages, currentPage, courses },
    } = await getCourses();
    paintCourses(courses);
    paintItemsPage({ numberPages: pages, itemActive: currentPage });
    statusPrevAndNext({ currentPage, pages });
  } catch (error) {
    console.log(error);
  }
});

const handleEventPrevNext = (
  btnElement,
  { isNext = false } = {}
) => {
  btnElement.addEventListener("click", async () => {
    try {
      const {
        data: { pages, currentPage, courses },
      } = await getCourses({ page: isNext ? ++pageActive : --pageActive });

      paintCourses(courses);
      paintItemsPage({ numberPages: pages, itemActive: currentPage });
      statusPrevAndNext({ currentPage, pages });
    } catch (error) {
      console.log(error);
    }
  });
};

handleEventPrevNext(btnNext, { isNext: true });
handleEventPrevNext(btnPrev);

/* btnNext.addEventListener("click", async () => {
  try {
    const {
      data: { pages, currentPage, courses },
    } = await getCourses({ page: ++pageActive });
    paintCourses(courses);
    paintItemsPage({ numberPages: pages, itemActive: currentPage });
    statusPrevAndNext({ currentPage, pages });
  } catch (error) {
    console.log(error);
  }
}); */

/* btnPrev.addEventListener("click", async () => {
  try {
    const {
      data: { pages, currentPage, courses },
    } = await getCourses({ page: --pageActive });
    paintCourses(courses);
    paintItemsPage({ numberPages: pages, itemActive: currentPage });
    statusPrevAndNext({ currentPage, pages });
  } catch (error) {
    console.log(error);
  }
}); */
