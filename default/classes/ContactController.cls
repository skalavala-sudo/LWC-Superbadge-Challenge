public with sharing class ContactController {

    public ContactController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<contact> getContacts() {
        throw new AuraHandledException('Forced error');
      /*  return [
            SELECT FirstName, LastName, Email
            FROM Contact
            WITH SECURITY_ENFORCED
            ORDER BY LastName
        ];*/
    }
}