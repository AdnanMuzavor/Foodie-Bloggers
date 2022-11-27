import React from "react";
import CarouselBlock from "./CarouselBloack";
const Carouselcomp = ({ f1, f2, f3, f4, f5, f6, f7, f8, f9 }) => {
  return (
    <>
      {/* first part */}
      <div className="col-12 col-md-4 col-lg-4 ">
        {/* carousel number 1 */}
        <div
          id="carouselExample1Controls"
          className="carousel slide"
          data-bs-ride="carousel"
          data-aos="zoom-in"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              {/* card in carousel */}

              <CarouselBlock content="Cheezy Rolls" img={f1} />
            </div>
            <div className="carousel-item">
              {/* card in carousel */}

              <CarouselBlock content="Chatpata Rolls" img={f2} />
            </div>
            <div className="carousel-item">
              {/* card in carousel */}

              <CarouselBlock content="Sweet Rolls" img={f3} />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample1Controls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample1Controls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* second part */}
      <div className="col-12 col-md-4 col-lg-4 ">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          data-aos="zoom-in"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              {/* card in carousel */}

              <CarouselBlock content="Big Burger" img={f4} />
            </div>
            <div className="carousel-item">
              {/* card in carousel */}

              <CarouselBlock content="Paneer Pizza" img={f5} />
            </div>
            <div className="carousel-item">
              {/* card in carousel */}

              <CarouselBlock content="Chatpat Noodles" img={f6} />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* third part */}
      <div className="col-12 col-md-4 col-lg-4 ">
        <div
          id="carouselExample3Controls"
          className="carousel slide"
          data-bs-ride="carousel"
          data-aos="zoom-in"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              {/* card in carousel */}

              <CarouselBlock content="Choco-roco Cake" img={f7} />
            </div>
            <div className="carousel-item">
              {/* card in carousel */}

              <CarouselBlock content="Gulabi Gulabjamun" img={f8} />
            </div>
            <div className="carousel-item">
              {/* card in carousel */}

              <CarouselBlock content="Carrot Halwa" img={f9} />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample3Controls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample3Controls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default Carouselcomp;
