import moment from "moment";
export default class AppointmentClass {
       constructor(Id, ownerId, docOwnerId, docTitle, docCategory, docImageUrl, name, age, problem, phoneNum, time, date ){
              this.Id= Id
              this.ownerId= ownerId;
              this.docOwnerId= docOwnerId;
              this.docTitle= docTitle;
              this.docCategory= docCategory;
              this.docImageUrl= docImageUrl;
              this.name= name;
              this.age= age;
              this.problem= problem;
              this.phoneNum= phoneNum;
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
