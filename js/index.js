// default ენის შემოწმება
const checkLang = () => {
    let defaultLang = "ka";
    let currentLang = getData("lang");
    if(!currentLang) {
        setData("lang", defaultLang);
        return "ka";
    } 
    return currentLang;
}

// ენის დაყენების ფუნქციონირების გადართვა
const changeLang = () => {
    let currentLang = getData("lang");
    let newLang = currentLang === "ka" ? "en" : "ka";
    setData("lang", newLang);
    generateLangs();
}
const processHTMLForEntry = (entry, entriesContainer) => {
    let entryContainer = document.createElement("div");
    entryContainer.classList.add("entry");
    let entryTitle = document.createElement("h3");
    entryTitle.classList.add("entry-title");
    entryTitle.innerText = entry.title;
    let entryContent = document.createElement("p");
    entryContent.classList.add("entry-content");
    entryContent.innerText = entry.content;
    entryContainer.appendChild(entryTitle);
    entryContainer.appendChild(entryContent);
    entriesContainer.appendChild(entryContainer);
}

const generateEntries = () => {
    let entries = getData("entries");
    let entriesContainer = document.getElementById("entries");

    if(entries) {
        entriesContainer.innerHTML = "";
        entries.forEach((entry) => {
            processHTMLForEntry(entry, entriesContainer);
        })
    }
}
// ენების შეცვლის ფუნქცია
const generateLangs = () => {
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


const addNewEntry = () => {
    let newEntryModal = document.getElementById("newEntryModal");   
     document.body.classList.add("modal-open");
    newEntryModal.style.display = "flex";
}

const closeModal = () => {
    let newEntryModal = document.getElementById("newEntryModal");
    document.body.classList.remove("modal-open");
    newEntryModal.style.display = "none";
}
const submitNewEntry = () => {
    let newEntryTitle = document.getElementById("newEntryTitle");
    let newEntryContent = document.getElementById("newEntryContent");
    let entriesContainer = document.getElementById("entries"); 
    
    let data = {
        title: newEntryTitle.value,
        content: newEntryContent.value
    }        
    
    let entries = getData("entries") || []; 

     entries.push(data)
     setData("entries", entries);     

     processHTMLForEntry(data, entriesContainer);

     newEntryTitle.value = "";
     newEntryContent.value = "";
     closeModal();

}




//REVIEW -  ელემენტებზე ტექსტის მინიჭების ფუნქცია
const general = () => {
    generateLangs();
    generateEntries();
}

general(); 
