// Q.1 Write an asynchronous function that accepts a message string and a delay time in milliseconds. 
//The function should log the message to the console after the specified delay time.


async function delayedMessage(message, delayTime) {
    await new Promise(resolve => setTimeout(resolve, delayTime));
    console.log(message);
}

delayedMessage("I must make it!", 3000);


//Q.2 You have an array of user IDs and a function getUserData(id) that returns a Promise with user data when given a user ID. 
//Write an asynchronous function that fetches and logs the data for each user ID one by one, in sequence.

function getUserData(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: id, userName: `user ${id}` }), 3000);
    });
}

async function fetchUserData(userIds) {
    for (let id of userIds) {
        let userData = await getUserData(id);
        console.log(userData);
    }
}

fetchUserData([1,2,3,4,5,6]);

//Q.3 You have an asynchronous function performTask() that returns a Promise. The Promise resolves if the task is successful and rejects if there's an error.
// Write a function that calls performTask() and logs a custom success message if the task is successful, and a custom error message if there's an error.

const task = false;
const myPromise = new Promise((resolve, reject)=>{
    if(task){
        resolve ("Get a a well paying job");
    }
    else{
       reject("keep applying")
    }
});

myPromise.then((response)=>{
    console.log('Task was successful');
})
.catch((error)=>{
    console.log('Task was not successful'); 
})
console.log({myPromise});

async function performTask(){
    try{
        await myPromise;
        console.log("made it");
    }
    catch{
        console.log("keep trying");
    }
}
performTask();

// Q.4 Write a function unstableTask that:

// 1.Accepts a taskName and failureProbability (a number between 0 and 1).
// 2. Returns a Promise that:
// Resolves immediately with a success message if a randomly generated number is greater than failureProbability.
// Rejects immediately with a failure message if a randomly generated number is less than or equal to failureProbability.

// Write another function executeWithRetry that:
// Accepts a taskName, retries, and failureProbability.
// Uses a retry mechanism to attempt the unstableTask up to retries times.
// Logs whether the task succeeded or failed after all attempts.


function unstableTask(taskName, failureProbability) {
    return new Promise((resolve, reject) => {
        const randomValue = Math.random();
        if (randomValue > failureProbability) {
            resolve(`${taskName} succeeded`);
        } else {
            reject(`${taskName} failed`);
        }
    });
}


async function executeWithRetry(taskName, retries, failureProbability) {
    let attempt = 0;
    while (attempt < retries) {
        try {
            const result = await unstableTask(taskName, failureProbability);
            console.log(result);
            return;
        } catch (error) {
            console.log(`Attempt ${attempt + 1}: ${error}`);
            attempt++;
        }
    }
    console.log(`${taskName} failed after ${retries} attempts.`);
}

executeWithRetry("SampleTask", 3, 0.5);

