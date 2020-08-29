const puppeteer = require('puppeteer');

var startURL = "https://ca.indeed.com/jobs?q=Amazon";
startURL = "https://ca.indeed.com/jobs?q=google+software&l="
var searchWord = "java";
var keyWords = ['java','c++','python','javascript','MySQL'];

const MAX_PAGES_TO_VISIT = 10;
var pagesVisited = new Map();
var numPagesVisited = 0;
var validPages = [];
var nextPage = startURL;
var jobLinks = []; //first index is company, second is the company
crawl();


async function crawl(){
    const browser = await puppeteer.launch({headhless : true});
    const page = await browser.newPage();
    while(nextPage!==null){
        if(numPagesVisited>=MAX_PAGES_TO_VISIT){
            //console.log("Reached max limit of number of pages to visit.");
            break;
        }
        await scanPage(page,nextPage);
        for(var i =0; i<jobLinks.length;i++){
            var keyWordsFound = await isValidJob(page,jobLinks[i]);
            //console.log(jobLinks[i] + " has " + keyWordsFound + " key words.");
            if(keyWordsFound>0){
                validPages.push([keyWordsFound,jobLinks[i]]);
            }
        }
        console.log(validPages.length + " jobs found.");
    }
    validPages.sort();
    validPages.forEach((job)=>{
        console.log(job[0] + " " + job[1]);
    });

    var found = false;
    await browser.close();

}

async function isValidJob(page,jobUrl){
    //console.log("Checking " + jobUrl);
    try {
        await page.goto(jobUrl);
        var bodyText = await page.evaluate(()=>{
            var content = document.body.innerText.toLowerCase();
            /* This code is incase the program sometimes goes to a post which isnt a job post
            ----------------------------------------------------------------------------------------------------------
            var isJob = (bodyText.indexOf("qualifications") !== -1 || bodyText.indexOf("responsibilities") !== -1 ||
            bodyText.indexOf("experience") !== -1);

            var found = false;
            if(isJob){
            
            }*/ 
            

            return content;
        });

        var count = 0;
        keyWords.forEach(async function(keyWord) {
            if(bodyText.indexOf(keyWord)!==-1){
                count++;
            }
        });
        return count;

    } catch (error) {
        console.log(error.message);
    }
    return 0;

}

async function sortFunction(a,b){
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

//get job links and loads the next page
async function scanPage(page,url){
    numPagesVisited++;
    //console.log("Visiting page " + url);
    nextPage = "";
    try{
        await page.goto(url);
        var data = await page.evaluate(()=>{
            var links = [];
            var jobCards = document.body.querySelectorAll('.jobsearch-SerpJobCard');
            for(var i = 0;i<jobCards.length;i++){
                links.push(jobCards[i].querySelector('a').href);
            }
            nextPage = document.body.querySelector('a[aria-label=Next]').href;
            return [links,nextPage];
        });
        jobLinks = data[0], nextPage = data[1]; 

        //console.log("This page has " + jobLinks.length + " job posting.");
        //console.log("Next page is " + nextPage);
    }catch(err){
        console.log(err.message);
    }
}




