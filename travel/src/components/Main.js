import React from 'react';
import Gallery from "react-photo-gallery";
import { Modal } from 'reactstrap';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx'
import RingLoader from "react-spinners/RingLoader";
import { PropTypes } from 'prop-types'

import Navigation from './Navigation'
import Map from './Map.js';
import Table from './Table.js'
import ImageViewer from './ImageViewer';
import { place_colors, city_colors, FONT_GREY, ICE_BLUE, OFF_BLACK_1, OFF_BLACK_2, OFF_BLACK_3, OFF_BLACK_5 } from '../utils/Colors';
import { getDistanceBetweenTwoPoints } from '../utils/Formulas';

import { DEFAULT_CENTER, GRANULARITY_CUTOFF } from '../utils/Constants'

const styles = theme => ({
  page: {
    backgroundColor: OFF_BLACK_5,
    color: FONT_GREY,
    paddingBottom: '10vh'
  },
  main: {
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "3fr 2fr",
    width: '90vw',
    marginLeft: '7.5vw',
    boxShadow: `0 0 20px ${OFF_BLACK_1}`
  },
  modalContent: {
    border: 'none',
    height: '100%',
    backgroundColor: "transparent"
  },
  infoDiv: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '6fr 4fr',
    height: '30vh',
    alignItems: 'center'
  },
  title: {
    color: ICE_BLUE,
    fontFamily: 'aguafina-script',
    fontSize: '6vw',
    paddingLeft: "20%", 
  },
  factDiv: {
    fontSize: '1.5vw',
    color: ICE_BLUE,
  },
  factLine: {
    textIndent: 20,
    margin: 0,
    textAlign: 'left'
  },
  noImages: {
    color: FONT_GREY,
    fontSize: "80px",
    paddingTop: "20%",
    paddingBottom: "25%",
    textAlign: "center",
    backgroundColor: "rgba(40, 40, 40, .6)",
    marginTop: "5%",
    visibility: 'visible'
  }
})

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //General
      selectedCity: null,
      selectedPlace: null,
      hoverIndexCity: null,
      hoverIndexPlace: null,

      //view
      viewUser: "",
      viewCities: [],
      viewPlaces: [],

      //Map
      granularity: 1,
      mapZoom: 4,
      mapCenter: {
        lat: DEFAULT_CENTER.lat,
        lng: DEFAULT_CENTER.lng,
      },
      closestCity: null,

      //Gallery
      galleryOpen: false,
      preparedImages: [],

      //ImageViewer
      imageViewerOpen: false,
      currImg: null,
    }
  }

  componentDidMount = () => {
  }

  changeHoverIndexCity = (index) => {
    this.setState({
      hoverIndexCity: index,
    })
  }

  changeHoverIndexPlace = (index) => {
    this.setState({
      hoverIndexPlace: index
    })
  }

  setClosestCity = (destinations, centerLat, centerLong) => {
    var lowest = 99999999, lowestIndex = null, distance

    if (destinations.length > 0)
      destinations.forEach((obj, i) => {
        distance = getDistanceBetweenTwoPoints(centerLat, centerLong, obj.latitude, obj.longitude);
        if (distance < lowest) {
          lowest = distance;
          lowestIndex = i
        }
      })

    const closestCity = { ...destinations[lowestIndex], distanceFromMapCenter: lowest }

    this.setState({
      closestCity: closestCity
    })

    return closestCity
  }

  //This is passed up to App.js
  setPreparedImages = (images) => {
    this.setState({
      preparedImages: images
    })
  }

  //Map Functions
  changeGranularity = (zoom) => {
    this.setState({
      granularity: zoom > GRANULARITY_CUTOFF ? 0 : 1,
      mapZoom: zoom,
    })
  }

  changeMapCenter = (obj) => {
    this.setState({
      mapCenter: {
        lat: obj.latitude,
        lng: obj.longitude
      }
    })
  }

  onMarkerClick = (obj) => {
    const photos = this.props.photos;
    if (this.state.granularity === 1) {
      this.changeMapCenter(obj)
      this.changeGranularity(GRANULARITY_CUTOFF + 1)
      this.changeHoverIndexCity(null)
      this.setState({
        selectedCity: obj,
      })
    } else if (this.state.granularity === 0) {
      this.setState({
        selectedPlace: obj,
        preparedImages: obj.destination_id in photos && obj.place_id in photos[obj.destination_id] ? photos[obj.destination_id][obj.place_id] : [],
        galleryOpen: true,
      })
    }
  }

  //Table Functions
  tableRowClick = (obj, e) => {
    const data = obj.rowData;
    const photos = this.props.photos;
    if (this.state.granularity === 1) {
      this.setState({
        selectedCity: obj.rowData,
        //The kill attribute make sure that an icon within the row isn't being clicked
        mapZoom: obj.event.target.getAttribute("value") !== "KILL" ? 12 : this.state.mapZoom,
        granularity: 1,
        hoverIndexCity: null
      })
    } else if (this.state.granularity === 0) {

      this.setState({
        selectedPlace: data,
        preparedImages: data.destination_id in photos && data.place_id in photos[data.destination_id] ? photos[data.destination_id][data.place_id] : [],
        //The kill attribute make sure that an icon within the row isn't being clicked
        galleryOpen: obj.event.target.getAttribute("value") !== "KILL" ? true : false,
      })
    }
  }

  cityGallery = (obj) => {
    var images = []
    Object.values(this.props.photos[obj.destination_id] ? this.props.photos[obj.destination_id] : []).forEach(x =>{
      images = images.concat(x);
    })
    this.setState({
      preparedImages: images,
      galleryOpen: true
    })
  }


  //Gallery Functions
  toggleGallery = (value) => {
    const boolean = typeof (value) === 'boolean' ? value : !this.state.galleryOpen;
    this.setState({
      galleryOpen: boolean
    })
  }

  galleryOnClick = (event, obj) => {
    this.setState({
      galleryOpen: false,
      currImg: obj.index,
      imageViewerOpen: true
    })
  }

  //Image Viewer Functions
  toggleViewer = (value) => {
    const boolean = typeof (value) === 'boolean' ? value : !this.state.imageViewerOpen;
    this.setState({
      imageViewerOpen: boolean,
      galleryOpen: boolean ? false : true,
    })
  }

  recenter = () => {
    var viewCities = this.props.owner ? this.props.loggedInInfo.userCities : this.state.viewCities
    const coords = {
      latitude: viewCities.length > 0 ? viewCities[0].latitude : DEFAULT_CENTER.lat,
      longitude: viewCities.length > 0 ? viewCities[0].longitude : DEFAULT_CENTER.lng
    }
    this.changeMapCenter(coords)
    this.changeGranularity(4)
  }


  render() {
    const classes = this.props.classes;
    var destinations = this.props.destinations;
    var places = this.props.places;
    var albums = this.props.albums;

    if (this.props.ready) {
      return (
        <div className={clsx(classes.page)}>
          <Navigation />
          <div>
            <div className={clsx(classes.infoDiv)}>
              <p className={clsx(classes.title)}>My Travel Map</p>
              <div className={clsx(classes.factDiv)}>
                <p className={clsx(classes.factLine)} style={{ textIndent: 0 }}>{"I've Visited: "}</p>
                <p className={clsx(classes.factLine)}>{`${[...new Set(this.props.destinations.map(el => el.country_code))].length} Countries`}</p>
                <p className={clsx(classes.factLine)}>{`${this.props.destinations.filter(el => el.type === 1).length} Cities`}</p>
                <p className={clsx(classes.factLine)}>{`${this.props.destinations.filter(el => el.type === 2).length} National Parks`}</p>
              </div>
            </div>

            <div className={clsx(classes.main)}>
              <Map
                center={this.state.mapCenter}
                zoom={this.state.mapZoom}
                destinations={destinations}
                places={places}
                hoverIndex={this.state.granularity ? this.state.hoverIndexCity : this.state.hoverIndexPlace}
                changeHoverIndex={this.state.granularity ? this.changeHoverIndexCity : this.changeHoverIndexPlace}
                closestCity={this.state.closestCity}
                setClosestCity={this.setClosestCity}
                markerClick={this.onMarkerClick}
                granularity={this.state.granularity}
                changeMapCenter={this.changeMapCenter}
                changeGranularity={this.changeGranularity}
              />

              <Table
                cities={destinations}
                places={places}
                albums={albums}
                hoverIndex={this.state.granularity ? this.state.hoverIndexCity : this.state.hoverIndexPlace}
                changeHoverIndex={this.state.granularity ? this.changeHoverIndexCity : this.changeHoverIndexPlace}
                tableRowClick={this.tableRowClick}
                granularity={this.state.granularity}
                selectedCity={this.state.selectedCity}
                closestCity={this.state.closestCity}
                mapCenter={this.state.mapCenter}
                changeMapCenter={this.changeMapCenter}
                onCityGalleryClick={this.cityGallery}
                place_colors={place_colors}
                city_colors={city_colors}
              />
            </div>

            <Modal
              isOpen={this.state.galleryOpen}
              toggle={this.toggleGallery}
              size={"xl"}
              style={{ backgroundColor: "transparent" }}
              contentClassName={clsx(classes.modalContent)}
            >

              {this.state.preparedImages.length > 0 ?
                <Gallery photos={this.state.preparedImages} onClick={this.galleryOnClick} /> :
                <div className={clsx(classes.noImages)}>No Images...</div>
              }
            </Modal>

            {this.state.imageViewerOpen ?
              <ImageViewer
              owner={this.props.owner}
              isOpen={this.state.imageViewerOpen}
              toggleViewer={this.toggleViewer}
              toggleGallery={this.toggleGallery}
              views={this.state.preparedImages}
              currentIndex={this.state.currImg}
              /> : null
            }
          </div>
        </div>
      )
    } else {
      return (
        <div style={{
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: "#000000",
        }}>
          <RingLoader
            color={ICE_BLUE}
            loading={true}
            css={`margin: auto; background-color: #000000; top: ${(window.innerHeight - 500) / 2.5}px`}
            size={300}
          />
          <p style={{
            position: 'absolute',
            left: 0,
            right: 0,
            color: ICE_BLUE,
            textAlign: 'center',
            fontSize: 50,
            bottom: window.innerHeight * .1,
            opacity: .7
          }}>Loading...</p>
        </div>
      )
    }
  }
}

Main.propTypes = {
  destinations: PropTypes.array,
  places: PropTypes.array,
  ready: PropTypes.bool
}

export default withStyles(styles)(Main);