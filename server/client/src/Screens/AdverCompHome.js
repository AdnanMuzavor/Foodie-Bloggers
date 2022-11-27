import React from "react";
//Additional component(won't be used)
const Addcomp = ({ ad1, ad2, ad3, ad4 }) => {
  const openredmi = () => {
    window.open(
      "https://www.amazon.in/s?k=redmi+k20&hvadid=72774039725285&hvbmt=be&hvdev=c&hvqmt=e&tag=msndeskstdin-21&ref=pd_sl_5rf0dcatwl_e"
    );
  };
  return (
    <>
      <div
        className="row  mt-2 mb-2 ms-2 d-flex justify-content-center"
        data-aos="zoom-out"
      >
        <h5 className="text-center">Most useful advertisement of week</h5>
        <a
          href="http://flipkart.com"
          target="_blank"
          rel="noreferrer"
         
          className="link col-5 col-md-5 col-lg-5 me-2 mb-2 colcomp "
        >
          <img alt="Advertisement" src={ad1} className="img-fluid limg" href="www.amazon.in"></img>
        </a>
        <a
          href="http://amazon.com"
          target="_blank"
          rel="noreferrer"
          className="link col-5 col-md-5 col-lg-5 me-2 mb-2 colcomp "
        >
          <img alt="Advertisement" src={ad2} className="img-fluid limg" href="www.amazon.in"></img>
        </a>

        <h5 className="text-center">People also viewed this</h5>

        <a
          onClick={openredmi}
          target="_blank"
          rel="noreferrer"
          href="http://flipkart.com"
          className="link col-5 col-md-5 col-lg-5 me-2 mb-2 colcomp "
        >
          <img alt="Advertisement" src={ad3} className="img-fluid limg" href="www.amazon.in"></img>
        </a>

        <a
          onClick={openredmi}
          target="_blank"
          rel="noreferrer"
          href="http://amazon.com"
          className="link col-5 col-md-5 col-lg-5 me-2 mb-2 colcomp "
        >
          <img alt="Advertisement" src={ad4} className="img-fluid limg" href="www.amazon.in"></img>
        </a>
      </div>
    </>
  );
};

export default Addcomp;
