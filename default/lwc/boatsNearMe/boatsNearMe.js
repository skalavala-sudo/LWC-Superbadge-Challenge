import { LightningElement,track,wire,api } from 'lwc';
import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const LABEL_YOU_ARE_HERE = 'You are here!';
const ICON_STANDARD_USER = 'standard:user';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';

export default class BoatsNearMe extends LightningElement {

    @api boatTypeId;
    @track mapMarkers = [];
    @track isLoading = true;
    @track isRendered = false;
    latitude;
    longitude;

    @wire(getBoatsByLocation, { latitude: '$latitude', longitude: '$longitude', boatTypeId: '$boatTypeId'})
        wiredBoatsJSON({ error, data }) {
        if (data) {
        this.createMapMarkers(data);
        } else if (error) {
        this.dispatchEvent(
        new ShowToastEvent({
        title: ERROR_TITLE,
        message: error.body.message,
        variant: ERROR_VARIANT
        })
        );
        this.isLoading = false;
        }
    }

    createMapMarkers(boatData) {
        this.mapMarkers = boatData.map(rowBoat => {
        return {
        location: {
        Latitude: rowBoat.Geolocation__Latitude__s,
        Longitude: rowBoat.Geolocation__Longitude__s
        },
        title: rowBoat.Name,
        };
        });
        this.mapMarkers.unshift({
        location: {
        Latitude: this.latitude,
        Longitude: this.longitude
        },
        title: LABEL_YOU_ARE_HERE,
        icon: ICON_STANDARD_USER
        });
        this.isLoading = false;
        }

        getLocationFromBrowser() {
            navigator.geolocation.getCurrentPosition(
            (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            },
            (e) => {
            }, {
            enableHighAccuracy: true
            }
            );
        }

        renderedCallback() {
            if (this.isRendered == false) {
            this.getLocationFromBrowser();
            }
            this.isRendered = true;
        }



}