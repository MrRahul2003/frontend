import React from 'react'

const Numbers = () => {
  return (
    <div className="row">
    <div className="col-xl-3 col-sm-6 col-12 d-flex">
      <div className="card bg-comman w-100">
        <div className="card-body">
          <div className="db-widgets d-flex justify-content-between align-items-center">
            <div className="db-info">
              <h6>Companies</h6>
              <h3>50055</h3>
            </div>
            <div className="db-icon">
              <img
                src="/assets/img/pipeline/company.png"
                alt="Dashboard Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-xl-3 col-sm-6 col-12 d-flex">
      <div className="card bg-comman w-100">
        <div className="card-body">
          <div className="db-widgets d-flex justify-content-between align-items-center">
            <div className="db-info">
              <h6>Contacts</h6>
              <h3>50+</h3>
            </div>
            <div className="db-icon">
              <img
                src="/assets/img/pipeline/contact.png"
                alt="Dashboard Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-xl-3 col-sm-6 col-12 d-flex">
      <div className="card bg-comman w-100">
        <div className="card-body">
          <div className="db-widgets d-flex justify-content-between align-items-center">
            <div className="db-info">
              <h6>Vendors</h6>
              <h3>30+</h3>
            </div>
            <div className="db-icon">
              <img
                src="/assets/img/pipeline/vendor.png"
                alt="Dashboard Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-xl-3 col-sm-6 col-12 d-flex">
      <div className="card bg-comman w-100">
        <div className="card-body">
          <div className="db-widgets d-flex justify-content-between align-items-center">
            <div className="db-info">
              <h6>Products / Subproducts</h6>
              <h3>$505</h3>
            </div>
            <div className="db-icon">
              <img
                src="/assets/img/pipeline/product.png"
                alt="Dashboard Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  )
}

export default Numbers