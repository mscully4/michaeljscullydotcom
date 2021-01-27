import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx'

import { ICE_BLUE, FONT_GREY, OFF_BLACK_1, OFF_BLACK_2, OFF_BLACK_3, OFF_BLACK_4 } from '../utils/Colors'

const styles = theme => ({
  navigationBar: {
    backgroundColor: OFF_BLACK_2,
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center'
  },
  logo: {
    fontFamily: "Allura",
    fontSize: '3vw',
    color: ICE_BLUE,
    paddingLeft: '2vw ',
    textAlign: 'left',
    marginBottom: 0
  },
  menu: {
    position: 'fixed',
    top: '10vh',
    left: 0,
    height: '80vh',
    width: '5vw',
    boxShadow: `0 0 4px #000 !important`,
    borderRadius: 6,
    backgroundColor: OFF_BLACK_1
  },
  card: {
    boxShadow: '0 0 4px #000 !important',
    borderRadius: 6,
    backgroundColor: ICE_BLUE,
    cursor: 'pointer',
    width: '80%',
    paddingTop: '80%',
    position: 'relative',
    margin: '10% 10%',
    "&:hover": {
      transform: 'scale(1.05)',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
    }
  },
  icon: {
    maxWidth: '90%',
    maxHeight: '90%',
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    margin: 'auto',
    left: 0,
    right: 0,
    fill: OFF_BLACK_1,
  }
})

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const classes = this.props.classes

    const menu = (<section className={clsx(classes.menu)}>
      <a href="/" title="Home">
        <div className={clsx(classes.card)}>
          <svg className={clsx(classes.icon)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path>
          </svg>
        </div>
      </a>
      <a href="/resume" title="Resume">
        <div className={clsx(classes.card)}>
          <svg className={clsx(classes.icon)} xmlns="http://www.w3.org/2000/svg" viewBox="0, 0, 400,501.27877237851663">
            <g>
              <path d="M70.588 0.528 C 59.642 0.730,50.569 1.130,48.657 1.494 C 28.540 5.320,8.987 23.765,2.793 44.757 C 0.426 52.779,0.356 58.685,0.358 250.639 C 0.359 442.167,0.429 448.051,2.777 456.010 C 9.427 478.556,28.771 496.719,49.105 499.513 C 62.356 501.333,327.820 502.056,346.292 500.322 C 366.867 498.391,384.597 484.998,394.637 463.804 C 399.573 453.382,399.469 457.421,399.622 271.867 C 399.760 106.547,400.094 119.915,395.693 114.902 C 389.997 108.415,310.082 30.755,286.485 8.777 L 277.062 0.000 183.160 0.091 C 131.514 0.141,80.857 0.337,70.588 0.528 M256.275 45.652 C 256.301 92.822,258.758 102.812,274.325 119.027 C 290.534 135.911,298.891 138.044,349.016 138.088 L 370.410 138.107 370.168 285.038 C 369.897 448.666,369.890 448.987,366.471 455.754 C 364.064 460.520,356.564 466.962,348.962 470.794 L 346.262 472.155 201.392 471.976 C 93.084 471.842,55.876 471.645,53.964 471.198 C 45.255 469.158,36.743 461.720,31.774 451.805 L 30.179 448.623 30.179 250.604 L 30.179 52.586 32.220 48.671 C 37.411 38.717,46.029 31.459,54.287 30.090 C 58.643 29.367,109.428 28.865,190.409 28.743 L 256.266 28.645 256.275 45.652 M123.018 61.629 C 107.061 65.157,96.504 78.321,96.446 94.763 L 96.419 102.314 94.944 103.491 C 92.381 105.536,93.492 112.235,98.027 122.074 C 99.044 124.281,100.742 128.191,101.799 130.762 C 107.183 143.854,115.632 150.384,127.192 150.384 C 139.716 150.384,146.905 145.053,151.919 132.048 C 152.915 129.464,154.472 126.665,155.865 124.955 C 160.467 119.305,162.724 111.445,161.381 105.748 C 160.863 103.550,160.627 99.609,160.621 93.078 C 160.611 79.766,159.615 76.610,154.331 73.151 C 152.957 72.251,150.297 70.120,148.422 68.415 C 141.403 62.033,132.250 59.588,123.018 61.629 M102.046 151.858 C 65.667 168.580,65.577 168.681,63.968 194.629 C 63.672 199.412,63.302 204.648,63.147 206.266 L 62.865 209.207 127.596 209.207 C 163.198 209.207,192.325 209.035,192.323 208.824 C 191.915 176.572,190.264 170.682,179.937 164.633 C 176.735 162.757,152.273 150.895,151.607 150.895 C 151.102 150.895,149.232 156.019,144.014 171.697 C 141.034 180.653,138.178 188.900,137.667 190.026 L 136.740 192.072 135.717 190.026 C 135.154 188.900,133.932 185.835,133.001 183.214 L 131.308 178.449 133.943 172.984 C 138.216 164.124,136.386 160.102,128.079 160.102 C 120.218 160.102,118.211 163.927,121.739 172.184 C 124.269 178.106,124.288 179.447,121.941 186.660 C 119.451 194.310,119.215 194.182,115.869 183.376 C 108.963 161.078,105.435 150.889,104.625 150.906 C 104.332 150.913,103.171 151.341,102.046 151.858 M110.486 236.270 L 74.425 236.574 72.265 237.727 C 60.346 244.094,60.771 257.779,73.068 263.605 L 76.471 265.217 153.964 265.374 C 266.873 265.603,324.695 264.788,331.805 262.869 C 337.878 261.229,340.728 251.373,337.264 243.990 C 334.539 238.181,332.826 237.630,315.090 236.864 C 301.085 236.259,160.382 235.850,110.486 236.270 M79.795 295.144 C 64.187 296.190,58.440 309.178,68.957 319.635 L 72.756 323.414 196.353 323.110 C 319.450 322.808,329.222 322.657,332.398 321.015 C 341.869 316.117,340.033 298.228,329.840 296.088 C 324.123 294.889,96.430 294.028,79.795 295.144 M89.514 353.471 C 73.103 353.887,72.558 353.966,69.289 356.438 C 61.811 362.089,62.022 372.644,69.745 379.242 L 72.489 381.586 201.342 381.586 L 330.195 381.586 333.272 378.645 C 341.780 370.515,339.759 357.468,329.527 354.470 C 324.853 353.100,135.340 352.312,89.514 353.471 M76.857 412.298 C 62.638 413.464,57.871 426.720,67.885 437.245 L 70.332 439.817 145.046 440.144 L 219.759 440.472 223.406 436.632 C 233.904 425.581,228.697 413.426,212.972 412.276 C 205.229 411.709,83.794 411.729,76.857 412.298 "></path>
            </g>
          </svg>
        </div>
      </a>
      <a href="/travel" title="Travel">
        <div className={clsx(classes.card)}>
          <svg className={clsx(classes.icon)} xmlns="http://www.w3.org/2000/svg" viewBox="0, 0, 400,288.4422110552764">
            <g>
              <path d="M149.749 0.797 C 142.344 1.426,135.755 2.225,130.905 3.081 C 56.794 16.155,4.379 88.689,14.753 163.816 C 15.986 172.743,15.680 172.110,19.074 172.741 C 24.744 173.796,30.436 177.539,33.956 182.528 C 34.893 183.856,34.993 183.881,37.027 183.274 C 39.960 182.398,39.918 182.752,37.971 175.318 C 35.080 164.283,33.257 148.810,34.004 141.656 L 34.306 138.771 39.075 143.017 C 41.698 145.352,45.515 148.418,47.557 149.830 C 52.976 153.576,55.517 157.380,56.785 163.646 C 57.710 168.222,60.364 175.879,61.023 175.879 C 61.688 175.879,77.518 170.866,77.848 170.551 C 77.964 170.440,77.765 169.803,77.407 169.133 C 76.002 166.509,79.462 161.799,84.553 159.406 C 87.546 157.999,88.354 158.011,94.270 159.548 C 105.343 162.425,109.055 160.011,113.534 147.022 C 117.067 136.776,118.737 134.972,126.131 133.417 C 135.106 131.529,137.954 126.413,135.417 116.733 C 134.997 115.130,134.525 111.784,134.368 109.296 C 133.837 100.882,132.962 99.202,126.825 94.815 C 122.389 91.644,122.177 92.043,130.759 87.406 C 134.985 85.122,138.527 83.187,138.631 83.105 C 138.734 83.023,136.628 80.516,133.949 77.533 C 131.271 74.551,127.834 70.222,126.312 67.914 C 118.345 55.832,112.370 52.769,92.814 50.745 C 87.508 50.195,82.374 49.612,81.407 49.448 L 79.648 49.150 81.658 47.412 C 87.662 42.220,102.853 33.398,112.068 29.750 C 121.561 25.993,123.640 27.108,127.708 38.139 C 131.080 47.285,135.404 51.009,148.878 56.375 C 157.473 59.798,160.063 61.582,165.214 67.630 C 169.842 73.065,176.755 77.889,179.913 77.889 C 182.749 77.889,184.040 75.918,186.676 67.558 C 190.584 55.165,193.008 51.383,202.118 43.467 C 205.121 40.858,205.896 38.332,205.119 33.684 C 204.423 29.522,204.184 29.589,210.056 32.292 C 224.742 39.053,239.645 50.062,250.201 61.951 C 255.591 68.020,255.729 68.278,254.290 69.581 C 252.867 70.869,252.996 71.194,255.079 71.585 C 256.075 71.772,260.428 73.351,264.752 75.095 C 269.076 76.838,273.887 78.666,275.444 79.155 L 278.275 80.046 281.939 78.075 C 286.627 75.554,286.645 76.204,281.668 68.121 C 259.236 31.686,221.340 7.102,179.361 1.752 C 173.422 0.995,154.573 0.387,149.749 0.797 M255.036 13.087 C 252.957 15.103,251.256 17.133,251.256 17.597 C 251.256 20.421,261.319 30.292,289.210 54.828 C 296.941 61.629,304.262 68.084,305.478 69.173 L 307.689 71.154 305.000 73.085 C 294.943 80.311,277.811 91.457,276.763 91.457 C 275.261 91.457,259.113 87.372,255.170 85.995 C 249.078 83.867,245.487 84.133,241.902 86.979 C 236.692 91.116,237.014 92.579,244.264 97.701 C 262.894 110.866,265.259 114.792,268.648 138.173 C 270.288 149.494,270.547 150.027,274.200 149.616 C 280.745 148.878,282.323 146.454,286.775 130.311 C 288.983 122.303,290.840 116.503,291.351 116.018 C 292.228 115.185,307.397 107.098,318.423 101.585 L 324.534 98.529 324.838 100.898 C 325.005 102.201,325.704 108.920,326.393 115.829 C 329.789 149.935,333.940 174.644,336.746 177.449 C 339.057 179.761,352.171 175.890,353.771 172.424 C 354.690 170.435,357.008 142.568,359.295 106.030 C 360.842 81.318,361.107 80.637,372.044 73.297 C 382.751 66.111,386.102 63.516,390.217 59.222 C 404.772 44.036,402.652 33.668,384.992 33.668 C 376.966 33.668,370.213 35.820,356.281 42.815 C 350.339 45.799,344.784 48.371,343.938 48.531 C 342.637 48.775,338.179 46.715,315.294 35.293 C 272.549 13.957,264.049 9.925,261.256 9.656 L 258.816 9.422 255.036 13.087 M376.908 43.719 C 378.302 43.719,381.429 46.678,382.480 48.991 C 384.098 52.552,383.528 55.080,380.447 58.009 L 378.894 59.485 378.894 57.902 C 378.894 54.718,376.899 50.657,373.798 47.531 C 372.177 45.897,370.908 44.504,370.978 44.435 C 371.367 44.057,374.725 43.339,375.292 43.513 C 375.660 43.626,376.387 43.719,376.908 43.719 M215.082 79.516 C 211.021 81.697,209.869 84.767,210.273 92.335 C 210.748 101.249,209.703 102.926,202.513 104.777 C 200.716 105.239,199.173 105.689,199.083 105.778 C 198.108 106.735,205.772 109.548,209.356 109.548 L 213.339 109.548 220.865 104.738 C 230.499 98.581,229.862 99.305,228.586 95.967 C 227.136 92.175,227.435 87.038,229.301 83.699 L 230.621 81.338 227.748 80.044 C 223.471 78.120,218.100 77.896,215.082 79.516 M171.871 103.026 C 165.969 104.415,167.859 110.188,173.832 109.012 C 178.881 108.019,180.596 104.810,176.874 103.321 C 174.665 102.437,174.435 102.423,171.871 103.026 M239.196 118.653 C 186.194 153.743,107.767 187.337,33.417 206.798 C 16.378 211.257,9.064 207.983,13.833 198.032 C 16.037 193.433,16.032 193.430,11.504 196.385 C -2.640 205.618,-2.623 218.296,11.544 226.870 C 23.220 233.936,54.324 230.543,87.940 218.536 C 114.612 209.008,152.121 191.591,187.644 172.237 C 209.428 160.368,249.798 136.660,251.910 134.496 C 252.489 133.903,253.645 133.078,254.479 132.663 C 257.090 131.366,257.559 129.908,256.799 125.462 L 256.142 121.623 250.422 118.349 C 247.277 116.549,244.651 115.094,244.588 115.118 C 244.524 115.141,242.098 116.732,239.196 118.653 M300.988 127.517 C 300.490 127.616,298.902 131.188,296.515 137.579 C 290.755 152.995,288.172 156.713,280.763 160.249 C 271.913 164.473,265.945 163.795,257.603 157.619 C 257.247 157.356,251.575 160.442,242.462 165.857 C 227.292 174.871,207.302 186.353,198.871 190.896 L 193.973 193.534 190.109 199.336 C 185.473 206.298,179.218 218.479,178.457 222.027 C 177.631 225.877,178.396 228.702,183.193 239.522 C 188.696 251.936,190.971 263.611,188.065 264.533 C 172.779 269.384,142.411 268.698,123.618 263.078 C 114.517 260.356,96.809 252.644,97.795 251.831 C 98.041 251.629,100.030 250.121,102.217 248.480 C 109.464 243.044,120.471 230.861,118.677 230.263 C 118.444 230.185,113.977 231.798,108.750 233.848 C 103.523 235.897,97.839 238.080,96.120 238.699 C 92.715 239.923,92.806 239.783,91.952 245.101 C 91.258 249.422,91.537 249.334,88.008 246.345 C 86.450 245.025,84.825 243.678,84.397 243.351 C 83.784 242.884,82.925 242.976,80.376 243.784 C 78.594 244.349,73.291 245.784,68.593 246.972 C 63.894 248.161,60.050 249.378,60.050 249.677 C 60.050 252.720,84.811 269.529,98.136 275.532 C 185.650 314.956,285.753 261.067,300.983 166.332 C 303.500 150.677,303.503 127.016,300.988 127.517 M144.640 130.243 C 141.974 130.953,141.009 132.209,141.425 134.428 C 141.988 137.430,146.759 137.203,150.125 134.014 L 151.758 132.467 150.408 131.057 C 148.973 129.559,147.820 129.396,144.640 130.243 "></path>
            </g>
          </svg>
        </div>
      </a>
    </section>)

    return (
      <div className={clsx(classes.navigationBar)} >
        <p className={clsx(classes.logo)}>Michael Scully</p>
        {menu}
      </div>
    )
  }
}

Navigation.propTypes = {
  handleLogin: PropTypes.func,
  handleSignUp: PropTypes.func,
  handleLogout: PropTypes.func,
  loadingUserData: PropTypes.bool,
  error: PropTypes.object,
  setError: PropTypes.func,
  context: PropTypes.string,
  loggedIn: PropTypes.bool,
  loggedInUser: PropTypes.string,
  loggedInUserData: PropTypes.object,
  history: PropTypes.object,
  viewUser: PropTypes.object,
  pendingLoginRequest: PropTypes.bool,
  pendingSignUpRequest: PropTypes.bool,
}

export default withStyles(styles)(Navigation);