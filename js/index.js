//^REVIEW -  default ენის შემოწმება
const checkLang = () => {
    let defaultLang = "ka";
    let currentLang = getData("lang");
    if (!currentLang) {
        setData("lang", defaultLang);
        return "ka";
    }
    return currentLang;
}

//^REVIEW -  ენის შეცვლის გადართვა
const changeLang = () => {
    let currentLang = getData("lang");
    let newLang = currentLang === "ka" ? "en" : "ka";
    setData("lang", newLang);
    generateLangs();
}

//^REVIEW -  popupის გახსნა 
const addNewEntry = () => {
    let elementID = document.getElementById("elementID");
    let submitButton = document.getElementById("submitNewEntry");
    submitButton.innerText = elementID.value ? langs[checkLang()].editEntry : langs[checkLang()].submitNewEntry;
    let newEntryModal = document.getElementById("newEntryModal");
    document.body.classList.add("modal-open");
    newEntryModal.style.display = "flex";

    let entriesContainer = document.getElementById("entries");
    submitButton.onclick = () => submitNewEntry(entriesContainer);
}
//^REVIEW -  popupის დახურვა 
const closeModal = () => {
    let newEntryModal = document.getElementById("newEntryModal");
    let newEntryTitle = document.getElementById("newEntryTitle");
    let newEntryContent = document.getElementById("newEntryContent");
    document.body.classList.remove("modal-open");
    newEntryModal.style.display = "none";
    newEntryTitle.value = "";
    newEntryContent.value = "";
    elementID.value = ""
}

const generateId = () => {
    let entries = getData('entries');
    if (entries && entries.length > 0) {
        entries = entries.sort((a, b) => {
            return a.id - b.id;
        })
        return entries[entries.length - 1].id + 1;
    }
    return 1;
}



//^ პოსტის წაშლის  ფუნქცია
const deleteEntry = (id) => {
    let entries = getData("entries")
    let filteredEntries = entries.filter(entry => entry.id != id);
    setData("entries", filteredEntries);
    //& იპოვოს შესაბამისი აიდის მქონე პპოსტი და წაშალოს
    let entryContainer = document.getElementById(`entry-${id}`);
    entryContainer.remove();
}

//^REVIEW -  ახალი ჩანაწერის გაგზავნა localStorage-ში
const submitNewEntry = (entriesContainer) => {
    let elementID = document.getElementById("elementID");
    if (elementID.value) {
        return submitEditedEntry(entriesContainer);
    }

    let newEntryTitle = document.getElementById("newEntryTitle");
    let newEntryContent = document.getElementById("newEntryContent");

    let date = new Date();
    let data = {
        id: generateId(),
        date: (date.getTime() / 1000) + "/" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
        title: newEntryTitle.value,
        content: newEntryContent.value
    }

    let entries = [];

    entries.push(data)
    setData("entries", entries);

    processHTMLForEntry(data, entriesContainer);

    newEntryTitle.value = "";
    newEntryContent.value = "";
    elementID.value = ""
    closeModal();
}

const submitEditedEntry = () => {
    let entries = getData("entries");
    let elementID = document.getElementById("elementID");
    let newEntryTitle = document.getElementById("newEntryTitle");
    let newEntryContent = document.getElementById("newEntryContent");

    let data = {
        id: parseInt(elementID.value), // Use the existing id
        title: newEntryTitle.value,
        content: newEntryContent.value
    }

    let newEntries = entries.map((entry) => {
        if (entry.id === data.id) {
            return data;
        }
        return entry;
    })
    setData("entries", newEntries);

    let entryContainer = document.getElementById(`entry-${data.id}`);
    let entryTitle = entryContainer.getElementsByClassName("entry-title")[0];
    let entryContent = entryContainer.getElementsByClassName("entry-content")[0];

    entryTitle.innerText = data.title;
    entryContent.innerText = data.content;

    newEntryTitle.value = "";
    newEntryContent.value = "";
    elementID.value = "";
    closeModal();
}

