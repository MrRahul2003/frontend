import React from 'react'

export const Graph = () => {
  return (
    <div className="row">
    <div className="col-md-12 col-lg-6">
      <div className="card card-chart">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-6">
              <h5 className="card-title">Overview</h5>
            </div>
            <div className="col-6">
              <ul className="chart-list-out">
                <li>
                  <span className="circle-blue" />
                  Teacher
                </li>
                <li>
                  <span className="circle-green" />
                  Student
                </li>
                <li className="star-menus">
                  <a href="javascript:;">
                    <i className="fas fa-ellipsis-v" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div id="apexcharts-area" />
        </div>
      </div>
    </div>
    <div className="col-md-12 col-lg-6">
      <div className="card card-chart">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-6">
              <h5 className="card-title">Number of Students</h5>
            </div>
            <div className="col-6">
              <ul className="chart-list-out">
                <li>
                  <span className="circle-blue" />
                  Girls
                </li>
                <li>
                  <span className="circle-green" />
                  Boys
                </li>
                <li className="star-menus">
                  <a href="javascript:;">
                    <i className="fas fa-ellipsis-v" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div id="bar" />
        </div>
      </div>
    </div>
  </div>
  )
}
