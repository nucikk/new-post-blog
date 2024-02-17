// ამოწმებს არის თუ არა კონკრეტული key localStorage-ში
const exists = (key) => {
    return localStorage.getItem(key) !== null;
}
// ამოიღებს მოცემულ გასაღებთან დაკავშირებულ მნიშვნელობას localStorage-დან
const getData = (key) => {
   if(exists(key)) {
    return JSON.parse(localStorage.getItem(key)); //NOTE - JSON.parse-ის გამოყენებით  აბრუნებს მიღებულ ობიექტს
   } 
   return null; //არარსებობის შემთხვევაში დააბრუნებს null-ს
}

// ინახავს key - value წყვილს localStorage-ში
const setData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}