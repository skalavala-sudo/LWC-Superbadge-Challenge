import { LightningElement,track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'

export default class BoatSearch extends NavigationMixin(LightningElement) {
    @track isLoading = false;

    // Handles loading event
handleLoading() {
    this.isLoading = true;
    }

   // Handles done loading event
   handleDoneLoading() {
    this.isLoading = false;
   }

    searchBoats(event) {
        const boatTypeId = event.detail.boatTypeId;
        this.template.querySelector("c-boat-search-results").searchBoats(boatTypeId);
      }

    createNewBoat() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Boat__c',
                actionName: 'new'
            }
        });
    }
}