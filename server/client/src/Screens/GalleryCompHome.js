import React from "react";
import Galleryblock from "./GalleryBloack";
const Homegallery = ({ All }) => {
  return (
    <>
      {/* first row of gallery */}

      {All.map((e, i) => {
        return i < 4 ? (
          <div className="col-md-3 col-lg-3 col-12">
            <Galleryblock
              content={e.title}
              img={e.imglink}
              id={e._id}
              key={e._id}
            />
          </div>
        ) : null;
      })}

      <div className="row mx-auto">
        {All.map((e, i) => {
          return i >= 4 && i < 7 ? (
            <div className="col-md-4 col-lg-4 col-12">
              <Galleryblock
                content={e.title}
                img={e.imglink}
                id={e._id}
                key={e._id}
              />
            </div>
          ) : null;
        })}
      </div>

      {/* gallery number 3 */}
      <div className="row mx-auto">
        {All.map((e, i) => {
          return i >= 7 && i < 11 ? (
            <div className="col-md-3 col-lg-3 col-12">
              <Galleryblock
                content={e.title}
                img={e.imglink}
                id={e._id}
                key={e._id}
              />
            </div>
          ) : null;
        })}
      </div>
    </>
  );
};

export default Homegallery;
