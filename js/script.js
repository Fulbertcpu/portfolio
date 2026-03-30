let typed = new Typed(".typing", {
    strings:["","Junior Web Developer","Software Engineering Student"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
})

const nav = document.querySelector(".nav"),
navListe = nav.querySelectorAll("li"),
totalNavList = navListe.length,
allSection = document.querySelectorAll(".section"),
totalsection = allSection.length;

for(let i=0; i<totalNavList; i++){
    const a = navListe[i].querySelector("a");
    a.addEventListener("click", function(){
       
        removeBackSection();

        for(let j = 0; j<totalNavList; j++){
            if(navListe[j].querySelector("a").classList.contains("active")){
                addBackSection(j)
            }
            navListe[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        showSection(this);
        if(window.innerWidth<1200){
            asideSectionTogglerBtn()
        }
    })
}

function showSection(element){
    for(let i=0; i<totalsection; i++){
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}

function removeBackSection(){
     for(let i=0; i<totalsection; i++){
            allSection[i].classList.remove("back-section");
        }
}

function addBackSection(num){
    allSection[num].classList.add("back-section");
}

function updateNave(element){
    for(let i=0; i<totalNavList; i++){
        navListe[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];

        if(target === navListe[i].querySelector("a").getAttribute("href").split("#")[1]){
            navListe[i].querySelector("a").classList.add("active");
        }

    }
}

document.querySelector(".hire-me").addEventListener("click", function(){
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNave(this);
    removeBackSection();
    addBackSection(sectionIndex);
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", ()=>{
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn(){
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open")

    for(let i=0; i<totalsection; i++){
        allSection[i].classList.toggle("open");
    }
}

// EmailJS initialization and form handling
(function() {
    console.log('Initializing mailto form handler...');
    const contactForm = document.querySelector('.contact-form');
    console.log('Contact form found:', contactForm);
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Build mailto URL
            const mailtoURL = `mailto:ouattarafulbert5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;

            // Open email client
            window.location.href = mailtoURL;

            // Reset form
            this.reset();
            alert('Votre client email s\'ouvre avec le message pré-rempli. Envoyez-le depuis votre client email.');
        });
    } else {
        console.error('Contact form not found');
    }
})();

