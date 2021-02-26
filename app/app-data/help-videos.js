define(function () { 'use strict';

    var helpVideos = {
    	"country-profile": {
    		url: "https://www.youtube.com/watch?v=6eDBShJMWfI",
    		heading: "Country profiles",
    		desc: "One of the most convenient ways to access national information in the ABSCH is through the country profiles. Each country profile contains all the national information that has been made available by that country and it can provide information on the institutional structures and legislative, administrative or policy measures in place for implementing the Nagoya Protocol."
    	},
    	matrix: {
    		url: "https://www.youtube.com/watch?v=IwyrMQKDZ3o",
    		heading: "ABS Measures Matrix",
    		desc: "The ABS measures matrix is located on a country's profile page inside the section on legislative, administrative or policy measures on ABS (ABS measures). Expanding this section will reveal all the country's published ABS measures, as well as, a table of information that lists key ABS elements and where the related references to those elements can be found in all published measures. This can help provide an overview of a country’s legal framework on ABS and can be a useful tool to help users of genetic resources understand and comply with a country's ABS requirements"
    	},
    	"search-matrix": {
    		url: "https://www.youtube.com/watch?v=IwyrMQKDZ3o",
    		heading: "ABS Measures Matrix",
    		desc: "The ABS measures matrix is located on a country's profile page inside the section on legislative, administrative or policy measures on ABS (ABS measures). Expanding this section will reveal all the country's published ABS measures, as well as, a table of information that lists key ABS elements and where the related references to those elements can be found in all published measures. This can help provide an overview of a country’s legal framework on ABS and can be a useful tool to help users of genetic resources understand and comply with a country's ABS requirements"
    	},
    	"search-search": {
    		url: "https://www.youtube.com/watch?v=YaX_llUfBts",
    		heading: "Search using the ABSCH",
    		desc: "The search page is where you will find all available information on the ABSCH. On the search page, records are organized into three categories (national records, reference records and SCBD records) and displayed in separate tabs. All record categories can be searched simultaneously by using a combination of free-text filters and predefined filters. By default, no filters are set and all records are displayed under each record category tab. The search results can be narrowed down using combinations of filters giving users the flexibility to retrieve a very wide or a very narrow set of results. The filters available are: free text (user entered text), record type, Party status, keywords, countries, regions and groups and the date the record was published."
    	},
    	"search-uid": {
    		url: "https://www.youtube.com/watch?v=78pRh1LbDj4",
    		heading: "Search by Unique Identifer",
    		desc: "A unique identifier (UID) can be typed into the search and used as a filter either to find a particular record or to get a list of records that reference a particular record. For example, this can be useful if you were looking for all IRCCs issued by a specific CNA. To carry out this particular search you could select the national record type: “Internationally Recognized Certificate of Compliance” from the set of predefined national record filters and enter the UID of the competent national authority as a free text filter. The UID can be entered with or without the revision number (the last set of digits that make up the UID). If revision number is included then only the records that reference that specific version of the CNA will be returned. When the revision number is omitted from the search filter then all records that make reference to any published version of that CNA will be returned."
    	},
    	"search-report": {
    		url: "https://www.youtube.com/watch?v=wOe4hUt66K4",
    		heading: "Report record",
    		desc: "In an effort to keep records reliable the report record feature may be used to inform the Secretariat when records may contain out-dated, inaccurate information, or broken links. To report a record click on the \"reportrecord\" link found at the bottom of each expanded record and complete the short submission form providing your reason for reporting the record. The Secretariat receives all reported records and addresses them in consultation with the country’s PA or NFP only as appropriate. Please note that the Secretariat will never modify any national information without the explicit permission of the country's PA."
    	},
    	"new-account": {
    		url: "https://www.youtube.com/watch?v=hv7Kgx0bjdc",
    		heading: "Create an CBD account",
    		desc: "Go to accounts.cbd.int/signup and fill out the simple form to obtain your CBD account. You will need access to a valid email account in order to validate your CBD account before you will be able to submit information to the ABSCH."
    	},
    	"sign-in": {
    		url: "https://www.youtube.com/watch?v=nAHFkAJZt1w",
    		heading: "Signing in to the ABSCH",
    		desc: "Please take a moment to sign in to absch.cbd.int and verify that your profile information is up-to-date and complete."
    	},
    	"old-account": {
    		url: "https://www.youtube.com/watch?v=IqoVH8IVsvI",
    		heading: "Recover a forgotten password",
    		desc: "If you don’t know if you have a CBD account or if you have forgotten your password, you can go to accounts.cbd.int/password/reset to reset your password."
    	},
    	"forgot-password": {
    		url: "https://www.youtube.com/watch?v=IqoVH8IVsvI",
    		heading: "Recover a forgotten password",
    		desc: "If you don’t know if you have a CBD account or if you have forgotten your password, you can go to accounts.cbd.int/password/reset to reset your password."
    	},
    	"user-management": {
    		url: "https://www.youtube.com/watch?v=sBYKAuS6TBA",
    		heading: "User management",
    		desc: "The ABSCH's user management page provides functionality for national focal points (NFP) and publishing authorities (PA) to manage which users are nationally authorized to view, create and publish national records on behalf of a country."
    	},
    	dashboard: {
    		url: "https://www.youtube.com/watch?v=s6xLer37R5M",
    		heading: "Record submission dashboard",
    		desc: "Once signed in, clicking on \"Submit\" located in the main navigation bar will take you to your Record Management Centre. The first page you will see when you arrive at the Record Management Centre is your dashboard. Your dashboard displays information on your CBD Account and provides an overview of the status (draft, request, or published) of all your ABSCH records. Through the dashboard you can access the submission forms and all the ABSCH records you are working on. All national records are shared and visible to all national users (NFP, PA, NAUs). However, the draft reference records you create are private and only visible to you."
    	},
    	notification: {
    		url: "https://www.youtube.com/watch?v=nYHA8yuTx5c",
    		heading: "Requests and notifications",
    		desc: "The ABSCH's request and notification system helps users of the ABSCH stay informed about pending publishing requests or changes to the status of their records. This system has been developed to assist publishing authorities address requests promptly and help ensure information in the ABSCH is kept up-to-date and are reliable."
    	},
    	"email-alerts": {
    		url: "https://www.youtube.com/watch?v=DjRtgYxyeJg",
    		heading: "Email alerts",
    		desc: "The ABSCH allows registered users to set up personalized email alerts when records are published. Email alerts can be set up under the \"preferences\" tab on the submit page."
    	},
    	helpdesk: {
    		url: "https://www.youtube.com/watch?v=yiASMdKJY8A",
    		heading: "How to get help",
    		desc: "Need help or have questions? We are happy to provide technical support, answer questions, and receive feedback on the use of the ABSCH. "
    	}
    };

    return helpVideos;

});
