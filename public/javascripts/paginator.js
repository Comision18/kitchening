const $ = (el) => document.querySelector(el);
const btnPrev = $("#btn-prev");
const btnNext = $("#btn-next");
const selectLimit = $("#select-limit");
const containerItemsPage = $("#container-items-page");
const containerCoursesCard = $("#container-courses-card");
const idUser = document.body.getAttribute("data-idUser");
const URL_API_SERVER = "http://localhost:3000/api";

let pageActive = 1;
const apiGetCourses = "http://localhost:3000/api/courses";

const getCourses = ({ page = 1, limit = 6 } = {}) =>
  fetch(`${apiGetCourses}?page=${page}&limit=${limit}`).then((res) =>
    res.json()
  );

const paintCourses = (courses) => {
  console.log(courses);
  containerCoursesCard.innerHTML = "";
  courses.forEach(
    ({ id, images, title, free, discount, price, usersFavorites }) => {
      console.log(usersFavorites[0]?.id);
      const priceWithDiscount = discount
        ? price - (price * discount) / 100
        : price;
      const priceFormatARG = priceWithDiscount.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
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
        <div class="d-flex gap-3">
        <p class="fs-4 text-success">${priceFormatARG} ${
        discount ? `<span class="text-danger">${discount}% OFF</span>` : ""
      } </p>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-success" onclick="addProductToCart(${id})">Comprar</button>
          <i style="cursor:${idUser ? 'pointer' : 'initial'}" onclick="toggleProductFavorite(${id},event)" class="text-primary fs-4 ${
          usersFavorites.some(({id}) => id == idUser) ? "fas" : "far"
      } fa-star"></i>
        </div>
        <!-- <i class="fas fa-star"></i> -->
      </div>
  </article>    
      `;
      containerCoursesCard.innerHTML += template;
    }
  );
};

const getPage = async (page) => {
  pageActive = page;
  const { data } = await getCourses({ page, limit: selectLimit.value });
  visualImpact(data);
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

const visualImpact = async ({ pages, currentPage, courses }) => {
  paintCourses(courses);
  paintItemsPage({ numberPages: pages, itemActive: currentPage });
  statusPrevAndNext({ currentPage, pages });
};

window.addEventListener("load", async () => {
  try {
    const { data } = await getCourses();
    visualImpact(data);

    const limitsValid = [6, 9, 12, 20];

    limitsValid.forEach((limitValid) => {
      selectLimit.innerHTML += `
       <option value="${limitValid}">${limitValid} cursos</option>
    `;
    });
  } catch (error) {
    console.log(error);
  }
});

const handleEventPrevNext = (btnElement, { isNext = false } = {}) => {
  btnElement.addEventListener("click", async () => {
    try {
      const { data } = await getCourses({
        page: isNext ? ++pageActive : --pageActive,
        limit: selectLimit.value,
      });
      visualImpact(data);
    } catch (error) {
      console.log(error);
    }
  });
};

handleEventPrevNext(btnNext, { isNext: true });
handleEventPrevNext(btnPrev);

selectLimit.addEventListener("change", async ({ target }) => {
  const { data } = await getCourses({ page: 1, limit: target.value });
  visualImpact(data);
});

const addProductToCart = async (id) => {
  try {
    if (!idUser) {
      await Swal.fire({
        title: "Debes iniciar sesión",
        icon: "info",
        showConfirmButton: false,
        timer: 1200,
      });
      location.href = "/users/login";
      return;
    }

    const objCourseId = {
      courseId: id,
    };
    const { ok } = await fetch(`${URL_API_SERVER}/cart/addProduct`, {
      method: "POST",
      body: JSON.stringify(objCourseId),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    await Swal.fire({
      title: ok
        ? "Producto agregado al carrito"
        : "El producto no puedo agregarse",
      icon: ok ? "success" : "error",
      showConfirmButton: false,
      timer: 1200,
    });
  } catch (error) {
    console.log(error);
  }
};

const toggleProductFavorite = async (id, event) => {
  try {
    if (!idUser) {
      await Swal.fire({
        title: "Debes iniciar sesión",
        icon: "info",
        showConfirmButton: false,
        timer: 800,
      });
      location.href = "/users/login";
      return;
    }

    const objCourseId = {
      courseId: id,
    };
    const {
      data: { isRemove },
    } = await fetch(`${URL_API_SERVER}/favorites/toggle`, {
      method: "PUT",
      body: JSON.stringify(objCourseId),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (isRemove) {
      event.target.classList.remove("fas");
      event.target.classList.add("far");
    } else {
      event.target.classList.remove("far");
      event.target.classList.add("fas");
    }
  } catch (error) {
    console.log(error);
  }
};
