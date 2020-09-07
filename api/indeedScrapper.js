const puppeteer = require('puppeteer');

var URL = "https://ca.indeed.com/jobs?q=junior+developer&l=";

//crawl(URL);
scrapeIndeed("Junior Developer",undefined);
async function scrapeIndeed(option, location){
    if(location == undefined){
        location = "";
    }
    const startURL = await convertToURL(option,location);
    //console.log(startURL);
    var jobLinks = await crawl(startURL);
    return jobLinks;
}

async function convertToURL(option,location){
    option = option.replace(' ', '+');
    return "https://ca.indeed.com/jobs?q=" + option + "&l=" + location;
}

async function crawl(startURL){
    const MAX_PAGES_TO_VISIT = 3;
    var numPagesVisited = 0;
    var returnData = {jobs: []}
    var nextPage = startURL;
    var jobLinks = []; //first index is the link, second is the company
    const browser = await puppeteer.launch({headhless : true});
    const page = await browser.newPage();

    while(nextPage!==null){
        if(numPagesVisited>=MAX_PAGES_TO_VISIT){
            //console.log("Reached max limit of number of pages to visit.");
            break;
        }
        [jobLinks,nextPage] = await scanPage(page,nextPage);
        numPagesVisited++;
        for(var i =0; i<jobLinks.length;i++){
            /*var keyWordsFound = await isValidJob(page,jobLinks[i][0]);
            //console.log(jobLinks[i] + " has " + keyWordsFound + " key words.");
            if(keyWordsFound>=MinimumMatchingWords){
                var data = {}
                returnData.push([keyWordsFound,jobLinks[i][0],jobLinks[1]]);
            }*/
            //console.log(jobLinks[i]);
            var bodyContent = await getBodyContent(page,jobLinks[i].link)
            jobLinks[i].bodyText = bodyContent;
            //console.log(jobLinks[i]);
            returnData.jobs.push(jobLinks[i]);

        }
        console.log(returnData.jobs.length + " jobs found.");
    }

    await browser.close();
    return returnData.jobs;
}

//get job links and loads the next page
async function scanPage(page,url){
    //console.log("Visiting page " + url);
    var nextPage = "", jobLinks = [];
    try{
        await page.goto(url);
        var data = await page.evaluate(()=>{
            var links = [];
            var jobCards = document.body.querySelectorAll('.jobsearch-SerpJobCard');
            for(var i = 0;i<jobCards.length;i++){
                var jobData = {
                    title : jobCards[i].querySelector('.title').querySelector('a').title,
                    company :  jobCards[i].querySelector('.company').textContent,
                    link : jobCards[i].querySelector('a').href,
                    location : jobCards[i].querySelector('.location').textContent,
                };

                links.push(jobData);
            }
            nextPage = document.body.querySelector('a[aria-label=Next]').href||"end";
            return [links,nextPage];
        });
        jobLinks = data[0], nextPage = data[1]; 

        //console.log("This page has " + jobLinks.length + " job posting.");
        //console.log("Next page is " + nextPage);
    }catch(err){
        console.log(err.message);
    }
    return [jobLinks, nextPage];
}

async function getBodyContent(page, jobURL){
    try{
        await page.goto(jobURL);
        var bodyText = await page.evaluate(()=>{
            var content = document.body.innerText;
            return content;
        });
        return bodyText;
    } catch(error){
        console.log(error.message);
    }
    return "";
}


async function isValidJob(page,jobUrl){
    //console.log("Checking " + jobUrl);
    try {
        await page.goto(jobUrl);
        var bodyText = await page.evaluate(()=>{
            var content = document.body.innerText;
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

module.exports = {
    scrapeIndeed
}