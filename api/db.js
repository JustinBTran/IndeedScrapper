const typeorm = require('typeorm');

class Job {
    construct(id, jobType, title, company, location,link,bodyText){
        this.id =  id;
        this.jobType = jobType;
        this.title = title;
        this.company = company;
        this.location = location;
        this.bodyText = bodyText;
        this.link = link;
    }
}

const EntitySchema = require("typeorm").EntitySchema;

const JobSchema = new EntitySchema({
    name : "Job",
    target: Job,
    columns : {
        id: {
            primary:true,
            type: "int",
            generated: true
        },
        jobType :{
            default: "",
            type: "varchar"
        },
        title : {
            nullable:true,
            type: "text"
        },
        company: {
            nullable:true,
            type:"text"
        },
        location: {
            default: "",
            type: "varchar"
        },
        link : {
            nullable:true,
            type: "text"
        },
        bodyText: {
            nullable:true,
            type: "text"
        }
    }
});

async function getConnection(){
    return await typeorm.createConnection({
        type: "mysql",
        host : "localhost",
        port: 3306,
        username: "root",
        password: "#Capitalized1",
        database: "setupjobs" ,
        synchronize: true,
        logging: false,
        entities: [
            JobSchema
        ]
    })
}

async function getJobsByType(jobType){
    console.log("getting jobs that are for " + jobType);
    const connection = await getConnection();
    const jobRepo = connection.getRepository(Job);
    const jobs = await jobRepo.find({ where: { jobType : jobType} });
    connection.close();
    return jobs;
}

async function processJobsIntoDB(option,jobs){
  
    for(var i =0; i<jobs.length;i++){
        
        insertJob(option, jobs[i].title, jobs[i].company, jobs[i].location, jobs[i].link, jobs[i].bodyText)
    }


}

async function insertJob(jobType,title,company,location,link,bodyText){
    
    const connection = await getConnection();
    if(jobType==undefined || jobType == null){
        jobType = "";
    }
    title = title||"";
    company = company||"";
    location = location || "";
    link = link|| "";
    bodyText = bodyText||"";
   
    //create
    const job = new Job();
    //console.log(jobType);
    //console.log(title);
    //console.log(company);
    job.jobType = jobType;
    job.title = title;
    job.company = company;
    job.location = location;
    job.bodyText = bodyText;
    job.link = link;

    console.log("jobType: " + job.jobType);
    console.log("title: " + job.title);
    console.log("company: " + job.company);

    const jobRepo = connection.getRepository(Job);
    const res = await jobRepo.save(job);
    //console.log("job saved into db");
    //maybe return new list of all jobs
    connection.close();

}

module.exports = {
    getJobsByType,
    processJobsIntoDB
}
