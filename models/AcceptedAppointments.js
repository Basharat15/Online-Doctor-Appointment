import moment from "moment";
export default class AcceptedAppointmentClass {
       constructor(Id, acceptedOwnerId, docOwnerId, appointmentOwnerId, name, docTitle,  appToken, time, date  ){
              this.Id= Id
              this.acceptedOwnerId= acceptedOwnerId;
              this.docOwnerId= docOwnerId;
              this.appointmentOwnerId= appointmentOwnerId;
              this.name= name,
              this.docTitle= docTitle,
              this.appToken= appToken;
              this.time= time;
              this.date= date;

       };
       get readableDate() {
              //   return this.date.toLocaleDateString('en-EN', {
              //       year: 'numeric',
              //       month: 'long',
              //       day: 'numeric',
              //       hour: '2-digit',
              //       minute: '2-digit'
              //   });
              return moment(this.date).format('MMMM Do YYYY, hh:mm');
            }
};