//^ პოსტის ედით ფუნქცია
const editEntry = (id) => {
    let entries = getData("entries");
    if (entries) {
        // & ჩანაწერის პოვნა აიდით
        let entry = entries.find(entry => entry.id == id);
        if (entry) {
            let newEntryTitle = document.getElementById("newEntryTitle");
            let newEntryContent = document.getElementById("newEntryContent");
            let elementID = document.getElementById("elementID");

            newEntryTitle.value = entry.title;
            newEntryContent.value = entry.content;
            elementID.value = id;
            addNewEntry()
        }
    }

}

//^ ფუნქცია ელემეტების ცვალებადი, ტიპის, კლასის და ატრიბუტის დამატება
const processHTMLElement = (typeOf, className, params) => {
    let HTMLelement = document.createElement(typeOf);
    HTMLelement.classList.add(className);
    if (params) {
        if (params.id) {
            HTMLelement.id = params.id;
        }
        if (params.innerText) {
            HTMLelement.innerText = params.innerText;
        } else if (params.src) {
            HTMLelement.src = params.src;
        }
        if (params.onclick) {
            HTMLelement.setAttribute("onClick", params.onclick)
        }
    }

    return HTMLelement;
}

//^REVIEW -  დასამუშავებელი ფუნქცია ქმნის ელემენტებს და ჩასვამს სათანადო ტექსტს
const processHTMLForEntry = (entry, entriesContainer) => {
    let entryContainer = processHTMLElement("div", "entry", {
        id: `entry-${entry.id}`
    })

    let entryTitle = processHTMLElement("h3", "entry-title", {
        innerText: entry.title
    })

    let entryContent = processHTMLElement("p", "entry-content", {
        innerText: entry.content
    })

    let entryWrapper = processHTMLElement("div", "entry-wrapper")

    // icons
    let entryActions = processHTMLElement("div", "entry-actions")


    let entryDelete = processHTMLElement("img", "entry-delete", {
        src: "../images/trash-icon.png",
        onclick: `deleteEntry(${entry.id})`
    })
    let entryEdit = processHTMLElement("img", "entry-edit", {
        src: "../images/edit_icon.svg",
        onclick: `editEntry(${entry.id})`
    })

    entryActions.appendChild(entryEdit);
    entryActions.appendChild(entryDelete);


    entryWrapper.appendChild(entryTitle);
    entryWrapper.appendChild(entryContent);
    entryContainer.appendChild(entryWrapper);
    entryContainer.appendChild(entryActions);
    entriesContainer.appendChild(entryContainer);
}

//^REVIEW -  იღებს ყველა ჩანაწერს და დაუკავშირებს კონტაინერში
const generateEntries = () => {
    let entries = getData("entries");
    let entriesContainer = document.getElementById("entries");

    if (entries) {
        entriesContainer.innerHTML = "";
        entries.forEach((entry) => {
            processHTMLForEntry(entry, entriesContainer);
        })
    }
}

//^REVIEW -  ენების შეცვლის ფუნქცია სატანადო თარგმანით
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

//^REVIEW - * მთავარი ფუნაცია აკონტროლებს ჩატვირთვას, ენებს და ჩანაწერებს
const general = () => {
    generateLangs();
    generateEntries();
}

general();


async function getDataTest() {
    let powerteg = document.getElementById("usercontent");

    let loadingMessage = document.createElement("h2");
    loadingMessage.innerText = "Loading...";
    powerteg.appendChild(loadingMessage);

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    powerteg.removeChild(loadingMessage);

    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let postName = document.createElement("h4");
            let postAbout= document.createElement("p");
            postName.innerText = data[i].title;
            postAbout.innerText = data[i].body;
            powerteg.appendChild(postName);
            powerteg.appendChild(postAbout);
        }
    } 

}

getDataTest();