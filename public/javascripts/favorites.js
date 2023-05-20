const cardsContainer = document.querySelector("#cards-container");
const URL_API_SERVER = "http://localhost:3000/api";

const getFavorites = () => {
  return fetch(`${URL_API_SERVER}/favorites`, {
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const paintProducts = ({ products }) => {
  console.log(products);
  cardsContainer.innerHTML = "";
  products.forEach(
    ({ id, images, title, free, discount, price, description }) => {
      const priceWithDiscount = discount
        ? price - (price * discount) / 100
        : price;
      const priceFormatARG = priceWithDiscount.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
      const imgPrimary = images.find(({ primary }) => true);
      /* const template = `
      <article class="home__main__section__article animate__animated col-12 col-md-6 col-lg-4">
      <div class="home__main__section__article--imagen">
        <a href="/courses/detail/${id}">      
          <div style="background-image: url('${
            imgPrimary.name
              ? `http://localhost:3000/images/courses/${imgPrimary.name}`
              : "images/courses/not-image.png"
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
        <div class="d-flex justify-content-between">
        <button class="btn btn-success" onclick="addProductToCart(${id})">Comprar</button>
        <i onclick="toggleProductFavorite(${id}, event)" class="fs-2 fas fa-star"></i>
      </div>
      </div>
  </article>    
      `; */

      const template = `
      <div class="card col-12 col-lg-5 my-5 position-relative">
           <i onclick="toggleProductFavorite(${id}, event)" class="text-primary p-0 border-0 bg-transparent position-absolute fs-5 fas fa-star" style="top:10px;right:10px"></i>
      <div class="card-body d-flex gap-2 align-items-center justify-content-center">
        
        <img style="width:120px;height:120px" style="object-fit:contain;" src="http://localhost:3000/images/courses/${
          images[0].name
        }" alt="">
        <div class="">

          <h5 class="card-title">${title}</h5>
          <p class="card-text text-success fw-bold">${priceFormatARG}${
        discount ? `<span class="text-danger mx-3">${discount}% OFF</span>` : ""
      }</p>
          <p class="d-flex align-items-center gap-2">
            <a href="/courses/detail/${id}" class="btn btn-outline-dark">Ver más</a>
            <button class="btn btn-success" onclick="addProductToCart(${id})">Comprar</button>
          </p>
        </div>
      </div>
    </div>
      `;
      cardsContainer.innerHTML += template;
    }
  );
};

window.addEventListener("load", async () => {
  try {
    const { data } = await getFavorites();
    paintProducts({ products: data });
  } catch (error) {
    console.log(error);
  }
});

const toggleProductFavorite = async (id, event) => {
  try {
    const objCourseId = {
      courseId: id,
    };
    const { ok } = await fetch(`${URL_API_SERVER}/favorites/toggle`, {
      method: "PUT",
      body: JSON.stringify(objCourseId),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    !ok && (location.href = "/users/login");

    if (ok) {
      const { data } = await getFavorites();
      paintProducts({ products: data });
    }
  } catch (error) {
    console.log(error);
  }
};

const addProductToCart = async (id) => {
  try {
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
      title: ok ? "Producto agregado al carrito" : "Debes iniciar sesión",
      icon: ok ? "success" : "warning",
      showConfirmButton: false,
      timer: 1200,
    });

    !ok && (location.href = "/users/login");
  } catch (error) {
    console.log(error);
  }
};
