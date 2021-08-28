//generate the cipher key. 15 is the number of characters we need to shift up!
const caesarKey = keyGen(15);

//ask user if they want to encode or decode
let task = '';

//lets ask this in a loop in case the user enters the wrong thing 
while(task != 'e' && task != 'd'){
   task = prompt(`Do you wish to encode or decode? 
    e - encode
    d - decode`);
}

//choose actions based on task selected 
switch(task){
    case "e":
        //user wants to encode. Ask user to enter a string
        let stringToEncode = prompt("Enter the human-readable string you which to encipher");
        //print the readable input and the encoded output
        console.log(`"${stringToEncode}" encoded is:
"${encode(stringToEncode, caesarKey)}"`);
    break;
    case "d":
        //user wants to decode. Ask user to enter a ciphered string
        let stringToDecode = prompt("Enter the caesar-ciphered string you which to decipher");
        //print the encoded input and the decoded output
        console.log(`"${stringToDecode}" decoded is:
"${decode(stringToDecode, caesarKey)}"`);        
    break;

}


//function to create a map of key value pairs for all the character switches
//the key uses ascii codes as they provided an ordered mechanism to represent the alphabet
function keyGen(variance){                      //variance is the number of characters we will be shifting. ie 15 as per the brief.
    let theKey = new Map(); 
    series('A', 'Z', 15, theKey);               //add all uppercase ascii codes to the map
    series('a', 'z', 15, theKey);               //add all lowercase ascii codes to the map
    
    //method to loop through ascii numbers from first and last provided and add to the map.
    function series(start, end, variance, map){
        const startcode = start.charCodeAt(0);  //get the ascii char for first letter ie 'a' or 'A';
        const endcode = end.charCodeAt(0);      //get the ascii char for last letter ie 'z' or 'Z';
        charCount = endcode - startcode;        //determine the length of the loop 
        let k = startcode+variance;             //eg A = 65+15=80
        for(i = 0; i<=charCount; i++){       
            if(k == startcode+charCount+1){     //we have passed the end of our ascii alphabet ie at 'z' and must reset to the start
                k = startcode;    
            }
            map.set(i+startcode, k);            //add the key value pair to the map;
            k++; 
        }    
    }    
    return theKey;
}

//the function to encode the cipher
function encode(string, caesar){                //pass in the string to be coded and the cipherkey
    let encodedArray = []; 
    for(i = 0; i<string.length; i++){           //loop through the string
        key = string.charCodeAt(i);             //get the ascii char for each character
        if(caesar.has(key)){                    //check if this ascii char is a key in our cipher
            encodedArray.push(caesar.get(key)); //if yes add the value of that key onto our encoded array
        } else {
            encodedArray.push(key);             //otherwise its probably a space or punctuation, add as is
        }
    }
    return asciiArraytoAlphaString(encodedArray); //see function below that makes an alpha string from the ascii array 
}

//this is a little bonus function to decipher a string
//because Katherine Van As is an over-achiever
//and really likes getting lots of HyperionDev Stars!
function decode(string, caesar){
    let decodedArray = [];
    for(i = 0; i<string.length; i++){       //loop through the encoded string
        value = string.charCodeAt(i);       //get the ascii code for each character       
        inKey = false;                      //boolean that will tell us if the ascii number exists in the cipherkey
        for(let [k,v] of caesar.entries()){ //loop through the cipher key
            if(value == v){                 //check if the current ascii code is a value in the cipherkey
                decodedArray.push(k);       //yes so append the key onto our decode array    
                inKey = true;               //set our boolean test to true
                break;                      //break out of this loop then for the sake of performance
            } 
        }
        if(!inKey){                         //if our boolean test is false then the char is a space or punctuation
            decodedArray.push(value);       //therefore add it as is       
        }
    }
   return asciiArraytoAlphaString(decodedArray);
}

//this function is used by both encode and decode functions to generate an 
//alphabetical string from an array of ascii codes
function asciiArraytoAlphaString(asciiArr){
    let alphaString = '';                   //create empty string
    for(i = 0; i<asciiArr.length; i++){     //loop through the encoded or decoded array
        alphaString+= String.fromCharCode(asciiArr[i]); //and add the alphabetical character assigned to the ascii number to the string
    }    
    return alphaString; 
}
