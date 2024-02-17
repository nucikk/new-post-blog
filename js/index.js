const checkLang = () => {
    let defaultLang = "ka";
    let currentLang = getData("lang");
    if(!currentLang) {
        setData("lang", defaultLang);
        return "ka";
    } 
    return currentLang;
}

const changeLang = () => {
    let currentLang = getData("lang");
    let newLang = currentLang === "ka" ? "en" : "ka";
    setData("lang", newLang);
    generateLangs();
}

// ფუნქცია ენების შეცვლის
function generateLangs() {
    let lang = checkLang();
    let addNewEntry = document.getElementById("addNewEntry");
    let newEntryTitle = document.getElementById("newEntryTitle");
    let newEntryContent = document.getElementById("newEntryContent");
    let submitNewEntry = document.getElementById("submitNewEntry");
    let changeLang = document.getElementById("changeLang");

    addNewEntry.innerText = langs[lang].addNewEntry;
    newEntryTitle.setAttribute('placeholder', langs[lang].newEntryTitle);
    newEntryContent.setAttribute('placeholder', langs[lang].newEntryContent);
    submitNewEntry.innerText = langs[lang].submitNewEntry;
    changeLang.innerText = lang;

}

//REVIEW -  ელემენტებზე ტექსტის მინიჭების ფუნქცია

const general = () => {
    generateLangs();
}

general(); 
