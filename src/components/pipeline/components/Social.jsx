import React from 'react'

const Social = () => {
  return (
    <div className="row">
    <div className="col-xl-3 col-sm-6 col-12">
      <div className="card flex-fill fb sm-box">
        <div className="social-likes">
          <p>Like us on facebook</p>
          <h6>50,095</h6>
        </div>
        <div className="social-boxs">
          <img
            src="assets/img/icons/social-icon-01.svg"
            alt="Social Icon"
          />
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6 col-12">
      <div className="card flex-fill twitter sm-box">
        <div className="social-likes">
          <p>Follow us on twitter</p>
          <h6>48,596</h6>
        </div>
        <div className="social-boxs">
          <img
            src="assets/img/icons/social-icon-02.svg"
            alt="Social Icon"
          />
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6 col-12">
      <div className="card flex-fill insta sm-box">
        <div className="social-likes">
          <p>Follow us on instagram</p>
          <h6>52,085</h6>
        </div>
        <div className="social-boxs">
          <img
            src="assets/img/icons/social-icon-03.svg"
            alt="Social Icon"
          />
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6 col-12">
      <div className="card flex-fill linkedin sm-box">
        <div className="social-likes">
          <p>Follow us on linkedin</p>
          <h6>69,050</h6>
        </div>
        <div className="social-boxs">
          <img
            src="assets/img/icons/social-icon-04.svg"
            alt="Social Icon"
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Social